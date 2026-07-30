"use client";

import dynamic from "next/dynamic";

const TouristMap = dynamic(
  () => import("./TouristMap"),
  { ssr: false }
);

export default function TouristMapClient(props) {
  return <TouristMap {...props} />;
}