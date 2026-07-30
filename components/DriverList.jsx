"use client";

import DriverCard from "./DriverCard";
import "./DriverList.css";

export default function DriverList({ drivers, pickupDate, dropoffDate, onSelect }) {
  if (!drivers || drivers.length === 0) {
    return <p style={{ textAlign: "center" }}>No drivers found.</p>;
  }

  return (
    <div className="driver-list">
      {drivers.map((driver) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          pickupDate={pickupDate}
          dropoffDate={dropoffDate}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}