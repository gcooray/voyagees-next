import Itineraries from "@/components/Itineraries";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo(
  "/itineraries",
  {
    title: "Sri Lanka Itineraries: 7, 10 and 14 Days, and Off the Beaten Track",
    description:
      "Sri Lanka itineraries day by day with realistic drive times: one week, 10 days and two weeks for a first trip, plus Jaffna and the north, Kalpitiya and Wilpattu, and the quiet hill country.",
  },
  { image: "/images/hero/jaffna.webp", imageAlt: "Jaffna, northern Sri Lanka" }
);

export default function ItinerariesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Itineraries", path: "/itineraries" },
        ])}
      />
      <Itineraries locale="en" />
    </>
  );
}
