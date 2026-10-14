import Link from "next/link";
import AirportTransferForm from "@/components/AirportTransferForm";
import "../../private-driver/page.css";
import "../../private-driver/colombo/page.css";
import "../../airport-transfer/page.css";
import { withSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/structuredData";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = withSeo("/fr/airport-transfer", {
  title:
    "Transferts Aéroport Colombo – Chauffeur Privé",
  description:
    "Réservez un transfert privé depuis l'aéroport international Bandaranaike (CMB) vers Colombo, Negombo, Kandy, Galle ou partout au Sri Lanka. Indiquez votre vol et votre destination et recevez un devis sous 24 heures.",
});

const DESTINATIONS = [
  { name: "Negombo", time: "env. 20 à 30 min" },
  { name: "Colombo", time: "env. 45 à 60 min" },
  { name: "Galle", time: "env. 2 h 30 à 3 h" },
  { name: "Kandy", time: "env. 3 h à 3 h 30" },
  { name: "Sigiriya / Dambulla", time: "env. 3 h 30 à 4 h" },
  { name: "Ella", time: "env. 5 h 30 à 6 h 30" },
];

// Rendered as the FAQ list below and as FAQPage structured data, from
// one list so the two can't drift apart.
const FAQS = [
  {
    q: "Combien coûte un transfert aéroport ?",
    a: "Le prix dépend de votre destination, du véhicule nécessaire pour votre groupe et vos bagages, de l'heure et du besoin éventuel d'un trajet retour. Envoyez-nous vos informations et nous vous répondrons avec un devis sous 24 heures."
  },
  {
    q: "Que se passe-t-il si mon vol est retardé ?",
    a: "Indiquez votre numéro de vol lors de la réservation et prévenez-nous si vos plans changent. Votre chauffeur pourra ainsi s'organiser selon votre heure réelle d'atterrissage."
  },
  {
    q: "Puis-je réserver un transfert vers l'aéroport ?",
    a: "Oui. Choisissez « Vers l'aéroport » dans le formulaire, ou cochez l'option de trajet retour pour réserver les deux sens en une seule demande."
  },
  {
    q: "Dois-je payer au moment de la réservation ?",
    a: "Non. Le formulaire est une demande de devis. Rien n'est réservé tant que vous n'avez pas accepté le prix que nous vous envoyons."
  },
  {
    q: "Puis-je aller ailleurs au Sri Lanka ?",
    a: "Oui. Les transferts ne se limitent pas à Colombo et Negombo. Nous pouvons organiser un transfert depuis l'aéroport vers Kandy, Galle, Sigiriya, Ella ou n'importe où sur l'île."
  }
];

