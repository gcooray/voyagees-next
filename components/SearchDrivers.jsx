"use client";

import "./SearchDrivers.css";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import DriverList from "@/components/DriverList";
import DriverModal from "@/components/DriverModal";
import DriverFilters from "@/components/DriverFilters";

import { drivers } from "@/data/drivers";

export default function DriversPage({ locale = "en" }) {

  const [selectedDriver, setSelectedDriver] = useState(null);

  const [vehicleType, setVehicleType] = useState("");
  const [language, setLanguage] = useState("");
  const [passengers, setPassengers] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const searchParams = useSearchParams();

  const pickupDate = searchParams.get("pickupDate");
  const dropoffDate = searchParams.get("dropoffDate");
  const pickupTime = searchParams.get("pickupTime");
  const dropoffTime = searchParams.get("dropoffTime");


  /*
   * Create language list automatically
   * from your driver data.
   */

  const availableLanguages = useMemo(() => {

    const languages = new Set();

    drivers.forEach((driver) => {

      driver.languages?.forEach((lang) => {
        languages.add(lang);
      });

    });

    return Array.from(languages).sort();

  }, []);


  /*
   * Filter drivers
   */

  const filteredDrivers = useMemo(() => {

    return drivers.filter((driver) => {

      // -------------------------
      // DATE AVAILABILITY
      // -------------------------

      const availableFrom = new Date(driver.availableFrom);
      const availableTo = new Date(driver.availableTo);

      const requestedStart = pickupDate
        ? new Date(pickupDate)
        : null;

      const requestedEnd = dropoffDate
        ? new Date(dropoffDate)
        : null;

      const dateMatch =
        !requestedStart ||
        !requestedEnd ||
        (
          availableFrom <= requestedStart &&
          availableTo >= requestedEnd
        );


      // -------------------------
      // VEHICLE
      // -------------------------

      const vehicleMatch =
        !vehicleType ||
        driver.vehicleType === vehicleType;


      // -------------------------
      // LANGUAGE
      // -------------------------

      const languageMatch =
        !language ||
        driver.languages?.includes(language);


      // -------------------------
      // PASSENGERS
      // -------------------------

      const passengerMatch =
        !passengers ||
        driver.seats >= Number(passengers);


      // -------------------------
      // PRICE
      // -------------------------

      const priceMatch =
        (!minPrice || driver.pricePerDay >= Number(minPrice)) &&
        (!maxPrice || driver.pricePerDay <= Number(maxPrice));


      return (
        dateMatch &&
        vehicleMatch &&
        languageMatch &&
        passengerMatch &&
        priceMatch
      );

    });

  }, [
    pickupDate,
    dropoffDate,
    vehicleType,
    language,
    passengers,
    minPrice,
    maxPrice,
  ]);


  return (

    <div className="search-results-page">

      <div className="search-results-layout">

        {/* FILTERS */}

        <DriverFilters
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}

          language={language}
          setLanguage={setLanguage}

          passengers={passengers}
          setPassengers={setPassengers}

          minPrice={minPrice}
          setMinPrice={setMinPrice}

          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}

          availableLanguages={availableLanguages}
        />


        {/* RESULTS */}

        <div className="search-results-content">

          <div className="results-heading">

            <p>
              {filteredDrivers.length}{" "}
              {filteredDrivers.length === 1
                ? "driver"
                : "drivers"}{" "}
              available
            </p>

          </div>

          <DriverList
            drivers={filteredDrivers}
            pickupDate={pickupDate}
            dropoffDate={dropoffDate}
            locale={locale}
            onSelect={(driver) => setSelectedDriver(driver)}
          />

        </div>

      </div>


      {/* DRIVER MODAL */}

      {selectedDriver && (

        <DriverModal
          driver={selectedDriver}

          pickupDate={pickupDate}
          pickupTime={pickupTime}

          dropoffDate={dropoffDate}
          dropoffTime={dropoffTime}

          locale={locale}

          onClose={() => setSelectedDriver(null)}
        />

      )}

    </div>
  );
}