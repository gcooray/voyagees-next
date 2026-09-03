"use client";

import { useEffect, useState } from "react";
import "./DriverCard.css";

const languageFlags = {
  English: "🇬🇧",
  Sinhala: "🇱🇰",
  Tamil: "🇱🇰",
  Hindi: "🇮🇳",
  French: "🇫🇷",
  German: "🇩🇪",
  Arabic: "🇸🇦",
};

export default function DriverCard({
  driver,
  pickupDate,
  dropoffDate,
  locale = "en",
  onSelect,
}) {
  const [exchangeRate, setExchangeRate] = useState(null);

  const start = new Date(pickupDate);
  const end = new Date(dropoffDate);

  // Prevent NaN issues if dates are empty
  let tripDays = 1;

  if (pickupDate && dropoffDate) {
    tripDays = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    );
  }

  const basePrice = (driver.pricePerDay || 0) * tripDays;
  const commissionPercent = driver.commissionPercent || 10;
  const totalPrice = basePrice + (basePrice * commissionPercent) / 100;

  const carImage = driver.carImages?.[0] || "/images/default-car.jpg";

  // Get current LKR → USD/EUR exchange rate
  useEffect(() => {
    let cancelled = false;

    async function fetchExchangeRate() {
      try {
        const currency = locale === "fr" ? "EUR" : "USD";

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/LKR/${currency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const data = await response.json();

        if (!cancelled) {
          setExchangeRate(data.rate);
        }
      } catch (error) {
        console.error("Exchange rate error:", error);
      }
    }

    fetchExchangeRate();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const convertedPrice = exchangeRate
    ? totalPrice * exchangeRate
    : null;

  const currency = locale === "fr" ? "EUR" : "USD";

  const formattedConvertedPrice =
    convertedPrice !== null
      ? new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(convertedPrice)
      : null;

  const formattedLKR = new Intl.NumberFormat("en-US").format(totalPrice);

  return (
    <div className="driver-card" onClick={() => onSelect(driver)}>
      <div
        className="car-image"
        style={{ backgroundImage: `url(${carImage})` }}
      >
        <div className="driver-photo-wrapper">
          <img
            className="driver-photo"
            src={driver.driverPhoto}
            alt={driver.name}
          />
        </div>
      </div>

      <div className="driver-info">
        <h3>{driver.name}</h3>

        <p>
          {driver.carMake} - {driver.carYear}
        </p>

        <p>
          {driver.vehicleType}
        </p>

        <p>{driver.seats} seats</p>

        <p>
          {locale === "fr" ? "Durée du voyage" : "Trip length"}:{" "}
          {tripDays}{" "}
          {tripDays > 1
            ? locale === "fr"
              ? "jours"
              : "days"
            : locale === "fr"
              ? "jour"
              : "day"}
        </p>

        <p>
          <strong>
            {locale === "fr" ? "Prix total" : "Total Price"}:
          </strong>{" "}
          {formattedConvertedPrice || "Loading..."}
        </p>

        {convertedPrice !== null && (
          <p className="lkr-price">
            ≈ LKR {formattedLKR}
          </p>
        )}

        <p>
          <strong>
            {locale === "fr" ? "Langues" : "Languages"}:
          </strong>{" "}
          {driver.languages?.map((lang) => (
            <span key={lang} title={lang}>
              {languageFlags[lang] || lang}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}