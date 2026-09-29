"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notifyItineraryHotelsCustomer, notifyItineraryHotelsAdmin } from "@/lib/notifications";
import "./ItineraryResult.css";

const ItineraryRouteMap = dynamic(() => import("./ItineraryRouteMap"), {
  ssr: false,
  loading: () => <div className="itinerary-route-map-loading">…</div>,
});

const STRINGS = {
  en: {
    dateLocale: "en-GB",
    yourItinerary: "Your Itinerary",
    driver: "Driver",
    startingFrom: "Starting from",
    loading: "Loading…",
    excessNote: "Excess distance beyond the driver's daily allowance may incur additional charges.",
    accommodation: (min, max) => `+ est. $${min}–$${max} accommodation`,
    bookDriver: "Just book the driver",
    includeHotels: "Include hotels too",
    hotelsSent: "Thanks! We'll follow up within 24 hours with hotel options for your trip.",
    hotelsIntro: "Leave your details and we'll put together hotel options to go with your driver.",
    name: "Your name",
    email: "Your email",
    phone: "Your phone",
    hotelsError: "Please fill in all fields and try again.",
    sending: "Sending…",
    requestHotels: "Request hotel options",
    suggestedStay: "Suggested stay",
    lookUpStay: "Look up this stay →",
    noStay: "No accommodation needed this day.",
    planAnother: "← Plan another trip",
  },
  fr: {
    dateLocale: "fr-FR",
    yourItinerary: "Votre Itinéraire",
    driver: "Chauffeur",
    startingFrom: "À partir de",
    loading: "Chargement…",
    excessNote: "Les kilomètres au-delà du forfait journalier du chauffeur peuvent entraîner des frais supplémentaires.",
    accommodation: (min, max) => `+ env. ${min}–${max} $ d'hébergement`,
    bookDriver: "Réserver seulement le chauffeur",
    includeHotels: "Inclure aussi les hôtels",
    hotelsSent: "Merci ! Nous vous enverrons des propositions d'hôtels pour votre voyage sous 24 heures.",
    hotelsIntro: "Laissez-nous vos coordonnées et nous vous proposerons des hôtels en complément de votre chauffeur.",
    name: "Votre nom",
    email: "Votre e-mail",
    phone: "Votre téléphone",
    hotelsError: "Veuillez remplir tous les champs et réessayer.",
    sending: "Envoi…",
    requestHotels: "Demander des propositions d'hôtels",
    suggestedStay: "Hébergement suggéré",
    lookUpStay: "Voir cet hébergement →",
    noStay: "Aucun hébergement nécessaire ce jour-là.",
    planAnother: "← Planifier un autre voyage",
  },
};

function formatDayDate(iso, dateLocale) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(dateLocale, { weekday: "short", day: "numeric", month: "short" });
}

const emptyContact = { name: "", email: "", phone: "" };

