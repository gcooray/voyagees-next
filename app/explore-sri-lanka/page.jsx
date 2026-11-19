import ExploreGuide from "@/components/ExploreGuide";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/explore-sri-lanka", {
  title: "Explore Sri Lanka | Voyagees",
  description:
    "Where to go in Sri Lanka, region by region: the best time for each coast, how many days to plan, real drive times from our drivers and the mistakes to avoid.",
});

export default function ExploreSriLankaPage() {
  return (
    <main>
      <ExploreGuide locale="en" />
    </main>
  );
}