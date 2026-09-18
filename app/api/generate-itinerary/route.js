import { createHash } from "node:crypto";
import { touristDestinations } from "@/data/touristDestinations";
import { accommodationPriceRanges, activityPrices, hotelsByDestination } from "@/lib/destinationContent";

// Cost control: response caching + per-IP rate limiting, both backed by a
// plain in-memory Map at module scope rather than Firestore or Redis.
// Deliberate choice, not an oversight — this project has no firebase-admin
// (server-trusted) setup, and firestore.rules isn't even in this repo to
// check whether the client SDK could write here from a server route without
// auth. Standing up Admin SDK credentials or a Redis add-on is a bigger,
// separate decision. This in-memory approach needs zero new credentials and
// meaningfully blocks the realistic cost risks (double-submits, a client
// retry loop, moderate repeated hits landing on the same warm instance) —
// but it resets on cold start and isn't shared across concurrent serverless
// instances, so it's a first line of defense, not an airtight distributed
// limiter. Upgrade to Firestore Admin SDK or Redis if that gap ever matters.
const responseCache = new Map(); // key -> { result, expiresAt }
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour — short, since a longer TTL
// risks serving stale prices to a duplicate request after a knowledge-base
// update, and the main goal here is catching near-immediate repeats
// (double-submits, retries), not long-term result reuse.

const rateLimitMap = new Map(); // ip -> { count, windowStart }
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 8; // generous for genuine trip-planning iteration

function pruneExpired(map, isExpired) {
  for (const [key, value] of map) {
    if (isExpired(value)) map.delete(key);
  }
}

function getCacheKey(preferences) {
  const canonical = JSON.stringify(preferences, Object.keys(preferences).sort());
  return createHash("sha256").update(canonical).digest("hex");
}

function getCachedResult(key) {
  pruneExpired(responseCache, (v) => v.expiresAt < Date.now());
  const entry = responseCache.get(key);
  return entry ? entry.result : null;
}

