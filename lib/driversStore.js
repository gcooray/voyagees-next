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

async function fetchActiveDrivers() {
  try {
    const snap = await getDocs(
      query(collection(db, "drivers"), where("status", "==", "active"))
    );
    if (snap.empty) return staticDrivers;
    return snap.docs.map((d) => ({ ...d.data(), id: d.id }));
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
