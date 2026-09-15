import { destinations } from "./destinationContent";

// Deterministic day-trip / main-path sequencing for the AI itinerary
// planner. This file decides WHICH destinations an itinerary includes and
// in WHAT ORDER — the AI layer is only ever allowed to write prose about a
// route this file already picked, never choose destinations, order, or
// price itself.
//
// Why: an earlier, unconstrained AI generation confidently recommended
// whale watching with no regard for season, and included destinations
// (Sinharaja, Yala) that weren't in the bookable route network at all.
// Geography and season can't be "mostly right", so sequencing stays
// deterministic instead of delegated to the model.

// One-way drive times (hours) between consecutive MAIN_PATH stops.
// Sourced from multiple independent travel-guide/driver-guide estimates,
// favoring real tourist-van experience over raw distance-calculator
// output — Sri Lanka's hill-country roads are winding enough that a short
// straight-line distance can still mean a long drive. NOT yet backed by a
// live routing API (see getLegTime()'s TODO below).
export const LEG_TIMES = [
  { from: "sigiriya", to: "kandy", hours: 2 },
  { from: "kandy", to: "nuwara-eliya", hours: 3 },
  { from: "nuwara-eliya", to: "ella", hours: 1.75 },
  { from: "ella", to: "udawalawe", hours: 2.5 },
  { from: "udawalawe", to: "mirissa", hours: 2.25 },
  { from: "mirissa", to: "galle", hours: 0.75 },
];

/**
 * One-way drive time in hours between two MAIN_PATH stops, or null if
 * they aren't adjacent in LEG_TIMES.
 *
 * TODO(#real-routing-api): this is a static, manually-verified table.
 * Replace with a live routing API call (Google Maps Distance Matrix API
 * or similar) so drive times stay accurate as roads/traffic change,
 * instead of needing periodic manual re-verification.
 */
export function getLegTime(fromId, toId) {
  const leg = LEG_TIMES.find(
    (l) =>
      (l.from === fromId && l.to === toId) ||
      (l.from === toId && l.to === fromId)
  );
  return leg ? leg.hours : null;
}

// The default route, in geographic order. minNights/idealNights bound how
// many nights a stop can be trimmed to (never below minNights) or grown
// toward (never above idealNights) when nights are distributed.
export const MAIN_PATH = [
  { id: "sigiriya", minNights: 1, idealNights: 1 },
  { id: "kandy", minNights: 1, idealNights: 2 },
  { id: "nuwara-eliya", minNights: 1, idealNights: 2 },
  { id: "ella", minNights: 1, idealNights: 2 },
  { id: "udawalawe", minNights: 1, idealNights: 1 },
  { id: "mirissa", minNights: 1, idealNights: 2 },
  { id: "galle", minNights: 1, idealNights: 1 },
];

// Optional side trips from a MAIN_PATH stop that DON'T change the
// overnight base. roundTripHours is the full time budget — drive there,
// time at the site, drive back — not a one-way figure like LEG_TIMES.
//
// Dambulla replaces a stale entry that used to list Sigiriya itself as a
// day-trip branch off Kandy, a leftover from before Sigiriya became its
// own MAIN_PATH stop. Keeping that entry would have let Sigiriya appear
// twice in the same itinerary once interestScore() actually worked (see
// interestScore() below) — once as its own stop, once again as a "day
// trip from Kandy". Dambulla is genuinely a short (~20-40 min each way)
// pairing with Sigiriya, not its own overnight stop.
export const DAY_TRIP_BRANCHES = {
  sigiriya: [{ id: "dambulla", roundTripHours: 1 }],
};

/**
 * How well a MAIN_PATH stop matches a traveler's stated interests, as a
 * plain count of overlapping tags. Used both to decide which stops survive
 * trimming on a short trip, and which stops get extra nights first when a
 * longer trip has nights to spare.
 *
 * This used to be a stub that always returned 0, which meant every trip
 * produced the identical fixed route regardless of stated interests, and
 * every trim/grow decision silently fell back to array order.
 */
export function interestScore(stop, interests) {
  if (!interests || interests.length === 0) return 0;
  const destination = destinations.find((d) => d.id === stop.id);
  return destination?.interestTags.filter((tag) => interests.includes(tag)).length ?? 0;
}

/**
 * Removes stops until the remaining minNights fit within availableNights.
 * Drops the lowest interestScore() stop each pass — regardless of its
 * position in the path — so a short trip with no cultural interest can
 * still skip Sigiriya even though it now sits near the front of MAIN_PATH.
 * Ties fall back to dropping whichever stop sits later in MAIN_PATH order.
 *
 * Trade-off worth knowing: dropping a stop from the middle (not just the
 * end) can leave two remaining stops that were never meant to be adjacent,
 * with no directly-verified LEG_TIMES entry between them. computeDrivingPlan()
 * below covers that gap with a same-direction approximation rather than
 * silently returning no drive time.
 */
export function trimPathToFit(path, availableNights, interests) {
  const trimmed = [...path];
  let minTotal = trimmed.reduce((sum, stop) => sum + stop.minNights, 0);

  while (trimmed.length > 1 && minTotal > availableNights) {
    let dropIndex = 0;
    let dropScore = interestScore(trimmed[0], interests);

    for (let i = 1; i < trimmed.length; i++) {
      const score = interestScore(trimmed[i], interests);
      if (score <= dropScore) {
        dropScore = score;
        dropIndex = i;
      }
    }

    minTotal -= trimmed[dropIndex].minNights;
    trimmed.splice(dropIndex, 1);
  }

  return trimmed;
}

