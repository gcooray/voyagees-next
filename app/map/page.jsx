import TouristMapClient from "@/components/MapClient";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/map", {
  title: "Sri Lanka Map | Voyagees",
  description:
    "Explore Sri Lanka destinations on an interactive map.",
});

export default function MapPage() {
  return (
    <main>
      <TouristMapClient />
    </main>
  );
}