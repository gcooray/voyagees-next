"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchForm from "./SearchForm";

export default function DriverSearch() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [passengers, setPassengers] = useState("");

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      pickup,
      dropoff,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      passengers,
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <SearchForm
      pickup={pickup}
      dropoff={dropoff}
      pickupDate={pickupDate}
      dropoffDate={dropoffDate}
      pickupTime={pickupTime}
      dropoffTime={dropoffTime}
      passengers={passengers}
      setPickup={setPickup}
      setDropoff={setDropoff}
      setPickupDate={setPickupDate}
      setDropoffDate={setDropoffDate}
      setPickupTime={setPickupTime}
      setDropoffTime={setDropoffTime}
      setPassengers={setPassengers}
      handleSearch={handleSearch}
    />
  );
}