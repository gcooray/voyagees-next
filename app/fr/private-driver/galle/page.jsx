import PrivateDriverGalle from "@/components/PrivateDriverGalle";
import "../../../private-driver/page.css";
import "../../../private-driver/colombo/page.css";
import "../../../private-driver/galle/page.css";
import { withSeo } from "@/lib/seo";

const seo = withSeo("/fr/private-driver/galle", {
  title: "Réserver un Chauffeur Privé à Galle | Taxi Privé avec Chauffeurs Professionnels",
  description:
    "Réservez un chauffeur privé à Galle pour le fort, les plages de la côte sud, vos transferts vers Mirissa, Unawatuna ou Colombo et vos voyages de plusieurs jours au Sri Lanka, selon votre emploi du temps.",
});

// the exact page title, without the site name appended
const TITLE = "Réserver un Chauffeur Privé à Galle | Taxi Privé avec Chauffeurs Professionnels";
export const metadata = {
  ...seo,
  title: { absolute: TITLE },
  openGraph: { ...seo.openGraph, title: TITLE },
  twitter: { ...seo.twitter, title: TITLE },
};

export default function PrivateDriverGallePageFr() {
  return <PrivateDriverGalle locale="fr" />;
}
