// lib/rideshare.js
//
// Data layer for shared trips. Firestore structure:
//
//   trips/{tripId}
//     from: string            e.g. "Kandy"
//     to: string               e.g. "Ella"
//     date: string             ISO date, "2026-09-12"
//     time: string              "14:00"
//     organizerId: string       uid of whoever posted the trip (email-link sign-in)
//     organizerName: string
//     organizerInitials: string
//     organizerEmail: string    where new-request notifications go (publicly readable —
//                                needed so any visitor's browser can email the organizer
//                                about a new request before they have any relationship)
//     driverName: string
//     driverVerified: boolean
//     vehicle: string           e.g. "Toyota Aqua"
//     notes: string             optional, e.g. "Brief stop in Nuwara Eliya"
//     totalPrice: number        total trip cost in whatever currency you use
//     totalSeats: number        includes the organizer's own seat
//     confirmedSeats: number    starts at 1 (the organizer); incremented transactionally
//                                on each accepted request — this is what "seats left" is
//                                computed from, so it has to live somewhere every visitor
//                                can read without also being able to read the requests
//                                subcollection.
//     status: "open" | "full" | "cancelled"
//     createdAt: Timestamp
//
//   trips/{tripId}/contact/organizer
//     phone: string             organizer's phone/WhatsApp. Split out of the trips doc
//                                because trips are publicly readable (browsing is open to
//                                everyone) but the phone number should only be visible to
//                                the organizer and to travelers with an accepted request —
//                                Firestore rules can't restrict individual fields within a
//                                single document, only whole documents, so it has to live
//                                in its own doc with its own rule.
//
//   trips/{tripId}/requests/{requestId}
//     requestId is the traveler's uid, not an auto-generated id — this lets security
//     rules check "does this request belong to the reader" directly (requestId ==
//     request.auth.uid) instead of needing broad list access, and it means a traveler
//     can only ever have one request per trip.
//     travelerId: string
//     travelerName: string
//     travelerInitials: string
//     travelerEmail: string    where the accept/decline notification goes
//     travelerPhone: string    visible to the organizer once accepted
//     country: string
//     verified: boolean
//     status: "pending" | "accepted" | "declined"
//     createdAt: Timestamp
//
// IMPORTANT — this file alone does not make any of this safe. Firestore security rules
// must enforce:
//   - trips/{tripId}: publicly readable; only the organizer can update it.
//   - trips/{tripId}/contact/organizer: readable only by the organizer, or by a traveler
//     whose own request (trips/{tripId}/requests/{their uid}) has status "accepted".
//   - trips/{tripId}/requests/{requestId}: readable only by the trip's organizer, or by
//     the traveler whose uid equals requestId. Writable to "accepted"/"declined" only by
//     the organizer, and only changing the status field.
// See the rules text this was built against — ask for it again if it's drifted from what's
// deployed. Accept/decline and new-request email notifications are sent client-side (see
// app/rides/[tripId]/page.jsx and app/rides/[tripId]/manage/page.jsx) via EmailJS — there's
// no server function, so a notification only goes out if the browser taking the action is
// still online when it fires.

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

const tripsRef = collection(db, "trips");

// Shared with the browse-page filters so from/to values always match
// exactly — Firestore's `where(..., "==", ...)` is an exact string match.
export const TOWNS = ["Colombo", "Kandy", "Ella", "Sigiriya", "Galle", "Mirissa"];

/**
 * Create a new shared trip. Splits the organizer's phone into the protected
 * contact sub-document; everything else goes on the publicly-readable trip doc.
 * @param {object} trip - see schema above (organizerId/organizerName/organizerInitials/organizerPhone required)
 * @returns {Promise<string>} the new trip's id
 */
export async function createTrip(trip) {
  const { organizerPhone, ...publicFields } = trip;
  const tripDocRef = doc(tripsRef);

  await setDoc(tripDocRef, {
    ...publicFields,
    status: "open",
    confirmedSeats: 1,
    createdAt: serverTimestamp(),
  });
  await setDoc(doc(tripDocRef, "contact", "organizer"), { phone: organizerPhone });

  return tripDocRef.id;
}

/**
 * List open trips, optionally filtered by route and/or date.
 * @param {{ from?: string, to?: string, date?: string }} filters
 * @returns {Promise<Array>} trips with their id attached
 */
