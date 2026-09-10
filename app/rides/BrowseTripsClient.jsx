"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { subscribeOpenTrips, TOWNS } from "@/lib/rideshare";

const STRINGS = {
  en: {
    heading: "Browse open trips",
    postTrip: "Post a trip",
    anyStart: "Any starting point",
    anyDestination: "Any destination",
    loading: "Loading trips…",
    noMatch: "No open trips match those filters yet.",
    errorPrefix: "Couldn't load trips",
    errorHint: "If this is \"failed-precondition\", Firestore needs a composite index for this filter combination — check the browser console for a link to create it.",
    seatsTotal: (n) => `${n} seats total`,
  },
  fr: {
    heading: "Parcourir les trajets ouverts",
    postTrip: "Publier un trajet",
    anyStart: "Point de départ (tous)",
    anyDestination: "Destination (toutes)",
    loading: "Chargement des trajets…",
    noMatch: "Aucun trajet ouvert ne correspond à ces filtres pour le moment.",
    errorPrefix: "Impossible de charger les trajets",
    errorHint: "S'il s'agit de « failed-precondition », Firestore a besoin d'un index composite pour cette combinaison de filtres — consultez la console du navigateur pour obtenir un lien de création.",
    seatsTotal: (n) => `${n} places au total`,
  },
};

export default function BrowseTripsClient({ locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const dateLocale = locale === "fr" ? "fr-FR" : undefined;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromFilter, setFromFilter] = useState("all");
  const [toFilter, setToFilter] = useState("all");

  useEffect(() => {
    const filters = {};
    if (fromFilter !== "all") filters.from = fromFilter;
    if (toFilter !== "all") filters.to = toFilter;

    const unsubscribe = subscribeOpenTrips(
      filters,
      (result) => {
        setTrips(result);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [fromFilter, toFilter]);

  function handleFromChange(e) {
    setLoading(true);
    setError(null);
    setFromFilter(e.target.value);
  }

  function handleToChange(e) {
    setLoading(true);
    setError(null);
    setToFilter(e.target.value);
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(dateLocale, { weekday: "short", day: "numeric", month: "short" });
  }

  function formatTime(time) {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    if (locale === "fr") return `${h}h${String(m).padStart(2, "0")}`;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  return (
    <section className="rides-browse-section" aria-labelledby="rides-browse-heading">
      <div className="rides-browse-header">
        <h2 id="rides-browse-heading" className="rides-browse-title">{t.heading}</h2>
        <Link href="/rides/new" className="rides-post-link">{t.postTrip}</Link>
      </div>

      <div className="rides-filters">
        <select value={fromFilter} onChange={handleFromChange}>
          <option value="all">{t.anyStart}</option>
          {TOWNS.map((town) => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
        <select value={toFilter} onChange={handleToChange}>
          <option value="all">{t.anyDestination}</option>
          {TOWNS.map((town) => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
      </div>

      {loading && !error && <p className="rides-empty">{t.loading}</p>}

      {error && (
        <p className="rides-empty">
          {t.errorPrefix} ({error.code || error.message}). {t.errorHint}
        </p>
      )}

      {!loading && !error && trips.length === 0 && (
        <p className="rides-empty">{t.noMatch}</p>
      )}

      <div className="rides-list">
        {trips.map((trip) => (
          <Link href={`/rides/${trip.id}`} key={trip.id} className="rides-card">
            <div className="rides-card-main">
              <div className="rides-card-route">
                {trip.from}
                <span className="rides-card-arrow">→</span>
                {trip.to}
              </div>
              <p className="rides-card-date">
                {formatDate(trip.date)} · {formatTime(trip.time)}
              </p>
              <div className="rides-card-driver">
                <span className="rides-avatar">{trip.organizerInitials}</span>
                <span>{trip.driverName || trip.organizerName}</span>
                {trip.driverVerified && (
                  <span className="rides-verified-dot" aria-label="Verified driver" />
                )}
              </div>
            </div>
            <div className="rides-card-price">
              <p className="rides-price-value">
                ${trip.totalPrice && trip.totalSeats
                  ? Math.round(trip.totalPrice / trip.totalSeats)
                  : "--"}
                <span>/seat</span>
              </p>
              <p className="rides-seats-left">{t.seatsTotal(trip.totalSeats)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
