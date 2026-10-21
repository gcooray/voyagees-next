import { createHash } from "node:crypto";
import { touristDestinations } from "@/data/touristDestinations";
import {
  accommodationPriceRanges,
  activityPrices,
  hotelsByDestination,
  occupancyPricing,
  seasonalNotes,
  SHOW_HOTEL_PRICES,
  HILL_COUNTRY_TRAIN,
} from "@/lib/destinationContent";

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
const RATE_LIMIT_MAX_REQUESTS = 5; // per visitor per hour — enough to try a few versions of a trip

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
                  description:
                    "False ONLY for the final day when the trip ends at the airport for a departing flight. If the trip ends anywhere else (e.g. a beach town like Mirissa), the traveller stays on there: the final day arrives in that end location and has an overnight stay there.",
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

// French output: everything the traveler reads is written in French, but
// destinationName stays the standard place name — it's matched against
// touristDestinations / hotelsByDestination, which are keyed in English.
const FRENCH_INSTRUCTION = `

LANGUAGE: The traveler is using the French version of the site. Write title, routeSummary, every day's title, every activity and every stayStyle in natural, fluent French. Keep destinationName as the standard place name exactly as it is usually written in English (e.g. "Kandy", "Nuwara Eliya", "Arugam Bay") — it is used for map lookup, not shown as prose.`;

// Train rules for the model — see HILL_COUNTRY_TRAIN.
// Sri Lankan roads are slow (often 30–40 km/h door to door), so the model
// tends to underestimate drive times — e.g. a 3-day trip with a Sigiriya →
// Mirissa day (6–7 h). Real times keep each day realistic.
const DRIVING_INSTRUCTION = `

DRIVING TIMES (hard rule): Roads in Sri Lanka are slow — plan with these real door-to-door times by car:
- Airport/Negombo → Colombo 1 h; → Sigiriya/Dambulla 4 h; → Kandy 3 h; → Galle 2.5 h; → Mirissa 3 h; → Ella 6 h.
- Colombo → Galle 2 h; → Mirissa 2.5 h; → Kandy 3.5 h; → Sigiriya 4.5 h.
- Sigiriya ↔ Dambulla 0.5 h; ↔ Polonnaruwa 1.5 h; ↔ Anuradhapura 2 h; ↔ Kandy 2.5–3 h; ↔ Trincomalee 2.5 h; ↔ Mirissa/Galle 6–7 h.
- Kandy → Nuwara Eliya 2.5–3 h; → Ella 5–6 h. Nuwara Eliya → Ella 2.5–3 h. Ella → Yala/Tissamaharama 2.5 h; → Mirissa 4 h; → Arugam Bay 3 h.
- Yala/Tissamaharama → Mirissa 2.5 h. Mirissa ↔ Galle 1 h. Galle → Bentota 1.5 h.
Never plan more than about 4–5 hours of driving in one day (about 3 hours for a relaxed pace or a party with young children), and never more than 3 hours on the first day after a long-haul arrival or on the final day before a flight. If two places are further apart than that, stop overnight in between or leave one out.

TRIP LENGTH: Choose a realistic scope for the number of days. For trips of 4 days or fewer, stay within one area close to the start and end points (for example the Cultural Triangle, or Kandy and the hill country, or the south coast) — do not try to cover the island. Fewer places with real time at each beats a rushed loop.`;

const TRAIN_OPTIONAL_WORDING = `Phrase it like "optional: take the scenic train (subject to ticket availability and the line being open) while your driver brings your luggage by road and meets you at the station". Mention it only in that day's activities — never in the day's title, since it may not happen. Never suggest trains on other lines.`;

const TRAIN_INSTRUCTIONS = {
  closed: `

TRAINS: Do NOT include any train journey, anywhere in Sri Lanka. All travel between towns, including Kandy, Nuwara Eliya and Ella, is by road with the private driver; describe these as scenic drives (tea country, waterfalls, viewpoints) instead.`,
  ella_section: `

TRAINS: Only the Nanu Oya (Nuwara Eliya) – Haputale – Ella section of the hill-country railway is currently running. You may suggest it only as an OPTIONAL experience on a day the traveller moves between Nuwara Eliya, Haputale and Ella (either direction), never as a guaranteed or pre-booked part of the trip. ${TRAIN_OPTIONAL_WORDING} The Kandy – Nanu Oya section is CLOSED: any journey to or from Kandy (Kandy ↔ Nuwara Eliya, Kandy ↔ Ella, Kandy ↔ Haputale) is by road with the driver — never suggest a train from or to Kandy.`,
  full: `

TRAINS: The Kandy–Nanu Oya–Ella train may be suggested only as an OPTIONAL experience on the day the traveller moves between those towns, never as a guaranteed or pre-booked part of the trip. ${TRAIN_OPTIONAL_WORDING}`,
};
const TRAIN_INSTRUCTION = TRAIN_INSTRUCTIONS[HILL_COUNTRY_TRAIN] || TRAIN_INSTRUCTIONS.closed;

