import ContactPageContent from "../../contact/ContactPageContent";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/contact", {
  title: "Contact – Chauffeurs et Circuits au Sri Lanka",
  description:
    "Une question sur votre voyage au Sri Lanka ? Contactez voyaGees pour obtenir de l'aide concernant les réservations, les chauffeurs privés et vos demandes de voyage.",
});

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
