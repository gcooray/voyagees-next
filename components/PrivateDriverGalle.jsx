import Link from "next/link";
import DriverSearch from "@/components/DriverSearch";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import { breadcrumbSchema, faqSchema } from "@/lib/structuredData";

// The Galle private-driver page, in English and French. Same layout and
// classes as the Colombo page (app/private-driver/colombo/page.css); the
// two route files only add metadata. Every "find / request a driver" CTA
// scrolls back up to the hero's driver search, which is the booking flow.

const SEARCH_ANCHOR = "#find-driver";

const T = {
  en: {
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Private Driver", path: "/private-driver" },
      { name: "Galle", path: "/private-driver/galle" },
    ],
    eyebrow: "PRIVATE DRIVER · GALLE",
    h1: "Hire Private Driver in Galle",
    heroNote:
      "Explore Galle, discover the southern coast, and travel between destinations with a private driver arranged around your schedule.",
    searchEyebrow: "PLAN YOUR JOURNEY",
    searchTitle: "Find your private driver",
    introEyebrow: "PRIVATE DRIVER SERVICE · GALLE",
    intro: (
      <>
        Whether you&apos;re planning to explore <strong>Galle Fort</strong>, spend time at nearby
        beaches, visit neighbouring coastal towns, or continue your Sri Lanka journey, Voyagees helps you
        find a driver and vehicle suited to your trip.
      </>
    ),
    findCta: "Find My Driver",

    servicesEyebrow: "SERVICES",
    servicesTitle: "Private Driver Services in Galle",
    servicesText:
      "A private driver gives you dedicated transportation for the journey you need to make. Rather than arranging separate rides for each stop, you can organise your travel around your accommodation, sightseeing plans, and preferred schedule.",
    servicesListIntro: "A private driver in Galle can be suitable for:",
    services: [
      "Exploring Galle and the surrounding area",
      "Hotel pickups and drop-offs",
      "Visits to nearby beaches and coastal towns",
      "One-way transfers to your next destination",
      "Full-day sightseeing trips",
      "Multi-stop journeys",
      "Multi-day travel around Sri Lanka",
    ],
    servicesNote: "Your arrangement depends on the route, vehicle requirements, and driver availability.",
    requestCta: "Request a Private Driver",

    sightEyebrow: "SIGHTSEEING",
    sightTitle: "Private Driver for Galle Sightseeing",
    sightText:
      "Galle combines historic architecture, coastal views, local shops, restaurants, and easy access to some of Sri Lanka's best-known southern-coast destinations. A private driver can help you include several places in one itinerary without coordinating separate transport for every stop.",
    places: [
      ["Galle Fort", "Explore the historic streets, ramparts, lighthouse area, cafés, and shops. Galle Fort is ideal for a walking visit, with a driver helping you reach the area and continue to your next stop."],
      ["Unawatuna", "Add a beach visit to your itinerary, spend time by the coast, or combine the area with other nearby attractions."],
      ["Hikkaduwa", "Plan a coastal excursion with time for the beach, local restaurants, and other stops that fit your schedule."],
      ["Mirissa and the Southern Coast", "Arrange transportation to nearby coastal destinations or use Galle as part of a wider southern Sri Lanka itinerary."],
    ],
    sightNote: "You can plan your own route or request transportation around the places you want to visit.",
    planCta: "Plan Your Galle Trip",
    imageAlt: "Galle Fort and the southern coast of Sri Lanka",
    imageCaption: "Galle, from the Fort to the southern beaches",

    transferEyebrow: "TRANSFERS",
    transferTitle: "Private Driver for Transfers from Galle",
    transferText:
      "Whether you're moving to another hotel or continuing your journey around Sri Lanka, a private driver can make the transition between destinations easier to organise.",
    transfers: [
      ["One-Way Transfers", "Arrange transport from Galle to your next destination without having to coordinate multiple connections. Share your pickup point, destination, travel date, passenger count, and luggage requirements when requesting a quote."],
      ["Galle to Nearby Coastal Destinations", "Plan journeys to destinations such as Unawatuna, Hikkaduwa, Weligama, and Mirissa, subject to the selected driver's service area and availability."],
      ["Longer Journeys Across Sri Lanka", "If Galle is one stop on a longer holiday, ask about connecting your southern-coast stay with destinations such as Ella, Kandy, or Colombo. Your route and booking requirements should be agreed in advance."],
    ],
    exploreCta: "Explore Voyagees",

    optionsEyebrow: "SERVICE OPTIONS",
    optionsTitle: "Choose the Right Private Driver Service",
    optionsIntro:
      "The best arrangement depends on how you intend to travel, how many stops you plan to make, and whether you need transportation for a few hours or several days.",
    options: [
      ["One-Way Transfer", "Suitable for journeys between Galle and another location, including hotel transfers and onward travel along the coast."],
      ["Sightseeing Trip", "A useful option when you want to visit several attractions and arrange transport around your preferred itinerary."],
      ["Full-Day Driver", "Consider this arrangement when you want dedicated transportation throughout a day of sightseeing or multiple planned stops. Confirm the duration and included kilometres before booking."],
      ["Multi-Day Journey", "For travellers exploring several parts of Sri Lanka, ask about a driver arrangement covering multiple destinations and travel dates."],
    ],

    vehiclesEyebrow: "VEHICLES",
    vehiclesTitle: "What Type of Vehicle Can You Book?",
    vehiclesIntro: "Vehicle availability depends on your trip requirements. When requesting a driver, tell us:",
    vehicleNeeds: ["Number of passengers", "Amount of luggage", "Preferred vehicle type", "Journey duration", "Pickup and destination", "Any special requirements"],
    vehiclesTypesIntro: "We can then help identify a suitable vehicle for your journey. The following vehicle types are available.",
    vehicles: [
      ["Car", "A practical option for solo travellers and couples with modest luggage."],
      ["SUV", "Worth considering when you need additional space or comfort."],
      ["Van", "May suit families and larger groups travelling together."],
      ["Premium Vehicle", "Ask about suitable options if you have specific comfort requirements."],
    ],
    vehiclesNote:
      "Vehicle availability varies by journey and driver. Include your passenger count, luggage volume, and preferred vehicle type in your request so you can compare suitable options.",

    priceEyebrow: "PRICING",
    priceTitle: "How Much Does a Private Driver in Galle Cost?",
    priceIntro:
      "The cost of hiring a private driver in Galle depends on your itinerary and the arrangement you choose. There is no single rate that applies to every trip.",
    priceListIntro: "Your quotation may depend on:",
    priceFactors: [
      "Pickup and drop-off locations",
      "Journey distance and duration",
      "Vehicle type and passenger count",
      "Number of sightseeing stops",
      "One-way, full-day, or multi-day requirements",
      "Waiting time and any additional requirements",
    ],
    priceCheck:
      "Before confirming a booking, check the total quoted amount, included mileage, fuel, parking, tolls, waiting time, and any applicable additional charges.",
    priceNote:
      "Voyagees helps travellers explore driver and vehicle options and request an arrangement suited to their journey. Review the specific booking terms before confirming.",
    quoteCta: "Request a Private Driver Quote",

    lookEyebrow: "CHOOSING A DRIVER",
    lookTitle: "What Should You Look for in a Private Driver?",
    lookIntro: "Choosing the right driver involves more than comparing prices. Check the details that affect your comfort, journey, and booking experience.",
    look: [
      ["Driver Credentials", "Ask about the driver's identity, driving licence, relevant tourism registration, and experience with the planned route."],
      ["Vehicle Suitability", "Confirm passenger capacity, luggage space, and whether the vehicle meets your travel requirements."],
      ["Clear Pricing", "Understand the quotation, inclusions, exclusions, extra-distance charges, and waiting-time arrangements."],
      ["Communication", "Make sure you can communicate clearly about pickup arrangements, itinerary changes, and travel requirements."],
      ["Booking Confirmation", "Confirm the driver, vehicle, route, travel dates, and cancellation terms before your journey."],
    ],

    whyEyebrow: "WHY VOYAGEES",
    whyTitle: "Why Book Through Voyagees?",
    whyIntro: "Voyagees connects travellers with local drivers and tour providers, helping visitors organise transportation around their own plans.",
    why: [
      ["Travel on Your Schedule", "Request transport around your preferred pickup times, destinations, and itinerary."],
      ["Compare Suitable Options", "Share your requirements to identify driver and vehicle options that fit your journey."],
      ["Plan Beyond One Destination", "Organise transport for local sightseeing, coastal transfers, or a wider Sri Lanka itinerary."],
      ["Understand the Arrangement Before Confirming", "Review the proposed service and price before accepting a driver's booking offer."],
    ],

    stepsEyebrow: "HOW TO BOOK",
    stepsTitle: "How to Book a Private Driver in Galle",
    steps: [
      ["Send Your Trip Details", "Provide your travel date, pickup location, destination, passenger count, luggage requirements, and the duration of the service you need."],
      ["Review Driver and Vehicle Options", "Compare the available options and check whether the proposed arrangement fits your itinerary and budget."],
      ["Confirm Your Booking", "Review the quotation and booking terms. Booking requests are subject to acceptance by the driver."],
      ["Meet Your Driver", "Follow the agreed pickup instructions and enjoy your planned journey around Galle or beyond."],
    ],

    faqTitle: "Frequently Asked Questions",
    faq: [
      { q: "How much does a private driver in Galle cost?", a: "Pricing depends on the distance, duration, vehicle, number of passengers, and itinerary. Request a quotation for your specific journey and check which costs are included before confirming." },
      { q: "Can I hire a private driver in Galle for a full day?", a: "You can request a full-day arrangement and specify the places you want to visit. Confirm the driver's availability, service duration, mileage limits, and additional charges before booking." },
      { q: "Can a private driver take me from Galle to Mirissa or Unawatuna?", a: "These are destinations along Sri Lanka's southern coast. Include your pickup and destination details when enquiring, and confirm that the selected driver can accommodate the route." },
      { q: "Is a private driver better than a taxi in Galle?", a: "A private driver may suit travellers planning multiple stops or a longer itinerary. A taxi can be sufficient for a straightforward point-to-point journey. The best option depends on your route, budget, and preferred flexibility." },
      { q: "Should I hire a driver or a tour guide in Galle?", a: "A driver primarily provides transportation. A professional tourist guide provides sightseeing interpretation and other guiding services within their qualifications. If you want both, ask about an appropriate combined arrangement." },
      { q: "How far in advance should I book a private driver?", a: "Booking ahead is sensible when you have fixed travel dates, a specific vehicle requirement, or a multi-day itinerary. Availability is not guaranteed until the booking is confirmed." },
    ],

    finalEyebrow: "PRIVATE DRIVER · GALLE",
    finalTitle: (
      <>
        Your Galle Journey
        <br />
        <span>Starts Here</span>
      </>
    ),
    finalText:
      "From the historic streets of Galle Fort to the beaches of the southern coast, arrange your transportation around the places you want to discover.",
    finalText2:
      "Whether you need a driver for local sightseeing, a transfer to your next destination, or a longer journey around Sri Lanka, start by sharing your travel plans.",
    prefix: "",
  },

  fr: {
    crumbs: [
      { name: "Accueil", path: "/fr" },
      { name: "Chauffeur privé", path: "/fr/private-driver" },
      { name: "Galle", path: "/fr/private-driver/galle" },
    ],
    eyebrow: "CHAUFFEUR PRIVÉ · GALLE",
    h1: "Réservez un Chauffeur Privé à Galle",
    heroNote:
      "Explorez Galle, découvrez la côte sud et voyagez d'une étape à l'autre avec un chauffeur privé, organisé selon votre emploi du temps.",
    searchEyebrow: "PLANIFIEZ VOTRE TRAJET",
    searchTitle: "Trouvez votre chauffeur privé",
    introEyebrow: "SERVICE DE CHAUFFEUR PRIVÉ · GALLE",
    intro: (
      <>
        Que vous souhaitiez visiter le <strong>fort de Galle</strong>, profiter des plages voisines,
        découvrir les villes côtières alentour ou poursuivre votre voyage au Sri Lanka, Voyagees vous aide à
        trouver le chauffeur et le véhicule adaptés à votre séjour.
      </>
    ),
    findCta: "Trouver mon chauffeur",

    servicesEyebrow: "SERVICES",
    servicesTitle: "Services de chauffeur privé à Galle",
    servicesText:
      "Un chauffeur privé vous offre un transport dédié pour le trajet que vous devez faire. Plutôt que de réserver un trajet séparé pour chaque étape, vous organisez vos déplacements autour de votre hébergement, de vos visites et de votre rythme.",
    servicesListIntro: "Un chauffeur privé à Galle peut vous servir pour :",
    services: [
      "Découvrir Galle et ses environs",
      "Les prises en charge et dépôts à l'hôtel",
      "Les plages et villes côtières voisines",
      "Un transfert aller simple vers votre prochaine étape",
      "Une journée complète de visites",
      "Des trajets avec plusieurs arrêts",
      "Un voyage de plusieurs jours au Sri Lanka",
    ],
    servicesNote: "L'organisation dépend de l'itinéraire, du véhicule souhaité et de la disponibilité des chauffeurs.",
    requestCta: "Demander un chauffeur privé",

    sightEyebrow: "VISITES",
    sightTitle: "Un chauffeur privé pour visiter Galle",
    sightText:
      "Galle réunit architecture historique, vues sur l'océan, boutiques, restaurants et un accès facile aux plus célèbres destinations de la côte sud. Avec un chauffeur privé, vous pouvez enchaîner plusieurs lieux dans la même journée sans organiser un transport pour chaque arrêt.",
    places: [
      ["Le fort de Galle", "Flânez dans ses rues historiques, sur les remparts, autour du phare, entre cafés et boutiques. Le fort se visite à pied : votre chauffeur vous y dépose et vous emmène ensuite à l'étape suivante."],
      ["Unawatuna", "Ajoutez une pause plage à votre programme, profitez de la côte ou combinez-la avec d'autres lieux à proximité."],
      ["Hikkaduwa", "Prévoyez une sortie sur la côte avec du temps pour la plage, les restaurants et d'autres arrêts selon votre rythme."],
      ["Mirissa et la côte sud", "Organisez vos trajets vers les destinations côtières voisines, ou faites de Galle une étape d'un itinéraire plus large dans le sud du Sri Lanka."],
    ],
    sightNote: "Vous pouvez préparer votre propre itinéraire ou demander un transport autour des lieux que vous souhaitez visiter.",
    planCta: "Préparer mon séjour à Galle",
    imageAlt: "Le fort de Galle et la côte sud du Sri Lanka",
    imageCaption: "Galle, du fort aux plages du sud",

    transferEyebrow: "TRANSFERTS",
    transferTitle: "Un chauffeur privé pour vos transferts depuis Galle",
    transferText:
      "Que vous changiez d'hôtel ou que vous poursuiviez votre voyage au Sri Lanka, un chauffeur privé simplifie le passage d'une étape à l'autre.",
    transfers: [
      ["Transferts aller simple", "Rejoignez votre prochaine destination depuis Galle sans avoir à combiner plusieurs correspondances. Indiquez le lieu de prise en charge, la destination, la date, le nombre de passagers et vos bagages lors de votre demande de devis."],
      ["De Galle vers les destinations côtières", "Organisez vos trajets vers Unawatuna, Hikkaduwa, Weligama ou Mirissa, selon la zone de service et la disponibilité du chauffeur choisi."],
      ["Des trajets plus longs à travers le Sri Lanka", "Si Galle n'est qu'une étape de votre voyage, demandez à relier votre séjour sur la côte sud à des destinations comme Ella, Kandy ou Colombo. L'itinéraire et les conditions de réservation sont à convenir à l'avance."],
    ],
    exploreCta: "Découvrir Voyagees",

    optionsEyebrow: "FORMULES",
    optionsTitle: "Choisissez la formule qui vous convient",
    optionsIntro:
      "La meilleure formule dépend de votre façon de voyager, du nombre d'arrêts prévus et de la durée dont vous avez besoin : quelques heures ou plusieurs jours.",
    options: [
      ["Transfert aller simple", "Pour un trajet entre Galle et un autre lieu, y compris les transferts d'hôtel et la suite du voyage le long de la côte."],
      ["Excursion de visite", "Idéal pour visiter plusieurs sites en organisant le transport autour de votre itinéraire."],
      ["Chauffeur à la journée", "Pour un transport dédié pendant toute une journée de visites ou d'arrêts prévus. Vérifiez la durée et les kilomètres inclus avant de réserver."],
      ["Voyage de plusieurs jours", "Si vous explorez plusieurs régions du Sri Lanka, demandez une formule avec un chauffeur pour toutes vos étapes et vos dates."],
    ],

    vehiclesEyebrow: "VÉHICULES",
    vehiclesTitle: "Quel type de véhicule pouvez-vous réserver ?",
    vehiclesIntro: "La disponibilité des véhicules dépend de votre voyage. Lors de votre demande, indiquez-nous :",
    vehicleNeeds: ["Le nombre de passagers", "Le volume de bagages", "Le type de véhicule souhaité", "La durée du trajet", "Le lieu de prise en charge et la destination", "Vos besoins particuliers"],
    vehiclesTypesIntro: "Nous pourrons alors vous proposer un véhicule adapté. Les types de véhicules suivants sont disponibles.",
    vehicles: [
      ["Voiture", "Une option pratique pour les voyageurs seuls et les couples avec peu de bagages."],
      ["SUV", "À envisager si vous souhaitez plus d'espace ou de confort."],
      ["Van", "Adapté aux familles et aux groupes qui voyagent ensemble."],
      ["Véhicule premium", "Demandez-nous les options possibles si vous avez des exigences de confort particulières."],
    ],
    vehiclesNote:
      "La disponibilité des véhicules varie selon le trajet et le chauffeur. Précisez le nombre de passagers, le volume de bagages et le type de véhicule souhaité pour comparer les options adaptées.",

    priceEyebrow: "TARIFS",
    priceTitle: "Combien coûte un chauffeur privé à Galle ?",
    priceIntro:
      "Le prix d'un chauffeur privé à Galle dépend de votre itinéraire et de la formule choisie. Il n'existe pas de tarif unique pour tous les trajets.",
    priceListIntro: "Votre devis peut dépendre :",
    priceFactors: [
      "Des lieux de prise en charge et de dépôt",
      "De la distance et de la durée du trajet",
      "Du type de véhicule et du nombre de passagers",
      "Du nombre d'arrêts de visite",
      "D'un aller simple, d'une journée ou de plusieurs jours",
      "Du temps d'attente et de vos besoins particuliers",
    ],
    priceCheck:
      "Avant de confirmer, vérifiez le montant total du devis, les kilomètres inclus, le carburant, le parking, les péages, le temps d'attente et les éventuels frais supplémentaires.",
    priceNote:
      "Voyagees aide les voyageurs à comparer les chauffeurs et les véhicules, et à demander une formule adaptée à leur trajet. Lisez les conditions de réservation avant de confirmer.",
    quoteCta: "Demander un devis",

    lookEyebrow: "BIEN CHOISIR",
    lookTitle: "Comment bien choisir son chauffeur privé ?",
    lookIntro: "Bien choisir son chauffeur, ce n'est pas seulement comparer les prix. Vérifiez les points qui comptent pour votre confort, votre trajet et votre réservation.",
    look: [
      ["Les qualifications du chauffeur", "Renseignez-vous sur son identité, son permis de conduire, son enregistrement touristique éventuel et son expérience de l'itinéraire prévu."],
      ["Le véhicule", "Vérifiez le nombre de places, l'espace pour les bagages et que le véhicule répond à vos besoins."],
      ["Un prix clair", "Comprenez le devis : ce qui est inclus ou non, les kilomètres supplémentaires et le temps d'attente."],
      ["La communication", "Assurez-vous de pouvoir échanger facilement sur la prise en charge, les changements d'itinéraire et vos besoins."],
      ["La confirmation", "Confirmez le chauffeur, le véhicule, l'itinéraire, les dates et les conditions d'annulation avant le départ."],
    ],

    whyEyebrow: "POURQUOI VOYAGEES",
    whyTitle: "Pourquoi réserver avec Voyagees ?",
    whyIntro: "Voyagees met en relation les voyageurs avec des chauffeurs et des prestataires locaux, pour organiser les déplacements selon leurs propres projets.",
    why: [
      ["Voyagez à votre rythme", "Demandez un transport selon vos horaires, vos destinations et votre itinéraire."],
      ["Comparez les options", "Indiquez vos besoins pour trouver les chauffeurs et véhicules adaptés à votre trajet."],
      ["Allez au-delà d'une seule étape", "Organisez vos visites sur place, vos transferts sur la côte ou un itinéraire plus large au Sri Lanka."],
      ["Tout est clair avant de confirmer", "Consultez la prestation et le prix proposés avant d'accepter l'offre d'un chauffeur."],
    ],

    stepsEyebrow: "RÉSERVATION",
    stepsTitle: "Comment réserver un chauffeur privé à Galle",
    steps: [
      ["Envoyez les détails de votre voyage", "Indiquez la date, le lieu de prise en charge, la destination, le nombre de passagers, vos bagages et la durée souhaitée."],
      ["Comparez les chauffeurs et véhicules", "Consultez les options disponibles et vérifiez qu'elles correspondent à votre itinéraire et à votre budget."],
      ["Confirmez votre réservation", "Lisez le devis et les conditions de réservation. Les demandes sont soumises à l'acceptation du chauffeur."],
      ["Retrouvez votre chauffeur", "Suivez les instructions de prise en charge convenues et profitez de votre trajet à Galle et au-delà."],
    ],

    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Combien coûte un chauffeur privé à Galle ?", a: "Le prix dépend de la distance, de la durée, du véhicule, du nombre de passagers et de l'itinéraire. Demandez un devis pour votre trajet et vérifiez ce qui est inclus avant de confirmer." },
      { q: "Puis-je réserver un chauffeur privé à Galle pour une journée entière ?", a: "Oui, vous pouvez demander une formule à la journée en indiquant les lieux que vous souhaitez visiter. Vérifiez la disponibilité du chauffeur, la durée, les kilomètres inclus et les éventuels frais supplémentaires avant de réserver." },
      { q: "Un chauffeur privé peut-il m'emmener de Galle à Mirissa ou Unawatuna ?", a: "Ce sont des destinations de la côte sud du Sri Lanka. Indiquez vos lieux de prise en charge et de destination lors de votre demande, et vérifiez que le chauffeur choisi peut assurer ce trajet." },
      { q: "Un chauffeur privé est-il préférable à un taxi à Galle ?", a: "Un chauffeur privé convient aux voyageurs qui prévoient plusieurs arrêts ou un itinéraire plus long. Un taxi peut suffire pour un trajet simple d'un point à un autre. Tout dépend de votre itinéraire, de votre budget et de la souplesse souhaitée." },
      { q: "Faut-il prendre un chauffeur ou un guide touristique à Galle ?", a: "Un chauffeur assure avant tout le transport. Un guide touristique professionnel commente les visites et propose d'autres services de guidage selon ses qualifications. Si vous souhaitez les deux, demandez une formule combinée adaptée." },
      { q: "Combien de temps à l'avance faut-il réserver un chauffeur privé ?", a: "Mieux vaut réserver à l'avance si vos dates sont fixes, si vous avez besoin d'un véhicule particulier ou si vous prévoyez un voyage de plusieurs jours. La disponibilité n'est garantie qu'une fois la réservation confirmée." },
    ],

    finalEyebrow: "CHAUFFEUR PRIVÉ · GALLE",
    finalTitle: (
      <>
        Votre voyage à Galle
        <br />
        <span>commence ici.</span>
      </>
    ),
    finalText:
      "Des rues historiques du fort de Galle aux plages de la côte sud, organisez vos trajets autour des lieux que vous voulez découvrir.",
    finalText2:
      "Que vous ayez besoin d'un chauffeur pour vos visites, d'un transfert vers votre prochaine étape ou d'un voyage plus long à travers le Sri Lanka, commencez par nous partager votre projet.",
    prefix: "/fr",
  },
};