export default function ItineraryResult({ data, searchParams, onReset, locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const fmtDate = (iso) => formatDayDate(iso, t.dateLocale);
  const [activeDay, setActiveDay] = useState(0);
  const [hotelsFlow, setHotelsFlow] = useState("idle"); // idle | form | submitting | sent | error
  const [contact, setContact] = useState(emptyContact);
  const [exchangeRate, setExchangeRate] = useState(null);

  // driverPriceFrom (data/drivers.js's pricePerDay) is denominated in LKR —
  // same LKR → USD conversion DriverCard.jsx does for the /search results,
  // so the number shown here matches what a driver's card actually quotes.
  useEffect(() => {
    let cancelled = false;

    async function fetchExchangeRate() {
      try {
        const response = await fetch("https://api.frankfurter.dev/v2/rate/LKR/USD");
        if (!response.ok) throw new Error("Failed to fetch exchange rate");
        const result = await response.json();
        if (!cancelled) setExchangeRate(result.rate);
      } catch (error) {
        console.error("Exchange rate error:", error);
      }
    }

    fetchExchangeRate();
    return () => { cancelled = true; };
  }, []);

  if (!data) return null;

  const { title, routeSummary, driverPriceFrom, accommodationEstimate, days = [], seasonalNotes = [] } = data;
  const currentDay = days[activeDay];

  const convertedPrice = exchangeRate && driverPriceFrom != null ? driverPriceFrom * exchangeRate : null;
  const formattedUsd = convertedPrice != null
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(convertedPrice)
    : null;
  const formattedLkr = driverPriceFrom != null ? new Intl.NumberFormat("en-US").format(driverPriceFrom) : null;
  const dateRange = days.length > 0
    ? days.length === 1
      ? fmtDate(days[0].date)
      : `${fmtDate(days[0].date)} – ${fmtDate(days[days.length - 1].date)}`
    : "";

  const searchPath = locale === "fr" ? "/fr/search" : "/search";
  const bookDriverHref = searchParams ? `${searchPath}?${new URLSearchParams(searchParams).toString()}` : searchPath;

  async function handleHotelsSubmit(e) {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) {
      setHotelsFlow("error");
      return;
    }

    setHotelsFlow("submitting");
    try {
      const docRef = await addDoc(collection(db, "bookingRequests"), {
        type: "itinerary-with-hotels",
        customerName: contact.name.trim(),
        customerEmail: contact.email.trim(),
        customerPhone: contact.phone.trim(),
        itinerary: data,
        locale,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      const contactInfo = { name: contact.name.trim(), email: contact.email.trim(), phone: contact.phone.trim() };
      await notifyItineraryHotelsCustomer(contactInfo, data, docRef.id, locale);
      await notifyItineraryHotelsAdmin(contactInfo, data, docRef.id);

      setHotelsFlow("sent");
    } catch (err) {
      console.error("Failed to submit itinerary-with-hotels request:", err);
      setHotelsFlow("error");
    }
  }

  return (
    <div className="itinerary-result">

      <div className="itinerary-summary-card">
        <div>
          <p className="itinerary-summary-label">{t.yourItinerary}</p>
          <h2>{title}</h2>
          {dateRange && <p className="itinerary-summary-dates">{dateRange}</p>}
          <p className="itinerary-summary-route">{routeSummary}</p>
        </div>

        <div className="itinerary-summary-price-block">
          <p className="itinerary-summary-price-label">{t.driver}</p>
          <p className="itinerary-summary-price">
            {t.startingFrom} {formattedUsd || t.loading}
          </p>
          {formattedLkr && (
            <p className="itinerary-summary-price-lkr">≈ LKR {formattedLkr}</p>
          )}
          <p className="itinerary-summary-price-note">{t.excessNote}</p>

          {accommodationEstimate && (
            <p className="itinerary-summary-accommodation">
              {t.accommodation(accommodationEstimate.min, accommodationEstimate.max)}
            </p>
          )}

          <div className="itinerary-cta-group">
            <Link href={bookDriverHref} className="itinerary-cta itinerary-cta-primary">
              {t.bookDriver}
            </Link>
            {hotelsFlow !== "sent" && (
              <button
                type="button"
                className="itinerary-cta itinerary-cta-secondary"
                onClick={() => setHotelsFlow("form")}
              >
                {t.includeHotels}
              </button>
            )}
          </div>
        </div>
      </div>

      {seasonalNotes.length > 0 && (
        <div className="itinerary-seasonal-notes">
          {seasonalNotes.map((note) => (
            <p key={note}>☀️ {note}</p>
          ))}
        </div>
      )}

      {hotelsFlow !== "idle" && (
        <div className="itinerary-hotels-panel">
          {hotelsFlow === "sent" ? (
            <p className="itinerary-hotels-sent">
              {t.hotelsSent}
            </p>
          ) : (
            <form className="itinerary-hotels-form" onSubmit={handleHotelsSubmit}>
              <p className="itinerary-hotels-intro">
                {t.hotelsIntro}
              </p>
              <input
                type="text"
                placeholder={t.name}
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder={t.email}
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                required
              />
              <input
                type="tel"
                placeholder={t.phone}
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                required
              />
              {hotelsFlow === "error" && (
                <p className="itinerary-hotels-error">{t.hotelsError}</p>
              )}
              <button type="submit" disabled={hotelsFlow === "submitting"}>
                {hotelsFlow === "submitting" ? t.sending : t.requestHotels}
              </button>
            </form>
          )}
        </div>
      )}

      {days.length > 0 && (
        <ItineraryRouteMap
          stops={days.map((day) => ({
            name: day.location?.name,
            lat: day.location?.lat,
            lng: day.location?.lng,
          }))}
        />
      )}

      {days.length > 0 && (
        <div className="itinerary-days">
          <div className="itinerary-day-tabs" role="tablist">
            {days.map((day, index) => (
              <button
                key={day.label}
                type="button"
                role="tab"
                aria-selected={index === activeDay}
                className={`itinerary-day-tab ${index === activeDay ? "itinerary-day-tab-active" : ""}`}
                onClick={() => setActiveDay(index)}
              >
                <span className="itinerary-day-tab-label">{day.label}</span>
                <span className="itinerary-day-tab-date">{fmtDate(day.date)}</span>
              </button>
            ))}
          </div>

          {currentDay && (
            <div className="itinerary-day-panel">
              <h3>{currentDay.title}</h3>
              <p className="itinerary-day-date">{fmtDate(currentDay.date)}</p>

              {currentDay.activities?.length > 0 && (
                <ul className="itinerary-activities">
                  {currentDay.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              )}

              <div className="itinerary-stay">
                {currentDay.stay ? (
                  <>
                    <p className="itinerary-stay-label">{t.suggestedStay}</p>
                    <p className="itinerary-stay-name">{currentDay.stay.name}</p>
                    <p className="itinerary-stay-price">{currentDay.stay.price}</p>
                    {currentDay.stay.searchUrl && (
                      <a
                        href={currentDay.stay.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="itinerary-stay-link"
                      >
                        {t.lookUpStay}
                      </a>
                    )}
                  </>
                ) : (
                  <p className="itinerary-stay-none">{t.noStay}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <button type="button" className="itinerary-reset" onClick={onReset}>
        {t.planAnother}
      </button>

    </div>
  );
}
