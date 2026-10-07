import HomePage from "@/components/home/HomePage";
import fr from "@/messages/fr";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr", {
  title: "Chauffeurs Privés et Circuits Privés au Sri Lanka",
  description:
    "Réservez un chauffeur privé ou un circuit sur mesure au Sri Lanka avec voyaGees. Des chauffeurs locaux de confiance, des véhicules propres et un voyage flexible, à votre rythme.",
});

export default function FrenchHome() {
  return <HomePage content={fr} locale="fr" />;
}
