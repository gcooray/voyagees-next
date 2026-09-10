import BrowseTripsClient from "../../rides/BrowseTripsClient";
import "../../rides/page.css";

export const metadata = {
  title: "Trajets Partagés – Partagez les Frais d'un Chauffeur Privé au Sri Lanka | voyaGees",
  description:
    "Partagez un chauffeur privé avec d'autres voyageurs allant dans votre direction au Sri Lanka. Publiez un trajet ou demandez une place, et partagez les frais automatiquement à mesure que d'autres voyageurs se joignent.",
};

export default function BrowseTripsPageFr() {
  return (
    <main className="rides-browse-page">

      <section className="rides-intro">
        <h1>Partagez un Trajet, Partagez les Frais</h1>
        <p>
          Louer un chauffeur privé au Sri Lanka est confortable et flexible, mais
          c&apos;est généralement plus abordable à plusieurs. Les trajets partagés vous
          permettent de publier un itinéraire que vous avez déjà prévu, ou de trouver
          des voyageurs allant dans votre direction, afin que chacun ne paie qu&apos;une
          partie du même chauffeur privé.
        </p>
      </section>

      <section className="rides-how" aria-labelledby="rides-how-heading">
        <h2 id="rides-how-heading">Comment ça marche</h2>
        <ol className="rides-how-steps">
          <li>
            <span className="rides-how-number">01</span>
            <div>
              <h3>Publiez ou trouvez un trajet</h3>
              <p>Publiez votre itinéraire, ou parcourez ceux déjà prévus par d&apos;autres voyageurs.</p>
            </div>
          </li>
          <li>
            <span className="rides-how-number">02</span>
            <div>
              <h3>Demandez à participer</h3>
              <p>Envoyez votre nom et numéro de téléphone — l&apos;organisateur examine et approuve chaque demande.</p>
            </div>
          </li>
          <li>
            <span className="rides-how-number">03</span>
            <div>
              <h3>Partagez les frais</h3>
              <p>Le coût total du chauffeur se divise entre tous les participants confirmés — plus il y a de voyageurs, moins chacun paie.</p>
            </div>
          </li>
        </ol>
      </section>

      <BrowseTripsClient locale="fr" />

      <section className="rides-faq" aria-labelledby="rides-faq-heading">
        <h2 id="rides-faq-heading">Questions fréquentes</h2>

        <div className="rides-faq-item">
          <h3>Qu&apos;est-ce qu&apos;un trajet partagé ?</h3>
          <p>
            Un trajet partagé est un déplacement en chauffeur privé — un transfert
            aéroport, une excursion d&apos;une journée ou un itinéraire de plusieurs
            jours — qu&apos;un voyageur publie afin que d&apos;autres allant dans la même
            direction puissent le rejoindre et en partager le tarif. L&apos;organisateur
            garde son propre chauffeur privé ; il partage simplement les places et les frais.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>Comment le prix par place est-il calculé ?</h3>
          <p>
            L&apos;organisateur fixe le coût total du trajet et le nombre de places
            disponibles. À mesure que les demandes sont acceptées, le prix par place
            est automatiquement recalculé en divisant le coût total entre tous les
            participants confirmés.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>Qui approuve les participants à un trajet ?</h3>
          <p>
            L&apos;organisateur du trajet. Chaque demande de participation lui est
            transmise en premier, et personne n&apos;est ajouté à un trajet sans son
            approbation.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>Puis-je publier un trajet si je ne conduis pas moi-même ?</h3>
          <p>
            Oui. Publier un trajet signifie simplement que vous avez déjà organisé
            (ou prévoyez d&apos;organiser) un chauffeur privé pour cet itinéraire —
            vous invitez d&apos;autres voyageurs à partager les places et les frais,
            vous ne proposez pas de conduire vous-même.
          </p>
        </div>
      </section>

    </main>
  );
}