export default function AirportTransferPageFr() {
  return (
    <main className="private-driver-page pdc-page at-page">
      <JsonLd data={serviceSchema({name:  "Transferts aéroport privés depuis Colombo (CMB)", description:  "Transferts privés réservés à l'avance entre l'aéroport international Bandaranaike et Colombo, Negombo, Kandy, Galle ou partout au Sri Lanka.", path:  "/fr/airport-transfer", serviceType:  "Transfert aéroport"})} />

      {/* =====================================================
          HERO — texte + le formulaire de réservation
      ===================================================== */}

      <section className="pd-hero at-hero">
        <div className="pd-hero-overlay" />

        <div className="pd-hero-content">

          <div className="pd-hero-copy">
            <p className="pd-eyebrow">
              TRANSFERTS AÉROPORT · AÉROPORT INTERNATIONAL BANDARANAIKE
            </p>

            <h1>Transferts Aéroport Privés au Sri Lanka</h1>

            <p className="pd-hero-note">
              Un chauffeur privé qui vous attend à votre arrivée, ou un
              trajet serein pour reprendre votre vol. Indiquez-nous votre vol
              et votre destination, nous vous enverrons un devis.
            </p>

            <ul className="at-hero-points">
              <li>Un véhicule privé, rien que pour votre groupe</li>
              <li>Prises en charge et déposes à toute heure</li>
              <li>Colombo, Negombo ou partout sur l&apos;île</li>
              <li>Aucun paiement avant d&apos;avoir accepté le devis</li>
            </ul>
          </div>

          <div className="at-hero-form" id="book">
            <AirportTransferForm locale="fr" />
          </div>

        </div>
      </section>


      {/* =====================================================
          COMMENT ÇA MARCHE
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">COMMENT ÇA MARCHE</p>
          <h2>Comment Réserver Votre Transfert Aéroport</h2>
        </div>

        <ol className="pdc-steps">

          <li>
            <span className="pdc-step-number">1</span>
            <h3>Envoyez les Détails de Votre Vol</h3>
            <p>
              Votre date, l&apos;heure d&apos;atterrissage ou de prise en
              charge, le numéro de vol, les passagers, les bagages et
              l&apos;hôtel ou l&apos;adresse de destination.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">2</span>
            <h3>Recevez Votre Devis</h3>
            <p>
              Nous vous répondons sous 24 heures avec un prix et un véhicule
              adapté à votre groupe et à vos bagages.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">3</span>
            <h3>Confirmez Votre Transfert</h3>
            <p>
              Le devis vous convient ? Confirmez-le et nous vous enverrons
              les coordonnées de votre chauffeur avant votre voyage.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">4</span>
            <h3>Retrouvez Votre Chauffeur</h3>
            <p>
              Votre chauffeur vous attend au point de rendez-vous convenu et
              vous conduit directement à destination.
            </p>
          </li>

        </ol>

      </section>


      {/* =====================================================
          TRAJETS POPULAIRES
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">TRAJETS POPULAIRES</p>
          <h2>Où Pouvons-Nous Vous Emmener Depuis l&apos;Aéroport ?</h2>
        </div>

        <p className="pdc-intro">
          L&apos;aéroport international Bandaranaike se trouve à Katunayake,
          au nord de Colombo. La plupart des voyageurs se rendent d&apos;abord
          vers l&apos;une de ces destinations, mais nous pouvons organiser un
          transfert vers n&apos;importe quel endroit du Sri Lanka.
        </p>

        <div className="at-route-grid">
          {DESTINATIONS.map((d) => (
            <a key={d.name} href="#book" className="at-route">
              <span className="at-route-from">Aéroport →</span>
              <h3>{d.name}</h3>
              <p>{d.time}</p>
            </a>
          ))}
        </div>

        <p className="at-route-note">
          Les temps de trajet sont approximatifs et dépendent de la
          circulation et de l&apos;heure de la journée.
        </p>

      </section>


      {/* =====================================================
          CE DONT NOUS AVONS BESOIN
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">CE DONT NOUS AVONS BESOIN</p>
          <h2>Que Faut-il Indiquer dans Votre Demande ?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Plus nous en savons sur votre arrivée, plus il est facile de
            vous proposer le bon chauffeur et le bon véhicule. Lors de votre
            réservation, indiquez-nous :
          </p>

          <ul className="pdc-checklist">
            <li>La date d&apos;arrivée ou de départ</li>
            <li>L&apos;heure d&apos;atterrissage ou de prise en charge</li>
            <li>Le numéro de vol</li>
            <li>Le nombre de passagers</li>
            <li>Les grands et petits bagages</li>
            <li>L&apos;hôtel ou l&apos;adresse de destination</li>
            <li>Les sièges enfant ou besoins particuliers</li>
            <li>Si vous avez besoin d&apos;un transfert retour</li>
          </ul>

          <p className="pdc-note">
            Indiquer votre numéro de vol permet à votre chauffeur de
            s&apos;organiser selon l&apos;heure réelle d&apos;atterrissage si
            votre vol est en avance ou en retard.
          </p>
        </div>

      </section>


      {/* =====================================================
          POURQUOI RÉSERVER À L'AVANCE
      ===================================================== */}

      <section className="pd-dark-section">

        <div className="pd-section-heading pd-light">
          <p className="pd-eyebrow">POURQUOI RÉSERVER À L&apos;AVANCE</p>
          <h2>Pourquoi Réserver un Transfert Aéroport Privé à l&apos;Avance ?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            L&apos;aéroport international Bandaranaike propose plusieurs
            solutions de transport, dont les taxis, les bus et les
            transports publics. Avec un transfert privé réservé à
            l&apos;avance, votre trajet est organisé avant même votre
            atterrissage. Vous n&apos;avez rien à organiser après un long
            vol.
          </p>

          <ul className="pdc-checklist">
            <li>Votre propre véhicule, pas une navette partagée</li>
            <li>Un prix convenu avant votre voyage</li>
            <li>De la place pour votre groupe et vos bagages</li>
            <li>Direct jusqu&apos;à votre hôtel ou votre prochaine étape</li>
            <li>Un trajet retour facile à ajouter</li>
            <li>La possibilité de garder un chauffeur pour tout le voyage</li>
          </ul>

          <p>
            Vous prévoyez d&apos;explorer le Sri Lanka après votre arrivée ?
            Votre transfert aéroport peut être le début d&apos;un plus long
            voyage avec un{" "}
            <Link href="/fr/private-driver" className="at-inline-link">
              chauffeur privé
            </Link>{" "}
            ou un{" "}
            <Link href="/fr/private-tour" className="at-inline-link">
              circuit privé sur mesure
            </Link>
            .
          </p>
        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">QUESTIONS FRÉQUENTES</p>
          <h2>FAQ sur les Transferts Aéroport</h2>
        </div>

        <div className="pd-faq-list">
          {FAQS.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}


        </div>
        <JsonLd data={faqSchema(FAQS)} />

      </section>



      <RelatedLinks locale="fr" current="/fr/airport-transfer" />

      {/* =====================================================
          CTA FINAL
      ===================================================== */}

      <section className="pd-final-section at-final">

        <div className="pd-final-overlay" />

        <div className="pd-final-content">

          <p className="pd-eyebrow">TRANSFERTS AÉROPORT · SRI LANKA</p>

          <h2>
            Atterrissez au Sri Lanka
            <br />
            <span>avec votre trajet déjà organisé.</span>
          </h2>

          <a href="#book" className="pdc-cta pdc-cta-light">
            Obtenir Mon Devis de Transfert
          </a>

        </div>

      </section>

    </main>
  );
}
