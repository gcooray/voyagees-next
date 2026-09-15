"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ItineraryRouteMap.css";

// A plain static import of "leaflet" is safe here only because this module
// is always loaded via next/dynamic with ssr:false (see ItineraryResult.jsx)
// — it never runs outside the browser.
function numberedIcon(number) {
  return L.divIcon({
    className: "itinerary-route-marker",
    html: `<span>${number}</span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function FitToStops({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 9);
    } else {
      map.fitBounds(positions, { padding: [32, 32] });
    }
  }, [map, positions]);

  return null;
}

export default function ItineraryRouteMap({ stops }) {
  const validStops = stops.filter((s) => s.lat != null && s.lng != null);
  const positions = validStops.map((s) => [s.lat, s.lng]);

  if (positions.length === 0) return null;

  return (
    <div className="itinerary-route-map-frame">
      <MapContainer
        center={positions[0]}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitToStops positions={positions} />

        {positions.length > 1 && (
          // #c15b3d mirrors the site's --clay token — Leaflet draws paths via
          // JS/SVG, so it can't read CSS custom properties directly.
          <Polyline positions={positions} pathOptions={{ color: "#c15b3d", weight: 3, dashArray: "6 8" }} />
        )}

        {validStops.map((stop, index) => (
          <Marker
            key={`${stop.lat}-${stop.lng}-${index}`}
            position={[stop.lat, stop.lng]}
            icon={numberedIcon(index + 1)}
          />
        ))}
      </MapContainer>
    </div>
  );
}
