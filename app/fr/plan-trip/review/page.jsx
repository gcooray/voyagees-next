import ItineraryReview from "@/components/ItineraryReview";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/plan-trip/review", {
  title: "Améliorer mon Itinéraire au Sri Lanka – Avis Gratuit",
  description:
    "Collez votre itinéraire au Sri Lanka et recevez gratuitement un avis jour par jour : temps de route réalistes, journées trop chargées et meilleur moment pour chaque visite.",
});

export default function ItineraryReviewPageFr() {
  return <ItineraryReview locale="fr" />;
}
