"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  notifyAirportTransferCustomer,
  notifyAirportTransferAdmin,
} from "@/lib/notifications";
import "./AirportTransferForm.css";

// Quote-on-request airport transfer form (Bandaranaike International
// Airport). Unlike the day-hire flow there's no driver to pick and no
// drop-off date — the admin assigns a driver and replies with a price.
// Saved to bookingRequests (type "airport-transfer") next to the other
// booking types, and emailed to the admin with every detail inline.

const AIRPORT = "Bandaranaike International Airport (CMB)";

// Visitor-facing text only. The admin email stays in English either way
// (with the site language noted) so the inbox reads consistently.
const STRINGS = {
  en: {
    airport: AIRPORT,
    eyebrow: "AIRPORT TRANSFER · QUOTE ON REQUEST",
    title: "Book an airport transfer",
    directionLabel: "Transfer direction",
    fromAirport: "From the airport",
    toAirport: "To the airport",
    dropoffPlace: "Drop-off: hotel or address",
    pickupPlace: "Pickup: hotel or address",
    placePlaceholder: "e.g. Cinnamon Grand, Colombo 03",
    flightPlaceholder: "e.g. UL 504",
    returnFlightPlaceholder: "e.g. UL 503",
    arrivalDate: "Arrival date",
    pickupDate: "Pickup date",
    landsAt: "Flight lands at",
    pickupTime: "Pickup time",
    flightNumber: "Flight number",
    returnFlightNumber: "Return flight number",
    optional: "(optional)",
    passengers: "Passengers",
    select: "Select",
    largeBags: "Large bags",
    smallBags: "Small bags",
    returnToAirport: "I also need a transfer back to the airport",
    returnFromAirport: "I also need a pickup from the airport",
    returnPickupDate: "Return pickup date",
    yourDetails: "Your details",
    fullName: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    notes: "Anything else?",
    notesPlaceholder: "Child seats, extra stops, name sign for the driver…",
    error: "Couldn't send your request. Please try again.",
    sending: "We're sending your request…",
    submit: "Request a Quote",
    footnote:
      "No payment now. We'll reply within 24 hours with a price and your driver's details.",
    sentEyebrow: "REQUEST SENT",
    sentTitle: (name) => `Thanks, ${name}! We've got your transfer request.`,
    sentBody: (email) => (
      <>
        We&apos;ll email you at <strong>{email}</strong> within 24 hours with a
        quote and your driver&apos;s details.
      </>
    ),
    requestId: "Request ID:",
    customerSummary: (route, date, hasReturn) =>
      `${route} on ${date}${hasReturn ? ", with a return trip" : ""}`,
  },
  fr: {
    airport: "l'aéroport international Bandaranaike (CMB)",
    eyebrow: "TRANSFERT AÉROPORT · DEVIS SUR DEMANDE",
    title: "Réserver un transfert aéroport",
    directionLabel: "Sens du transfert",
    fromAirport: "Depuis l'aéroport",
    toAirport: "Vers l'aéroport",
    dropoffPlace: "Dépose : hôtel ou adresse",
    pickupPlace: "Prise en charge : hôtel ou adresse",
    placePlaceholder: "ex. Cinnamon Grand, Colombo 03",
    flightPlaceholder: "ex. UL 504",
    returnFlightPlaceholder: "ex. UL 503",
    arrivalDate: "Date d'arrivée",
    pickupDate: "Date de prise en charge",
    landsAt: "Heure d'atterrissage",
    pickupTime: "Heure de prise en charge",
    flightNumber: "Numéro de vol",
    returnFlightNumber: "Numéro du vol retour",
    optional: "(facultatif)",
    passengers: "Passagers",
    select: "Choisir",
    largeBags: "Grands bagages",
    smallBags: "Petits bagages",
    returnToAirport: "J'ai aussi besoin d'un transfert retour vers l'aéroport",
    returnFromAirport: "J'ai aussi besoin d'une prise en charge à l'aéroport",
    returnPickupDate: "Date de prise en charge retour",
    yourDetails: "Vos coordonnées",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    notes: "Autre chose ?",
    notesPlaceholder: "Sièges enfant, arrêts supplémentaires, pancarte à votre nom…",
    error: "Impossible d'envoyer votre demande. Veuillez réessayer.",
    sending: "Nous envoyons votre demande…",
    submit: "Demander un devis",
    footnote:
      "Aucun paiement maintenant. Nous vous répondrons sous 24 heures avec un prix et les coordonnées de votre chauffeur.",
    sentEyebrow: "DEMANDE ENVOYÉE",
    sentTitle: (name) => `Merci, ${name} ! Nous avons bien reçu votre demande de transfert.`,
    sentBody: (email) => (
      <>
        Nous vous écrirons à <strong>{email}</strong> sous 24 heures avec un
        devis et les coordonnées de votre chauffeur.
      </>
    ),
    requestId: "Numéro de demande :",
    customerSummary: (route, date, hasReturn) =>
      `${route}, le ${date}${hasReturn ? ", avec un trajet retour" : ""}`,
  },
};