function buildSystemPrompt(knowledgeBaseContext, locale) {
  return `You are voyaGees' Sri Lanka trip-itinerary writer. Given a traveler's dates, party details, budget, pace, and interests, you have full creative latitude to choose a geographically sensible sequence of real Sri Lankan destinations, decide how long to spend at each, and write specific, engaging day-by-day activities.

The one hard rule: NEVER state a specific price — not a hotel rate, not an attraction entry fee, not a safari cost — anywhere in your response, including inside activity descriptions or the stay style. Just name places and activities; the platform attaches verified pricing separately after you respond. If you write a number that looks like a price, you have made a mistake.

${knowledgeBaseContext}

The reference list above is for your awareness of which destinations/attractions the platform has verified pricing infrastructure for — it does not limit which destinations you may choose, and you must not quote any of its numbers yourself.

Match accommodation style (via stayStyle) to the traveler's stated budget tier, and the density of each day's activities to their stated pace. Use real, well-known place names for destinationName so they can be matched to map coordinates.

Seasonality awareness: Sri Lanka's west/south/hill-country region is best Dec-Apr, while the east/north coast (Trincomalee, Arugam Bay, Jaffna) has the opposite pattern and is best May-Sept — prefer suggesting each region during its own good season when the traveler's dates allow flexibility, and avoid recommending time-sensitive activities (e.g. whale watching off Mirissa, or Arugam Bay surfing) outside their real season. You don't need to mention this yourself — the platform adds a seasonal note to the response automatically when relevant.${DRIVING_INSTRUCTION}${TRAIN_INSTRUCTION}${locale === "fr" ? FRENCH_INSTRUCTION : ""}`;
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
    isAirport(endLocation || startLocation)
      ? "The trip ends at the airport for a departing flight: keep the final day light and within easy reach of the airport, with no overnight stay."
      : `The trip ends in ${endLocation || startLocation}, where the traveller stays on: the final day must arrive there, with that night's stay there.`,
    `Travel party: ${partyDescription}.`,
    `Budget tier: ${budget}.`,
    `Pace: ${pace}.`,
    interests.length > 0 ? `Interests: ${interests.join(", ")}.` : "No specific interests stated — use good judgment.",
    notes ? `Additional notes from the traveler: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// Strips spaces/hyphens so "Arugam Bay" and the knowledge base's
// "arugambay" key compare equal — a plain .includes() check missed this
// exact case in testing (a real, verified bug: the model's "Arugam Bay"
// never matched the hotelsByDestination key "arugambay" because of the
// space, silently falling back to the model's generic description).
function normalizeForMatch(text) {
  return text.trim().toLowerCase().replace(/[\s-]/g, "");
}

// Names the model uses interchangeably with a knowledge base entry for the
// same place — found via testing when "Tissamaharama" (the actual town by
// Yala National Park) didn't match our "yala" entry at all, falling back to
// an unresolved Colombo coordinate and a generic hotel description.
const DESTINATION_ALIASES = {
  tissamaharama: "yala",
};

// Grounds the model's free-text destination name in a real, known
// coordinate — the same "don't trust the model for verifiable facts"
// principle applied to geography instead of price. Falls back to Colombo
// (with a flag) rather than fabricating a coordinate, since an approximate
// pin is safer than a wrong one placed with false confidence.
const AIRPORT_WORDS = /airport|a[ée]roport|katunayake|bandaranaike|\bcmb\b/i;
const CMB_AIRPORT = { lat: 7.1808, lng: 79.8841 };

function isAirport(place) {
  return AIRPORT_WORDS.test(place || "");
}

function resolveDestinationCoordinates(destinationName) {
  if (!destinationName.trim()) return { name: destinationName, lat: null, lng: null, resolved: false };
  if (isAirport(destinationName)) return { name: destinationName, ...CMB_AIRPORT, resolved: true };
  const needle = destinationName.trim().toLowerCase();
  const aliasSlug = DESTINATION_ALIASES[normalizeForMatch(destinationName)];

  const exact = touristDestinations.find(
    (d) => d.name.toLowerCase() === needle || d.slug === needle || (aliasSlug && d.slug === aliasSlug)
  );
  if (exact) return { name: destinationName, lat: exact.lat, lng: exact.lng, resolved: true };

  const partial = touristDestinations.find(
    (d) => needle.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(needle)
  );
  if (partial) return { name: destinationName, lat: partial.lat, lng: partial.lng, resolved: true };

  return { name: destinationName, lat: 6.9271, lng: 79.8612, resolved: false };
}

// Server-side check on the model's route, since the prompt's driving rules
// aren't always followed (a 3-day trip once went Kandy → Galle → Colombo,
// another Sigiriya → Mirissa in a day). Straight-line km is crude — coastal
// expressways are faster than hill roads — so the limits only catch the
// clearly unrealistic: one leg over MAX_LEG_KM (e.g. Sigiriya → Mirissa,
// 226 km, 6–7 h), or a short trip covering more than SHORT_TRIP_KM_PER_DAY
// on average (an island loop squeezed into a few days).
const MAX_LEG_KM = 170;
const SHORT_TRIP_DAYS = 4;
const SHORT_TRIP_KM_PER_DAY = 110;

function distanceKm(a, b) {
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Returns a note for the model describing what's unrealistic, or null.
function findRouteProblems(aiDays, startPlace, endPlace) {
  const stops = [
    startPlace,
    ...aiDays.map((day) => day.destinationName || ""),
    endPlace,
  ].map((name) => ({ name, ...resolveDestinationCoordinates(name) }));

  const longLegs = [];
  let totalKm = 0;
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    if (!a.resolved || !b.resolved) continue;
    const km = distanceKm(a, b);
    totalKm += km;
    if (km > MAX_LEG_KM) longLegs.push(`${a.name} → ${b.name}`);
  }

  const problems = [];
  if (longLegs.length > 0) {
    problems.push(
      `These drives are far too long for one day (6 hours or more on Sri Lankan roads): ${longLegs.join("; ")}.`
    );
  }
  if (aiDays.length <= SHORT_TRIP_DAYS && totalKm > SHORT_TRIP_KM_PER_DAY * aiDays.length) {
    problems.push(
      `The route covers too much ground for a ${aiDays.length}-day trip — the traveller would spend most of it in the car. Stay within one area near the start and end points.`
    );
  }
  return problems.length > 0 ? problems.join(" ") : null;
}

// Same fuzzy-match principle as resolveDestinationCoordinates, applied to
// hotelsByDestination: if the model's destinationName matches one of our
// researched destinations, use the real hotel name for that budget tier
// instead of the model's generic stayStyle description. No match just
// falls through to the existing generic behavior — an untracked
// destination stays as descriptive text, never a guessed hotel name.
function resolveHotelName(destinationName, budget, t = SERVER_STRINGS.en) {
  const normalizedNeedle = normalizeForMatch(destinationName);
  const aliasId = DESTINATION_ALIASES[normalizedNeedle];

  const destinationId = Object.keys(hotelsByDestination)
    .filter((key) => key !== "lastVerified")
    .find((id) => normalizedNeedle.includes(normalizeForMatch(id)) || id === aliasId);

  if (!destinationId) return null;

  const tiers = hotelsByDestination[destinationId];
  const hotel = tiers[budget] || tiers["mid-range"];
  if (!hotel) return null;

  // "or similar" — a specific real hotel name is shown, but until this
  // pairs with a real availability check (either a partner-confirmed lead
  // via the "Include hotels too" flow, or a future live booking API), the
  // honest claim is "this kind of place," not "this exact room is held."
  return {
    displayName: t.orSimilar(hotel),
    // No affiliate/booking account exists yet, so there's nothing real to
    // link to. A Google search at least resolves to something true —
    // unlike the old placeholder URL, it never 404s or misleads.
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(
      `${hotel.name} ${hotel.area} Sri Lanka hotel`
    )}`,
    // Not populated yet — hotel objects in hotelsByDestination don't carry
    // real rates today. Once a hotel gets a `price: { min, max }` field,
    // it's picked up here automatically and takes priority over the
    // generic tier range, same double-occupancy-base assumption as
    // accommodationPriceRanges.
    priceRange: hotel.price || null,
  };
}

