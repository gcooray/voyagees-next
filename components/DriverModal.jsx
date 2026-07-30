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
  pickup,
  dropoff,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  itinerary,
  onClose
}) {
  const router = useRouter();

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

  // FULL DETAILS

  const generateFullTripDetails = () => {
    return `
🚗 Driver: ${driver?.name || "N/A"}

Languages:
${driver?.languages?.join(", ") || "N/A"}

Vehicle:
${driver?.carMake || ""} ${driver?.carModel || ""} (${driver?.carYear || "N/A"})

Passengers:
${driver?.seats || "N/A"}

Daily Price:
LKR ${(
      pricePerDay *
      (1 + commissionPercent / 100)
    ).toFixed(2)}

Total Price:
LKR ${finalTotalPrice.toFixed(2)}

📅 Trip Details

Pickup:
${pickupDate || "N/A"} at ${
      pickupTime || "N/A"
    }

Dropoff:
${dropoffDate || "N/A"} at ${
      dropoffTime || "N/A"
    }

Pickup Location:
${pickup || "N/A"}

Dropoff Location:
${dropoff || "N/A"}

Trip Length:
${numberOfDays} day${
      numberOfDays > 1 ? "s" : ""
    }

Included KM:
${totalKm} km

✅ INCLUDED
• Fuel
• Parking
• Toll charges
${
  accommodationIncluded
    ? "• Driver accommodation"
    : ""
}

❌ NOT INCLUDED
• Extra KM beyond ${totalKm} km
${
  !accommodationIncluded
    ? `• Driver accommodation – LKR ${
        driver?.dailyAccommodationPrice ||
        "N/A"
      } per day`
    : ""
}

📌 AFTER THE RENTAL
Fees may apply if extra KM used
${
  !accommodationIncluded
    ? "or if driver accommodation wasn’t arranged."
    : ""
}

🗺️ Itinerary:
${itinerary?.name || "None selected"}

${
  itinerary?.stops
    ?.map(
      (stop) =>
        `• ${stop.name}: ${
          stop.activities?.join(", ") ||
          "No activities listed"
        }`
    )
    .join("\n") || ""
}
    `;
  };

  // HANDLE REQUEST

  const handleRequest = async () => {
    try {
      setLoading(true);

      // SAVE SAFE VALUES ONLY

      const requestData = {
        driverId: driver?.id || "",

        driverName:
          driver?.name || "",

        driverEmail:
          driver?.email || "",

        pickup: pickup || "",

        dropoff: dropoff || "",

        pickupDate:
          pickupDate || "",

        pickupTime:
          pickupTime || "",

        dropoffDate:
          dropoffDate || "",

        dropoffTime:
          dropoffTime || "",

        itinerary:
          itinerary || null,

        totalPrice:
          finalTotalPrice || 0,

        status: "pending",

        createdAt:
          serverTimestamp(),

        fullTripDetails:
          generateFullTripDetails() || ""
      };

      // SAVE TO FIRESTORE

      await addDoc(
        collection(
          db,
          "bookingRequests"
        ),
        requestData
      );

      // SEND TO REQUEST PAGE

      const params =
        new URLSearchParams({
          driver: encodeURIComponent(
            JSON.stringify(driver)
          ),

          pickup:
            pickup || "",

          dropoff:
            dropoff || "",

          pickupDate:
            pickupDate || "",

          pickupTime:
            pickupTime || "",

          dropoffDate:
            dropoffDate || "",

          dropoffTime:
            dropoffTime || "",

          commissionPercent:
            String(
              commissionPercent
            ),

          fullTripDetails:
            generateFullTripDetails(),

          itinerary:
            itinerary
              ? encodeURIComponent(
                  JSON.stringify(
                    itinerary
                  )
                )
              : ""
        });

      router.push(
        `/request?${params.toString()}`
      );
    } catch (error) {
      console.error(
        "Booking request error:",
        error
      );

      alert(
        "Failed to send request"
      );
    } finally {
      setLoading(false);
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
            <User size={18} /> Driver
            Details
          </h3>

          <p>
            <strong>Name:</strong>{" "}
            {driver.name}
          </p>

          <p>
            <strong>
              Languages Spoken:
            </strong>{" "}
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
            <strong>About me:</strong>{" "}
            {driver.about ||
              "No description provided."}
          </p>
        </div>

        {/* CAR DETAILS */}

        <div className="modal-section">
          <h3>
            <Car size={18} /> Car
            Details
          </h3>

          <p>
            <strong>
              Make & Year:
            </strong>{" "}
            {driver.carMake}{" "}
            {driver.carModel} -{" "}
            {driver.carYear}
          </p>

          <p>
            <strong>
              Passengers:
            </strong>{" "}
            {driver.seats}
          </p>

          <p>
            <strong>
              Luggage:
            </strong>{" "}
            {
              driver.luggageCapacity
            }
          </p>

          <p>
            <strong>
              Description:
            </strong>{" "}
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
            <Info size={18} /> Trip
            Details
          </h3>

          <p>
            <CalendarDays size={16} />{" "}
            <strong>
              Pickup:
            </strong>{" "}
            {pickupDate} at{" "}
            {pickupTime ||
              "N/A"}
          </p>

          <p>
            <CalendarDays size={16} />{" "}
            <strong>
              Dropoff:
            </strong>{" "}
            {dropoffDate} at{" "}
            {dropoffTime ||
              "N/A"}
          </p>

          <p>
            <strong>
              Trip Length:
            </strong>{" "}
            {numberOfDays}{" "}
            {numberOfDays > 1
              ? "days"
              : "day"}
          </p>

          <p>
            <strong>
              Daily Price:
            </strong>{" "}
            LKR{" "}
            {(
              pricePerDay *
              (1 +
                commissionPercent /
                  100)
            ).toFixed(2)}
          </p>

          <p>
            <strong>
              Total Price:
            </strong>{" "}
            LKR{" "}
            {finalTotalPrice.toFixed(
              2
            )}
          </p>

          <p>
            <strong>
              Included KM:
            </strong>{" "}
            {totalKm} km
          </p>

          <br />

          <p>
            <CheckCircle
              size={16}
            />{" "}
            <strong>
              INCLUDED
            </strong>
          </p>

          <ul>
            <li>
              {totalKm} km
            </li>

            <li>
              <Fuel size={14} />{" "}
              Fuel
            </li>

            <li>
              Toll charges
            </li>

            <li>Parking</li>

            {accommodationIncluded && (
              <li>
                Driver
                accommodation
                included
              </li>
            )}
          </ul>

          <br />

          <p>
            <XCircle
              size={16}
            />{" "}
            <strong>
              NOT INCLUDED
            </strong>
          </p>

          <ul>
            <li>
              Distance over{" "}
              {totalKm} km — LKR{" "}
              {extraKm}/km
            </li>

            {!accommodationIncluded && (
              <li>
                Driver
                accommodation
                not included —
                LKR{" "}
                {driver.dailyAccommodationPrice ||
                  "N/A"}{" "}
                per day
              </li>
            )}
          </ul>

          <br />

          <p className="icon-info">
            <Info />{" "}
            <strong>
              AFTER THE RENTAL
            </strong>
          </p>

          <p>
            Fees may apply if
            your tour exceeds
            included KM
            {!accommodationIncluded
              ? " or if driver accommodation wasn’t provided."
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
            {loading
              ? "Loading..."
              : "Continue Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}