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

// The east/north cluster (Trincomalee, Arugam Bay, Jaffna) is no longer
// paused — see `hotelsByDestination` and `seasonalNotes` below. Sri Lanka
// has two opposing monsoon seasons (west/south/hill country best Dec-Apr,
// east/north best May-Sept), and multiple sources agree combining both
// regions in one trip realistically needs 3+ weeks — the model isn't
// stopped from doing it anyway, it's just flagged via `seasonalNotes`'
// soft disclosure rather than a hard block.

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

// Real, verified hotel names per destination per budget tier — sourced from
// multiple independent travel sites (Tripadvisor, Booking.com, Hotel Guru,
// travel-blog roundups), not invented. Deliberately does NOT include a
// specific nightly price per hotel or an availability claim: a hotel's
// existence/tier/general style is a stable fact, but its exact rate and
// whether it has a room on any given date change constantly and can't be
// verified from a static file. generate-itinerary's route handler uses
// this to name a real property in the "stay" suggestion instead of the
// model's generic style description, while still pricing off
// accommodationPriceRanges above (the tier range, not a per-hotel figure)
// and without claiming the named hotel is actually available.
//
// Keys are matched fuzzily against the model's free-text destinationName —
// independent of the `destinations` array above, which is tied to the
// superseded itineraryPlanner.js and shouldn't be conflated with this.
// Covers the 7 original destinations, the other common west/south/
// hill-country circuit stops (Colombo, Negombo, Polonnaruwa, Anuradhapura,
// Bentota, Yala/Tissamaharama), and now the east/north cluster (Trincomalee,
// Arugam Bay, Jaffna) too — no longer paused. See `seasonalNotes` below for
// why timing matters more for those three than for the rest of the island.
export const hotelsByDestination = {
  lastVerified: "2026-09",
  colombo: {
    budget: { name: "Fern Colombo", area: "near Independence Square" },
    "mid-range": { name: "Cinnamon Red Colombo", area: "city centre" },
    luxury: { name: "Galle Face Hotel", area: "oceanfront, Galle Face Green" },
  },
  negombo: {
    budget: { name: "8 Plus Motels", area: "near Negombo Beach" },
    "mid-range": { name: "Dickman Resort", area: "near the beach promenade" },
    luxury: { name: "Jetwing Blue", area: "Negombo Beach" },
  },
  sigiriya: {
    budget: { name: "Sigiriya Kingdom Resort", area: "near Sigiriya Rock" },
    "mid-range": { name: "Palmyra Nature Resort", area: "with Lion Rock views" },
    luxury: { name: "Heritance Kandalama", area: "Kandalama Reservoir" },
  },
  dambulla: {
    budget: { name: "Lake Island Homestay", area: "near the cave temples" },
    "mid-range": { name: "Rangiri Dambulla Resort", area: "central Dambulla" },
    luxury: { name: "Lake Lodge Boutique Hotel Kandalama", area: "Kandalama Reservoir" },
  },
  kandy: {
    budget: { name: "Ganthera Residence", area: "central Kandy" },
    "mid-range": { name: "Cinnamon Citadel Kandy", area: "riverside, near the city" },
    luxury: { name: "W15 Hanthana Estate", area: "Hanthana hills" },
  },
  "nuwara-eliya": {
    budget: { name: "Wathsala Inn", area: "central Nuwara Eliya" },
    "mid-range": { name: "Araliya Green Hills Hotel", area: "near Lake Gregory" },
    luxury: { name: "Heritance Tea Factory", area: "a converted tea factory in the hills" },
  },
  ella: {
    budget: { name: "The Rock Face", area: "central Ella" },
    "mid-range": { name: "Dream Cliff Mountain Resort", area: "mountain-view cabins" },
    luxury: { name: "98 Acres Resort & Spa", area: "over the tea plantations" },
  },
  udawalawe: {
    budget: { name: "Green Paradise Cottage", area: "near the park entrance" },
    "mid-range": { name: "Grand Udawalawe Safari Resort", area: "near Udawalawe National Park" },
    luxury: { name: "Kalu's Hideaway", area: "10 minutes from the park entrance" },
  },
  mirissa: {
    budget: { name: "Sky Garden Mini Hotel", area: "central Mirissa" },
    "mid-range": { name: "Serenity Resort", area: "near Mirissa Beach" },
    luxury: { name: "Lantern Boutique Hotel", area: "beachfront" },
  },
  galle: {
    budget: { name: "Mango House", area: "near Galle Fort" },
    "mid-range": { name: "Galle Fort Hotel", area: "inside the historic Fort" },
    luxury: { name: "Jetwing Lighthouse", area: "oceanfront, near the Fort" },
  },
  polonnaruwa: {
    budget: { name: "Rivonway Hotel Polonnaruwa", area: "near the ancient city" },
    "mid-range": { name: "Ela Addara Arunalu", area: "central Polonnaruwa" },
    luxury: { name: "EKHO Lake House", area: "lake-facing, near the ruins" },
  },
  anuradhapura: {
    budget: { name: "Wenasa Hotel", area: "central Anuradhapura" },
    "mid-range": { name: "Rajarata Hotel", area: "near the sacred city" },
    luxury: { name: "Uga Ulagalla", area: "private villas outside the city" },
  },
  bentota: {
    budget: { name: "Tree of Life Resort", area: "near Bentota Beach" },
    "mid-range": { name: "NH Bentota Ceysands Resort & Spa", area: "beachfront" },
    luxury: { name: "Jetwing Saman Villas", area: "oceanfront, Bentota" },
  },
  yala: {
    budget: { name: "Yaye Guest House", area: "Tissamaharama, near Yala" },
    "mid-range": { name: "Art Yala Boutique Resort", area: "Tissamaharama" },
    luxury: { name: "Chena Huts By Uga Escapes", area: "5 minutes from Yala National Park" },
  },
  trincomalee: {
    budget: { name: "Esha Beach Resort", area: "Trincomalee" },
    "mid-range": { name: "Uppuveli Beach By DSK", area: "Uppuveli Beach" },
    luxury: { name: "Amaranthe Bay Resort & Spa", area: "north of Trincomalee town" },
  },
  arugambay: {
    budget: { name: "The Beach Hut Arugambay Guesthouse", area: "on the beach" },
    "mid-range": { name: "Baywatch Beach Hotel", area: "beachfront, central Arugam Bay" },
    luxury: { name: "Jetwing Surf Hotel", area: "beachfront, Arugam Bay" },
  },
  jaffna: {
    budget: { name: "Yaarl Hostels", area: "near Jaffna Public Library" },
    "mid-range": { name: "Thambu Illam", area: "Jaffna" },
    luxury: { name: "Jetwing Mahesa Bhawan", area: "Jaffna" },
  },
};

