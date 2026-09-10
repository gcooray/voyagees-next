"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TouristMap.css";

import { touristDestinations } from "@/data/touristDestinations";
import { touristDestinationsFr } from "@/data/touristDestinationsFr";

// A plain static import of "leaflet" (which touches `window` at module scope)
// is safe here only because TouristMapLoader/MapClient load this whole module
// via next/dynamic with ssr:false — it never runs outside the browser.
const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

// Computed once at module load rather than per render — Leaflet icon
// instances are cheap to reuse across every marker.
const icons = {
  city: createIcon("/images/icon-city.png"),
  heritage: createIcon("/images/icon-heritage.png"),
  national_park: createIcon("/images/icon-park.png"),
  kite_surfing: createIcon("/images/icon-kite-surfing.png"),
  hill_station: createIcon("/images/icon-hill.png"),
  coastal_city: createIcon("/images/icon-beach.png"),
  cultural_city: createIcon("/images/icon-culture.png"),
  default: new L.Icon.Default(),
};

const SRI_LANKA_BOUNDS = [
  [5.7, 79.5],
  [10.1, 82.0],
];

const SRI_LANKA_CENTER = [7.8731, 80.7718];

function SetInitialView() {
  const map = useMap();

  useEffect(() => {
    let resizeTimeout;

    // fitBounds computes the center and zoom that best frame the whole
    // island for the map's *actual* current size, instead of a hardcoded
    // center + one of two fixed zoom presets — it adapts correctly to any
    // container width/aspect ratio, not just a mobile/desktop split.
    const updateView = () => {
      map.invalidateSize();
      map.fitBounds(SRI_LANKA_BOUNDS, { padding: [24, 24] });
    };

    // Debounced — fitBounds triggers a re-render/re-tile on every call, and
    // a window resize fires dozens of times per second while a user drags.
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateView, 200);
    };

    updateView();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
}

// Scroll-wheel zoom starts disabled so scrolling the page past the map
// scrolls the page, not the map. It only turns on once the visitor actually
// clicks into the map, and turns back off the moment the cursor leaves it.
function ScrollZoomOnClick() {
  const map = useMapEvents({
    click: () => map.scrollWheelZoom.enable(),
    mouseout: () => map.scrollWheelZoom.disable(),
  });

  return null;
}

export default function TouristMap() {
  const router = useRouter();
  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr/");

  const filters = useMemo(
    () => [
      { label: isFrench ? "Tous" : "All", value: "all" },
      { label: isFrench ? "Plages" : "Beaches", value: "coastal_city" },
      { label: isFrench ? "Patrimoine" : "Heritage", value: "heritage" },
      { label: isFrench ? "Nature" : "Nature", value: "national_park" },
      { label: isFrench ? "Culture" : "Culture", value: "cultural_city" },
      { label: isFrench ? "Villes" : "Cities", value: "city" },
    ],
    [isFrench]
  );

  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState(null);
  const hoverTimeout = useRef(null);

  const filteredDestinations = useMemo(() => {
    const destinations =
      filter === "all"
        ? touristDestinations
        : touristDestinations.filter((d) => d.type === filter);

    if (!isFrench) return destinations;

    return destinations.map((destination) => {
      const translation = touristDestinationsFr[destination.name];
      return {
        ...destination,
        name: translation?.name || destination.name,
        description: translation?.description || destination.description,
      };
    });
  }, [filter, isFrench]);

  function handleNavigate(slug) {
    router.push(isFrench ? `/fr/destinations/${slug}` : `/destinations/${slug}`);
  }

  // A short delay before clearing the hover card avoids it flickering away
  // when the cursor briefly crosses a gap between the marker and the card.
  function handleMarkerLeave() {
    hoverTimeout.current = setTimeout(() => setHovered(null), 150);
  }

  function handleMarkerEnter(spot) {
    clearTimeout(hoverTimeout.current);
    setHovered(spot);
  }

  return (
    <section className="tourist-map-section">
      <div className="tourist-map-header">
        <h1>{isFrench ? "Explorer le Sri Lanka" : "Explore Sri Lanka"}</h1>
        <p>
          {isFrench
            ? "Découvrez des destinations selon vos envies"
            : "Discover destinations based on your interests"}
        </p>
      </div>

      <div className="tourist-map-filters">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`tourist-map-filter-chip ${filter === f.value ? "tourist-map-filter-chip-active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="tourist-map-frame">
        <MapContainer
          center={SRI_LANKA_CENTER}
          zoom={8}
          minZoom={7}
          maxBounds={SRI_LANKA_BOUNDS}
          maxBoundsViscosity={1}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SetInitialView />
          <ScrollZoomOnClick />

          {filteredDestinations.map((spot) => (
            <Marker
              key={spot.slug}
              position={[spot.lat, spot.lng]}
              icon={icons[spot.type] || icons.default}
              eventHandlers={{
                mouseover: () => handleMarkerEnter(spot),
                mouseout: handleMarkerLeave,
                click: () => handleNavigate(spot.slug),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {hovered && (
        <div
          className="tourist-map-preview"
          onMouseEnter={() => clearTimeout(hoverTimeout.current)}
          onMouseLeave={handleMarkerLeave}
        >
          {hovered.heroImage ? (
            <div className="tourist-map-preview-image-wrap">
              <Image
                src={hovered.heroImage}
                alt={hovered.name}
                fill
                sizes="260px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="tourist-map-preview-image-fallback">{hovered.name}</div>
          )}

          <div className="tourist-map-preview-body">
            <h3>{hovered.name}</h3>
            <p>{hovered.description}</p>
            <button type="button" onClick={() => handleNavigate(hovered.slug)}>
              {isFrench ? "Découvrir" : "Explore"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