export async function listOpenTrips(filters = {}) {
  const clauses = [where("status", "==", "open")];
  if (filters.from) clauses.push(where("from", "==", filters.from));
  if (filters.to) clauses.push(where("to", "==", filters.to));
  if (filters.date) clauses.push(where("date", "==", filters.date));

  const q = query(tripsRef, ...clauses, orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Subscribe to open trips in real time (for the browse page).
 * @param {{ from?: string, to?: string, date?: string }} filters
 * @param {(trips: Array) => void} callback
 * @param {(error: Error) => void} [onError]
 * @returns {() => void} unsubscribe function
 */
export function subscribeOpenTrips(filters, callback, onError) {
  const clauses = [where("status", "==", "open")];
  if (filters.from) clauses.push(where("from", "==", filters.from));
  if (filters.to) clauses.push(where("to", "==", filters.to));
  if (filters.date) clauses.push(where("date", "==", filters.date));

  const q = query(tripsRef, ...clauses, orderBy("date", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (error) => {
      console.error("subscribeOpenTrips failed:", error);
      onError?.(error);
    }
  );
}

/**
 * Get a single trip by id.
 */
export async function getTrip(tripId) {
  const snap = await getDoc(doc(db, "trips", tripId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Get the organizer's contact info. Only resolves if the caller is
 * authorized by the security rules (the organizer, or an accepted traveler);
 * otherwise the promise rejects with permission-denied.
 * @returns {Promise<{ phone: string } | null>}
 */
export async function getOrganizerContact(tripId) {
  const snap = await getDoc(doc(db, "trips", tripId, "contact", "organizer"));
  return snap.exists() ? snap.data() : null;
}

/**
 * Subscribe to every request on a trip (for the organizer's manage screen —
 * the security rules only let the organizer list the full subcollection).
 * @param {(error: Error) => void} [onError]
 * @returns {() => void} unsubscribe function
 */
export function subscribeRequests(tripId, callback, onError) {
  const q = query(
    collection(db, "trips", tripId, "requests"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(
    q,
    (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (error) => {
      console.error("subscribeRequests failed:", error);
      onError?.(error);
    }
  );
}

/**
 * Subscribe to a single traveler's own request on a trip (for the trip
 * detail page — a non-organizer can only read their own request doc, not
 * list the subcollection).
 * @returns {() => void} unsubscribe function
 */
export function subscribeMyRequest(tripId, uid, callback, onError) {
  return onSnapshot(
    doc(db, "trips", tripId, "requests", uid),
    (snap) => callback(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    (error) => {
      console.error("subscribeMyRequest failed:", error);
      onError?.(error);
    }
  );
}

/**
 * Traveler requests to join a trip. Creates a pending request doc keyed by
 * the traveler's own uid — one request per traveler per trip.
 */
export async function requestToJoin(tripId, traveler) {
  const requestDocRef = doc(db, "trips", tripId, "requests", traveler.id);
  await setDoc(requestDocRef, {
    travelerId: traveler.id,
    travelerName: traveler.name,
    travelerInitials: traveler.initials,
    travelerEmail: traveler.email,
    travelerPhone: traveler.phone,
    country: traveler.country || "",
    verified: !!traveler.verified,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return requestDocRef.id;
}

/**
 * Organizer accepts or declines a request. confirmedSeats lives on the trip
 * doc and is only ever read/written via transaction.get/update here, so two
 * simultaneous accepts can't both pass the "is there room" check.
 * @param {string} tripId
 * @param {string} requestId
 * @param {"accepted" | "declined"} decision
 */
export async function respondToRequest(tripId, requestId, decision) {
  const tripDocRef = doc(db, "trips", tripId);
  const requestDocRef = doc(db, "trips", tripId, "requests", requestId);

  await runTransaction(db, async (transaction) => {
    const tripSnap = await transaction.get(tripDocRef);
    if (!tripSnap.exists()) throw new Error("Trip not found");
    const trip = tripSnap.data();

    if (decision === "accepted") {
      if (trip.confirmedSeats >= trip.totalSeats) {
        throw new Error("Trip is already full");
      }
      const confirmedSeats = trip.confirmedSeats + 1;
      transaction.update(tripDocRef, {
        confirmedSeats,
        status: confirmedSeats >= trip.totalSeats ? "full" : trip.status,
      });
    }

    transaction.update(requestDocRef, { status: decision });
  });
}

/**
 * Derive the current price per seat from a trip's confirmedSeats.
 */
export function computeSeatSummary(trip) {
  const pricePerSeat = Math.round(trip.totalPrice / trip.confirmedSeats);
  return {
    confirmedSeats: trip.confirmedSeats,
    totalSeats: trip.totalSeats,
    pricePerSeat,
    isFull: trip.confirmedSeats >= trip.totalSeats,
  };
}
