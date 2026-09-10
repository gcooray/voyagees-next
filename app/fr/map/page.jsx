import TouristMapClient from "@/components/MapClient";

export const metadata = {
  title: "Carte du Sri Lanka | Voyagees",
  description:
    "Découvrez les destinations du Sri Lanka sur une carte interactive.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/map",
  },
};

export default function MapPageFr() {
  return (
    <main>
      <TouristMapClient />
    </main>
  );
}
