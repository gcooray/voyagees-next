import PlanTrip from "@/components/PlanTrip";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/plan-trip", {
  title: "Planifiez Votre Voyage au Sri Lanka | Voyagees",
  description:
    "Indiquez vos dates, votre budget et vos centres d'intérêt et recevez un itinéraire jour par jour au Sri Lanka avec chauffeur privé, hébergements suggérés et prix vérifiés.",
});

export default function PlanTripPageFr() {
  return <PlanTrip locale="fr" />;
}