function setCachedResult(key, result) {
  responseCache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

// Returns true if the request is allowed, false if the caller is over the
// limit. Only gates the expensive path (an actual Bedrock call) — cache
// hits never reach this check, since they cost nothing to serve.
function checkRateLimit(ip) {
  pruneExpired(rateLimitMap, (v) => Date.now() - v.windowStart > RATE_LIMIT_WINDOW_MS);

  const entry = rateLimitMap.get(ip);
  if (!entry || Date.now() - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: Date.now() });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

// Generates the day-by-day content for a Sri Lanka itinerary using Claude
// Opus 4.5 via AWS Bedrock's Converse API (not Anthropic's direct API —
// Bedrock uses a different endpoint, auth, and request/response shape).
// The model has full latitude over destinations, sequencing, and activity
// prose — extensive testing against a PartyRock/Bedrock prototype showed it
// reliably produces geographically sound routes without needing
// lib/itineraryPlanner.js's hand-built deterministic logic (that file is
// kept in the repo for reference but is NOT used here).
//
// The one thing that same testing showed the model can't be trusted with:
// prices. It confidently invented hotel and activity costs. So this route
// does NOT ask the model to state any price. The tool schema below has no
// price field at all, and the system prompt explicitly forbids stating one
// in free text either. Every dollar figure the traveler actually sees —
// the accommodation estimate, and any attraction entry fee mentioned in an
// activity — is spliced in server-side afterward, from
// lib/destinationContent.js's verified `accommodationPriceRanges` and
// `activityPrices`. The model never has a chance to misquote a number,
// because it's never the one producing the number.
//
// Driver/trip pricing is intentionally untouched by this route — that's
// already solved by lib/driverPricing.js's getLowestDriverPrice(), a real
// query against data/drivers.js. app/plan-trip/page.jsx calls that
// separately, client-side, and merges it with this route's response.
//
// MODEL ID: this account's Bedrock access to "Claude Sonnet 4.6" (an AWS
// Marketplace listing name) turned out to resolve to claude-sonnet-4-20250514,
// which Bedrock has since marked Legacy/access-denied on this account. Opus
// 4.5 is what's actually active and working. It also needs the "global."
// cross-region inference profile prefix specifically — "us."/"eu."/"apac."
// all returned "invalid model identifier" for this model on this account,
// only "global." worked. Verified directly against Bedrock's Converse API,
// including the exact tool-use request/response shape this route relies on.
const BEDROCK_MODEL_ID = "global.anthropic.claude-opus-4-5-20251101-v1:0";
const BEDROCK_REGION = process.env.AWS_BEDROCK_REGION || "ap-south-1";

function bedrockConverseUrl() {
  return `https://bedrock-runtime.${BEDROCK_REGION}.amazonaws.com/model/${encodeURIComponent(BEDROCK_MODEL_ID)}/converse`;
}

// Bedrock's Converse API uses its own tool-schema shape (toolSpec/
// inputSchema.json) rather than Anthropic's direct-API input_schema —
// same JSON Schema underneath, different wrapper.
const ITINERARY_TOOL = {
  toolSpec: {
    name: "return_itinerary",
    description: "Return the completed Sri Lanka trip itinerary as structured data.",
    inputSchema: {
      json: {
        type: "object",
        properties: {
          title: { type: "string", description: "A short, appealing trip title." },
          routeSummary: {
            type: "string",
            description: "Arrow-separated route in visiting order, e.g. 'Colombo → Kandy → Ella → Galle'.",
          },
          days: {
            type: "array",
            description: "One entry per calendar day of the trip, in order.",
            items: {
              type: "object",
              properties: {
                title: { type: "string", description: "Short title for the day, e.g. 'Exploring Kandy'." },
                destinationName: {
                  type: "string",
                  description:
                    "The primary real, well-known Sri Lankan town/city for this day (used to look up map coordinates — must be an actual place name, not a region or made-up name).",
                },
                activities: {
                  type: "array",
                  items: { type: "string" },
                  description:
                    "2-4 short activity descriptions for the day. Name specific attractions where relevant, but never attach a price to them.",
                },
                hasOvernightStay: {
                  type: "boolean",
                  description: "False only for the final day if it ends in departure with no overnight stay.",
                },
                stayStyle: {
                  type: "string",
                  description:
                    "A short description of the TYPE/STYLE of accommodation for the night (e.g. 'boutique tea-estate bungalow', 'family-run guesthouse'). Never include a price or number here — pricing is added separately.",
                },
              },
              required: ["title", "destinationName", "activities", "hasOvernightStay"],
            },
          },
        },
        required: ["title", "routeSummary", "days"],
      },
    },
  },
};

// Formats the verified price data as readable context for the prompt. Kept
// simple (the whole knowledge base, not a filtered subset) since it's small
// enough to fit the context window easily — filtering it down by likely
// destinations isn't worth the complexity at this size.
function buildKnowledgeBaseContext() {
  const tierLines = Object.entries(accommodationPriceRanges)
    .filter(([key]) => key !== "lastVerified")
    .map(([tier, range]) => `- ${tier}: $${range.min}-${range.max} USD/night`)
    .join("\n");

  const activityLines = activityPrices
    .map((a) => {
      const entry = `$${a.entryFeeUsd.adult} adult / $${a.entryFeeUsd.child} child`;
      const safari = a.jeepSafariUsd
        ? `, private jeep safari $${a.jeepSafariUsd.min}-${a.jeepSafariUsd.max}/person`
        : "";
      return `- ${a.name}: entry ${entry}${safari}`;
    })
    .join("\n");

  return [
    "VERIFIED PRICE REFERENCE (do not state any of these numbers yourself — see instructions):",
    "",
    "Accommodation, nightly rate per room (USD):",
    tierLines,
    "",
    "Attraction entry fees (USD):",
    activityLines,
  ].join("\n");
}

function buildSystemPrompt(knowledgeBaseContext) {
  return `You are voyaGees' Sri Lanka trip-itinerary writer. Given a traveler's dates, party details, budget, pace, and interests, you have full creative latitude to choose a geographically sensible sequence of real Sri Lankan destinations, decide how long to spend at each, and write specific, engaging day-by-day activities.

The one hard rule: NEVER state a specific price — not a hotel rate, not an attraction entry fee, not a safari cost — anywhere in your response, including inside activity descriptions or the stay style. Just name places and activities; the platform attaches verified pricing separately after you respond. If you write a number that looks like a price, you have made a mistake.

${knowledgeBaseContext}

The reference list above is for your awareness of which destinations/attractions the platform has verified pricing infrastructure for — it does not limit which destinations you may choose, and you must not quote any of its numbers yourself.

Match accommodation style (via stayStyle) to the traveler's stated budget tier, and the density of each day's activities to their stated pace. Use real, well-known place names for destinationName so they can be matched to map coordinates.`;
}

function buildUserPrompt(preferences, totalDays) {
  const {
    startLocation,
    endLocation,
    budget,
    pace,
    interests = [],
    adults,
    children,
    childrenAges = [],
    notes,
  } = preferences;

  const partyDescription =
    children > 0
      ? `${adults} adult${adults === 1 ? "" : "s"} and ${children} child${children === 1 ? "" : "ren"} (ages ${childrenAges.join(", ")})`
      : `${adults} adult${adults === 1 ? "" : "s"}`;

  return [
    `Plan a ${totalDays}-day private-driver trip around Sri Lanka.`,
    `Starting point: ${startLocation}.`,
    endLocation ? `Ending point: ${endLocation}.` : "Ending point: same as starting point.",
    `Travel party: ${partyDescription}.`,
    `Budget tier: ${budget}.`,
    `Pace: ${pace}.`,
    interests.length > 0 ? `Interests: ${interests.join(", ")}.` : "No specific interests stated — use good judgment.",
    notes ? `Additional notes from the traveler: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// Grounds the model's free-text destination name in a real, known
// coordinate — the same "don't trust the model for verifiable facts"
// principle applied to geography instead of price. Falls back to Colombo
// (with a flag) rather than fabricating a coordinate, since an approximate
// pin is safer than a wrong one placed with false confidence.
function resolveDestinationCoordinates(destinationName) {
  const needle = destinationName.trim().toLowerCase();

  const exact = touristDestinations.find(
    (d) => d.name.toLowerCase() === needle || d.slug === needle
  );
  if (exact) return { name: destinationName, lat: exact.lat, lng: exact.lng, resolved: true };

  const partial = touristDestinations.find(
    (d) => needle.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(needle)
  );
  if (partial) return { name: destinationName, lat: partial.lat, lng: partial.lng, resolved: true };

  return { name: destinationName, lat: 6.9271, lng: 79.8612, resolved: false };
}

// Same fuzzy-match principle as resolveDestinationCoordinates, applied to
// hotelsByDestination: if the model's destinationName matches one of our
// researched destinations, use the real hotel name for that budget tier
// instead of the model's generic stayStyle description. No match just
// falls through to the existing generic behavior — an untracked
// destination stays as descriptive text, never a guessed hotel name.
function resolveHotelName(destinationName, budget) {
  const needle = destinationName.trim().toLowerCase();

  const destinationId = Object.keys(hotelsByDestination)
    .filter((key) => key !== "lastVerified")
    .find((id) => needle.includes(id.replace("-", " ")) || needle.includes(id));

  if (!destinationId) return null;

  const tiers = hotelsByDestination[destinationId];
  const hotel = tiers[budget] || tiers["mid-range"];
  return hotel ? `${hotel.name} (${hotel.area})` : null;
}

// Appends the verified entry fee to any activity line that names one of
// our tracked attractions. Everything else passes through unchanged —
// an untracked attraction just stays priceless rather than guessed at.
function appendVerifiedActivityPrices(activities) {
  return activities.map((activity) => {
    const match = activityPrices.find((a) =>
      activity.toLowerCase().includes(a.name.toLowerCase())
    );
    if (!match) return activity;

    const entry = `entry $${match.entryFeeUsd.adult} adult`;
    const safari = match.jeepSafariUsd
      ? `, jeep safari $${match.jeepSafariUsd.min}-${match.jeepSafariUsd.max}/person`
      : "";
    return `${activity} (${entry}${safari})`;
  });
}

function addDays(isoDate, offset) {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

export async function POST(request) {
  if (!process.env.BEDROCK_API_KEY) {
    return Response.json(
      { error: "BEDROCK_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const preferences = await request.json();
  const { pickupDate, dropoffDate, budget = "mid-range" } = preferences;

  if (!pickupDate || !dropoffDate) {
    return Response.json({ error: "pickupDate and dropoffDate are required." }, { status: 400 });
  }

  // Cache check happens before rate limiting — a cache hit costs nothing,
  // so it shouldn't count against the caller's Bedrock-call budget.
  const cacheKey = getCacheKey(preferences);
  const cached = getCachedResult(cacheKey);
  if (cached) {
    return Response.json(cached);
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many itinerary requests. Please try again in a while." },
      { status: 429 }
    );
  }

  const start = new Date(`${pickupDate}T00:00:00`);
  const end = new Date(`${dropoffDate}T00:00:00`);
  const totalDays = Math.round((end - start) / 86400000) + 1;

  const knowledgeBaseContext = buildKnowledgeBaseContext();
  const systemPrompt = buildSystemPrompt(knowledgeBaseContext);
  const userPrompt = buildUserPrompt(preferences, totalDays);

  let bedrockRes;
  try {
    bedrockRes = await fetch(bedrockConverseUrl(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.BEDROCK_API_KEY}`,
      },
      body: JSON.stringify({
        system: [{ text: systemPrompt }],
        messages: [{ role: "user", content: [{ text: userPrompt }] }],
        toolConfig: {
          tools: [ITINERARY_TOOL],
          toolChoice: { tool: { name: "return_itinerary" } },
        },
        inferenceConfig: { maxTokens: 4096 },
      }),
    });
  } catch (err) {
    console.error("generate-itinerary: Bedrock request failed:", err);
    return Response.json({ error: "Failed to reach the itinerary service." }, { status: 502 });
  }

  if (!bedrockRes.ok) {
    const errorBody = await bedrockRes.text();
    console.error("generate-itinerary: Bedrock API error:", bedrockRes.status, errorBody);
    return Response.json({ error: "The itinerary service returned an error." }, { status: 502 });
  }

  const bedrockData = await bedrockRes.json();
  const toolUseBlock = bedrockData.output?.message?.content?.find(
    (block) => block.toolUse?.name === "return_itinerary"
  );

  if (!toolUseBlock) {
    console.error("generate-itinerary: no toolUse block in response:", bedrockData);
    return Response.json({ error: "Couldn't generate an itinerary. Please try again." }, { status: 502 });
  }

  const aiItinerary = toolUseBlock.toolUse.input;
  const tierRange = accommodationPriceRanges[budget] || accommodationPriceRanges["mid-range"];

  let nightsWithStay = 0;
  const days = (aiItinerary.days || []).map((day, index) => {
    const destination = resolveDestinationCoordinates(day.destinationName || "");
    if (day.hasOvernightStay) nightsWithStay += 1;

    return {
      label: `Day ${index + 1}`,
      date: addDays(pickupDate, index),
      title: day.title,
      activities: appendVerifiedActivityPrices(day.activities || []),
      location: { name: destination.name, lat: destination.lat, lng: destination.lng },
      stay: day.hasOvernightStay
        ? {
          name:
            resolveHotelName(day.destinationName || "", budget) ||
            day.stayStyle ||
            "Recommended local accommodation",
          price: `$${tierRange.min}-${tierRange.max}/night`,
          affiliateUrl: "https://example.com/affiliate/hotel-placeholder",
        }
        : null,
    };
  });

  const result = {
    title: aiItinerary.title,
    routeSummary: aiItinerary.routeSummary,
    accommodationEstimate: {
      min: tierRange.min * nightsWithStay,
      max: tierRange.max * nightsWithStay,
    },
    days,
  };

  setCachedResult(cacheKey, result);
  return Response.json(result);
}
