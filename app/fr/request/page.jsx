import { Suspense } from "react";
import RequestForm from "../../request/RequestForm";
// Only usable after picking a driver (driverId in the URL); opened on
// its own it shows an error state, so it's kept out of search results.
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/request", {
  title: "Demande de Réservation | Voyagees",
  description:
    "Envoyez votre demande de réservation de circuit au Sri Lanka avec Voyagees.",
}, { noindex: true });

export default function RequestPageFr() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Chargement du formulaire de demande...
        </div>
      }
    >
      <RequestForm locale="fr" />
    </Suspense>
  );
}
