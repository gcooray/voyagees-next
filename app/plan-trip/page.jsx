"use client";

import { useState } from "react";
import ItineraryResult from "@/components/ItineraryResult";
import { getLowestDriverPrice } from "@/lib/driverPricing";
import "./page.css";

const MAX_TRIP_DAYS = 21;
const MAX_CHILDREN = 8;
const MAX_CHILD_AGE = 17;

// Same 30-minute time picker as components/SearchForm.jsx, duplicated here
// since it's a small unexported helper there, not a shared utility.
function generateTimeOptions() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      times.push(`${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
    }
  }
  return times;
}
const TIME_OPTIONS = generateTimeOptions();

const BUDGET_OPTIONS = [
  { value: "budget", label: "Budget" },
  { value: "mid-range", label: "Mid-range" },
  { value: "luxury", label: "Luxury" },
];

const PACE_OPTIONS = [
  { value: "relaxed", label: "Relaxed" },
  { value: "balanced", label: "Balanced" },
  { value: "packed", label: "Packed" },
];

const INTEREST_OPTIONS = [
  { value: "culture", label: "Culture" },
  { value: "nature", label: "Nature" },
  { value: "beaches", label: "Beaches" },
  { value: "food", label: "Food" },
  { value: "adventure", label: "Adventure" },
  { value: "wellness", label: "Wellness" },
];
const ALL_INTEREST_VALUES = INTEREST_OPTIONS.map((opt) => opt.value);

// `driverPriceFrom` is a real query against data/drivers.js (see
// lib/driverPricing.js), matching the exact formula DriverCard.jsx uses to
// render /search results, since that's the page "Just book the driver"
// links to. It's queried here, client-side, entirely separately from the
// AI call below — the AI never sees or influences this number, and this
// route doesn't touch it either.
//
// The day-by-day content (destinations, activities, hotel style, and any
// verified pricing) comes from app/api/generate-itinerary/route.js, which
// calls Claude Sonnet 5. See that file for why the AI is trusted with
// sequencing/content but never with prices.
async function generateItinerary(formValues) {
  const { pickupDate, dropoffDate } = formValues;

  const driverPriceFrom = getLowestDriverPrice({ pickupDate, dropoffDate });
  if (driverPriceFrom == null) {
    throw new Error("NO_DRIVERS_AVAILABLE");
  }

  const res = await fetch("/api/generate-itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  });

  if (!res.ok) {
    throw new Error("GENERATION_FAILED");
  }

  const { title, routeSummary, accommodationEstimate, days } = await res.json();

  return {
    title,
    routeSummary,
    driverPriceFrom,
    accommodationEstimate,
    days,
  };
}

const emptyForm = {
  startLocation: "",
  endLocation: "",
  pickupDate: "",
  pickupTime: "",
  dropoffDate: "",
  dropoffTime: "",
  budget: "mid-range",
  pace: "balanced",
  interests: [],
  adults: 1,
  children: 0,
  childrenAges: [],
  notes: "",
};

export default function PlanTripPage() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState(null);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function toggleInterest(value) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(value)
        ? f.interests.filter((i) => i !== value)
        : [...f.interests, value],
    }));
  }

  function toggleAllInterests() {
    setForm((f) => ({
      ...f,
      interests: ALL_INTEREST_VALUES.every((v) => f.interests.includes(v))
        ? []
        : ALL_INTEREST_VALUES,
    }));
  }

  function handleAdultsChange(e) {
    const adults = Math.max(1, Number(e.target.value) || 1);
    setForm((f) => ({ ...f, adults }));
  }

  function handleChildrenChange(e) {
    const children = Math.min(MAX_CHILDREN, Math.max(0, Number(e.target.value) || 0));
    setForm((f) => {
      const childrenAges = Array.from({ length: children }, (_, i) => f.childrenAges[i] ?? "");
      return { ...f, children, childrenAges };
    });
  }

  function handleChildAgeChange(index) {
    return (e) => {
      const value = e.target.value;
      setForm((f) => {
        const childrenAges = [...f.childrenAges];
        childrenAges[index] = value;
        return { ...f, childrenAges };
      });
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.startLocation.trim() || !form.pickupDate || !form.pickupTime || !form.dropoffDate || !form.dropoffTime) {
      setError("Please fill in your starting point and pickup/dropoff date and time.");
      return;
    }

    const start = new Date(`${form.pickupDate}T00:00:00`);
    const end = new Date(`${form.dropoffDate}T00:00:00`);

    if (end <= start) {
      setError("Your dropoff date needs to be after your pickup date.");
      return;
    }

    const totalDays = Math.round((end - start) / 86400000) + 1;
    if (totalDays > MAX_TRIP_DAYS) {
      setError(`Trips can be planned for up to ${MAX_TRIP_DAYS} days at a time.`);
      return;
    }

    if (form.children > 0) {
      const hasInvalidAge = form.childrenAges.some((age) => {
        const n = Number(age);
        return age === "" || Number.isNaN(n) || n < 0 || n > MAX_CHILD_AGE;
      });
      if (hasInvalidAge) {
        setError(`Please enter a valid age (0–${MAX_CHILD_AGE}) for each child.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await generateItinerary(form);
      setItinerary(result);
    } catch (err) {
      setError(
        err.message === "NO_DRIVERS_AVAILABLE"
          ? "No drivers are currently available for those dates. Try a different date range."
          : "Couldn't generate your itinerary. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setItinerary(null);
  }

  if (itinerary) {
    return (
      <main className="plan-trip-page">
        <ItineraryResult
          data={itinerary}
          searchParams={{
            pickupDate: form.pickupDate,
            pickupTime: form.pickupTime,
            dropoffDate: form.dropoffDate,
            dropoffTime: form.dropoffTime,
          }}
          onReset={handleReset}
        />
      </main>
    );
  }

  return (
    <main className="plan-trip-page">
      <h1>Plan Your Sri Lanka Trip</h1>
      <p className="plan-trip-intro">
        Tell us about your trip and we&apos;ll put together a day-by-day itinerary with a private driver.
      </p>

      <form className="plan-trip-form" onSubmit={handleSubmit}>
        <div className="plan-trip-row">
          <label>
            Starting from
            <input
              type="text"
              placeholder="e.g. Colombo Airport"
              value={form.startLocation}
              onChange={handleChange("startLocation")}
              required
            />
          </label>
          <label>
            Ending in
            <input
              type="text"
              placeholder="Same as starting point if left blank"
              value={form.endLocation}
              onChange={handleChange("endLocation")}
            />
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            Pickup date
            <input
              type="date"
              value={form.pickupDate}
              onChange={handleChange("pickupDate")}
              required
            />
          </label>
          <label>
            Pickup time
            <select value={form.pickupTime} onChange={handleChange("pickupTime")} required>
              <option value="" disabled>Select time</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            Dropoff date
            <input
              type="date"
              value={form.dropoffDate}
              onChange={handleChange("dropoffDate")}
              required
            />
          </label>
          <label>
            Dropoff time
            <select value={form.dropoffTime} onChange={handleChange("dropoffTime")} required>
              <option value="" disabled>Select time</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            Budget
            <select value={form.budget} onChange={handleChange("budget")}>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <label>
            Pace
            <select value={form.pace} onChange={handleChange("pace")}>
              {PACE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-field">
          <span className="plan-trip-field-label">Interests</span>
          <div className="plan-trip-interests">
            <button
              type="button"
              className={`plan-trip-chip ${ALL_INTEREST_VALUES.every((v) => form.interests.includes(v)) ? "plan-trip-chip-active" : ""}`}
              onClick={toggleAllInterests}
            >
              Mix of everything
            </button>
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`plan-trip-chip ${form.interests.includes(opt.value) ? "plan-trip-chip-active" : ""}`}
                onClick={() => toggleInterest(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="plan-trip-row">
          <label>
            Adults
            <input
              type="number"
              min={1}
              value={form.adults}
              onChange={handleAdultsChange}
            />
          </label>
          <label>
            Children
            <input
              type="number"
              min={0}
              max={MAX_CHILDREN}
              value={form.children}
              onChange={handleChildrenChange}
            />
          </label>
        </div>

        {form.children > 0 && (
          <div className="plan-trip-field">
            <span className="plan-trip-field-label">Children&apos;s ages</span>
            <div className="plan-trip-child-ages">
              {form.childrenAges.map((age, index) => (
                <input
                  key={index}
                  type="number"
                  min={0}
                  max={MAX_CHILD_AGE}
                  placeholder={`Child ${index + 1}`}
                  value={age}
                  onChange={handleChildAgeChange(index)}
                  required
                />
              ))}
            </div>
          </div>
        )}

        <label>
          Anything else we should know?
          <textarea
            rows={4}
            placeholder="Special occasions, accessibility needs, must-see places…"
            value={form.notes}
            onChange={handleChange("notes")}
          />
        </label>

        {error && <p className="plan-trip-error">{error}</p>}

        <button type="submit" className="plan-trip-submit" disabled={submitting}>
          {submitting ? "Building your itinerary…" : "Generate My Itinerary"}
        </button>
      </form>
    </main>
  );
}
