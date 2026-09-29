import Link from "next/link";
import DriverSearch from "@/components/DriverSearch";
import "../../../private-driver/page.css";
import "../../../private-driver/colombo/page.css";

export const metadata = {
  title:
    "Chauffeur Privé à Colombo | Taxi Privé avec Chauffeurs Professionnels",
  description:
    "Réservez un chauffeur privé à Colombo pour vos transferts aéroport, visites, déplacements professionnels et trajets dans tout le Sri Lanka. Un véhicule et un chauffeur dédiés, organisés selon votre emploi du temps.",
  alternates: {
    canonical: "https://www.voyagees.com/fr/private-driver/colombo",
  },
};

// Chaque bouton « demander un chauffeur » remonte vers le formulaire de
// recherche en haut de page, qui est le parcours de réservation.
const SEARCH_ANCHOR = "#find-driver";

function Checklist({ items }) {
  return (
    <ul className="pdc-checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivateDriverColomboPageFr() {
  return (
    <main className="private-driver-page pdc-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pd-hero pdc-hero">
        <div className="pd-hero-overlay" />

        <div className="pd-hero-content">

          <div className="pd-hero-copy">
            <p className="pd-eyebrow">
              CHAUFFEUR PRIVÉ · COLOMBO
            </p>

            <h1>Réservez un Chauffeur Privé à Colombo</h1>

            <p className="pd-hero-note">
              Déplacez-vous confortablement à Colombo avec un chauffeur privé
              et un véhicule organisés selon votre emploi du temps.
            </p>
          </div>

          <div className="pd-hero-search" id="find-driver">
            <div className="pd-search-heading">
              <p className="pd-eyebrow pd-dark">PLANIFIEZ VOTRE TRAJET</p>
              <h2>Demandez un chauffeur privé</h2>
            </div>

            <DriverSearch locale="fr" />
          </div>

        </div>
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="pd-intro-section">

        <div className="pd-content">

          <p className="pd-eyebrow pd-dark">
            SERVICE DE CHAUFFEUR PRIVÉ · COLOMBO
          </p>

          <p className="pd-lead">
            Que vous veniez d&apos;atterrir à l&apos;
            <strong>aéroport international Bandaranaike</strong>, que vous
            ayez besoin d&apos;un chauffeur pour visiter la ville, de vous
            rendre à plusieurs rendez-vous professionnels ou de poursuivre
            votre voyage de Colombo vers une autre région du Sri Lanka, nous
            pouvons vous organiser un chauffeur privé.
          </p>

          <div className="pd-driver-intro">
            <p>
              Indiquez-nous votre lieu de prise en charge, votre destination,
              la date, l&apos;heure et le nombre de passagers, et nous vous
              aiderons à trouver le chauffeur et le véhicule adaptés à votre
              trajet.
            </p>
          </div>

          <a href={SEARCH_ANCHOR} className="pdc-cta">
            Demander un Chauffeur Privé
          </a>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">SERVICES</p>
          <h2>Services de Chauffeur Privé à Colombo</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Un chauffeur privé vous offre un véhicule et un chauffeur dédiés
            pour le trajet que vous devez effectuer. Au lieu de réserver une
            course pour chaque arrêt, vous organisez vos déplacements autour
            de votre itinéraire.
          </p>

          <p>Notre service de chauffeur privé convient notamment pour :</p>

          <Checklist
            items={[
              "Les transferts aéroport",
              "Les prises en charge et déposes à l'hôtel",
              "Les déplacements dans Colombo",
              "Les visites de Colombo",
              "Les voyages d'affaires",
              "La location à la journée",
              "Les trajets avec plusieurs arrêts",
              "Les trajets de Colombo vers d'autres destinations du Sri Lanka",
              "Les voyages sur plusieurs jours",
            ]}
          />

          <p className="pdc-note">
            Votre trajet peut être organisé selon votre emploi du temps, sous
            réserve de la disponibilité des chauffeurs et des véhicules.
          </p>
        </div>

      </section>


      {/* =====================================================
          VISITES
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">VISITES</p>
          <h2>Chauffeur Privé pour Visiter Colombo</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Colombo mêle sites historiques, marchés, restaurants, shopping,
            front de mer et attractions culturelles.
          </p>

          <p>
            Avec un chauffeur privé, il est plus facile de visiter plusieurs
            lieux dans la même journée sans organiser un transport entre
            chaque arrêt.
          </p>

          <p>Selon votre itinéraire, votre journée peut inclure :</p>

          <Checklist
            items={[
              "Galle Face",
              "Le quartier du Fort",
              "Le marché de Pettah",
              "Le temple Gangaramaya",
              "Le Musée national de Colombo",
              "Les centres commerciaux",
              "Restaurants et hôtels",
              "D'autres attractions de Colombo",
            ]}
          />

          <p className="pdc-note">
            L&apos;office du tourisme du Sri Lanka cite Galle Face, Pettah, le
            temple Gangaramaya et le Musée national de Colombo parmi les
            attractions de la ville.
          </p>

          <p>
            Et si vous aimez le shopping, vous trouverez de nombreux centres
            commerciaux comme Colombo City Centre, One Galle Face, Havelock
            City Mall, Marino Mall, Majestic City, Liberty Plaza et Crescat
            Boulevard.
          </p>

          <p>
            Vous pouvez préparer votre propre itinéraire ou nous demander
            d&apos;organiser le transport vers les lieux que vous souhaitez
            visiter.
          </p>

          <Link href="/fr/plan-trip" className="pdc-cta">
            Planifier Ma Visite de Colombo
          </Link>
        </div>

      </section>

      <div className="pd-inline-image">
        <img
          src="/images/hero/colombo.webp"
          alt="Vue de Colombo le long de la côte"
        />
        <p className="pd-image-caption">Colombo, de Galle Face au quartier du Fort</p>
      </div>


      {/* =====================================================
          VOYAGES D'AFFAIRES
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">VOYAGES D&apos;AFFAIRES</p>
          <h2>Chauffeur Privé pour vos Déplacements Professionnels</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Colombo est aussi une destination d&apos;affaires importante. Un
            transport privé est pratique lorsque votre journée comprend
            plusieurs réunions, des prises en charge à l&apos;hôtel ou des
            rendez-vous à heure fixe.
          </p>

          <p>Réservez un chauffeur privé pour :</p>

          <Checklist
            items={[
              "Les transferts de l'aéroport au bureau",
              "Les trajets de l'hôtel aux réunions",
              "Plusieurs rendez-vous professionnels",
              "Les événements d'entreprise",
              "Le transport de vos clients",
              "Une journée complète de déplacements professionnels",
              "Des trajets programmés d'un point à un autre",
            ]}
          />

          <p className="pdc-note">
            Au lieu de réserver une nouvelle course pour chaque rendez-vous,
            demandez un chauffeur pour la durée et l&apos;itinéraire dont vous
            avez besoin.
          </p>

          <Link href="/fr/contact" className="pdc-cta">
            Nous Contacter pour un Transport Professionnel
          </Link>
        </div>

      </section>


      {/* =====================================================
          AÉROPORT
      ===================================================== */}

      <section className="pd-dark-section">

        <div className="pd-section-heading pd-light">
          <p className="pd-eyebrow">PRISE EN CHARGE À L&apos;AÉROPORT</p>
          <h2>De l&apos;Aéroport à Colombo</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Vous arrivez à l&apos;<strong>aéroport international
            Bandaranaike</strong> ? Réservez votre chauffeur privé avant votre
            départ pour que votre transport depuis l&apos;aéroport fasse partie
            de votre arrivée.
          </p>

          <p>Indiquez-nous :</p>

          <Checklist
            items={[
              "Les détails de votre vol",
              "La date d'arrivée",
              "L'heure d'arrivée",
              "Le nombre de passagers",
              "Vos bagages",
              "Votre hôtel ou destination",
            ]}
          />

          <p className="pdc-note">
            Votre chauffeur peut vous retrouver au point de rendez-vous convenu
            et vous conduire directement à destination.
          </p>

          <p>
            L&apos;aéroport international Bandaranaike propose plusieurs
            solutions de transport, dont les taxis, les bus et les transports
            publics. Un chauffeur privé est une autre option pour les
            voyageurs qui souhaitent un véhicule dédié, organisé selon leur
            propre itinéraire.
          </p>

          <Link href="/fr/airport-transfer" className="pdc-cta pdc-cta-light">
            Réserver un Transfert Aéroport
          </Link>
        </div>

      </section>


      {/* =====================================================
          TYPES DE SERVICE
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">NOS FORMULES</p>
          <h2>Choisissez le Service de Chauffeur Adapté</h2>
        </div>

        <p className="pdc-intro">
          La bonne formule dépend de votre itinéraire, du nombre de passagers
          et du véhicule dont vous avez besoin.
        </p>

        <div className="pdc-card-grid">

          <article className="pd-benefit">
            <span>01</span>
            <h3>Transfert Simple</h3>
            <p>
              Idéal lorsque vous avez simplement besoin d&apos;aller d&apos;un
              point à un autre, par exemple de l&apos;aéroport à votre hôtel.
            </p>
          </article>

          <article className="pd-benefit">
            <span>02</span>
            <h3>Location à l&apos;Heure</h3>
            <p>
              Pratique lorsque vous avez plusieurs arrêts ou rendez-vous dans
              Colombo.
            </p>
          </article>

          <article className="pd-benefit">
            <span>03</span>
            <h3>Chauffeur à la Journée</h3>
            <p>
              Une solution pratique lorsque votre itinéraire comprend
              plusieurs lieux et que vous souhaitez un transport dédié toute la
              journée.
            </p>
          </article>

          <article className="pd-benefit">
            <span>04</span>
            <h3>Chauffeur sur Plusieurs Jours</h3>
            <p>
              Pour explorer le Sri Lanka, un chauffeur privé peut vous
              accompagner sur plusieurs destinations, selon l&apos;itinéraire
              demandé et la disponibilité des véhicules.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          VÉHICULES
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">VÉHICULES</p>
          <h2>Quel Type de Véhicule Puis-je Réserver ?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            La disponibilité des véhicules dépend de votre trajet. Lors de
            votre demande, indiquez-nous :
          </p>

          <Checklist
            items={[
              "Le nombre de passagers",
              "La quantité de bagages",
              "Le type de véhicule souhaité",
              "La durée du trajet",
              "Le lieu de prise en charge et la destination",
              "Tout besoin particulier",
            ]}
          />

          <p className="pdc-note">
            Nous pourrons alors vous proposer un véhicule adapté à votre
            trajet.
          </p>
        </div>

      </section>


      {/* =====================================================
          PRIX
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">TARIFS</p>
          <h2>Combien Coûte un Chauffeur Privé à Colombo ?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Le prix d&apos;un chauffeur privé dépend des détails de votre
            trajet, et pas seulement de la distance parcourue. Il peut
            dépendre :
          </p>

          <Checklist
            items={[
              "Du lieu de prise en charge et de la destination",
              "Du nombre d'heures",
              "Du type de véhicule",
              "Du nombre de passagers",
              "D'un éventuel transfert aéroport",
              "Du nombre d'arrêts",
              "D'une location à la journée ou sur plusieurs jours",
              "De trajets en dehors de Colombo",
              "Du temps d'attente ou de besoins supplémentaires",
            ]}
          />

          <p className="pdc-note">
            Pour un devis précis, envoyez-nous votre itinéraire plutôt que de
            vous fier à un prix générique.
          </p>

          <a href={SEARCH_ANCHOR} className="pdc-cta">
            Demander un Devis
          </a>
        </div>

      </section>


      {/* =====================================================
          CHOISIR UN CHAUFFEUR
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">BIEN CHOISIR</p>
          <h2>Que Vérifier Avant de Réserver un Chauffeur Privé ?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Lorsque vous réservez un transport au Sri Lanka, il est utile de
            vérifier les qualifications du chauffeur, l&apos;adéquation du
            véhicule et les détails du service réservé.
          </p>

          <p>
            L&apos;office du tourisme du Sri Lanka (<strong>Sri Lanka
            Tourism</strong>) tient un annuaire officiel des chauffeurs
            touristiques agréés, consultable par nom, numéro
            d&apos;enregistrement ou association. La{" "}
            <strong>Sri Lanka Tourism Development Authority</strong> propose
            également des parcours d&apos;enregistrement et de formation pour
            les chauffeurs touristiques et les chauffeurs-guides.
          </p>

          <p>Le cas échéant, renseignez-vous sur :</p>

          <Checklist
            items={[
              "L'identité du chauffeur",
              "Son permis de conduire",
              "Son enregistrement ou agrément touristique",
              "L'adéquation du véhicule",
              "L'assurance passagers",
              "Les modalités de prise en charge",
              "Le montant total du devis",
              "Ce qui est inclus dans la réservation",
            ]}
          />

          <p className="pdc-note">
            Si notre service inclut des qualifications ou enregistrements
            spécifiques du chauffeur, ils doivent vous être clairement
            communiqués lors de la réservation.
          </p>
        </div>

      </section>


      {/* =====================================================
          POURQUOI RÉSERVER
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">POURQUOI RÉSERVER</p>
          <h2>Pourquoi Réserver un Chauffeur Privé à Colombo ?</h2>
        </div>

        <p className="pdc-intro">
          Un chauffeur privé est utile lorsque vous voulez que votre transport
          s&apos;adapte à votre itinéraire, plutôt que d&apos;organiser votre
          journée autour de trajets fixes. Selon le service réservé, les
          avantages peuvent inclure :
        </p>

        <div className="pdc-card-grid pdc-card-grid-3col">

          <article className="pd-benefit">
            <span>01</span>
            <h3>Un véhicule dédié</h3>
            <p>
              Voyagez dans votre propre véhicule au lieu de le partager avec
              d&apos;autres passagers.
            </p>
          </article>

          <article className="pd-benefit">
            <span>02</span>
            <h3>Des horaires flexibles</h3>
            <p>
              Organisez votre trajet selon vos heures de prise en charge et
              vos destinations.
            </p>
          </article>

          <article className="pd-benefit">
            <span>03</span>
            <h3>Plusieurs arrêts</h3>
            <p>
              Idéal pour les visites, le shopping, les rendez-vous
              professionnels et les itinéraires à plusieurs étapes.
            </p>
          </article>

          <article className="pd-benefit">
            <span>04</span>
            <h3>Transferts aéroport et hôtel</h3>
            <p>
              Organisez vos trajets entre l&apos;aéroport, votre hôtel et vos
              autres destinations.
            </p>
          </article>

          <article className="pd-benefit">
            <span>05</span>
            <h3>Un chauffeur local</h3>
            <p>
              Laissez un chauffeur local s&apos;occuper de la route pendant
              que vous profitez de votre voyage.
            </p>
          </article>

          <article className="pd-benefit">
            <span>06</span>
            <h3>Au-delà de Colombo</h3>
            <p>
              Renseignez-vous sur un chauffeur privé pour vos trajets de
              Colombo vers d&apos;autres destinations du Sri Lanka.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          COMMENT RÉSERVER
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">COMMENT RÉSERVER</p>
          <h2>Comment Réserver un Chauffeur Privé à Colombo</h2>
        </div>

        <ol className="pdc-steps">

          <li>
            <span className="pdc-step-number">1</span>
            <h3>Envoyez les Détails de Votre Trajet</h3>
            <p>
              Date, heure et lieu de prise en charge, destination, nombre de
              passagers, bagages, véhicule souhaité et nombre d&apos;heures ou
              de jours nécessaires.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">2</span>
            <h3>Recevez Nos Propositions</h3>
            <p>
              Nous étudions votre demande et vous proposons les chauffeurs et
              véhicules disponibles.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">3</span>
            <h3>Confirmez Votre Réservation</h3>
            <p>
              Une fois la formule et le devis validés, confirmez votre
              réservation.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">4</span>
            <h3>Retrouvez Votre Chauffeur</h3>
            <p>
              Votre chauffeur vous attend au point de rendez-vous convenu et
              assure le transport prévu pour votre trajet.
            </p>
          </li>

        </ol>

      </section>


      {/* =====================================================
          CTA FINAL
      ===================================================== */}

      <section className="pd-final-section pdc-final">

        <div className="pd-final-overlay" />

        <div className="pd-final-content">

          <p className="pd-eyebrow">CHAUFFEUR PRIVÉ · COLOMBO</p>

          <h2>
            Réservez votre chauffeur privé
            <br />
            <span>à Colombo.</span>
          </h2>

          <a href={SEARCH_ANCHOR} className="pdc-cta pdc-cta-light">
            Demander Mon Chauffeur Privé
          </a>

        </div>

      </section>

    </main>
  );
}