// Timing genuinely matters for a handful of specific activities/regions —
// this is the seasonality logic referenced as a soft disclosure note above,
// finally built. It's a NOTE, never a hard block: an itinerary can still
// include Arugam Bay in December, it just gets a heads-up attached that
// surf conditions are unreliable that time of year. generate-itinerary's
// route handler checks each day's date/location against this list and
// attaches any matching notes to the response — the model never decides
// this itself, same "server enforces, model doesn't" principle as pricing.
export const seasonalNotes = [
  {
    id: "whale-watching-mirissa",
    matchNames: ["mirissa", "whale watching", "whale-watching"],
    bestMonths: [11, 12, 1, 2, 3, 4], // Nov-Apr, peak Dec-Mar
    note: "Whale watching off Mirissa is best November–April (peak December–March) — outside that window the seas are rougher and sightings are far less reliable.",
  },
  {
    id: "arugam-bay-surf",
    matchNames: ["arugam bay", "arugambay"],
    bestMonths: [4, 5, 6, 7, 8, 9, 10], // Apr-Oct, peak Jun-Sep
    note: "Arugam Bay's surf season runs April–October (peak June–September) — outside that window the swell is inconsistent and onshore winds make conditions less predictable.",
  },
  {
    id: "minneriya-gathering",
    matchNames: ["minneriya", "kaudulla", "elephant gathering"],
    bestMonths: [7, 8, 9, 10], // Jul-Oct, peak Aug-Sep
    note: "The Minneriya/Kaudulla elephant gathering happens during the dry season, July–October (peak August–September) — outside that window elephant numbers there are much lower.",
  },
  {
    id: "east-north-monsoon",
    matchNames: ["trincomalee", "jaffna", "arugam bay", "arugambay", "nilaveli", "uppuveli", "pasikuda"],
    bestMonths: [5, 6, 7, 8, 9], // May-Sep
    note: "Sri Lanka's east and north coast follow the opposite monsoon pattern from the west/south/hill country — best May–September. Still visitable outside that window, just rainier.",
  },
];
