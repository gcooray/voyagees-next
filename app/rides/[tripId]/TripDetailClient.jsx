"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTrip,
  getOrganizerContact,
  subscribeRequests,
  subscribeMyRequest,
  requestToJoin,
  computeSeatSummary,
} from "@/lib/rideshare";
import { useAuthUser } from "@/lib/useAuthUser";
import { notifyOrganizerNewRequest } from "@/lib/notifications";
import { trackEvent } from "@/lib/analytics";
import EmailSignIn from "@/components/rides/EmailSignIn";
import "./page.css";

export default function TripDetailClient({ tripId }) {
  const { user, authLoading } = useAuthUser();
  const [trip, setTrip] = useState(null);
  const [requests, setRequests] = useState([]); // only populated for the organizer
  const [loading, setLoading] = useState(true);
  const [myRequestStatus, setMyRequestStatus] = useState(null); // null | "pending" | "accepted" | "declined"
  const [organizerContact, setOrganizerContact] = useState(null);
  const [travelerName, setTravelerName] = useState("");
  const [travelerPhone, setTravelerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tripId) return;
    let unsubscribe = () => {};

    getTrip(tripId).then((t) => {
      setTrip(t);
      setLoading(false);
      if (!t) return;

      if (user && t.organizerId === user.uid) {
        unsubscribe = subscribeRequests(tripId, (result) => setRequests(result));
      } else if (user) {
        unsubscribe = subscribeMyRequest(tripId, user.uid, (mine) => {
          setMyRequestStatus(mine?.status ?? null);
        });
      }
    });

    return () => unsubscribe();
  }, [tripId, user?.uid]);

  useEffect(() => {
    if (myRequestStatus !== "accepted" || !tripId) return;
    getOrganizerContact(tripId)
      .then(setOrganizerContact)
      .catch((err) => console.error("getOrganizerContact failed:", err));
  }, [myRequestStatus, tripId]);

  if (loading || authLoading) return <main className="rides-detail-page"><p className="rides-empty">Loading…</p></main>;
  if (!trip) return <main className="rides-detail-page"><p className="rides-empty">Trip not found.</p></main>;

  const { totalSeats, confirmedSeats, pricePerSeat, isFull } = computeSeatSummary(trip);
  const isOrganizer = user && trip.organizerId === user.uid;

  async function handleRequest() {
    setError("");
    if (!travelerName.trim() || !travelerPhone.trim()) {
      setError("Enter your name and phone number so the organizer can reach you.");
      return;
    }
    setSubmitting(true);
    try {
      const name = travelerName.trim();
      const requestId = await requestToJoin(tripId, {
        id: user.uid,
        name,
        email: user.email,
        phone: travelerPhone.trim(),
        initials: name.slice(0, 2).toUpperCase(),
        country: "",
        verified: false,
      });
      setMyRequestStatus("pending");
      trackEvent("request_sent", { from: trip.from, to: trip.to });
      try {
        await notifyOrganizerNewRequest(trip, tripId, {
          id: requestId,
          travelerName: name,
        });
      } catch (emailErr) {
        console.error("Organizer notification email failed:", emailErr);
      }
    } catch {
      setError("Couldn't send your request. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="rides-detail-page">
      <div className="rides-detail-card">

        <div className="rides-detail-header">
          <div className="rides-card-route" style={{ fontSize: "1.3rem" }}>
            {trip.from}<span className="rides-card-arrow">→</span>{trip.to}
          </div>
          <span className={`rides-seat-badge ${isFull ? "rides-seat-badge-full" : ""}`}>
            {isFull ? "Full" : `${totalSeats - confirmedSeats} seat${totalSeats - confirmedSeats === 1 ? "" : "s"} left`}
          </span>
        </div>

        {isOrganizer && (
          <Link href={`/rides/${tripId}/manage`} className="rides-manage-link">
            Manage requests ({requests.filter((r) => r.status === "pending").length} pending)
          </Link>
        )}
        <p className="rides-card-date" style={{ marginBottom: "1.1rem" }}>
          {formatDate(trip.date)} · {formatTime(trip.time)} pickup
        </p>

        <div className="rides-driver-row">
          <span className="rides-avatar" style={{ width: 40, height: 40, fontSize: "0.85rem" }}>
            {trip.organizerInitials}
          </span>
          <div>
            <p className="rides-driver-name">
              {trip.driverName || trip.organizerName}
              {trip.driverVerified && <span className="rides-verified-dot" style={{ marginLeft: 6 }} />}
            </p>
            <p className="rides-driver-meta">{trip.vehicle || "Vehicle details not listed"}</p>
          </div>
        </div>

        {trip.notes && <div className="rides-notes">{trip.notes}</div>}

        <ul className="rides-terms">
          <li>The trip organizer reviews and approves each request</li>
          <li>Price per seat may drop further if more riders join</li>
          <li>Free cancellation up to 12 hours before pickup</li>
        </ul>

        <div className="rides-request-row">
          <div>
            <p className="rides-price-label">Price per seat</p>
            <p className="rides-price-value" style={{ fontSize: "1.4rem" }}>${pricePerSeat}</p>
          </div>

          {myRequestStatus === "pending" && (
            <p className="rides-status-msg rides-status-pending">Request sent — waiting on the organizer</p>
          )}
          {myRequestStatus === "declined" && (
            <p className="rides-status-msg rides-status-declined">Your request wasn&apos;t accepted</p>
          )}
          {!myRequestStatus && isFull && (
            <button className="rides-request-btn" disabled>Trip is full</button>
          )}
        </div>

        {myRequestStatus === "accepted" && (
          <div className="rides-contact-reveal">
            <p className="rides-status-msg rides-status-accepted">You&apos;re confirmed on this trip</p>
            <p className="rides-contact-label">Coordinate pickup with {trip.organizerName}:</p>
            <p className="rides-contact-value">
              {organizerContact ? `${organizerContact.phone} · ${trip.organizerEmail}` : "Loading contact info…"}
            </p>
          </div>
        )}

        {!myRequestStatus && !isFull && !user && !authLoading && (
          <EmailSignIn prompt="Sign in with the email you used before to see your request status, or to request a seat on this trip." />
        )}

        {!myRequestStatus && !isFull && user && (
          <form
            className="rides-join-form"
            onSubmit={(e) => { e.preventDefault(); handleRequest(); }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Your phone / WhatsApp"
              value={travelerPhone}
              onChange={(e) => setTravelerPhone(e.target.value)}
              required
            />
            <button type="submit" className="rides-request-btn" disabled={submitting}>
              {submitting ? "Sending…" : "Request to join"}
            </button>
          </form>
        )}
        {error && <p className="rides-error">{error}</p>}

      </div>
    </main>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}
