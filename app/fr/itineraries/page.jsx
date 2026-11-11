import Itineraries from "@/components/Itineraries";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo(
  "/fr/itineraries",
  {
    title: "Itinéraires Sri Lanka : 7, 10 et 14 Jours, et Hors des Sentiers Battus",
    description:
      "Itinéraires au Sri Lanka jour par jour avec des temps de route réalistes : une semaine, 10 jours et deux semaines pour un premier voyage, plus Jaffna et le nord, Kalpitiya et Wilpattu, et les montagnes secrètes.",
  },
  { image: "/images/hero/jaffna.webp", imageAlt: "Jaffna, dans le nord du Sri Lanka" }
);

export default function ItinerariesPageFr() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/fr" },
          { name: "Itinéraires", path: "/fr/itineraries" },
        ])}
      />
      <Itineraries locale="fr" />
    </>
  );
}
