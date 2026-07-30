export function generateRoute(destinations, preferences) {
  const { interests, days } = preferences;

  // 1. score destinations
  const scored = destinations.map((d) => {
    const matchCount =
      d.interests?.filter((i) => interests.includes(i)).length || 0;

    return {
      ...d,
      score: matchCount,
    };
  });

  // 2. sort best matches first
  const sorted = scored.sort((a, b) => b.score - a.score);

  // 3. build route within trip length
  let remainingDays = days;
  const route = [];

  for (const place of sorted) {
    if (remainingDays <= 0) break;

    const stay = place.daysRecommended || 1;

    if (stay <= remainingDays) {
      route.push(place);
      remainingDays -= stay;
    }
  }

  return route;
}