import "../../terms/terms.css";

export const metadata = {
  title: "Conditions d'Utilisation pour les Voyages au Sri Lanka | voyaGees",
  description:
    "Lisez les Conditions d'Utilisation de voyaGees — comprenez le processus de réservation, les annulations, les paiements et les responsabilités avant votre voyage au Sri Lanka.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/terms",
  },
};

export default function TermsPageFr() {
  return (
    <div className="terms-page">
      <h1>Conditions d&apos;Utilisation</h1>
      <p>Dernière mise à jour : 22 juillet 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Bienvenue chez VOYAGEES. En utilisant notre plateforme, vous acceptez les
        conditions générales suivantes.
      </p>

      <h2>2. Processus de Réservation</h2>
      <ul>
        <li>Toutes les réservations sont des demandes jusqu&apos;à confirmation par le chauffeur.</li>
        <li>Vous recevrez un e-mail de confirmation une fois que le chauffeur aura accepté.</li>
        <li>La réservation est finalisée après confirmation.</li>
      </ul>

      <h2>3. Annulations</h2>
      <ul>
        <li>Annulez au moins 48 heures avant le voyage lorsque cela est possible.</li>
        <li>Les annulations de dernière minute peuvent affecter les réservations futures.</li>
      </ul>

      <h2>4. Frais Supplémentaires</h2>
      <ul>
        <li>Comprend le carburant et le kilométrage standard.</li>
        <li>Des frais de kilométrage supplémentaires s&apos;appliquent au-delà des limites.</li>
      </ul>

      <h2>5. Paiements</h2>
      <ul>
        <li>Aucun paiement en ligne n&apos;est collecté.</li>
        <li>Les paiements sont effectués directement aux chauffeurs.</li>
      </ul>

      <h2>6. Responsabilité</h2>
      <ul>
        <li>Nous ne sommes pas responsables des incidents ou retards durant le voyage.</li>
      </ul>

      <h2>7. Code de Conduite</h2>
      <ul>
        <li>Traitez les chauffeurs avec respect.</li>
        <li>Respectez les lois locales pendant votre voyage.</li>
      </ul>

      <h2>8. Contact</h2>
      <p>
        E-mail :{" "}
        <a href="mailto:contact@voyagees.com">
          contact@voyagees.com
        </a>
      </p>
    </div>
  );
}
