"use client";

import "./DriverFilters.css";

export default function DriverFilters({
  vehicleType,
  setVehicleType,
  language,
  setLanguage,
  passengers,
  setPassengers,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  availableLanguages,
}) {
  return (
    <aside className="driver-filters">

      <div className="filter-header">
        <span>FILTERS</span>
        <h2>Find your<br />perfect driver.</h2>
      </div>

      {/* VEHICLE TYPE */}

      <div className="filter-group">

        <label className="filter-label">
          Vehicle
        </label>

        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="">All vehicles</option>
          <option value="Car">Car</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Bus">Bus</option>
          <option value="Tuk-Tuk">Tuk-Tuk</option>
        </select>

      </div>


      {/* LANGUAGE */}

      <div className="filter-group">

        <label className="filter-label">
          Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All languages</option>

          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}

        </select>

      </div>


      {/* PASSENGERS */}

      <div className="filter-group">

        <label className="filter-label">
          Passengers
        </label>

        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        >
          <option value="">Any number</option>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <option key={number} value={number}>
              {number} {number === 1 ? "passenger" : "passengers"}
            </option>
          ))}

        </select>

      </div>


      {/* PRICE */}

      <div className="filter-group">

        <label className="filter-label">
          Price per day
        </label>

        <div className="price-inputs">

          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <span>—</span>

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

        </div>

      </div>


      {/* RESET */}

      <button
        type="button"
        className="filter-reset"
        onClick={() => {
          setVehicleType("");
          setLanguage("");
          setPassengers("");
          setMinPrice("");
          setMaxPrice("");
        }}
      >
        CLEAR FILTERS
      </button>

    </aside>
  );
}