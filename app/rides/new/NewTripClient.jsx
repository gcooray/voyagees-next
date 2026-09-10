"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip, TOWNS } from "@/lib/rideshare";
import { useAuthUser } from "@/lib/useAuthUser";
import { trackEvent } from "@/lib/analytics";
import EmailSignIn from "@/components/rides/EmailSignIn";
import "./page.css";

const emptyForm = {
  from: TOWNS[0],
  to: TOWNS[1],
  date: "",
  time: "",
  organizerName: "",
  organizerPhone: "",
  vehicle: "",
  totalPrice: "",
  totalSeats: "",
  notes: "",
};

export default function NewTripClient() {
  const router = useRouter();
  const { user, authLoading } = useAuthUser();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.from === form.to) {
      setError("Starting point and destination can't be the same.");
      return;
    }
    if (
      !form.date ||
      !form.time ||
      !form.organizerName ||
      !form.organizerPhone ||
      !form.totalPrice ||
      !form.totalSeats
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const organizerName = form.organizerName.trim();
      const initials = organizerName.slice(0, 2).toUpperCase();

      const tripId = await createTrip({
        from: form.from,
        to: form.to,
        date: form.date,
        time: form.time,
        organizerId: user.uid,
        organizerName,
        organizerInitials: initials,
        organizerEmail: user.email,
        organizerPhone: form.organizerPhone.trim(),
        driverName: organizerName,
        driverVerified: false,
        vehicle: form.vehicle.trim(),
        notes: form.notes.trim(),
        totalPrice: Number(form.totalPrice),
        totalSeats: Number(form.totalSeats),
      });
      trackEvent("trip_posted", { from: form.from, to: form.to });
      router.push(`/rides/${tripId}`);
    } catch (err) {
      console.error("createTrip failed:", err);
      setError(`Couldn't post your trip (${err.code || err.message}).`);
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return <main className="rides-new-page"><p className="rides-empty">Loading…</p></main>;
  }

  if (!user) {
    return (
      <main className="rides-new-page">
        <h1 className="rides-new-title">Post a shared trip</h1>
        <EmailSignIn prompt="Sign in to post a trip so travelers can reach you." />
      </main>
    );
  }

  return (
    <main className="rides-new-page">
      <h1 className="rides-new-title">Post a shared trip</h1>
      <p className="rides-new-signin-copy">Posting as {user.email}</p>

      <form className="rides-new-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input type="text" value={form.organizerName} onChange={handleChange("organizerName")} required />
        </label>

        <div className="rides-new-row">
          <label>
            From
            <select value={form.from} onChange={handleChange("from")}>
              {TOWNS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            To
            <select value={form.to} onChange={handleChange("to")}>
              {TOWNS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="rides-new-row">
          <label>
            Date
            <input type="date" value={form.date} onChange={handleChange("date")} required />
          </label>
          <label>
            Pickup time
            <input type="time" value={form.time} onChange={handleChange("time")} required />
          </label>
        </div>

        <label>
          Phone / WhatsApp
          <input
            type="tel"
            placeholder="Shared with confirmed travelers only"
            value={form.organizerPhone}
            onChange={handleChange("organizerPhone")}
            required
          />
        </label>

        <label>
          Vehicle (optional)
          <input type="text" placeholder="e.g. Toyota Aqua" value={form.vehicle} onChange={handleChange("vehicle")} />
        </label>

        <div className="rides-new-row">
          <label>
            Total trip price
            <input type="number" min="0" value={form.totalPrice} onChange={handleChange("totalPrice")} required />
          </label>
          <label>
            Total seats (incl. yours)
            <input type="number" min="1" value={form.totalSeats} onChange={handleChange("totalSeats")} required />
          </label>
        </div>

        <label>
          Notes (optional)
          <textarea rows={3} value={form.notes} onChange={handleChange("notes")} />
        </label>

        {error && <p className="rides-error">{error}</p>}

        <button type="submit" className="rides-new-submit" disabled={submitting}>
          {submitting ? "Posting…" : "Post trip"}
        </button>
      </form>
    </main>
  );
}
