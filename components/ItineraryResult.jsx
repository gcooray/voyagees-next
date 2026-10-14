"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notifyItineraryHotelsCustomer, notifyItineraryHotelsAdmin } from "@/lib/notifications";
import WhatsAppInput from "@/components/WhatsAppInput";
import "./ItineraryResult.css";
import { trackLead } from "@/lib/analytics";

const ItineraryRouteMap = dynamic(() => import("./ItineraryRouteMap"), {
  ssr: false,
  loading: () => <div className="itinerary-route-map-loading">…</div>,
});

const STRINGS = {
  en: {
    dateLocale: "en-GB",
    yourItinerary: "Your Itinerary",
    bookingEyebrow: "Book this trip",
    bookingTitle: "Like this itinerary?",
    bookingText: "Choose how you'd like to book it.",
    optDriverTitle: "Driver only",
    optDriverText: "A private driver and vehicle for the whole trip. You book your own hotels.",
    perDay: "per day",
    totalFor: (amount, n) => `${amount} in total for ${n} ${n === 1 ? "day" : "days"}`,
    fitsGroup: (n) => `Vehicles that seat ${n} ${n === 1 ? "traveller" : "travellers"}`,
    seeDrivers: "See available drivers",
    optHotelsTitle: "Driver + hotels",
    optHotelsText: "Your driver, plus hand-picked hotel options for every night, sent to you within 24 hours.",
    hotelsEstimate: (min, max, nights) => `Hotels: about ${min}–${max} in total for ${nights} ${nights === 1 ? "night" : "nights"}`,
    perNight: "per night",
    party: (adults, children) =>
      `for ${adults} ${adults === 1 ? "adult" : "adults"}${children ? ` & ${children} ${children === 1 ? "child" : "children"}` : ""}`,
    under6Free: "Children under 6 stay free.",
    getHotels: "Get hotel options",
    startingFrom: "Starting from",
    loading: "Loading…",
    excessNote: "Excess distance beyond the driver's daily allowance may incur additional charges.",
    hotelsSent: "Thanks! We'll follow up within 24 hours with hotel options for your trip.",
    hotelsIntro: "Leave your details and we'll put together hotel options to go with your driver.",
    name: "Your name",
    email: "Your email",
    phone: "Your WhatsApp number",
    phoneHint: "Your WhatsApp number with country code.",
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
    bookingEyebrow: "Réserver ce voyage",
    bookingTitle: "Cet itinéraire vous plaît ?",
    bookingText: "Choisissez comment le réserver.",
    optDriverTitle: "Chauffeur seulement",
    optDriverText: "Un chauffeur privé et son véhicule pour tout le voyage. Vous réservez vos hôtels vous-même.",
    perDay: "par jour",
    totalFor: (amount, n) => `${amount} au total pour ${n} ${n === 1 ? "jour" : "jours"}`,
    fitsGroup: (n) => `Véhicules pour ${n} ${n === 1 ? "voyageur" : "voyageurs"}`,
    seeDrivers: "Voir les chauffeurs disponibles",
    optHotelsTitle: "Chauffeur + hôtels",
    optHotelsText: "Votre chauffeur, plus des hôtels sélectionnés pour chaque nuit, envoyés sous 24 heures.",
    hotelsEstimate: (min, max, nights) => `Hôtels : environ ${min} – ${max} au total pour ${nights} ${nights === 1 ? "nuit" : "nuits"}`,
    perNight: "par nuit",
    party: (adults, children) =>
      `pour ${adults} ${adults === 1 ? "adulte" : "adultes"}${children ? ` et ${children} ${children === 1 ? "enfant" : "enfants"}` : ""}`,
    under6Free: "Gratuit pour les enfants de moins de 6 ans.",
    getHotels: "Recevoir des propositions d'hôtels",
    startingFrom: "À partir de",
    loading: "Chargement…",
    excessNote: "Les kilomètres au-delà du forfait journalier du chauffeur peuvent entraîner des frais supplémentaires.",
    hotelsSent: "Merci ! Nous vous enverrons des propositions d'hôtels pour votre voyage sous 24 heures.",
    hotelsIntro: "Laissez-nous vos coordonnées et nous vous proposerons des hôtels en complément de votre chauffeur.",
    name: "Votre nom",
    email: "Votre e-mail",
    phone: "Votre numéro WhatsApp",
    phoneHint: "Votre numéro WhatsApp avec l'indicatif du pays.",
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

export default function ItineraryResult({ data, searchParams, onReset, locale = "en", party }) {
  const t = STRINGS[locale] || STRINGS.en;
  const fmtDate = (iso) => formatDayDate(iso, t.dateLocale);
  const [hotelsFlow, setHotelsFlow] = useState("idle"); // idle | form | submitting | sent | error
  const [contact, setContact] = useState(emptyContact);
  // same currency as the /search driver cards: € on the French site, $ otherwise
  const currency = locale === "fr" ? "EUR" : "USD";
  const [exchangeRate, setExchangeRate] = useState(null); // LKR → currency
  const [usdRate, setUsdRate] = useState(currency === "USD" ? 1 : null); // USD → currency (hotel prices are in USD)

  // driverPriceFrom (data/drivers.js's pricePerDay) is denominated in LKR —
  // same LKR → USD conversion DriverCard.jsx does for the /search results,
  // so the number shown here matches what a driver's card actually quotes.
  useEffect(() => {
    let cancelled = false;

    async function fetchExchangeRate() {
      try {
        const response = await fetch(`https://api.frankfurter.dev/v2/rate/LKR/${currency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rate");
        const result = await response.json();
        if (!cancelled) setExchangeRate(result.rate);

        if (currency !== "USD") {
          const usdResponse = await fetch(`https://api.frankfurter.dev/v2/rate/USD/${currency}`);
          if (!usdResponse.ok) throw new Error("Failed to fetch exchange rate");
          const usdResult = await usdResponse.json();
          if (!cancelled) setUsdRate(usdResult.rate);
        }
      } catch (error) {
        console.error("Exchange rate error:", error);
      }
    }

    fetchExchangeRate();
    return () => { cancelled = true; };
  }, [currency]);

  if (!data) return null;

  const { title, routeSummary, driverPriceFrom, accommodationEstimate, days = [], seasonalNotes = [] } = data;

  const money = (n) =>
    new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  const convertedPrice = exchangeRate && driverPriceFrom != null ? driverPriceFrom * exchangeRate : null;
  const formattedTotal = convertedPrice != null ? money(convertedPrice) : null;
  // hotel prices come from the API in USD
  const fromUsd = (n) => (usdRate != null ? money(n * usdRate) : null);

  // driverPriceFrom is the cheapest total for the whole trip (one day per
  // itinerary day, same formula as the /search cards) — also show it per day
  const tripDays = Math.max(1, days.length);
  const perDayPrice = convertedPrice != null ? money(convertedPrice / tripDays) : null;
  const perDayLkr = driverPriceFrom != null ? new Intl.NumberFormat("en-US").format(Math.round(driverPriceFrom / tripDays)) : null;

  const adults = party?.adults || 1;
  const childrenAges = party?.childrenAges || [];
  const groupSize = adults + childrenAges.length;
  const partyLabel = t.party(adults, childrenAges.length);
  const hasYoungChildren = childrenAges.some((age) => age < 6);
  const nights = days.filter((d) => d.stay).length;
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

      trackLead("itinerary_hotels", { days: days.length });
      setHotelsFlow("sent");
    } catch (err) {
      console.error("Failed to submit itinerary-with-hotels request:", err);
      setHotelsFlow("error");
    }
  }

  return (
    <div className="itinerary-result">

      <div className="itinerary-summary-card">
        <p className="itinerary-summary-label">{t.yourItinerary}</p>
        <h2>{title}</h2>
        {dateRange && <p className="itinerary-summary-dates">{dateRange}</p>}
        <p className="itinerary-summary-route">{routeSummary}</p>
      </div>

      {seasonalNotes.length > 0 && (
        <div className="itinerary-seasonal-notes">
          {seasonalNotes.map((note) => (
            <p key={note}>☀️ {note}</p>
          ))}
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

      {/* every day, top to bottom — easier to read on a phone than tabs */}
      {days.length > 0 && (
        <ol className="itinerary-timeline">
          {days.map((day, index) => (
            <li className="itinerary-timeline-day" key={day.label}>
              <span className="itinerary-timeline-marker" aria-hidden="true">{index + 1}</span>

              <div className="itinerary-timeline-body">
                <p className="itinerary-day-kicker">
                  {day.label} · {fmtDate(day.date)}
                  {day.location?.name && <> · {day.location.name}</>}
                </p>
                <h3>{day.title}</h3>

                {day.activities?.length > 0 && (
                  <ul className="itinerary-activities">
                    {day.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                )}

                <div className="itinerary-stay">
                  {day.stay ? (
                    <>
                      <p className="itinerary-stay-label">{t.suggestedStay}</p>
                      <p className="itinerary-stay-name">{day.stay.name}</p>
                      <p className="itinerary-stay-price">
                        {day.stay.priceUsd && usdRate != null
                          ? `${fromUsd(day.stay.priceUsd.min)} – ${fromUsd(day.stay.priceUsd.max)} ${t.perNight}`
                          : day.stay.price}
                        {" · "}
                        {partyLabel}
                      </p>
                      {day.stay.searchUrl && (
                        <a
                          href={day.stay.searchUrl}
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
            </li>
          ))}
        </ol>
      )}

      {/* booking options come after the whole itinerary, once it's been read */}
      <section className="itinerary-booking" aria-labelledby="itinerary-booking-title">
        <p className="itinerary-summary-label">{t.bookingEyebrow}</p>
        <h2 id="itinerary-booking-title">{t.bookingTitle}</h2>
        <p className="itinerary-booking-text">{t.bookingText}</p>

        <div className="itinerary-options">
          {/* option 1: driver only */}
          <div className="itinerary-option">
            <h3>{t.optDriverTitle}</h3>
            <p className="itinerary-option-text">{t.optDriverText}</p>

            <p className="itinerary-option-price">
              {t.startingFrom} <strong>{perDayPrice || t.loading}</strong> {t.perDay}
            </p>
            {perDayLkr && <p className="itinerary-option-sub">≈ LKR {perDayLkr} {t.perDay}</p>}
            {formattedTotal && (
              <p className="itinerary-option-sub">{t.totalFor(formattedTotal, tripDays)}</p>
            )}
            <p className="itinerary-option-sub">{t.fitsGroup(groupSize)}</p>
            <p className="itinerary-summary-price-note">{t.excessNote}</p>

            <Link href={bookDriverHref} className="itinerary-cta itinerary-cta-primary">
              {t.seeDrivers}{"\u00a0→"}
            </Link>
          </div>

          {/* option 2: driver + hotels */}
          <div className="itinerary-option">
            <h3>{t.optHotelsTitle}</h3>
            <p className="itinerary-option-text">{t.optHotelsText}</p>

            {accommodationEstimate && nights > 0 && usdRate != null && (
              <p className="itinerary-option-price itinerary-option-price-small">
                {t.hotelsEstimate(fromUsd(accommodationEstimate.min), fromUsd(accommodationEstimate.max), nights)}
              </p>
            )}
            <p className="itinerary-option-sub">
              {partyLabel}.{hasYoungChildren ? ` ${t.under6Free}` : ""}
            </p>

            {hotelsFlow !== "sent" && (
              <button
                type="button"
                className="itinerary-cta itinerary-cta-secondary"
                onClick={() => setHotelsFlow("form")}
                aria-expanded={hotelsFlow !== "idle"}
              >
                {t.getHotels}
              </button>
            )}
          </div>
        </div>

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
                <WhatsAppInput
                  value={contact.phone}
                  onChange={(phone) => setContact((c) => ({ ...c, phone }))}
                  required
                  locale={locale}
                />
                <span className="wa-hint">{t.phoneHint}</span>
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
      </section>

      <button type="button" className="itinerary-reset" onClick={onReset}>
        {t.planAnother}
      </button>

    </div>
  );
}
