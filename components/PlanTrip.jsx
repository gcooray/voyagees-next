"use client";

import { useState } from "react";
import ItineraryResult from "@/components/ItineraryResult";
import { getLowestDriverPrice } from "@/lib/driverPricing";
import "./PlanTrip.css";
import { trackEvent } from "@/lib/analytics";

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

// `value`s are what the API receives (always English); labels per locale.
const BUDGET_OPTIONS = [
  { value: "budget", en: "Budget", fr: "Économique" },
  { value: "mid-range", en: "Mid-range", fr: "Intermédiaire" },
  { value: "luxury", en: "Luxury", fr: "Luxe" },
];

const PACE_OPTIONS = [
  { value: "relaxed", en: "Relaxed", fr: "Détendu" },
  { value: "balanced", en: "Balanced", fr: "Équilibré" },
  { value: "packed", en: "Packed", fr: "Intense" },
];

const INTEREST_OPTIONS = [
  { value: "culture", en: "Culture", fr: "Culture" },
  { value: "nature", en: "Nature", fr: "Nature" },
  { value: "beaches", en: "Beaches", fr: "Plages" },
  { value: "food", en: "Food", fr: "Gastronomie" },
  { value: "adventure", en: "Adventure", fr: "Aventure" },
  { value: "wellness", en: "Wellness", fr: "Bien-être" },
];

