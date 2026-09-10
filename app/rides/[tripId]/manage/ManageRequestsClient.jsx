"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTrip, subscribeRequests, respondToRequest } from "@/lib/rideshare";
import { useAuthUser } from "@/lib/useAuthUser";
import { notifyTravelerDecision } from "@/lib/notifications";
import { trackEvent } from "@/lib/analytics";
import EmailSignIn from "@/components/rides/EmailSignIn";
import "./page.css";

export default function ManageRequestsClient({ tripId }) {
  const { user, authLoading } = useAuthUser();
  const [trip, setTrip] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tripId) return;
    getTrip(tripId).then((t) => {
      setTrip(t);
      setLoading(false);
    });
    const unsubscribe = subscribeRequests(
      tripId,
      (result) => setRequests(result),
      (err) => setError(err.code || err.message)
    );
    return () => unsubscribe();
  }, [tripId]);

  async function handleRespond(request, decision) {
    setError("");
    setRespondingId(request.id);
    try {
      await respondToRequest(tripId, request.id, decision);
      trackEvent(decision === "accepted" ? "request_accepted" : "request_declined", {
        from: trip.from,
        to: trip.to,
      });
      try {
        await notifyTravelerDecision(trip, tripId, request, decision);
      } catch (emailErr) {
        console.error("Traveler notification email failed:", emailErr);
      }
    } catch (err) {
      setError(err.message || "Couldn't update that request.");
    } finally {
      setRespondingId(null);
    }
  }

  if (loading || authLoading) return <main className="rides-manage-page"><p className="rides-empty">Loading…</p></main>;
  if (!trip) return <main className="rides-manage-page"><p className="rides-empty">Trip not found.</p></main>;

  if (!user) {
    return (
      <main className="rides-manage-page">
        <EmailSignIn prompt="Sign in to manage this trip's requests." />
      </main>
    );
  }

  if (trip.organizerId !== user.uid) {
    return (
      <main className="rides-manage-page">
        <p className="rides-empty">
          Only the trip organizer can manage requests. <Link href={`/rides/${tripId}`}>Back to trip</Link>
        </p>
      </main>
    );
  }

  const pending = requests.filter((r) => r.status === "pending");
  const decided = requests.filter((r) => r.status !== "pending");

  return (
    <main className="rides-manage-page">
      <Link href={`/rides/${tripId}`} className="rides-manage-back">← Back to trip</Link>
      <h1 className="rides-manage-title">
        {trip.from} <span className="rides-card-arrow">→</span> {trip.to}
      </h1>
      <p className="rides-manage-subtitle">Manage requests</p>

      {error && <p className="rides-error">{error}</p>}

      {pending.length === 0 && (
        <p className="rides-empty">No pending requests right now.</p>
      )}

      <div className="rides-manage-list">
        {pending.map((r) => (
          <div className="rides-manage-card" key={r.id}>
            <div>
              <p className="rides-manage-name">{r.travelerName}</p>
              <p className="rides-manage-email">{r.travelerEmail}</p>
            </div>
            <div className="rides-manage-actions">
              <button
                className="rides-manage-accept"
                onClick={() => handleRespond(r, "accepted")}
                disabled={respondingId === r.id}
              >
                Accept
              </button>
              <button
                className="rides-manage-decline"
                onClick={() => handleRespond(r, "declined")}
                disabled={respondingId === r.id}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      {decided.length > 0 && (
        <>
          <p className="rides-manage-subtitle" style={{ marginTop: "1.75rem" }}>Past requests</p>
          <div className="rides-manage-list">
            {decided.map((r) => (
              <div className="rides-manage-card" key={r.id}>
                <div>
                  <p className="rides-manage-name">{r.travelerName}</p>
                  <p className="rides-manage-email">{r.travelerEmail}</p>
                  {r.status === "accepted" && (
                    <p className="rides-manage-email">{r.travelerPhone}</p>
                  )}
                </div>
                <span className={`rides-status-msg rides-status-${r.status}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
