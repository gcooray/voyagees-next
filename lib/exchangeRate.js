// Exchange rates for showing LKR prices in € or $ (driver cards, the trip
// planner result). One request per currency pair per page visit, shared by
// every component that asks: the search page used to send one request per
// driver card, and a burst of 15 occasionally failed and left prices blank.
// A failed request is retried once and isn't cached, so the next caller tries
// again.

const cache = new Map();

async function request(from, to) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`);
      if (!response.ok) throw new Error(`Exchange rate request failed (${response.status})`);
      const data = await response.json();
      if (typeof data.rate !== "number") throw new Error("Exchange rate missing in response");
      return data.rate;
    } catch (error) {
      if (attempt === 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }
}

/** Rate to convert an amount in `from` into `to`, e.g. getExchangeRate("LKR", "EUR"). */
export function getExchangeRate(from, to) {
  if (from === to) return Promise.resolve(1);
  const key = `${from}/${to}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      request(from, to).catch((error) => {
        cache.delete(key);
        throw error;
      })
    );
  }
  return cache.get(key);
}
