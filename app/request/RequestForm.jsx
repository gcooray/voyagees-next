"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { drivers } from "@/data/drivers";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import emailjs from "@emailjs/browser";

import "./page.css";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BOOKING;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const STRINGS = {
  en: {
    unableTitle: "Unable to load booking details",
    unableBody: "Please go back and select a driver again.",
    fillRequired: "Please fill in your name, email, and phone number.",
    sendFailed: "Couldn't send your request. Please try again.",
    successTitle: "Request Sent!",
    successBody: "We received your booking request.",
    requestId: "Request ID:",
    backHome: "Back to Home",
    bookingOverview: "Booking Overview",
    driver: "Driver",
    totalCost: "Total Cost",
    pickupDate: "Pickup Date",
    dropoffDate: "Dropoff Date",
    includedKm: "Included KM",
    tripDuration: "Trip Duration",
    days: "days",
    sendBookingRequest: "Send Booking Request",
    yourJourney: "Your Journey",
    pickupLocation: "Pickup location",
    dropoffLocation: "Drop-off location",
    yourDetails: "Your Details",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    additionalDetails: "Additional trip details or requests",
    sending: "Sending...",
    sendRequest: "Send Request",
  },
  fr: {
    unableTitle: "Impossible de charger les détails de la réservation",
    unableBody: "Veuillez revenir en arrière et sélectionner un chauffeur à nouveau.",
    fillRequired: "Veuillez renseigner votre nom, e-mail et numéro de téléphone.",
    sendFailed: "Impossible d'envoyer votre demande. Veuillez réessayer.",
    successTitle: "Demande Envoyée !",
    successBody: "Nous avons bien reçu votre demande de réservation.",
    requestId: "Numéro de demande :",
    backHome: "Retour à l'accueil",
    bookingOverview: "Résumé de la Réservation",
    driver: "Chauffeur",
    totalCost: "Coût Total",
    pickupDate: "Date de Prise en Charge",
    dropoffDate: "Date de Retour",
    includedKm: "Kilométrage Inclus",
    tripDuration: "Durée du Voyage",
    days: "jours",
    sendBookingRequest: "Envoyer la Demande de Réservation",
    yourJourney: "Votre Trajet",
    pickupLocation: "Lieu de prise en charge",
    dropoffLocation: "Lieu de dépose",
    yourDetails: "Vos Coordonnées",
    fullName: "Nom Complet",
    email: "E-mail",
    phone: "Téléphone",
    additionalDetails: "Détails ou demandes supplémentaires concernant le voyage",
    sending: "Envoi en cours...",
    sendRequest: "Envoyer la Demande",
  },
};

export default function RequestPage({ locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Failed to parse driver:", error);
    return null;
  }
};

  const driverId = searchParams.get("driverId");

