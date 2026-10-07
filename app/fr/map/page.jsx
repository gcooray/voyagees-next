import TouristMapClient from "@/components/MapClient";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/map", {
  title: "Carte du Sri Lanka | Voyagees",
  description:
    "Découvrez les destinations du Sri Lanka sur une carte interactive.",
});

export default function MapPageFr() {
  return (
    <main>
      <TouristMapClient />
    </main>
  );
}