// Adjusts a base (double-occupancy) per-night price range for the actual
// travel party. Applies uniformly to the generic tier range and to any
// future real per-hotel price, since both represent the same 2-adult base
// rate — only the surcharge on top changes depending on who's staying.
function calculateStayPrice(baseRange, adults, childrenAges) {
  const extraAdults = Math.max(0, (adults || occupancyPricing.baseOccupancy) - occupancyPricing.baseOccupancy);
  let surcharge = extraAdults * occupancyPricing.extraAdultUsd;

  for (const age of childrenAges) {
    const numericAge = Number(age);
    if (!Number.isFinite(numericAge) || numericAge >= occupancyPricing.child.reducedUnderAge) {
      surcharge += occupancyPricing.child.fullAgeUsd;
    } else if (numericAge >= occupancyPricing.child.freeUnderAge) {
      surcharge += occupancyPricing.child.reducedUsd;
    }
    // Below freeUnderAge: no surcharge.
  }

  return { min: baseRange.min + surcharge, max: baseRange.max + surcharge };
}

// Checks each day's date + destination/activities against seasonalNotes and
// collects any that apply — a soft, informational disclosure, never a
// reason to drop or alter the day itself. Deduplicated by note id, since
// e.g. an Arugam Bay day matches both the surf-specific rule and the
// broader east/north monsoon rule.
const TRAIN_NOTES = {
  ella_section: {
    en: "Trains currently run only between Nanu Oya (Nuwara Eliya), Haputale and Ella, so the train is offered as an option, subject to ticket availability and the line being open. The Kandy – Nuwara Eliya line is closed: that journey is by road with your driver. We'll confirm before you travel; if the train isn't possible, your driver takes you by road.",
    fr: "Le train ne circule actuellement qu'entre Nanu Oya (Nuwara Eliya), Haputale et Ella : il est proposé en option, selon la disponibilité des billets et l'état de la ligne. Entre Kandy et Nuwara Eliya, la ligne est fermée : ce trajet se fait par la route avec votre chauffeur. Nous confirmerons avant votre départ ; si le train n'est pas possible, votre chauffeur vous conduit par la route.",
  },
  running: {
    en: "Train journeys are optional and subject to ticket availability — reserved seats often sell out weeks ahead, and services can be suspended after heavy rain. We'll confirm before you travel; if the train isn't possible, your driver takes you by road.",
    fr: "Les trajets en train sont optionnels et dépendent de la disponibilité des billets : les places réservées partent souvent des semaines à l'avance, et le service peut être suspendu après de fortes pluies. Nous confirmerons avant votre départ ; si le train n'est pas possible, votre chauffeur vous conduit par la route.",
  },
  suspended: {
    en: "Train journeys aren't included at the moment — your driver takes you between towns by road.",
    fr: "Les trajets en train ne sont pas inclus pour le moment : votre chauffeur vous conduit d'une ville à l'autre par la route.",
  },
};
const TRAIN_WORDS = /\btrains?\b|\brailways?\b|\bchemin de fer\b/i;

