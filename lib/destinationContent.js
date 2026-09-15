// Reference data for the AI itinerary feature.
//
// `destinations` below (interestTags) was built for lib/itineraryPlanner.js,
// a hand-built deterministic sequencing engine. That approach is now
// SUPERSEDED — extensive testing showed Claude Sonnet 5 reliably produces
// geographically sound routes and rich content on its own, so the real
// generation flow (app/api/generate-itinerary/route.js) lets the model
// choose destinations, order, and activities freely. itineraryPlanner.js
// and `destinations`/interestTags stay in the repo for reference but
// aren't wired into the live feature.
//
// The one thing that same testing showed the model can't be trusted with:
// prices. It confidently invented hotel and activity costs. `accommodationPriceRanges`
// and `activityPrices` below are the fix — real, sourced figures that
// generate-itinerary's route handler splices into the response itself
// (not just a "please use these numbers" prompt instruction), so a
// specific dollar figure only ever reaches the page if it came from this
// file, never from the model's own text.

export const destinations = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    interestTags: ["culture", "adventure"],
  },
  {
    id: "dambulla",
    name: "Dambulla",
    interestTags: ["culture"],
  },
  {
    id: "kandy",
    name: "Kandy",
    interestTags: ["culture", "nature"],
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    interestTags: ["nature", "wellness"],
  },
  {
    id: "ella",
    name: "Ella",
    interestTags: ["nature", "adventure"],
  },
  {
    id: "udawalawe",
    name: "Udawalawe",
    interestTags: ["nature", "adventure"],
  },
  {
    id: "mirissa",
    name: "Mirissa",
    interestTags: ["beaches", "nature"],
  },
  {
    id: "galle",
    name: "Galle",
    interestTags: ["culture", "beaches", "food"],
  },
];

// Paused, not built yet: the east/north cluster (Trincomalee, Arugam Bay,
// Jaffna). Sri Lanka has two opposing monsoon seasons — west/south/hill
// country is best Dec-Apr, east/north is best May-Sept — and multiple
// sources agree combining both regions in one trip realistically needs
// 3+ weeks. The plan is for seasonality to be a soft disclosure note
// ("heads up, this region is rainier in X months, still doable") rather
// than a hard gate blocking travel, but that logic and these destination
// nodes don't exist yet.

// =========================================================
// PRICE KNOWLEDGE BASE
// Sourced from multiple independent, convergent travel/park-authority
// references (not the AI). generate-itinerary's route handler is what
// actually reads these and injects the numbers — the model is never asked
// to reproduce or recall a figure from here itself.
// =========================================================

// Indicative nationwide nightly rate per room (USD, foreigner rates), by
// the same budget tiers app/plan-trip/page.jsx already collects. This is
// intentionally NOT broken out per destination — actual price depends far
// more on the specific property than on which of these ~8 stops it's in,
// and pinning down verified per-destination figures for the wide range of
// places the model might now freely choose isn't feasible. Colombo/Galle/
// coastal luxury tends toward the top of its band; rural hill-country or
// wildlife-area stays tend toward the bottom.
export const accommodationPriceRanges = {
  lastVerified: "2026-09",
  budget: { min: 20, max: 45 },
  "mid-range": { min: 50, max: 100 },
  luxury: { min: 150, max: 350 },
};

// Verified entry fees (USD, foreigner/non-SAARC adult and child rates) for
// the specific attractions that kept showing up with wrong AI-invented
// prices in testing. `name` is matched against the model's free-text
// activity strings (case-insensitive substring match) by the route
// handler — if a day's activities mention one of these, the verified fee
// gets appended; if not, no price is shown at all, rather than letting
// the model guess. This list is expected to grow as new mispriced
// attractions get caught.
export const activityPrices = [
  {
    id: "sigiriya-rock-fortress",
    name: "Sigiriya Rock Fortress",
    entryFeeUsd: { adult: 35, child: 20 },
    lastVerified: "2026-09",
  },
  {
    id: "pinnawala-elephant-orphanage",
    name: "Pinnawala Elephant Orphanage",
    entryFeeUsd: { adult: 16, child: 8 },
    lastVerified: "2026-09",
  },
  {
    id: "temple-of-the-sacred-tooth-relic",
    name: "Temple of the Sacred Tooth Relic",
    entryFeeUsd: { adult: 10, child: 10 },
    lastVerified: "2026-09",
  },
  {
    id: "horton-plains-national-park",
    name: "Horton Plains National Park",
    entryFeeUsd: { adult: 35, child: 20 },
    lastVerified: "2026-09",
  },
  {
    id: "udawalawe-national-park-safari",
    name: "Udawalawe National Park",
    entryFeeUsd: { adult: 20, child: 10 },
    // per person, half-day, private jeep + guide, entrance fee separate
    jeepSafariUsd: { min: 50, max: 90 },
    lastVerified: "2026-09",
  },
  {
    id: "yala-national-park-safari",
    name: "Yala National Park",
    entryFeeUsd: { adult: 25, child: 15 },
    jeepSafariUsd: { min: 65, max: 120 },
    lastVerified: "2026-09",
  },
];
