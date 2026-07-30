"use client";

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

export default function DriverCard({ driver, pickupDate, dropoffDate, onSelect }) {
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

        <p>{driver.seats} seats</p>

        <p>
          Trip length: {tripDays} {tripDays > 1 ? "days" : "day"}
        </p>

        <p>
          <strong>Total Price:</strong> LKR {totalPrice.toLocaleString()}
        </p>

        <p>
          Languages:{" "}
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