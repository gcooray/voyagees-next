"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "firebase/firestore";

import {
  MapPin,
  CalendarDays,
  Car,
  User,
  Fuel,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

import "./DriverModal.css";

export default function DriverModal({
  driver,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  itinerary,
  locale = "en",
  onClose
}) {
  const router = useRouter();

const isFrench = locale === "fr";

const t = {
  driverDetails: isFrench ? "Détails du chauffeur" : "Driver Details",
  name: isFrench ? "Nom" : "Name",
  languages: isFrench ? "Langues parlées" : "Languages Spoken",
  about: isFrench ? "À propos de moi" : "About me",
  noDescription: isFrench
    ? "Aucune description disponible."
    : "No description provided.",

  carDetails: isFrench ? "Détails du véhicule" : "Car Details",
  makeYear: isFrench ? "Marque et année" : "Make & Year",
  passengers: isFrench ? "Passagers" : "Passengers",
  luggage: isFrench ? "Bagages" : "Luggage",
  description: isFrench ? "Description" : "Description",

  tripDetails: isFrench ? "Détails du voyage" : "Trip Details",
  pickup: isFrench ? "Départ" : "Pickup",
  dropoff: isFrench ? "Arrivée" : "Dropoff",
  tripLength: isFrench ? "Durée du voyage" : "Trip Length",
  day: isFrench ? "jour" : "day",
  days: isFrench ? "jours" : "days",
  dailyPrice: isFrench ? "Prix par jour" : "Daily Price",
  totalPrice: isFrench ? "Prix total" : "Total Price",
  includedKm: isFrench ? "Kilomètres inclus" : "Included KM",

  included: isFrench ? "INCLUS" : "INCLUDED",
  notIncluded: isFrench ? "NON INCLUS" : "NOT INCLUDED",

  fuel: isFrench ? "Carburant" : "Fuel",
  parking: isFrench ? "Stationnement" : "Parking",
  tolls: isFrench ? "Péages" : "Toll charges",
  accommodation: isFrench
    ? "Hébergement du chauffeur"
    : "Driver accommodation",

  extraDistance: isFrench
    ? "Distance au-delà de"
    : "Distance over",

  perKm: isFrench ? "par km" : "per km",
  perDay: isFrench ? "par jour" : "per day",

  afterRental: isFrench
    ? "APRÈS LA LOCATION"
    : "AFTER THE RENTAL",

  feesMayApply: isFrench
    ? "Des frais supplémentaires peuvent s'appliquer si votre voyage dépasse les kilomètres inclus"
    : "Fees may apply if your tour exceeds included KM",

  accommodationNotProvided: isFrench
    ? "ou si l'hébergement du chauffeur n'a pas été prévu."
    : "or if driver accommodation wasn’t provided.",

  selectedItinerary: isFrench
    ? "Itinéraire sélectionné"
    : "Selected Itinerary",

  noActivities: isFrench
    ? "Aucune activité indiquée"
    : "No activities listed",

  continueBooking: isFrench
    ? "Continuer la réservation"
    : "Continue Booking",

  loading: isFrench ? "Chargement..." : "Loading...",

  failedRequest: isFrench
    ? "Échec de l'envoi de la demande"
    : "Failed to send request",
};

  const [commissionPercent, setCommissionPercent] =
    useState(10);

  const [loading, setLoading] = useState(false);

  // FETCH COMMISSION

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const docRef = doc(
          db,
          "platformSettings",
          "commission"
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCommissionPercent(
            docSnap.data().value || 10
          );
        }
      } catch (error) {
        console.error(
          "Error fetching commission:",
          error
        );
      }
    };

    fetchCommission();
  }, []);

  if (!driver) return null;

  // CALCULATIONS

  const getNumberOfDays = () => {
    const pickupD = new Date(pickupDate);
    const dropoffD = new Date(dropoffDate);

    const diff = dropoffD - pickupD;

    return Math.max(
      1,
      Math.floor(
        diff / (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  const numberOfDays = getNumberOfDays();

  const pricePerDay =
    Number(driver.pricePerDay) || 0;

  const baseTotal =
    pricePerDay * numberOfDays;

  const commissionAmount =
    (baseTotal * commissionPercent) / 100;

  const finalTotalPrice =
    baseTotal + commissionAmount;

  const dailyKm =
    Number(driver.dailyKm) || 150;

  const totalKm =
    dailyKm * numberOfDays;

  const extraKm =
    Number(driver.extraKm) || 0;

  const accommodationIncluded =
    driver.accommodationIncluded === true;

  // HANDLE REQUEST

const handleRequest = () => {
  try {
    const params = new URLSearchParams();

    params.set(
      "driverId",
      String(driver.id)
    );

    params.set(
      "pickupDate",
      pickupDate || ""
    );

    params.set(
      "pickupTime",
      pickupTime || ""
    );

    params.set(
      "dropoffDate",
      dropoffDate || ""
    );

    params.set(
      "dropoffTime",
      dropoffTime || ""
    );

    params.set(
      "commissionPercent",
      String(commissionPercent)
    );

    if (itinerary) {
      params.set(
        "itinerary",
        JSON.stringify(itinerary)
      );
    }

    router.push(
      `/request?${params.toString()}`
    );

  } catch (error) {
    console.error(
      "Request page error:",
      error
    );
  }
};

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close-button"
          onClick={onClose}
        >
          &times;
        </button>

        {/* DRIVER DETAILS */}

        <div className="modal-section">
          <h3>
  <User size={18} /> {t.driverDetails}
</h3>

          <p>
            <strong>{t.name}:</strong>
            {driver.name}
          </p>

          <p>
            <strong>{t.languages}:</strong>
            {driver.languages?.join(
              ", "
            ) || "N/A"}
          </p>

          {driver.driverPhoto && (
            <img
              src={driver.driverPhoto}
              alt={driver.name}
              style={{
                maxWidth: "20%",
                borderRadius:
                  "10px"
              }}
            />
          )}

          <p>
            <strong>{t.about}:</strong>
            {driver.about ||
              "No description provided."}
          </p>
        </div>

        {/* CAR DETAILS */}

        <div className="modal-section">
          <h3>
  <Car size={18} /> {t.carDetails}
</h3>

          <p>
            <strong>{t.makeYear}:</strong>
            {driver.carMake}{" "}
            {driver.carModel} -{" "}
            {driver.carYear}
          </p>

          <p>
            <strong>{t.passengers}:</strong>
            {driver.seats}
          </p>

          <p>
            <strong>{t.luggage}:</strong>
            {
              driver.luggageCapacity
            }
          </p>

          <p>
            <strong>{t.description}:</strong>
            {driver.carDescription ||
              "No description provided."}
          </p>

          {driver.carImages
            ?.length > 0 && (
            <div className="car-images-scroll">
              {driver.carImages.map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`car-${i}`}
                    className="car-image"
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* TRIP DETAILS */}

        <div className="modal-section">
          <h3>
  <Info size={18} /> {t.tripDetails}
</h3>

          <p>
            <CalendarDays size={16} />{" "}
            <strong>{t.pickup}:</strong>
            {pickupDate} at{" "}
            {pickupTime ||
              "N/A"}
          </p>

          <p>
            <CalendarDays size={16} />{" "}
            <strong>{t.dropoff}:</strong>
            {dropoffDate} at{" "}
            {dropoffTime ||
              "N/A"}
          </p>

          <p>
            <strong>{t.tripLength}:</strong>
            {numberOfDays}{" "}
            {numberOfDays > 1
              ? "days"
              : "day"}
          </p>

          <p>
            <strong>{t.dailyPrice}:</strong>
            LKR{" "}
            {(
              pricePerDay *
              (1 +
                commissionPercent /
                  100)
            ).toFixed(2)}
          </p>

          <p>
            <strong>{t.totalPrice}:</strong>
            LKR{" "}
            {finalTotalPrice.toFixed(
              2
            )}
          </p>

          <p>
            <strong>{t.includedKm}:</strong>
            {totalKm} km
          </p>

          <br />

          <p>
  <CheckCircle size={16} />{" "}
  <strong>{t.included}</strong>
</p>

<ul>
  <li>{totalKm} km</li>

  <li>
    <Fuel size={14} /> {t.fuel}
  </li>

  <li>{t.tolls}</li>

  <li>{t.parking}</li>

  {accommodationIncluded && (
    <li>{t.accommodation} inclus</li>
  )}
</ul>

          <br />

          <p>
  <XCircle size={16} />{" "}
  <strong>{t.notIncluded}</strong>
</p>

<ul>
  <li>
    {t.extraDistance} {totalKm} km — LKR{" "}
    {extraKm}/{t.perKm}
  </li>

  {!accommodationIncluded && (
    <li>
      {t.accommodation} non inclus — LKR{" "}
      {driver.dailyAccommodationPrice || "N/A"}{" "}
      {t.perDay}
    </li>
  )}
</ul>

          <br />

          <p className="icon-info">
  <Info />{" "}
  <strong>{t.afterRental}</strong>
</p>

<p>
  {t.feesMayApply}
  {!accommodationIncluded
    ? ` ${t.accommodationNotProvided}`
    : "."}
</p>
        </div>

        {/* ITINERARY */}

        {itinerary && (
          <div className="modal-section">
            <h3>
              <MapPin size={18} />{" "}
              Selected
              Itinerary
            </h3>

            <p>
              <strong>
                {itinerary.name}
              </strong>
            </p>

            <ul>
              {itinerary.stops.map(
                (
                  stop,
                  index
                ) => (
                  <li
                    key={index}
                  >
                    <strong>
                      {stop.name}
                    </strong>
                    :{" "}
                    {stop.activities?.join(
                      ", "
                    ) ||
                      "No activities listed"}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* BUTTON */}

        <div className="modal-button-wrapper">
          <button
            className="request-button"
            onClick={
              handleRequest
            }
            disabled={loading}
          >
            {loading ? t.loading : t.continueBooking}
          </button>
        </div>
      </div>
    </div>
  );
}