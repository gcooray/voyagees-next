import TouristMapClient from "@/components/MapClient";

export const metadata = {
  title: "Sri Lanka Map | Voyagees",
  description:
    "Explore Sri Lanka destinations on an interactive map.",
};

export default function MapPage() {
  return (
    <main>
      <TouristMapClient />
    </main>
  );
}