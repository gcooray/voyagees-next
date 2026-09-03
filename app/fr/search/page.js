import { Suspense } from "react";
import SearchDrivers from "@/components/SearchDrivers";

export const metadata = {
  title: "Chauffeurs privés au Sri Lanka | Voyagees",
  description:
    "Trouvez un chauffeur privé de confiance pour votre voyage au Sri Lanka avec Voyagees.",
};

export default function FrenchSearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          Chargement des chauffeurs...
        </div>
      }
    >
      <SearchDrivers locale="fr" />
    </Suspense>
  );
}