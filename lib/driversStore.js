"use client";

// Public driver profiles, read from Firestore (`drivers` collection, only
// status "active"). Everything that lists or prices drivers — /search, the
// booking page, the trip planner — goes through loadDrivers()/useDrivers()
// so they all see the same set.
//
// Falls back to the old static data/drivers.js when Firestore has no
// drivers yet or can't be read (e.g. before the security rules are added
// and the drivers imported from /admin/drivers), so the site never shows
// an empty search because of a setup step. Once the import is done,
// Firestore is the source of truth and data/drivers.js can be deleted.
//
// Expected security rules (Firebase console → Firestore → Rules):
//   drivers/{id}        read: status == "active" or admin; write: admin
//   driverContacts/{id} read/write: admin only
// where admin = signed in as ADMIN_EMAIL with a verified email.

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { drivers as staticDrivers } from "@/data/drivers";

export const ADMIN_EMAIL = "contact@voyagees.com";

let driversPromise = null;

const asList = (v) =>
  Array.isArray(v) ? v.filter(Boolean) : typeof v === "string" && v.trim() ? v.split(",").map((x) => x.trim()) : [];

// Firestore documents aren't type-checked, and the collection held a
// malformed leftover record (languages as a string, price 0, no dates)
// that crashed /search. Coerce list fields and drop anything that can't
// be shown or priced, rather than trusting every document.
function normalizeDriver(raw, id) {
  const d = {
    ...raw,
    id,
    languages: asList(raw.languages),
    carImages: asList(raw.carImages),
    pricePerDay: Number(raw.pricePerDay) || 0,
    seats: Number(raw.seats) || 0,
  };
  const valid =
    typeof d.name === "string" && d.name.trim() &&
    d.pricePerDay > 0 &&
    d.seats > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(d.availableFrom || "") &&
    /^\d{4}-\d{2}-\d{2}$/.test(d.availableTo || "");
  return valid ? d : null;
}

async function fetchActiveDrivers() {
  try {
    const snap = await getDocs(
      query(collection(db, "drivers"), where("status", "==", "active"))
    );
    const drivers = snap.docs.map((d) => normalizeDriver(d.data(), d.id)).filter(Boolean);
    if (drivers.length < snap.size) {
      console.warn(`Skipped ${snap.size - drivers.length} incomplete driver record(s)`);
    }
    return drivers.length ? drivers : staticDrivers;
  } catch (err) {
    console.warn("Falling back to static drivers:", err.code || err.message);
    return staticDrivers;
  }
}

/** All active drivers. Fetched once per page load and shared. */
export function loadDrivers() {
  if (!driversPromise) driversPromise = fetchActiveDrivers();
  return driversPromise;
}

/** React hook: `{ drivers, loading }` — drivers is [] until loaded. */
export function useDrivers() {
  const [drivers, setDrivers] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadDrivers().then((list) => {
      if (!cancelled) setDrivers(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { drivers: drivers || [], loading: drivers === null };
}
