"use client";

import { useState } from "react";
import { touristDestinations } from "@/data/touristDestinations";
import { touristDestinationsFr } from "@/data/touristDestinationsFr";
import { generateRoute } from "@/lib/routeGenerator";
import "./plan-trip.css";

const INTERESTS = [
  { value: "culture", en: "culture", fr: "culture" },
  { value: "beach", en: "beach", fr: "plage" },
  { value: "wildlife", en: "wildlife", fr: "faune" },
  { value: "surfing", en: "surfing", fr: "surf" },
  { value: "hiking", en: "hiking", fr: "randonnée" },
  { value: "history", en: "history", fr: "histoire" },
];

const STRINGS = {
  en: {
    title: "Plan Your Sri Lanka Trip",
    intro: "Select your interests and trip duration. We'll build your personalized itinerary.",
    interestsHeading: "Your Interests",
    durationHeading: "Trip Duration",
    days: (n) => `${n} Days`,
    generate: "Generate My Trip",
    routeHeading: "Your Suggested Route",
    empty: "Your itinerary will appear here after generation.",
    stay: (n) => `Stay: ${n} day(s)`,
  },
  fr: {
    title: "Planifiez Votre Voyage au Sri Lanka",
    intro: "Sélectionnez vos centres d'intérêt et la durée du séjour. Nous créerons votre itinéraire personnalisé.",
    interestsHeading: "Vos Centres d'Intérêt",
    durationHeading: "Durée du Séjour",
    days: (n) => `${n} jours`,
    generate: "Générer Mon Voyage",
    routeHeading: "Votre Itinéraire Suggéré",
    empty: "Votre itinéraire apparaîtra ici après la génération.",
    stay: (n) => `Séjour : ${n} jour(s)`,
  },
};

export default function PlanTripClient({ locale = "en" }) {
  const isFrench = locale === "fr";
  const t = STRINGS[locale] || STRINGS.en;

  const [interests, setInterests] = useState([]);
  const [days, setDays] = useState(7);
  const [route, setRoute] = useState([]);

  function toggleInterest(item) {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleGenerate() {
    setRoute(generateRoute(touristDestinations, { interests, days }));
  }

  function localizedPlace(place) {
    if (!isFrench) return place;
    const translation = touristDestinationsFr[place.name];
    return {
      ...place,
      name: translation?.name || place.name,
      description: translation?.description || place.description,
    };
  }

  return (
    <div className="plan-trip-page">
      <h1>{t.title}</h1>
      <p className="plan-trip-intro">{t.intro}</p>

      <div className="plan-trip-grid">
        <div className="plan-trip-panel">
          <h2>{t.interestsHeading}</h2>

          <div className="plan-trip-interests">
            {INTERESTS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`plan-trip-chip ${interests.includes(item.value) ? "plan-trip-chip-active" : ""}`}
                onClick={() => toggleInterest(item.value)}
              >
                {isFrench ? item.fr : item.en}
              </button>
            ))}
          </div>

          <h2 className="plan-trip-duration-heading">{t.durationHeading}</h2>

          <select
            className="plan-trip-select"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[3, 5, 7, 10, 14].map((n) => (
              <option key={n} value={n}>{t.days(n)}</option>
            ))}
          </select>

          <button type="button" className="plan-trip-generate" onClick={handleGenerate}>
            {t.generate}
          </button>
        </div>

        <div className="plan-trip-panel">
          <h2>{t.routeHeading}</h2>

          {route.length === 0 ? (
            <p className="plan-trip-empty">{t.empty}</p>
          ) : (
            <div className="plan-trip-route">
              {route.map((place, index) => {
                const localized = localizedPlace(place);
                return (
                  <div className="plan-trip-stop" key={place.slug}>
                    <h3>{index + 1}. {localized.name}</h3>
                    <p className="plan-trip-stop-days">{t.stay(place.daysRecommended || 1)}</p>
                    <p className="plan-trip-stop-desc">{localized.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
