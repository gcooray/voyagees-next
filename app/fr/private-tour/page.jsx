import Link from "next/link";
import "../../private-tour/page.css";

export const metadata = {
  title: "Circuit Privé au Sri Lanka – Itinéraires Sur Mesure avec Chauffeurs Qualifiés",
  description:
    "Découvrez le Sri Lanka avec un circuit privé sur mesure, conçu selon vos dates, vos centres d'intérêt et votre rythme. Voyagees élabore des itinéraires personnalisés avec transport privé et expertise locale.",
};

export default function PrivateTourPageFr() {
  return (
    <main className="private-tour-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pt-hero">
        <div className="pt-hero-content">

          <p className="pt-eyebrow">
            ITINÉRAIRES SUR MESURE · SRI LANKA
          </p>

          <h1>
            Circuit Privé au Sri Lanka – Itinéraires Sur Mesure avec
            Chauffeurs Qualifiés
          </h1>

          <p>
            Découvrez le Sri Lanka lors d&apos;un voyage privé conçu selon
            vos dates, vos centres d&apos;intérêt, votre rythme et votre
            style de voyage. Voyagees crée des voyages sur mesure avec
            transport privé, itinéraires soigneusement planifiés, expertise
            locale et accompagnement personnalisé de l&apos;arrivée au
            départ.
          </p>

          <p>
            Que vous voyagiez en couple, en famille, entre amis ou en solo,
            nous construisons l&apos;expérience autour de ce que vous
            voulez vraiment voir et faire.
          </p>

          <p className="pt-hero-prompt">
            Dites-nous ce que vous attendez de votre voyage au Sri Lanka et
            nous créerons un itinéraire personnalisé pour vous.
          </p>

          <Link href="/fr/request" className="pt-cta">
            Planifier Mon Circuit Privé
          </Link>

          <p className="pt-hero-tagline">
            Pas d&apos;horaire de groupe fixe. Pas d&apos;itinéraire
            standardisé. Juste le Sri Lanka pensé pour vous.
          </p>

        </div>
      </section>


      {/* =====================================================
          WHY A PRIVATE JOURNEY
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">POURQUOI VOYAGER EN PRIVÉ</p>
          <h2>Pourquoi les Voyageurs Choisissent un Voyage Privé avec Voyagees</h2>
        </div>

        <p className="pt-section-intro">
          Un voyage privé vous donne la liberté de découvrir le Sri Lanka
          sans être lié à un itinéraire de groupe fixe. Voyagees combine
          planification personnalisée, transport privé et connaissance
          locale des destinations pour rendre votre voyage plus facile à
          organiser et plus agréable à vivre.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            <span>01</span>
            <h3>Votre Itinéraire Est Construit Autour de Vous</h3>
            <p>
              Votre voyage commence par ce que vous souhaitez vivre.
              Dites-nous si vous vous intéressez au patrimoine ancien, à la
              faune, aux montagnes, aux plages, à la gastronomie, à
              l&apos;aventure, à la détente, ou à une combinaison de
              ceux-ci. Nous créons ensuite un itinéraire qui relie ces
              priorités en un voyage cohérent.
            </p>
          </article>

          <article className="pt-card">
            <span>02</span>
            <h3>Votre Véhicule Est Privé</h3>
            <p>
              Voyagez avec votre propre véhicule privé plutôt que de
              partager le transport avec un grand groupe. Votre chauffeur
              suit l&apos;itinéraire convenu et assure la liaison entre
              votre hébergement, vos destinations, vos activités et vos
              transferts tout au long du voyage.
            </p>
          </article>

          <article className="pt-card">
            <span>03</span>
            <h3>Votre Rythme Est Flexible</h3>
            <p>
              Un itinéraire privé vous donne, à vous et à vos compagnons de
              voyage, un plus grand contrôle sur la façon dont vous passez
              chaque journée. Vous pouvez privilégier les lieux qui comptent
              le plus pour vous plutôt que de suivre un programme de
              visites prédéterminé.
            </p>
          </article>

          <article className="pt-card">
            <span>04</span>
            <h3>Votre Voyage Est Soutenu par une Expertise Locale</h3>
            <p>
              Voyagees s&apos;appuie sur sa connaissance des destinations,
              des trajets, des hébergements, des attractions et des
              expériences sri-lankaises pour transformer vos préférences en
              un itinéraire réalisable. Résultat : moins de temps passé sur
              la logistique et plus de temps à découvrir le Sri Lanka.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <Link href="/fr/request" className="pt-cta">
            Commencer à Planifier Mon Voyage
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHAT YOUR JOURNEY CAN INCLUDE
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">THÈMES DE VOYAGE</p>
          <h2>Ce que Votre Voyage Sur Mesure au Sri Lanka Peut Inclure</h2>
        </div>

        <p className="pt-section-intro">
          Votre itinéraire peut combiner les aspects du Sri Lanka qui vous
          intéressent le plus. Voyagees relie destinations et expériences
          en un seul voyage privé coordonné, plutôt que de vous demander
          d&apos;organiser chaque élément séparément.
        </p>

        <div className="pt-card-grid pt-card-grid-3col">

          <article className="pt-card">
            <span>01</span>
            <h3>Culture &amp; Patrimoine</h3>
            <p>
              Découvrez des destinations comme Sigiriya, Dambulla et Kandy,
              avec leurs sites anciens, temples, monuments historiques et
              expériences culturelles locales.
            </p>
          </article>

          <article className="pt-card">
            <span>02</span>
            <h3>Montagnes &amp; Pays du Thé</h3>
            <p>
              Traversez les hautes terres centrales vers Nuwara Eliya et
              Ella, avec ses plantations de thé, ses paysages de montagne,
              ses randonnées et ses trajets en train panoramiques.
            </p>
          </article>

          <article className="pt-card">
            <span>03</span>
            <h3>Faune &amp; Safaris</h3>
            <p>
              Intégrez un safari dans des parcs comme Yala ou Udawalawe
              dans le cadre d&apos;un itinéraire plus large à travers
              l&apos;île.
            </p>
          </article>

          <article className="pt-card">
            <span>04</span>
            <h3>Plages &amp; Côte Sud</h3>
            <p>
              Terminez votre voyage le long de la côte sud, à Galle et
              Mirissa, entre patrimoine, plages, expériences côtières et
              détente.
            </p>
          </article>

          <article className="pt-card">
            <span>05</span>
            <h3>Gastronomie &amp; Expériences Locales</h3>
            <p>
              Intégrez à votre itinéraire la gastronomie, les marchés, les
              expériences villageoises et d&apos;autres activités locales
              selon vos envies.
            </p>
          </article>

          <article className="pt-card">
            <span>06</span>
            <h3>Luxe &amp; Détente</h3>
            <p>
              Choisissez des hôtels haut de gamme, des adresses de charme,
              des complexes et un rythme de voyage plus lent lorsque le
              confort et la détente sont la priorité.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <Link href="/fr/request" className="pt-cta">
            Construire Mon Itinéraire
          </Link>
        </div>

      </section>


      {/* =====================================================
          TRAVEL STYLES
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">STYLES DE VOYAGE</p>
          <h2>Choisissez le Voyage Adapté à Votre Style</h2>
        </div>

        <p className="pt-section-intro">
          Voyagees conçoit des voyages privés pour les voyageurs qui
          souhaitent garder le contrôle de leur expérience sri-lankaise. La
          taille de votre groupe, vos centres d&apos;intérêt et vos
          attentes déterminent la façon dont nous structurons
          l&apos;itinéraire.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            <span>01</span>
            <h3>Couples</h3>
            <p>
              Créez un voyage plus intime combinant hébergements de charme,
              sites pittoresques, faune, plages, expériences culturelles et
              moments de détente.
            </p>
          </article>

          <article className="pt-card">
            <span>02</span>
            <h3>Familles</h3>
            <p>
              Gardez un transport privé et un itinéraire flexible, avec un
              parcours pensé autour d&apos;activités adaptées aux familles,
              de temps de trajet confortables et de l&apos;hébergement de
              votre choix.
            </p>
          </article>

          <article className="pt-card">
            <span>03</span>
            <h3>Amis &amp; Petits Groupes</h3>
            <p>
              Voyagez ensemble dans un véhicule dédié tout en construisant
              un itinéraire autour de centres d&apos;intérêt communs :
              faune, randonnée, culture, gastronomie et plages.
            </p>
          </article>

          <article className="pt-card">
            <span>04</span>
            <h3>Voyageurs Exigeants</h3>
            <p>
              Combinez hébergement haut de gamme, transport privé,
              expériences soigneusement sélectionnées et un itinéraire plus
              détendu.
            </p>
          </article>

          <article className="pt-card">
            <span>05</span>
            <h3>Voyageurs Aventuriers</h3>
            <p>
              Reliez randonnée, faune, nature, paysages et expériences en
              plein air dans un voyage construit autour de
              l&apos;exploration.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          POPULAR WAYS TO EXPLORE
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">POINTS DE DÉPART</p>
          <h2>Façons Populaires de Découvrir le Sri Lanka</h2>
        </div>

        <p className="pt-section-intro">
          Vous ne savez pas par où commencer ? Voici des itinéraires
          éprouvés que Voyagees peut adapter à vos dates de voyage et à vos
          centres d&apos;intérêt.
        </p>

        <div className="pt-idea-grid">

          <Link href="/fr/request" className="pt-idea-card">
            <h3>Triangle Culturel + Kandy + Ella</h3>
            <p>
              Découvrez un patrimoine ancien avant de poursuivre vers Kandy
              et les hautes terres centrales jusqu&apos;à Ella.
            </p>
            <span className="pt-idea-link">Planifier cet itinéraire →</span>
          </Link>

          <Link href="/fr/request" className="pt-idea-card">
            <h3>Culture + Faune + Plage</h3>
            <p>
              Combinez sites culturels et safari dans un parc national
              avant de terminer sur la côte sud du Sri Lanka.
            </p>
            <span className="pt-idea-link">Planifier cet itinéraire →</span>
          </Link>

          <Link href="/fr/request" className="pt-idea-card">
            <h3>Pays des Collines + Faune + Côte</h3>
            <p>
              Explorez les montagnes et le pays du thé, découvrez la faune
              sri-lankaise, puis ralentissez le rythme au bord de
              l&apos;océan.
            </p>
            <span className="pt-idea-link">Planifier cet itinéraire →</span>
          </Link>

          <Link href="/fr/request" className="pt-idea-card">
            <h3>Découverte Complète de l&apos;Île</h3>
            <p>
              Pour un séjour plus long, combinez patrimoine, Kandy, pays du
              thé, Ella, faune, Galle et les plages pour un voyage plus
              complet.
            </p>
            <span className="pt-idea-link">Planifier cet itinéraire →</span>
          </Link>

        </div>

        <p className="pt-section-intro" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
          Ce sont des points de départ, pas des formules figées. Nous
          adaptons l&apos;itinéraire à vos dates, vos centres
          d&apos;intérêt, vos préférences d&apos;hébergement et votre
          budget.
        </p>

        <div className="pt-cta-row">
          <Link href="/fr/request" className="pt-cta">
            Demander à Voyagees de Concevoir Mon Itinéraire
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHAT'S INCLUDED
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">CE QUI EST INCLUS</p>
          <h2>Que Comprend Votre Expérience de Voyage Privé ?</h2>
        </div>

        <div className="pt-text-content">
          <p>
            Le contenu exact de votre voyage est défini dans votre devis
            personnalisé, selon l&apos;itinéraire et les services choisis.
            Voyagees coordonne les éléments clés de votre voyage afin que
            vous sachiez ce qui a été organisé avant votre départ.
          </p>
          <p>Les prestations privées peuvent inclure :</p>
        </div>

        <ul className="pt-checklist">
          <li>Véhicule et transport privés</li>
          <li>Chauffeur professionnel ou chauffeur-guide</li>
          <li>Transferts aéroport (arrivée et départ)</li>
          <li>Hébergement en hôtel</li>
          <li>Organisation des visites</li>
          <li>Safaris et observation de la faune</li>
          <li>Frais d&apos;entrée aux attractions</li>
          <li>Certains repas</li>
          <li>Planification de l&apos;itinéraire</li>
          <li>Assistance pendant votre voyage</li>
        </ul>

        <div className="pt-text-content" style={{ marginTop: "1.25rem" }}>
          <p>
            Votre devis précise clairement ce qui est inclus ou non, afin
            qu&apos;il n&apos;y ait aucune ambiguïté sur les services
            choisis.
          </p>
        </div>

      </section>


      {/* =====================================================
          COST
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">TARIFICATION</p>
          <h2>Combien Coûte Votre Voyage ?</h2>
        </div>

        <p className="pt-section-intro">
          Le prix d&apos;un voyage privé dépend de votre itinéraire réel, et
          non d&apos;un forfait générique par personne. La durée, le
          nombre de voyageurs, la catégorie d&apos;hébergement, le type de
          véhicule, les destinations, les activités et les prestations
          incluses influencent tous le devis final.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            <span>01</span>
            <h3>La Durée de Votre Voyage</h3>
            <p>
              Un voyage de cinq jours nécessite un itinéraire et un niveau
              de service différents d&apos;un séjour de dix ou quatorze
              jours.
            </p>
          </article>

          <article className="pt-card">
            <span>02</span>
            <h3>La Taille de Votre Groupe</h3>
            <p>
              Le nombre de voyageurs détermine le véhicule privé et les
              besoins d&apos;hébergement appropriés.
            </p>
          </article>

          <article className="pt-card">
            <span>03</span>
            <h3>Votre Hébergement</h3>
            <p>
              Choisissez entre des hébergements économiques,
              intermédiaires, de charme ou de luxe selon le niveau de
              confort souhaité.
            </p>
          </article>

          <article className="pt-card">
            <span>04</span>
            <h3>Vos Expériences</h3>
            <p>
              Safaris, attractions, activités spéciales et autres
              expériences contribuent au coût global du voyage.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <p style={{ color: "var(--sage)", marginBottom: "1.25rem" }}>
            Vous souhaitez un prix exact pour votre voyage ? Envoyez-nous vos
            dates, le nombre de voyageurs et le style de voyage souhaité.
            Voyagees établira un devis selon vos besoins.
          </p>
          <Link href="/fr/request" className="pt-cta">
            Obtenir Mon Devis Personnalisé
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHY VOYAGEES
      ===================================================== */}

      <section className="pt-dark-section">

        <div className="pt-section-heading pt-light">
          <p className="pt-eyebrow">POURQUOI VOYAGEES</p>
          <h2>Pourquoi Réserver Votre Voyage avec Voyagees ?</h2>
        </div>

        <p className="pt-section-intro">
          Choisir un partenaire de voyage local, ce n&apos;est pas
          seulement organiser un transport. Il vous faut un itinéraire qui
          fonctionne, une organisation fiable et une équipe qui connaît la
          destination. Voyagees réunit ces éléments grâce à :
        </p>

        <ul className="pt-value-list">
          <li>
            <strong>Planification personnalisée</strong> - Votre itinéraire
            part de vos besoins, et non d&apos;un programme standard.
          </li>
          <li>
            <strong>Transport privé</strong> - Votre voyage utilise un
            transport dédié à votre groupe.
          </li>
          <li>
            <strong>Connaissance locale des destinations</strong> - Les
            itinéraires sont conçus autour des destinations, des temps de
            trajet et des expériences du Sri Lanka.
          </li>
          <li>
            <strong>Voyage flexible</strong> - Votre voyage est structuré
            autour de vos priorités plutôt que de l&apos;horaire
            d&apos;un grand groupe.
          </li>
          <li>
            <strong>Une expérience coordonnée</strong> - Transport,
            hébergement, activités et planification de l&apos;itinéraire
            fonctionnent ensemble comme un seul voyage.
          </li>
          <li>
            <strong>Communication directe</strong> - Vous échangez
            directement avec l&apos;équipe qui planifie votre voyage.
          </li>
        </ul>

      </section>


      {/* =====================================================
          HOW EASY IS IT TO BOOK
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">COMMENT ÇA MARCHE</p>
          <h2>Est-ce Facile de Réserver ?</h2>
        </div>

        <p className="pt-section-intro">
          Planifier votre voyage privé avec Voyagees commence par une
          simple conversation.
        </p>

        <div className="pt-steps-grid">

          <div className="pt-step">
            <span className="pt-step-number">1</span>
            <h3>Parlez-Nous de Votre Voyage</h3>
            <p>
              Envoyez-nous vos dates de voyage, le nombre de voyageurs, vos
              centres d&apos;intérêt, vos destinations préférées, votre
              style d&apos;hébergement et votre budget approximatif.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">2</span>
            <h3>Nous Concevons Votre Itinéraire</h3>
            <p>
              Voyagees transforme vos besoins en un itinéraire concret
              reliant les destinations et expériences que vous souhaitez.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">3</span>
            <h3>Affinons les Détails</h3>
            <p>
              Ajustez les destinations, hôtels, activités, la durée ou le
              style de voyage jusqu&apos;à ce que l&apos;itinéraire
              corresponde à vos attentes.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">4</span>
            <h3>Confirmez Votre Voyage</h3>
            <p>
              Une fois satisfait de l&apos;itinéraire et du devis,
              confirmez les modalités convenues avec Voyagees.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">5</span>
            <h3>Arrivez au Sri Lanka</h3>
            <p>
              Votre transport, votre hébergement et votre itinéraire sont
              prêts pour votre voyage.
            </p>
          </div>

        </div>

        <div className="pt-cta-row">
          <p style={{ color: "var(--sage)", marginBottom: "1.25rem" }}>
            Vous n&apos;avez pas besoin de savoir exactement où aller avant
            de nous contacter. Dites-nous quel type de séjour vous
            souhaitez, et nous vous aiderons à le transformer en
            itinéraire.
          </p>
          <Link href="/fr/request" className="pt-cta">
            Planifier Mon Voyage au Sri Lanka
          </Link>
        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">QUESTIONS FRÉQUENTES</p>
          <h2>Questions Fréquentes</h2>
        </div>

        <div className="pt-faq-list">

          <details>
            <summary>Qu&apos;est-ce qu&apos;un circuit privé au Sri Lanka ?</summary>
            <p>
              Un circuit privé offre à votre groupe un itinéraire dédié et
              un transport privé, plutôt que de rejoindre un grand groupe.
              Voyagees construit le voyage autour de vos destinations,
              centres d&apos;intérêt, horaires et style de voyage préférés.
            </p>
          </details>

          <details>
            <summary>Combien coûte un circuit privé au Sri Lanka ?</summary>
            <p>
              Le prix dépend de la durée, du nombre de voyageurs, de
              l&apos;hébergement, du véhicule, des destinations, des
              activités et des prestations choisies. Voyagees fournit un
              devis personnalisé selon vos besoins réels.
            </p>
          </details>

          <details>
            <summary>
              Combien de jours faut-il pour un circuit privé au Sri Lanka ?
            </summary>
            <p>
              Sept à dix jours suffisent pour combiner plusieurs régions
              majeures, tandis que quatorze jours permettent un voyage plus
              complet et plus détendu. Voyagees crée aussi des itinéraires
              plus courts et ciblés pour les voyageurs disposant de moins
              de temps.
            </p>
          </details>

          <details>
            <summary>Puis-je personnaliser un circuit privé au Sri Lanka ?</summary>
            <p>
              Oui. Vous pouvez personnaliser les destinations, la durée,
              l&apos;hébergement, les activités, le transport et le rythme
              du voyage. Voyagees utilise vos préférences pour créer
              l&apos;itinéraire plutôt que de vous imposer un parcours
              fixe.
            </p>
          </details>

          <details>
            <summary>Qu&apos;est-ce qui est inclus dans un circuit privé au Sri Lanka ?</summary>
            <p>
              Votre devis précise exactement ce qui est inclus. Selon la
              formule choisie, cela peut comprendre le transport privé, les
              services de chauffeur, l&apos;hébergement, les transferts
              aéroport, les visites, les activités, les frais
              d&apos;entrée et les safaris.
            </p>
          </details>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="pt-final-section">

        <div className="pt-final-content">

          <p className="pt-eyebrow">PRÊTS QUAND VOUS L&apos;ÊTES</p>

          <h2>Prêt à Planifier le Sri Lanka à Votre Façon ?</h2>

          <p>
            Votre voyage au Sri Lanka n&apos;a pas à suivre l&apos;horaire
            de quelqu&apos;un d&apos;autre. Choisissez les lieux que vous
            voulez voir, les expériences que vous voulez vivre, le niveau
            de confort que vous préférez et le temps dont vous disposez —
            puis laissez Voyagees transformer ces choix en un itinéraire
            privé concret.
          </p>

          <p>
            Indiquez-nous vos dates de voyage, la taille de votre groupe et
            ce que vous souhaitez vivre. Nous nous occupons du reste.
          </p>

          <Link href="/fr/request" className="pt-cta">
            Demandez Votre Itinéraire Personnalisé au Sri Lanka →
          </Link>

          <p className="pt-final-note">
            Vous préférez commencer par vous inspirer ?{" "}
            <Link href="/fr/explore-sri-lanka">
              Découvrez nos circuits au Sri Lanka
            </Link>{" "}
            puis dites-nous quelles expériences vous souhaitez vivre.
          </p>

        </div>

      </section>

    </main>
  );
}