function Checklist({ items }) {
  return (
    <ul className="pdc-checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Cards({ items, threeCols = false }) {
  return (
    <div className={`pdc-card-grid${threeCols ? " pdc-card-grid-3col" : ""}`}>
      {items.map(([title, text], i) => (
        <article className="pd-benefit" key={title}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export default function PrivateDriverGalle({ locale = "en" }) {
  const t = T[locale] || T.en;
  const path = `${t.prefix}/private-driver/galle`;

  return (
    <main className="private-driver-page pdc-page pdg-page">
      <JsonLd data={breadcrumbSchema(t.crumbs)} />
      <JsonLd data={faqSchema(t.faq)} />

      {/* HERO */}
      <section className="pd-hero pdg-hero">
        <div className="pd-hero-overlay" />
        <div className="pd-hero-content">
          <div className="pd-hero-copy">
            <p className="pd-eyebrow">{t.eyebrow}</p>
            <h1>{t.h1}</h1>
            <p className="pd-hero-note">{t.heroNote}</p>
          </div>
          <div className="pd-hero-search" id="find-driver">
            <div className="pd-search-heading">
              <p className="pd-eyebrow pd-dark">{t.searchEyebrow}</p>
              <h2>{t.searchTitle}</h2>
            </div>
            <DriverSearch locale={locale} />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pd-intro-section">
        <div className="pd-content">
          <p className="pd-eyebrow pd-dark">{t.introEyebrow}</p>
          <p className="pd-lead">{t.intro}</p>
          <a href={SEARCH_ANCHOR} className="pdc-cta">{t.findCta}</a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="pd-white-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.servicesEyebrow}</p>
          <h2>{t.servicesTitle}</h2>
        </div>
        <div className="pd-text-content">
          <p>{t.servicesText}</p>
          <p>{t.servicesListIntro}</p>
          <Checklist items={t.services} />
          <p className="pdc-note">{t.servicesNote}</p>
          <a href={SEARCH_ANCHOR} className="pdc-cta">{t.requestCta}</a>
        </div>
      </section>

      {/* SIGHTSEEING */}
      <section className="pd-cream-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.sightEyebrow}</p>
          <h2>{t.sightTitle}</h2>
        </div>
        <p className="pdc-intro">{t.sightText}</p>
        <Cards items={t.places} />
        <div className="pd-text-content pdg-after-cards">
          <p className="pdc-note">{t.sightNote}</p>
          <Link href={`${t.prefix}/plan-trip`} className="pdc-cta">{t.planCta}</Link>
        </div>
      </section>

      <div className="pd-inline-image">
        <img src="/images/hero/galle.webp" alt={t.imageAlt} />
        <p className="pd-image-caption">{t.imageCaption}</p>
      </div>

      {/* TRANSFERS */}
      <section className="pd-dark-section">
        <div className="pd-section-heading pd-light">
          <p className="pd-eyebrow">{t.transferEyebrow}</p>
          <h2>{t.transferTitle}</h2>
        </div>
        <div className="pd-text-content">
          <p>{t.transferText}</p>
          {t.transfers.map(([title, text]) => (
            <div className="pdg-transfer" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
          <Link href={t.prefix || "/"} className="pdc-cta pdc-cta-light">{t.exploreCta}</Link>
        </div>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="pd-cream-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.optionsEyebrow}</p>
          <h2>{t.optionsTitle}</h2>
        </div>
        <p className="pdc-intro">{t.optionsIntro}</p>
        <Cards items={t.options} />
      </section>

      {/* VEHICLES */}
      <section className="pd-white-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.vehiclesEyebrow}</p>
          <h2>{t.vehiclesTitle}</h2>
        </div>
        <div className="pd-text-content">
          <p>{t.vehiclesIntro}</p>
          <Checklist items={t.vehicleNeeds} />
          <p>{t.vehiclesTypesIntro}</p>
        </div>
        <Cards items={t.vehicles} />
        <div className="pd-text-content pdg-after-cards">
          <p className="pdc-note">{t.vehiclesNote}</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="pd-cream-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.priceEyebrow}</p>
          <h2>{t.priceTitle}</h2>
        </div>
        <div className="pd-text-content">
          <p>{t.priceIntro}</p>
          <p>{t.priceListIntro}</p>
          <Checklist items={t.priceFactors} />
          <p>{t.priceCheck}</p>
          <p className="pdc-note">{t.priceNote}</p>
          <a href={SEARCH_ANCHOR} className="pdc-cta">{t.quoteCta}</a>
        </div>
      </section>

      {/* WHAT TO LOOK FOR */}
      <section className="pd-white-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.lookEyebrow}</p>
          <h2>{t.lookTitle}</h2>
        </div>
        <p className="pdc-intro">{t.lookIntro}</p>
        <Cards items={t.look} threeCols />
      </section>

      {/* WHY VOYAGEES */}
      <section className="pd-cream-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.whyEyebrow}</p>
          <h2>{t.whyTitle}</h2>
        </div>
        <p className="pdc-intro">{t.whyIntro}</p>
        <Cards items={t.why} />
      </section>

      {/* HOW TO BOOK */}
      <section className="pd-white-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">{t.stepsEyebrow}</p>
          <h2>{t.stepsTitle}</h2>
        </div>
        <ol className="pdc-steps">
          {t.steps.map(([title, text], i) => (
            <li key={title}>
              <span className="pdc-step-number">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="pd-text-content pdg-after-cards">
          <a href={SEARCH_ANCHOR} className="pdc-cta">{t.findCta}</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="pd-cream-section">
        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">FAQ</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="pdg-faq">
          {t.faq.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedLinks locale={locale} current={path} />

      {/* FINAL CTA */}
      <section className="pd-final-section pdg-final">
        <div className="pd-final-overlay" />
        <div className="pd-final-content">
          <p className="pd-eyebrow">{t.finalEyebrow}</p>
          <h2>{t.finalTitle}</h2>
          <p className="pdg-final-text">{t.finalText}</p>
          <p className="pdg-final-text">{t.finalText2}</p>
          <a href={SEARCH_ANCHOR} className="pdc-cta pdc-cta-light">{t.findCta}</a>
        </div>
      </section>
    </main>
  );
}
