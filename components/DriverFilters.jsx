"use client";

import "./DriverFilters.css";

// Option `value`s match data/drivers.js (English); only the labels change.
const VEHICLES = [
  { value: "Car", en: "Car", fr: "Voiture" },
  { value: "SUV", en: "SUV", fr: "SUV" },
  { value: "Van", en: "Van", fr: "Van" },
  { value: "Bus", en: "Bus", fr: "Bus" },
  { value: "Tuk-Tuk", en: "Tuk-Tuk", fr: "Tuk-tuk" },
];

// Driver languages are stored in English in data/drivers.js — unknown
// ones fall back to the stored name.
const LANGUAGE_NAMES_FR = {
  English: "Anglais",
  Sinhala: "Cingalais",
  Tamil: "Tamoul",
  Hindi: "Hindi",
  French: "Français",
  German: "Allemand",
  Russian: "Russe",
  Italian: "Italien",
  Spanish: "Espagnol",
  Chinese: "Chinois",
  Japanese: "Japonais",
};

const STRINGS = {
  en: {
    eyebrow: "FILTERS",
    heading: <>Find your<br />perfect driver.</>,
    vehicle: "Vehicle",
    allVehicles: "All vehicles",
    language: "Language",
    allLanguages: "All languages",
    passengers: "Passengers",
    anyNumber: "Any number",
    passenger: (n) => `${n} ${n === 1 ? "passenger" : "passengers"}`,
    price: "Price per day",
    min: "Min",
    max: "Max",
    clear: "Clear",
    clearAll: "CLEAR FILTERS",
  },
  fr: {
    eyebrow: "FILTRES",
    heading: <>Trouvez le<br />chauffeur idéal.</>,
    vehicle: "Véhicule",
    allVehicles: "Tous les véhicules",
    language: "Langue",
    allLanguages: "Toutes les langues",
    passengers: "Passagers",
    anyNumber: "Peu importe",
    passenger: (n) => `${n} ${n === 1 ? "passager" : "passagers"}`,
    price: "Prix par jour",
    min: "Min",
    max: "Max",
    clear: "Effacer",
    clearAll: "EFFACER LES FILTRES",
  },
};

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
  // "sidebar" is the tall standalone panel; "bar" is a compact single row
  // that sits inside the results page's search card on desktop.
  variant = "sidebar",
  locale = "en",
}) {
  const t = STRINGS[locale] || STRINGS.en;
  const languageLabel = (lang) => (locale === "fr" && LANGUAGE_NAMES_FR[lang]) || lang;
  const isBar = variant === "bar";
  const Root = isBar ? "div" : "aside";

  return (
    <Root className={isBar ? "driver-filters-bar" : "driver-filters"}>

      {!isBar && (
        <div className="filter-header">
          <span>{t.eyebrow}</span>
          <h2>{t.heading}</h2>
        </div>
      )}

      {/* VEHICLE TYPE */}

      <div className="filter-group">

        <label className="filter-label">
          {t.vehicle}
        </label>

        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="">{t.allVehicles}</option>
          {VEHICLES.map((v) => (
            <option key={v.value} value={v.value}>
              {v[locale] || v.en}
            </option>
          ))}
        </select>

      </div>


      {/* LANGUAGE */}

      <div className="filter-group">

        <label className="filter-label">
          {t.language}
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">{t.allLanguages}</option>

          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {languageLabel(lang)}
            </option>
          ))}

        </select>

      </div>


      {/* PASSENGERS */}

      <div className="filter-group">

        <label className="filter-label">
          {t.passengers}
        </label>

        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        >
          <option value="">{t.anyNumber}</option>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <option key={number} value={number}>
              {t.passenger(number)}
            </option>
          ))}

        </select>

      </div>


      {/* PRICE */}

      <div className="filter-group">

        <label className="filter-label">
          {t.price}
        </label>

        <div className="price-inputs">

          <input
            type="number"
            placeholder={t.min}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <span>—</span>

          <input
            type="number"
            placeholder={t.max}
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
        {isBar ? t.clear : t.clearAll}
      </button>

    </Root>
  );
}