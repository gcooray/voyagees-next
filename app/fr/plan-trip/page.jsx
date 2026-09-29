import PlanTrip from "@/components/PlanTrip";

export const metadata = {
  title: "Planifiez Votre Voyage au Sri Lanka | Voyagees",
  description:
    "Indiquez vos dates, votre budget et vos centres d'intérêt et recevez un itinéraire jour par jour au Sri Lanka avec chauffeur privé, hébergements suggérés et prix vérifiés.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/plan-trip",
  },
};

export default function PlanTripPageFr() {
  return <PlanTrip locale="fr" />;
}
