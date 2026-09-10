import PlanTripClient from "../../plan-trip/PlanTripClient";

export const metadata = {
  title: "Planifiez Votre Voyage au Sri Lanka | voyaGees",
  description:
    "Créez un itinéraire personnalisé au Sri Lanka — choisissez vos centres d'intérêt et la durée du séjour, voyaGees vous suggère un parcours parmi les meilleures destinations de l'île.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/plan-trip",
  },
};

export default function PlanTripPageFr() {
  return <PlanTripClient locale="fr" />;
}
