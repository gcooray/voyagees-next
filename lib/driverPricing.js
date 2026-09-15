// lib/driverPricing.js
//
// Mirrors components/DriverCard.jsx's trip-day/price formula exactly — that's
// what actually renders on /search, which is where the itinerary planner's
// "Just book the driver" CTA sends people. The quoted price has to match a
// real driver card there, or it looks broken the moment someone clicks
// through. Note this is a DIFFERENT (and arguably less "correct") formula
// than app/request/RequestForm.jsx uses to charge the final booking:
//   - DriverCard.jsx:  Math.ceil(diff/day) + 1
//   - RequestForm.jsx: Math.ceil(diff/day)        (one day fewer)
// and a different commission source:
//   - DriverCard.jsx:  driver.commissionPercent || 10 (field doesn't exist
//                       on any driver, so this is always 10 in practice)
//   - RequestForm.jsx/DriverModal.jsx: live Firestore platformSettings/commission
// Both are pre-existing inconsistencies in the codebase, not introduced
// here — this file intentionally matches DriverCard.jsx's numbers (the ones
// visible on /search) rather than RequestForm.jsx's (the eventual charge),
// since "does this price show up on the page I just linked to" matters more
// here than matching the final invoice.

import { drivers } from "@/data/drivers";

const DEFAULT_COMMISSION_PERCENT = 10;

/**
 * Find the lowest total trip price across drivers available for the given
 * date range, using the exact same formula and (lack of) passenger
 * filtering DriverCard.jsx/SearchDrivers.jsx use by default — so this
 * always matches an actual card a visitor would see on /search for the
 * same dates. driver.pricePerDay (data/drivers.js) is denominated in LKR,
 * so this returns an LKR amount; convert for display, don't treat it as USD.
 * @returns {number|null} the lowest total price in LKR, or null if no
 *   driver is available for those dates.
 */
export function getLowestDriverPrice({ pickupDate, dropoffDate }) {
  const start = new Date(pickupDate);
  const end = new Date(dropoffDate);
  const tripDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const availableDrivers = drivers.filter((driver) => {
    const availableFrom = new Date(driver.availableFrom);
    const availableTo = new Date(driver.availableTo);
    return availableFrom <= start && availableTo >= end;
  });

  if (availableDrivers.length === 0) return null;

  const totals = availableDrivers.map((driver) => {
    const commissionPercent = driver.commissionPercent || DEFAULT_COMMISSION_PERCENT;
    const basePrice = (driver.pricePerDay || 0) * tripDays;
    return basePrice + (basePrice * commissionPercent) / 100;
  });

  return Math.round(Math.min(...totals));
}
