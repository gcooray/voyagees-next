"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import DriverList from "@/components/DriverList";
import DriverModal from "@/components/DriverModal";
import { drivers } from "@/data/drivers";

export default function DriversPage() {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const searchParams = useSearchParams();

  const pickup = searchParams.get("pickup")?.toLowerCase() || "";
  const dropoff = searchParams.get("dropoff")?.toLowerCase() || "";
  const pickupDate = searchParams.get("pickupDate");
  const dropoffDate = searchParams.get("dropoffDate");

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      // 1. LOCATION FILTER
      const locationMatch =
        !pickup ||
        driver.location.toLowerCase().includes(pickup) ||
        driver.location.toLowerCase().includes(dropoff);

      // 2. DATE FILTER
      const availableFrom = new Date(driver.availableFrom);
      const availableTo = new Date(driver.availableTo);

      const requestedStart = pickupDate ? new Date(pickupDate) : null;
      const requestedEnd = dropoffDate ? new Date(dropoffDate) : null;

      const dateMatch =
        !requestedStart ||
        !requestedEnd ||
        (availableFrom <= requestedStart && availableTo >= requestedEnd);

      return locationMatch && dateMatch;
    });
  }, [pickup, dropoff, pickupDate, dropoffDate]);

  return (
    <div>
      <DriverList
        drivers={filteredDrivers}
        pickupDate={pickupDate}
        dropoffDate={dropoffDate}
        onSelect={(driver) => setSelectedDriver(driver)}
      />

      {selectedDriver && (
        <DriverModal
          driver={selectedDriver}
          pickupDate={pickupDate}
          dropoffDate={dropoffDate}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
}