function trainNote(days, locale) {
  const mentionsTrain = days.some((day) =>
    [day.title, ...(day.activities || [])].some((text) => TRAIN_WORDS.test(text || ""))
  );
  if (!mentionsTrain) return null;
  const note =
    TRAIN_NOTES[{ full: "running", ella_section: "ella_section" }[HILL_COUNTRY_TRAIN] || "suspended"];
  return note[locale] || note.en;
}

function collectSeasonalNotes(days, locale = "en") {
  const matched = new Map();

  for (const day of days) {
    const month = new Date(`${day.date}T00:00:00`).getMonth() + 1;
    const haystack = `${day.location.name} ${day.activities.join(" ")}`.toLowerCase();

    for (const rule of seasonalNotes) {
      if (matched.has(rule.id)) continue;
      const nameMatches = rule.matchNames.some((name) => haystack.includes(name));
      const outOfSeason = !rule.bestMonths.includes(month);
      if (nameMatches && outOfSeason) {
        matched.set(rule.id, (locale === "fr" && FRENCH_SEASONAL_NOTES[rule.id]) || rule.note);
      }
    }
  }

  return [...matched.values()];
}

// Appends the verified entry fee to any activity line that names one of
// our tracked attractions. Everything else passes through unchanged —
// an untracked attraction just stays priceless rather than guessed at.
function appendVerifiedActivityPrices(activities, locale = "en") {
  const t = SERVER_STRINGS[locale] || SERVER_STRINGS.en;

  return activities.map((activity) => {
    const haystack = activity.toLowerCase();
    const match = activityPrices.find((a) => {
      const needles = [a.name.toLowerCase(), ...(locale === "fr" ? FRENCH_ACTIVITY_NAMES[a.id] || [] : [])];
      return needles.some((needle) => haystack.includes(needle));
    });
    if (!match) return activity;

    const entry = t.entry(match.entryFeeUsd.adult);
    const safari = match.jeepSafariUsd
      ? t.safari(match.jeepSafariUsd.min, match.jeepSafariUsd.max)
      : "";
    return `${activity} (${entry}${safari})`;
  });
}