const emptyForm = {
  direction: "from-airport", // from-airport | to-airport
  date: "",
  time: "",
  flight: "",
  place: "",
  passengers: "",
  largeBags: "",
  smallBags: "",
  returnTrip: false,
  returnDate: "",
  returnTime: "",
  returnFlight: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function AirportTransferForm({ defaultPlace = "", locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const [form, setForm] = useState({ ...emptyForm, place: defaultPlace });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [requestId, setRequestId] = useState(null);

  const set = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const fromAirport = form.direction === "from-airport";
  const minDate = tomorrowIso();

  // airportName: English for the admin email, localized for the customer's
  const legLine = (isReturn, airportName = AIRPORT) => {
    // the return leg runs the opposite way to the first one
    const outbound = isReturn ? !fromAirport : fromAirport;
    const place = form.place.trim();
    return outbound ? `${airportName} → ${place}` : `${place} → ${airportName}`;
  };

  const buildAdminDetails = () =>
    `
✈️ TRANSFER
Type: ${fromAirport ? "Airport pickup (arrival)" : "Airport drop-off (departure)"}
Route: ${legLine(false)}
Date: ${form.date}
${fromAirport ? "Flight lands at" : "Pickup time"}: ${form.time}
Flight number: ${form.flight.trim() || "Not provided"}

🔁 RETURN TRIP
${
  form.returnTrip
    ? `Route: ${legLine(true)}
Date: ${form.returnDate}
${fromAirport ? "Pickup time" : "Flight lands at"}: ${form.returnTime}
Flight number: ${form.returnFlight.trim() || "Not provided"}`
    : "Not needed"
}

🧳 PASSENGERS & LUGGAGE
Passengers: ${form.passengers}
Large bags: ${form.largeBags || "0"}
Small bags: ${form.smallBags || "0"}

👤 CUSTOMER
Name: ${form.name.trim()}
Email: ${form.email.trim()}
Phone: ${form.phone.trim()}
Site language: ${locale === "fr" ? "French" : "English"}

📝 NOTES
${form.notes.trim() || "None"}
`.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const contact = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    try {
      const docRef = await addDoc(collection(db, "bookingRequests"), {
        type: "airport-transfer",
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        direction: form.direction,
        airport: AIRPORT,
        place: form.place.trim(),
        date: form.date,
        time: form.time,
        flight: form.flight.trim(),
        returnTrip: form.returnTrip,
        returnDate: form.returnTrip ? form.returnDate : "",
        returnTime: form.returnTrip ? form.returnTime : "",
        returnFlight: form.returnTrip ? form.returnFlight.trim() : "",
        passengers: form.passengers,
        largeBags: form.largeBags || "0",
        smallBags: form.smallBags || "0",
        notes: form.notes.trim(),
        locale,
        fullTripDetails: buildAdminDetails(),
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      const summary = t.customerSummary(legLine(false, t.airport), form.date, form.returnTrip);

      await notifyAirportTransferCustomer(contact, summary, docRef.id, locale);
      await notifyAirportTransferAdmin(
        contact,
        buildAdminDetails(),
        docRef.id,
        `New airport transfer: ${contact.name}, ${form.date} (${fromAirport ? "arrival" : "departure"})`
      );

      setRequestId(docRef.id);
      setStatus("sent");
    } catch (err) {
      console.error("Failed to send airport transfer request:", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="atf-card atf-sent" role="status">
        <p className="atf-eyebrow">{t.sentEyebrow}</p>
        <h3>{t.sentTitle(form.name.trim().split(" ")[0])}</h3>
        <p>{t.sentBody(form.email.trim())}</p>
        <p className="atf-small">{t.requestId} {requestId}</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="atf-card" onSubmit={handleSubmit}>
      <p className="atf-eyebrow">{t.eyebrow}</p>
      <h3 className="atf-title">{t.title}</h3>

      <div className="atf-toggle" role="radiogroup" aria-label={t.directionLabel}>
        <label className={fromAirport ? "is-active" : ""}>
          <input
            type="radio"
            name="direction"
            value="from-airport"
            checked={fromAirport}
            onChange={set("direction")}
          />
          {t.fromAirport}
        </label>
        <label className={!fromAirport ? "is-active" : ""}>
          <input
            type="radio"
            name="direction"
            value="to-airport"
            checked={!fromAirport}
            onChange={set("direction")}
          />
          {t.toAirport}
        </label>
      </div>

      <div className="atf-grid">
        <label className="atf-field atf-span-2">
          <span>{fromAirport ? t.dropoffPlace : t.pickupPlace}</span>
          <input
            required
            value={form.place}
            onChange={set("place")}
            placeholder={t.placePlaceholder}
          />
        </label>

        <label className="atf-field">
          <span>{fromAirport ? t.arrivalDate : t.pickupDate}</span>
          <input required type="date" min={minDate} value={form.date} onChange={set("date")} />
        </label>

        <label className="atf-field">
          <span>{fromAirport ? t.landsAt : t.pickupTime}</span>
          <input required type="time" value={form.time} onChange={set("time")} />
        </label>

        <label className="atf-field atf-span-2">
          <span>{t.flightNumber} <em>{t.optional}</em></span>
          <input
            value={form.flight}
            onChange={set("flight")}
            placeholder={t.flightPlaceholder}
            autoCapitalize="characters"
          />
        </label>

        <label className="atf-field">
          <span>{t.passengers}</span>
          <select required value={form.passengers} onChange={set("passengers")}>
            <option value="" disabled>{t.select}</option>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <div className="atf-pair">
          <label className="atf-field">
            <span>{t.largeBags}</span>
            <input type="number" min="0" max="30" value={form.largeBags} onChange={set("largeBags")} placeholder="0" />
          </label>
          <label className="atf-field">
            <span>{t.smallBags}</span>
            <input type="number" min="0" max="30" value={form.smallBags} onChange={set("smallBags")} placeholder="0" />
          </label>
        </div>

        <label className="atf-check atf-span-2">
          <input type="checkbox" checked={form.returnTrip} onChange={set("returnTrip")} />
          {fromAirport ? t.returnToAirport : t.returnFromAirport}
        </label>

        {form.returnTrip && (
          <>
            <label className="atf-field">
              <span>{fromAirport ? t.returnPickupDate : t.arrivalDate}</span>
              <input
                required
                type="date"
                min={form.date || minDate}
                value={form.returnDate}
                onChange={set("returnDate")}
              />
            </label>
            <label className="atf-field">
              <span>{fromAirport ? t.pickupTime : t.landsAt}</span>
              <input required type="time" value={form.returnTime} onChange={set("returnTime")} />
            </label>
            <label className="atf-field atf-span-2">
              <span>{t.returnFlightNumber} <em>{t.optional}</em></span>
              <input
                value={form.returnFlight}
                onChange={set("returnFlight")}
                placeholder={t.returnFlightPlaceholder}
                autoCapitalize="characters"
              />
            </label>
          </>
        )}

        <p className="atf-divider atf-span-2">{t.yourDetails}</p>

        <label className="atf-field atf-span-2">
          <span>{t.fullName}</span>
          <input required value={form.name} onChange={set("name")} autoComplete="name" />
        </label>

        <label className="atf-field">
          <span>{t.email}</span>
          <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" />
        </label>

        <label className="atf-field">
          <span>{t.phone}</span>
          <input required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
        </label>

        <label className="atf-field atf-span-2">
          <span>{t.notes} <em>{t.optional}</em></span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={set("notes")}
            placeholder={t.notesPlaceholder}
          />
        </label>
      </div>

      {status === "error" && (
        <p className="atf-error">{t.error}</p>
      )}

      <button type="submit" className="atf-submit" disabled={submitting} aria-busy={submitting}>
        {submitting && <span className="btn-spinner" aria-hidden="true" />}
        {submitting ? t.sending : t.submit}
      </button>

      <p className="atf-small">{t.footnote}</p>
    </form>
  );
}
