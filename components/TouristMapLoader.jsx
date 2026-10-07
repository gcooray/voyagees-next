"use client";

import dynamic from "next/dynamic";
import "./TouristMap.css";

const TouristMap = dynamic(() => import("./TouristMap"), {
  ssr: false,
  loading: () => (
    <div className="tourist-map-loading">Loading Sri Lanka map…</div>
  ),
});

// Leaflet needs `window`, so the map must never render on the server —
// pages use this loader rather than importing TouristMap directly.
export default function TouristMapLoader(props) {
  return <TouristMap {...props} />;
}