// Text this route adds on top of the model's output, per locale.
const SERVER_STRINGS = {
  en: {
    day: (n) => `Day ${n}`,
    orSimilar: (hotel) => `${hotel.name} (${hotel.area}) or similar`,
    fallbackStay: "Recommended local accommodation",
    perNight: "/night",
    entry: (adult) => `entry $${adult} adult`,
    safari: (min, max) => `, jeep safari $${min}-${max}/person`,
  },
  fr: {
    day: (n) => `Jour ${n}`,
    // hotelsByDestination's `area` notes are English-only, so French
    // shows just the hotel name
    orSimilar: (hotel) => `${hotel.name} ou similaire`,
    fallbackStay: "Hébergement local recommandé",
    perNight: "/nuit",
    entry: (adult) => `entrée ${adult} $ par adulte`,
    safari: (min, max) => `, safari en jeep ${min}-${max} $ par personne`,
  },
};

// French names the model is likely to use for the tracked attractions, so
// a French itinerary still gets the verified entry fee appended. English
// matching (activityPrices' own `name`) is unchanged.
const FRENCH_ACTIVITY_NAMES = {
  "sigiriya-rock-fortress": ["rocher de sigiriya", "forteresse de sigiriya", "rocher du lion"],
  "pinnawala-elephant-orphanage": ["pinnawala"],
  "temple-of-the-sacred-tooth-relic": ["temple de la dent", "relique de la dent", "dent sacrée"],
  "horton-plains-national-park": ["horton plains"],
  "udawalawe-national-park-safari": ["parc national d'udawalawe", "parc national d’udawalawe", "parc national udawalawe"],
  "yala-national-park-safari": ["parc national de yala", "parc national yala"],
};

// Seasonal notes in lib/destinationContent.js are English; French
// versions keyed by the same note id.
const FRENCH_SEASONAL_NOTES = {
  "whale-watching-mirissa":
    "L'observation des baleines au large de Mirissa se fait idéalement de novembre à avril (pic de décembre à mars). En dehors de cette période, la mer est plus agitée et les observations beaucoup moins fiables.",
  "arugam-bay-surf":
    "La saison de surf à Arugam Bay s'étend d'avril à octobre (pic de juin à septembre). En dehors de cette période, la houle est irrégulière et les vents rendent les conditions moins prévisibles.",
  "minneriya-gathering":
    "Le grand rassemblement d'éléphants de Minneriya/Kaudulla a lieu pendant la saison sèche, de juillet à octobre (pic en août et septembre). En dehors de cette période, les éléphants y sont beaucoup moins nombreux.",
  "east-north-monsoon":
    "Les côtes est et nord du Sri Lanka suivent un régime de mousson inverse de celui de l'ouest, du sud et des hautes terres : la meilleure période va de mai à septembre. Elles restent visitables le reste de l'année, simplement plus pluvieuses.",
};

function addDays(isoDate, offset) {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

// A plan takes ~20 s; a re-plan of an unrealistic route makes it ~40 s.
export const maxDuration = 60;

// One Bedrock Converse call. Returns { itinerary } or { error: Response }.
async function requestItinerary(systemPrompt, userPrompt) {
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
    return { error: Response.json({ error: "Failed to reach the itinerary service." }, { status: 502 }) };
  }

  if (!bedrockRes.ok) {
    const errorBody = await bedrockRes.text();
    console.error("generate-itinerary: Bedrock API error:", bedrockRes.status, errorBody);
    return { error: Response.json({ error: "The itinerary service returned an error." }, { status: 502 }) };
  }

  const bedrockData = await bedrockRes.json();
  const toolUseBlock = bedrockData.output?.message?.content?.find(
    (block) => block.toolUse?.name === "return_itinerary"
  );

  if (!toolUseBlock) {
    console.error("generate-itinerary: no toolUse block in response:", bedrockData);
    return { error: Response.json({ error: "Couldn't generate an itinerary. Please try again." }, { status: 502 }) };
  }

  return { itinerary: toolUseBlock.toolUse.input };
}

