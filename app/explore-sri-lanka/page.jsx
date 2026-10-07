import TouristMapLoader from "@/components/TouristMapLoader";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/explore-sri-lanka", {
  title: "Explore Sri Lanka | Voyagees",
  description:
    "Discover Sri Lanka destinations, attractions, beaches, heritage sites and nature experiences with Voyagees.",
});

export default function ExploreSriLankaPage() {
  return (
    <main>
      <TouristMapLoader />
    </main>
  );
}