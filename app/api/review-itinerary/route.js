// Reviews an itinerary the traveller wrote themselves ("Améliorer mon
// itinéraire"): day-by-day feedback on what works, what is too full and how
// to fix it, using the same field notes and driving times as the planner.
// One Bedrock call per review, rate-limited per visitor like the planner.

import { fieldNotesText } from "@/lib/fieldNotes";
import { HILL_COUNTRY_TRAIN } from "@/lib/destinationContent";

const BEDROCK_MODEL_ID = "global.anthropic.claude-opus-4-5-20251101-v1:0";
const BEDROCK_REGION = process.env.AWS_BEDROCK_REGION || "ap-south-1";
const MAX_PLAN_CHARS = 8000;
const MIN_PLAN_CHARS = 40;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimits = new Map();

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (forwardedFor ? forwardedFor.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
}

function checkRateLimit(ip) {
  const now = Date.now();
  const recent = (rateLimits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return false;
  recent.push(now);
  rateLimits.set(ip, recent);
  return true;
}

export const maxDuration = 60;

const REVIEW_TOOL = {
  toolSpec: {
    name: "return_review",
    description: "Return the structured review of the traveller's own Sri Lanka itinerary.",
    inputSchema: {
      json: {
        type: "object",
        properties: {
          verdict: {
            type: "string",
            enum: ["realistic", "a_bit_full", "too_rushed"],
            description: "Overall verdict on the plan as a whole.",
          },
          summary: {
            type: "string",
            description: "2 to 3 friendly sentences: what works well overall and the main things to change.",
          },
          days: {
            type: "array",
            description: "One entry per day (or per stage, if the plan is not split by day), in the traveller's order.",
            items: {
              type: "object",
              properties: {
                label: { type: "string", description: "The day as the traveller wrote it, e.g. 'Day 3' or 'Thu 9 Jan – Ella'." },
                plan: { type: "string", description: "A very short restatement of what they planned that day." },
                status: {
                  type: "string",
                  enum: ["ok", "adjust", "rethink"],
                  description: "ok = realistic as planned; adjust = small change recommended; rethink = not realistic as planned.",
                },
                comment: { type: "string", description: "Why: concrete, with realistic drive/visit times where relevant." },
                suggestion: {
                  type: "string",
                  description: "What to do instead or add, if anything. Answer any question the traveller marked with '?' for this day. Omit when status is ok and nothing to add.",
                },
              },
              required: ["label", "plan", "status", "comment"],
            },
          },
          generalTips: {
            type: "array",
            items: { type: "string" },
            description: "2 to 5 short tips for the whole trip (season by region, transport, cash, holidays, bookings).",
          },
        },
        required: ["verdict", "summary", "days", "generalTips"],
      },
    },
  },
};

const TRAIN_RULE = {
  closed: "No hill-country trains are running: any train the traveller planned must be replaced by a drive.",
  ella_section:
    "Only the Nanu Oya (Nuwara Eliya) – Haputale – Ella section of the hill-country railway is running; Kandy – Nanu Oya is closed. Trains are always optional and subject to tickets and the line being open; the driver can carry luggage by road and meet them at the station.",
  full: "The Kandy – Nanu Oya – Ella train runs, but is always optional and subject to tickets and the line being open.",
}[HILL_COUNTRY_TRAIN] || "";

function systemPrompt(locale) {
  return `You are voyaGees' Sri Lanka travel expert. A traveller pasted their own itinerary and wants honest, friendly, practical feedback, day by day, as an experienced local driver would give it.

Rules:
- Use real, door-to-door drive times: plan with about 30 to 40 km/h on average. Typical drives: Airport → Sigiriya ~4 h, → Kandy ~3 h, → Galle ~2.5 h; Colombo → Galle ~2 h; Sigiriya ↔ Kandy 2.5–3 h; Kandy → Nuwara Eliya 2.5–3 h; Kandy → Ella 5–6 h; Nuwara Eliya → Ella 2.5–3 h; Ella → Mirissa ~4 h; Ella → Yala ~2.5 h; Sigiriya ↔ Polonnaruwa ~1.5 h; Sigiriya ↔ Trincomalee ~2.5 h; Trincomalee → Jaffna ~4 h; Sigiriya ↔ Mirissa 6–7 h (never in one day).
- Flag days that are too full: more than 4–5 h of driving, two sunrise activities, or more sights than fit.
- Respect the traveller's choices: keep their route where it works and suggest the smallest change that fixes a problem.
- Answer every question they marked with "?".
- Mention season issues for the region and dates when relevant (west/south/hill country best Dec–Apr; east/north best May–Sept).
- Trains: ${TRAIN_RULE}
- NEVER state prices of any kind.
- Be warm and encouraging; say clearly what is good about their plan.

${fieldNotesText()}

${locale === "fr" ? "LANGUAGE: The traveller uses the French site. Write every text field (summary, plan, comment, suggestion, generalTips) in natural, fluent French, using \"vous\". Keep place names as they are usually written." : "Write in clear, friendly British English."}`;
}

export async function POST(request) {
  if (!process.env.BEDROCK_API_KEY) {
    return Response.json({ error: "BEDROCK_API_KEY is not configured on the server." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const locale = body.locale === "fr" ? "fr" : "en";
  const plan = String(body.plan || "").trim();
  if (plan.length < MIN_PLAN_CHARS) {
    return Response.json({ error: "PLAN_TOO_SHORT" }, { status: 400 });
  }
  if (plan.length > MAX_PLAN_CHARS) {
    return Response.json({ error: "PLAN_TOO_LONG" }, { status: 400 });
  }

  if (!checkRateLimit(getClientIp(request))) {
    return Response.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const context = [
    body.startDate ? `Trip starts on: ${String(body.startDate).slice(0, 10)}.` : "",
    body.travellers ? `Travellers: ${String(body.travellers).slice(0, 40)}.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  let res;
  try {
    res = await fetch(
      `https://bedrock-runtime.${BEDROCK_REGION}.amazonaws.com/model/${encodeURIComponent(BEDROCK_MODEL_ID)}/converse`,
      {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${process.env.BEDROCK_API_KEY}` },
        body: JSON.stringify({
          system: [{ text: systemPrompt(locale) }],
          messages: [
            {
              role: "user",
              content: [{ text: `${context ? context + "\n\n" : ""}Here is my itinerary:\n\n<itinerary>\n${plan}\n</itinerary>` }],
            },
          ],
          toolConfig: { tools: [REVIEW_TOOL], toolChoice: { tool: { name: "return_review" } } },
          inferenceConfig: { maxTokens: 4096 },
        }),
      }
    );
  } catch (err) {
    console.error("review-itinerary: Bedrock request failed:", err);
    return Response.json({ error: "SERVICE_UNAVAILABLE" }, { status: 502 });
  }

  if (!res.ok) {
    console.error("review-itinerary: Bedrock error", res.status, await res.text());
    return Response.json({ error: "SERVICE_UNAVAILABLE" }, { status: 502 });
  }

  const data = await res.json();
  const tool = data.output?.message?.content?.find((b) => b.toolUse?.name === "return_review");
  if (!tool) {
    console.error("review-itinerary: no toolUse block", data);
    return Response.json({ error: "SERVICE_UNAVAILABLE" }, { status: 502 });
  }

  const review = tool.toolUse.input;
  return Response.json({
    verdict: review.verdict,
    summary: review.summary,
    days: (review.days || []).slice(0, 40),
    generalTips: (review.generalTips || []).slice(0, 6),
  });
}