export async function POST(request) {
  if (!process.env.BEDROCK_API_KEY) {
    return Response.json(
      { error: "BEDROCK_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const preferences = await request.json();
  const {
    pickupDate,
    dropoffDate,
    budget = "mid-range",
    adults = occupancyPricing.baseOccupancy,
    childrenAges = [],
  } = preferences;
  const locale = preferences.locale === "fr" ? "fr" : "en";
  const t = SERVER_STRINGS[locale];

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
  const systemPrompt = buildSystemPrompt(knowledgeBaseContext, locale);
  const userPrompt = buildUserPrompt(preferences, totalDays);

  const firstTry = await requestItinerary(systemPrompt, userPrompt);
  if (firstTry.error) return firstTry.error;
  let aiItinerary = firstTry.itinerary;

  const startPlace = preferences.startLocation || "";
  const endPlace = preferences.endLocation || startPlace;

  // one retry when the route is clearly unrealistic; if the retry fails,
  // the first plan is still better than an error
  const routeProblems = findRouteProblems(aiItinerary.days || [], startPlace, endPlace);
  if (routeProblems) {
    console.warn("generate-itinerary: re-planning unrealistic route:", routeProblems);
    const retry = await requestItinerary(
      systemPrompt,
      `${userPrompt}\n\nA previous draft of this trip was not realistic: ${routeProblems} Plan it again following the driving-time rules.`
    );
    if (retry.itinerary) aiItinerary = retry.itinerary;
  }

  const tierRange = accommodationPriceRanges[budget] || accommodationPriceRanges["mid-range"];

  let estimateMin = 0;
  let estimateMax = 0;
  const endsAtAirport = isAirport(endPlace);
  const aiDays = aiItinerary.days || [];

  const days = aiDays.map((day, index) => {
    const destination = resolveDestinationCoordinates(day.destinationName || "");
    const hotelMatch = resolveHotelName(day.destinationName || "", budget, t);

    // a trip that ends somewhere other than the airport (e.g. Mirissa) still
    // needs that last night's hotel, even if the model left it out
    const isLastDay = index === aiDays.length - 1;
    const needsStay = day.hasOvernightStay || (isLastDay && !endsAtAirport);

    let stay = null;
    if (needsStay) {
      const baseRange = hotelMatch?.priceRange || tierRange;
      const nightRange = calculateStayPrice(baseRange, adults, childrenAges);
      estimateMin += nightRange.min;
      estimateMax += nightRange.max;

      stay = {
        name: hotelMatch?.displayName || day.stayStyle || t.fallbackStay,
        searchUrl: hotelMatch?.searchUrl || null,
        // prices only once real rates are in (see SHOW_HOTEL_PRICES);
        // until then the page shows "price on request"
        ...(SHOW_HOTEL_PRICES
          ? {
              price: `$${nightRange.min}-${nightRange.max}${t.perNight}`,
              // numeric form of the same range (USD) — the French page shows it in €
              priceUsd: { min: nightRange.min, max: nightRange.max },
            }
          : {}),
      };
    }

    return {
      label: t.day(index + 1),
      date: addDays(pickupDate, index),
      title: day.title,
      activities: appendVerifiedActivityPrices(day.activities || [], locale),
      location: { name: destination.name, lat: destination.lat, lng: destination.lng, resolved: destination.resolved },
      stay,
    };
  });

  const result = {
    title: aiItinerary.title,
    routeSummary: aiItinerary.routeSummary,
    accommodationEstimate: SHOW_HOTEL_PRICES ? { min: estimateMin, max: estimateMax } : null,
    days,
    // where the trip starts/ends, for the route map
    startPoint: resolveDestinationCoordinates(startPlace),
    endPoint: resolveDestinationCoordinates(endPlace),
    seasonalNotes: [...collectSeasonalNotes(days, locale), trainNote(days, locale)].filter(Boolean),
  };

  setCachedResult(cacheKey, result);
  return Response.json(result);
}
