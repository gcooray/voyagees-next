"use client";

import DriverCard from "./DriverCard";
import "./DriverList.css";

export default function DriverList({
  drivers,
  pickupDate,
  dropoffDate,
  locale = "en",
  onSelect,
}) {
  if (!drivers || drivers.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        {locale === "fr"
          ? "Aucun chauffeur trouvé."
          : "No drivers found."}
      </p>
    );
  }

  return (
    <div className="driver-list">
      {drivers.map((driver) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          pickupDate={pickupDate}
          dropoffDate={dropoffDate}
          locale={locale}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}