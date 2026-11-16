import "../../terms/terms.css";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/fr/terms", {
  title: "Conditions d'Utilisation – Voyages au Sri Lanka",
  description:
    "Lisez les Conditions d'Utilisation de voyaGees : réservation, prix, paiements et annulations, ce que nous faisons si un problème survient pendant votre voyage, et nos responsabilités.",
});

export default function TermsPageFr() {
  return (
    <div className="terms-page">
      <h1>Conditions d&apos;Utilisation</h1>
      <p>Dernière mise à jour : 16 novembre 2026</p>

      <h2>1. Qui sommes-nous</h2>
      <p>
        Voyagees met en relation les voyageurs avec des chauffeurs privés indépendants et agréés
        au Sri Lanka. Nous vous aidons à trouver le bon chauffeur et le bon véhicule, à préparer
        un itinéraire réaliste et à rester en contact pendant votre voyage. Le service de
        transport lui-même est assuré par le chauffeur avec qui vous voyagez. En utilisant notre
        site et nos services, vous acceptez les présentes conditions.
      </p>

      <h2>2. Processus de réservation</h2>
      <ul>
        <li>Toute réservation commence par une demande. Elle n&apos;est confirmée qu&apos;une fois la disponibilité du chauffeur vérifiée et la confirmation envoyée.</li>
        <li>La confirmation précise le chauffeur, le véhicule, les dates, l&apos;itinéraire et le prix total.</li>
        <li>Vérifiez ces informations et signalez-nous immédiatement toute erreur.</li>
      </ul>

      <h2>3. Prix et ce qu&apos;ils comprennent</h2>
      <ul>
        <li>Sauf indication contraire dans votre devis, le prix comprend le chauffeur, le véhicule, le carburant, les péages, les parkings, ainsi que les repas et l&apos;hébergement du chauffeur.</li>
        <li>Chaque devis indique le kilométrage inclus. Les kilomètres supplémentaires sont facturés au tarif indiqué dans votre devis.</li>
        <li>Les entrées, safaris, activités, votre propre hébergement et vos repas, ainsi que les pourboires, ne sont pas compris, sauf mention dans votre devis.</li>
        <li>Si vous modifiez votre itinéraire en cours de voyage, le prix peut changer. Toute modification est convenue avec vous avant de s&apos;appliquer.</li>
      </ul>

      <h2>4. Paiements</h2>
      <ul>
        <li>Nous n&apos;encaissons aucun paiement en ligne.</li>
        <li>Vous payez directement le chauffeur, en espèces, dans la devise convenue dans votre devis : en général une partie au début du voyage et le solde pendant le voyage.</li>
        <li>Demandez une trace écrite de chaque paiement.</li>
      </ul>

      <h2>5. Modifications et annulations</h2>
      <ul>
        <li>Prévenez-nous de toute modification ou annulation le plus tôt possible, et au moins 48 heures avant le début de votre voyage.</li>
        <li>Les annulations de dernière minute, ou une absence au rendez-vous, peuvent affecter les réservations futures.</li>
        <li>Si un chauffeur ne peut pas assurer votre voyage, nous vous prévenons dès que nous le savons et vous proposons un autre chauffeur lorsque c&apos;est possible.</li>
      </ul>

      <h2>6. En cas de problème pendant votre voyage</h2>
      <p>
        Si un désaccord survient entre vous et votre chauffeur (par exemple sur l&apos;itinéraire,
        les horaires, le comportement, le véhicule ou le prix), contactez-nous immédiatement sur
        WhatsApp au +94 76 112 8692 ou par e-mail. Nous intervenons, échangeons avec chacun et
        vous aidons à trouver une solution équitable. Si nécessaire et lorsque c&apos;est
        possible, nous organisons un autre chauffeur pour la suite de votre voyage.
      </p>

      <h2>7. Responsabilité</h2>
      <ul>
        <li>Les chauffeurs sont indépendants et responsables du service de transport, de leur véhicule, de leur licence et de leur assurance.</li>
        <li>Voyagees n&apos;est pas responsable des incidents, accidents, retards ou pertes survenant pendant un voyage, notamment ceux dus à la circulation, à la météo, à la fermeture de routes ou de lignes de train, ou à d&apos;autres événements indépendants de notre volonté. Nous vous aidons néanmoins comme décrit à l&apos;article 6.</li>
        <li>Pensez à souscrire votre propre assurance voyage et à veiller sur vos effets personnels.</li>
      </ul>

      <h2>8. Planificateur et conseils d&apos;itinéraire</h2>
      <ul>
        <li>Notre planificateur de voyage et notre analyse d&apos;itinéraire sont générés automatiquement à partir de l&apos;expérience de nos chauffeurs. Ils sont donnés à titre indicatif.</li>
        <li>Les temps de route sont approximatifs. Vérifiez les horaires d&apos;ouverture, les horaires des trains et les conditions saisonnières avant de partir.</li>
      </ul>

      <h2>9. Comportement des voyageurs</h2>
      <ul>
        <li>Traitez les chauffeurs avec respect, et respectez les lois et coutumes locales pendant votre voyage.</li>
        <li>Les chauffeurs peuvent refuser une demande dangereuse ou illégale, comme conduire au-delà d&apos;horaires raisonnables.</li>
      </ul>

      <h2>10. Vos informations</h2>
      <p>
        Nous utilisons les informations que vous nous transmettez (nom, coordonnées, projet de
        voyage) uniquement pour organiser et accompagner votre voyage. Nous ne les partageons
        avec votre chauffeur que dans la mesure nécessaire au voyage. Avec votre accord, nous
        utilisons des cookies pour mesurer la fréquentation du site et la performance de nos
        publicités ; vous pouvez les refuser dans la bannière cookies.
      </p>

      <h2>11. Modification des conditions</h2>
      <p>
        Nous pouvons mettre à jour ces conditions. La date en haut de la page indique la version
        en vigueur. Les conditions applicables à une réservation sont celles en vigueur au moment
        de sa confirmation.
      </p>

      <h2>12. Contact</h2>
      <p>
        WhatsApp : +94 76 112 8692
        <br />
        E-mail :{" "}
        <a href="mailto:contact@voyagees.com">
          contact@voyagees.com
        </a>
      </p>
    </div>
  );
}
