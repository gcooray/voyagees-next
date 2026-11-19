import ExploreGuide from "@/components/ExploreGuide";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/explore-sri-lanka", {
  title: "Explorer le Sri Lanka | Voyagees",
  description:
    "Où aller au Sri Lanka, région par région : la meilleure saison pour chaque côte, combien de jours prévoir, les vrais temps de route de nos chauffeurs et les erreurs à éviter.",
});

export default function ExploreSriLankaPage() {
  return (
    <main>
      <ExploreGuide locale="fr" />
    </main>
  );
}
