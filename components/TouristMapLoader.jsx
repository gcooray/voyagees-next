"use client";

import dynamic from "next/dynamic";

const TouristMap = dynamic(
  () => import("./TouristMap"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading Sri Lanka map...
      </div>
    ),
  }
);

export default function TouristMapLoader() {
  return <TouristMap />;
}