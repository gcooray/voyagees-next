import { Suspense } from "react";
import RequestForm from "../../request/RequestForm";

export const metadata = {
  title: "Demande de Réservation | Voyagees",
  description:
    "Envoyez votre demande de réservation de circuit au Sri Lanka avec Voyagees.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/request",
  },
};

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
