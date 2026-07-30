"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import emailjs from "@emailjs/browser";

import "./page.css";

export default function RequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeParse = (value) => {
    try {
      return value ? JSON.parse(decodeURIComponent(value)) : null;
    } catch {
      return null;
    }
  };

  const driver = safeParse(searchParams.get("driver"));
  const itinerary = safeParse(searchParams.get("itinerary"));

  const pickup = searchParams.get("pickup") || "";
  const dropoff = searchParams.get("dropoff") || "";

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

  useEffect(() => {
    if (!driver || !pickupDate || !dropoffDate) {
      router.push("/");
    }
  }, [driver, pickupDate, dropoffDate, router]);

  if (!driver) return null;

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

  const tripDetails =
    (
      fullTripDetails ||
      `
🚗 Driver: ${driver.name}

Pickup: ${pickupDate} at ${pickupTime || "N/A"}
Dropoff: ${dropoffDate} at ${dropoffTime || "N/A"}

Days: ${tripDays}
Total: LKR ${totalPrice.toFixed(2)}

Included KM: ${includedKm} km
`
    ).trim() + itineraryDetails;

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      alert("Please fill all fields");
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
        "service_4hh4h0u",
        "template_c3d2ptc",
        {
          user_name: fullName,
          user_email: email,
          message:
            "We received your booking request. Our team will confirm within 24 hours.",
          request_id: id,
          to_email: email,
        },
        "2yniBPKBPCO0Lvw2X"
      );

      // ---------------- ADMIN EMAIL ----------------
      await emailjs.send(
        "service_4hh4h0u",
        "template_c3d2ptc",
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
        "2yniBPKBPCO0Lvw2X"
      );

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SUCCESS PAGE ----------------
  if (success) {
    return (
      <div className="request-page success">
        <h1>🎉 Request Sent!</h1>

        <p>We received your booking request.</p>

        <p>
          Request ID: <b>{requestId}</b>
        </p>

        <button onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  // ---------------- PAGE UI ----------------
  return (
    <div className="request-page">

      {/* ---------------- BOOKING OVERVIEW ---------------- */}
      <div className="booking-overview">
        <h3>Booking Overview</h3>

        <div className="overview-grid">

          <div>
            <span>Driver</span>
            <strong>{driver.name}</strong>
          </div>

          <div>
            <span>Total Cost</span>
            <strong>
              LKR {totalPrice.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>Pickup Date</span>
            <strong>{pickupDate}</strong>
          </div>

          <div>
            <span>Dropoff Date</span>
            <strong>{dropoffDate}</strong>
          </div>

          <div>
            <span>Included KM</span>
            <strong>{includedKm} km</strong>
          </div>

          <div>
            <span>Trip Duration</span>
            <strong>{tripDays} days</strong>
          </div>

        </div>
      </div>

      {/* ---------------- FORM ---------------- */}
      <form
        onSubmit={handleSubmit}
        className="trip-description-form"
      >
        <h2>Send Booking Request</h2>

        <input
          required
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          required
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          required
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          required
          rows={6}
          placeholder="Additional trip details or requests"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button disabled={loading}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}