const driver = drivers.find(
  (d) => String(d.id) === String(driverId)
);
  const itinerary = safeParse(searchParams.get("itinerary"));

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const pickupDate = searchParams.get("pickupDate") || "";
  const pickupTime = searchParams.get("pickupTime") || "";

  const dropoffDate = searchParams.get("dropoffDate") || "";
  const dropoffTime = searchParams.get("dropoffTime") || "";

  const commissionPercent = Number(
    searchParams.get("commissionPercent") || 10
  );

  const fullTripDetails = searchParams.get("fullTripDetails") || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");


  if (!driver) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{t.unableTitle}</h2>
      <p>{t.unableBody}</p>
    </div>
  );
}

  // ---------------- PRICE ----------------
  const tripDays = Math.max(
    1,
    Math.ceil(
      (new Date(dropoffDate) - new Date(pickupDate)) /
        (1000 * 60 * 60 * 24)
    )
  );

  const basePrice = (driver.pricePerDay || 0) * tripDays;

  const totalPrice =
    basePrice + (basePrice * commissionPercent) / 100;

  const includedKm =
    tripDays * (driver.dailyKm || 150);

  // ---------------- TRIP DETAILS ----------------
  const itineraryDetails = itinerary?.name
    ? `\n\n🗺️ Itinerary: ${itinerary.name}\n${
        itinerary.stops
          ?.map(
            (s) =>
              `• ${s.name}: ${
                s.activities?.join(", ") || "No activities"
              }`
          )
          .join("\n") || ""
      }`
    : "";

  const tripDetails = `
🚗 Driver: ${driver.name}

📍 Pickup:
${pickup}

📍 Drop-off:
${dropoff}

📅 Pickup:
${pickupDate} at ${pickupTime || "N/A"}

📅 Drop-off:
${dropoffDate} at ${dropoffTime || "N/A"}

Days: ${tripDays}
Total: LKR ${totalPrice.toFixed(2)}

Included KM: ${includedKm} km
`.trim() + itineraryDetails;

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !phone) {
      setError(t.fillRequired);
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        driverId: driver.id || "",
        driverName: driver.name || "",

        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,

        pickup,
        dropoff,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,

        description: description || "",
        fullTripDetails: tripDetails,

        price: totalPrice,
        status: "Pending",
        createdAt: serverTimestamp(),
      };

      // ✅ SAVE TO FIRESTORE
      const docRef = await addDoc(
        collection(db, "bookingRequests"),
        requestData
      );

      const id = docRef.id;

      setRequestId(id);

      // ---------------- CUSTOMER EMAIL ----------------
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: fullName,
          user_email: email,
          message:
            "We received your booking request. Our team will confirm within 24 hours.",
          request_id: id,
          to_email: email,
        },
        EMAILJS_PUBLIC_KEY
      );

      // ---------------- ADMIN EMAIL ----------------
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: fullName,
          user_email: email,

          description: description || tripDetails,

          pickup_date: pickupDate,
          dropoff_date: dropoffDate,

          price: `LKR ${totalPrice.toFixed(2)}`,

          request_link: `${window.location.origin}/admin/bookings/${id}`,

          to_email: "contact@voyagees.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(t.sendFailed);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SUCCESS PAGE ----------------
  if (success) {
    return (
      <div className="request-page success">
        <h1>🎉 {t.successTitle}</h1>

        <p>{t.successBody}</p>

        <p>
          {t.requestId} <b>{requestId}</b>
        </p>

        <button onClick={() => router.push(locale === "fr" ? "/fr" : "/")}>
          {t.backHome}
        </button>
      </div>
    );
  }

  // ---------------- PAGE UI ----------------
  return (
    <div className="request-page">

      {/* ---------------- BOOKING OVERVIEW ---------------- */}
      <div className="booking-overview">
        <h3>{t.bookingOverview}</h3>

        <div className="overview-grid">

          <div>
            <span>{t.driver}</span>
            <strong>{driver.name}</strong>
          </div>

          <div>
            <span>{t.totalCost}</span>
            <strong>
              LKR {totalPrice.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>{t.pickupDate}</span>
            <strong>{pickupDate}</strong>
          </div>

          <div>
            <span>{t.dropoffDate}</span>
            <strong>{dropoffDate}</strong>
          </div>

          <div>
            <span>{t.includedKm}</span>
            <strong>{includedKm} km</strong>
          </div>

          <div>
            <span>{t.tripDuration}</span>
            <strong>{tripDays} {t.days}</strong>
          </div>

        </div>
      </div>

      {/* ---------------- FORM ---------------- */}
      <form
        onSubmit={handleSubmit}
        className="trip-description-form"
      >
        <h2>{t.sendBookingRequest}</h2>

<h3>{t.yourJourney}</h3>

<input
  required
  placeholder={t.pickupLocation}
  value={pickup}
  onChange={(e) => setPickup(e.target.value)}
/>

<input
  required
  placeholder={t.dropoffLocation}
  value={dropoff}
  onChange={(e) => setDropoff(e.target.value)}
/>

<h3>{t.yourDetails}</h3>

<input
  required
  placeholder={t.fullName}
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>

        <input
          required
          placeholder={t.email}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          required
          placeholder={t.phone}
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          required
          rows={6}
          placeholder={t.additionalDetails}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        {error && <p className="form-error">{error}</p>}

        <button disabled={loading}>
          {loading ? t.sending : t.sendRequest}
        </button>
      </form>
    </div>
  );
}