/**
 * Starts every stop at minNights, then hands out any leftover nights one
 * at a time, round-robin, to the highest interestScore() stops first (up
 * to each stop's idealNights), until either every stop is at its ideal or
 * the budget runs out. Array.prototype.sort is stable, so stops that tie
 * on interest score keep growing in their original MAIN_PATH order rather
 * than an arbitrary one.
 */
function growNightsTowardIdeal(path, availableNights, interests) {
  const nightsById = {};
  let used = 0;

  for (const stop of path) {
    nightsById[stop.id] = stop.minNights;
    used += stop.minNights;
  }

  let remaining = availableNights - used;
  if (remaining <= 0) return nightsById;

  const ranked = [...path].sort(
    (a, b) => interestScore(b, interests) - interestScore(a, interests)
  );

  let progressed = true;
  while (remaining > 0 && progressed) {
    progressed = false;
    for (const stop of ranked) {
      if (remaining <= 0) break;
      if (nightsById[stop.id] < stop.idealNights) {
        nightsById[stop.id] += 1;
        remaining -= 1;
        progressed = true;
      }
    }
  }

  return nightsById;
}

// Sums the bridged LEG_TIMES between two MAIN_PATH stops that are no
// longer adjacent after trimming. This over-estimates the real direct
// drive (skipping a stop rarely takes longer than routing via it), which
// is the safe direction to be wrong in for trip-planning purposes.
function sumBridgedLegs(fromId, toId) {
  const fromIndex = MAIN_PATH.findIndex((s) => s.id === fromId);
  const toIndex = MAIN_PATH.findIndex((s) => s.id === toId);
  if (fromIndex === -1 || toIndex === -1) return null;

  const [start, end] =
    fromIndex < toIndex ? [fromIndex, toIndex] : [toIndex, fromIndex];

  let sum = 0;
  for (let i = start; i < end; i++) {
    const legHours = getLegTime(MAIN_PATH[i].id, MAIN_PATH[i + 1].id);
    if (legHours == null) return null;
    sum += legHours;
  }
  return sum;
}

function computeDrivingPlan(path) {
  const legs = [];
  let totalHours = 0;
  let hasApproximatedLeg = false;

  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i].id;
    const toId = path[i + 1].id;

    const verifiedHours = getLegTime(fromId, toId);
    const approximated = verifiedHours == null;
    const hours = verifiedHours ?? sumBridgedLegs(fromId, toId) ?? 0;

    if (approximated) hasApproximatedLeg = true;
    legs.push({ from: fromId, to: toId, hours, approximated });
    totalHours += hours;
  }

  return { legs, totalHours, hasApproximatedLeg };
}

// A branch is offered automatically once it fits within a single day
// alongside the stop's own sightseeing (Dambulla's ~1h round trip easily
// sits next to a Sigiriya rock climb); longer branches only get offered
// when the stop has a spare night to dedicate to it.
function applyDayTripBranches(path, nightsById) {
  const branches = [];

  for (const stop of path) {
    const options = DAY_TRIP_BRANCHES[stop.id];
    if (!options) continue;

    for (const branch of options) {
      const fitsWithinDay = branch.roundTripHours <= 3;
      const hasSpareNight = nightsById[stop.id] >= 2;
      if (fitsWithinDay || hasSpareNight) {
        branches.push({ from: stop.id, ...branch });
      }
    }
  }

  return branches;
}

/**
 * Builds a deterministic day-by-day route: which MAIN_PATH stops survive
 * for this trip length, how many nights each gets, which day-trip
 * branches apply, and the resulting driving plan. Returns plain data only
 * — no prose. The AI layer writes copy about this output; it never
 * changes what's in it.
 *
 * @param {number} tripDays - total calendar days of the trip.
 * @param {string[]} [interests] - values from app/plan-trip/page.jsx's
 *   INTEREST_OPTIONS (culture, nature, beaches, food, adventure, wellness).
 * @param {string} [pace] - accepted for forward-compatibility with the
 *   plan-trip form; not yet used by sequencing (no pace-aware logic like
 *   capping driving hours/day has been built).
 */
export function planItinerary({ tripDays, interests = [], pace = "moderate" } = {}) {
  const availableNights = Math.max(0, Math.round(tripDays) - 1);

  const fittedPath = trimPathToFit(MAIN_PATH, availableNights, interests);
  const nightsById = growNightsTowardIdeal(fittedPath, availableNights, interests);
  const driving = computeDrivingPlan(fittedPath);
  const dayTripBranches = applyDayTripBranches(fittedPath, nightsById);

  const droppedStopIds = MAIN_PATH.filter(
    (stop) => !fittedPath.some((fitted) => fitted.id === stop.id)
  ).map((stop) => stop.id);

  let dayCursor = 1;
  const stops = fittedPath.map((stop) => {
    const nights = nightsById[stop.id];
    const destination = destinations.find((d) => d.id === stop.id);
    const dayStart = dayCursor;
    const dayEnd = dayCursor + nights - 1;
    dayCursor = dayEnd + 1;

    return {
      id: stop.id,
      name: destination?.name ?? stop.id,
      nights,
      dayStart,
      dayEnd,
      interestScore: interestScore(stop, interests),
      dayTrips: dayTripBranches
        .filter((branch) => branch.from === stop.id)
        .map((branch) => ({
          id: branch.id,
          name: destinations.find((d) => d.id === branch.id)?.name ?? branch.id,
          roundTripHours: branch.roundTripHours,
        })),
    };
  });

  return {
    stops,
    pace,
    totalNights: availableNights,
    totalDrivingHours: driving.totalHours,
    drivingLegs: driving.legs,
    hasApproximatedDrivingLeg: driving.hasApproximatedLeg,
    droppedStopIds,
  };
}