const STRINGS = {
  en: {
    title: "Plan Your Sri Lanka Trip",
    intro: "Tell us about your trip and we'll put together a day-by-day itinerary with a private driver.",
    startingFrom: "Starting from",
    startPlaceholder: "e.g. Colombo Airport",
    endingIn: "Ending in",
    endPlaceholder: "Same as starting point if left blank",
    pickupDate: "Pickup date",
    pickupTime: "Pickup time",
    dropoffDate: "Dropoff date",
    dropoffTime: "Dropoff time",
    selectTime: "Select time",
    budget: "Budget",
    pace: "Pace",
    interests: "Interests",
    mix: "Mix of everything",
    adults: "Adults",
    children: "Children",
    childrenAges: "Children's ages",
    child: (n) => `Child ${n}`,
    notes: "Anything else we should know?",
    notesPlaceholder: "Special occasions, accessibility needs, must-see places…",
    errRequired: "Please fill in your starting point and pickup/dropoff date and time.",
    errOrder: "Your dropoff date needs to be after your pickup date.",
    errTooLong: (max) => `Trips can be planned for up to ${max} days at a time.`,
    errChildAge: (max) => `Please enter a valid age (0–${max}) for each child.`,
    errNoDrivers: "No drivers are currently available for those dates. Try a different date range.",
    errFailed: "Couldn't generate your itinerary. Please try again.",
    submitting: "We're preparing your trip…",
    submit: "Generate My Itinerary",
  },
  fr: {
    title: "Planifiez Votre Voyage au Sri Lanka",
    intro: "Parlez-nous de votre voyage et nous vous préparerons un itinéraire jour par jour avec un chauffeur privé.",
    startingFrom: "Point de départ",
    startPlaceholder: "ex. Aéroport de Colombo",
    endingIn: "Point d'arrivée",
    endPlaceholder: "Identique au départ si laissé vide",
    pickupDate: "Date de prise en charge",
    pickupTime: "Heure de prise en charge",
    dropoffDate: "Date de fin",
    dropoffTime: "Heure de fin",
    selectTime: "Choisir l'heure",
    budget: "Budget",
    pace: "Rythme",
    interests: "Centres d'intérêt",
    mix: "Un peu de tout",
    adults: "Adultes",
    children: "Enfants",
    childrenAges: "Âge des enfants",
    child: (n) => `Enfant ${n}`,
    notes: "Autre chose à nous signaler ?",
    notesPlaceholder: "Occasion spéciale, besoins d'accessibilité, lieux incontournables…",
    errRequired: "Veuillez indiquer votre point de départ ainsi que les dates et heures de prise en charge et de fin.",
    errOrder: "La date de fin doit être postérieure à la date de prise en charge.",
    errTooLong: (max) => `Les voyages peuvent être planifiés sur ${max} jours maximum.`,
    errChildAge: (max) => `Veuillez indiquer un âge valide (0–${max}) pour chaque enfant.`,
    errNoDrivers: "Aucun chauffeur n'est disponible à ces dates. Essayez d'autres dates.",
    errFailed: "Impossible de générer votre itinéraire. Veuillez réessayer.",
    submitting: "Nous préparons votre voyage…",
    submit: "Générer Mon Itinéraire",
  },
};
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
async function generateItinerary(formValues, locale) {
  const { pickupDate, dropoffDate } = formValues;

  const driverPriceFrom = await getLowestDriverPrice({ pickupDate, dropoffDate });
  if (driverPriceFrom == null) {
    throw new Error("NO_DRIVERS_AVAILABLE");
  }

  const res = await fetch("/api/generate-itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formValues, locale }),
  });

  if (!res.ok) {
    throw new Error("GENERATION_FAILED");
  }

  const { title, routeSummary, accommodationEstimate, days, seasonalNotes } = await res.json();

  return {
    title,
    routeSummary,
    driverPriceFrom,
    accommodationEstimate,
    days,
    seasonalNotes,
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

export default function PlanTrip({ locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
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
      setError(t.errRequired);
      return;
    }

    const start = new Date(`${form.pickupDate}T00:00:00`);
    const end = new Date(`${form.dropoffDate}T00:00:00`);

    if (end <= start) {
      setError(t.errOrder);
      return;
    }

    const totalDays = Math.round((end - start) / 86400000) + 1;
    if (totalDays > MAX_TRIP_DAYS) {
      setError(t.errTooLong(MAX_TRIP_DAYS));
      return;
    }

    if (form.children > 0) {
      const hasInvalidAge = form.childrenAges.some((age) => {
        const n = Number(age);
        return age === "" || Number.isNaN(n) || n < 0 || n > MAX_CHILD_AGE;
      });
      if (hasInvalidAge) {
        setError(t.errChildAge(MAX_CHILD_AGE));
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await generateItinerary(form, locale);
      trackEvent("generate_itinerary", { days: result.days?.length || 0, budget: form.budget });
      setItinerary(result);
    } catch (err) {
      setError(
        err.message === "NO_DRIVERS_AVAILABLE"
          ? t.errNoDrivers
          : t.errFailed
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
          locale={locale}
        />
      </main>
    );
  }

  return (
    <main className="plan-trip-page">
      <h1>{t.title}</h1>
      <p className="plan-trip-intro">{t.intro}</p>

      <form className="plan-trip-form" onSubmit={handleSubmit}>
        <div className="plan-trip-row">
          <label>
            {t.startingFrom}
            <input
              type="text"
              placeholder={t.startPlaceholder}
              value={form.startLocation}
              onChange={handleChange("startLocation")}
              required
            />
          </label>
          <label>
            {t.endingIn}
            <input
              type="text"
              placeholder={t.endPlaceholder}
              value={form.endLocation}
              onChange={handleChange("endLocation")}
            />
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            {t.pickupDate}
            <input
              type="date"
              value={form.pickupDate}
              onChange={handleChange("pickupDate")}
              required
            />
          </label>
          <label>
            {t.pickupTime}
            <select value={form.pickupTime} onChange={handleChange("pickupTime")} required>
              <option value="" disabled>{t.selectTime}</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            {t.dropoffDate}
            <input
              type="date"
              value={form.dropoffDate}
              onChange={handleChange("dropoffDate")}
              required
            />
          </label>
          <label>
            {t.dropoffTime}
            <select value={form.dropoffTime} onChange={handleChange("dropoffTime")} required>
              <option value="" disabled>{t.selectTime}</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-row">
          <label>
            {t.budget}
            <select value={form.budget} onChange={handleChange("budget")}>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt[locale] || opt.en}</option>
              ))}
            </select>
          </label>
          <label>
            {t.pace}
            <select value={form.pace} onChange={handleChange("pace")}>
              {PACE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt[locale] || opt.en}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="plan-trip-field">
          <span className="plan-trip-field-label">{t.interests}</span>
          <div className="plan-trip-interests">
            <button
              type="button"
              className={`plan-trip-chip ${ALL_INTEREST_VALUES.every((v) => form.interests.includes(v)) ? "plan-trip-chip-active" : ""}`}
              onClick={toggleAllInterests}
            >
              {t.mix}
            </button>
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`plan-trip-chip ${form.interests.includes(opt.value) ? "plan-trip-chip-active" : ""}`}
                onClick={() => toggleInterest(opt.value)}
              >
                {opt[locale] || opt.en}
              </button>
            ))}
          </div>
        </div>

        <div className="plan-trip-row">
          <label>
            {t.adults}
            <input
              type="number"
              min={1}
              value={form.adults}
              onChange={handleAdultsChange}
            />
          </label>
          <label>
            {t.children}
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
            <span className="plan-trip-field-label">{t.childrenAges}</span>
            <div className="plan-trip-child-ages">
              {form.childrenAges.map((age, index) => (
                <input
                  key={index}
                  type="number"
                  min={0}
                  max={MAX_CHILD_AGE}
                  placeholder={t.child(index + 1)}
                  value={age}
                  onChange={handleChildAgeChange(index)}
                  required
                />
              ))}
            </div>
          </div>
        )}

        <label>
          {t.notes}
          <textarea
            rows={4}
            placeholder={t.notesPlaceholder}
            value={form.notes}
            onChange={handleChange("notes")}
          />
        </label>

        {error && <p className="plan-trip-error">{error}</p>}

        <button
          type="submit"
          className="plan-trip-submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting && <span className="btn-spinner" aria-hidden="true" />}
          {submitting ? t.submitting : t.submit}
        </button>
      </form>
    </main>
  );
}
