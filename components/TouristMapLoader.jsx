"use client";

import dynamic from "next/dynamic";
import "./TouristMap.css";

const TouristMap = dynamic(() => import("./TouristMap"), {
  ssr: false,
  loading: () => (
    <div className="tourist-map-loading">Loading Sri Lanka map…</div>
  ),
});

export default function TouristMapLoader() {
  return <TouristMap />;
}
