import TouristMapLoader from "@/components/TouristMapLoader";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/explore-sri-lanka", {
  title: "Explorer le Sri Lanka | Voyagees",
  description:
    "Découvrez les destinations, plages, sites historiques, parcs naturels et expériences culturelles du Sri Lanka avec Voyagees.",
});

export default function ExploreSriLankaPage() {
  return (
    <main>
      <TouristMapLoader />
    </main>
  );
}
