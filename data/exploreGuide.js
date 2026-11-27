// Content for the Explore Sri Lanka page
// (components/ExploreGuide.jsx). Drive times match the trip planner's
// table (app/api/generate-itinerary/route.js) and tips come from our
// drivers' field notes (lib/fieldNotes.js) — keep them in line when
// either changes.

// Month-by-month weather: g = good, m = mixed, r = rainy. General trends;
// the monsoons shift a little from one year to the next.
const WEATHER = {
  south: ["g", "g", "g", "g", "m", "r", "r", "m", "m", "r", "m", "g"],
  hills: ["g", "g", "g", "g", "m", "m", "m", "m", "m", "r", "m", "m"],
  triangle: ["g", "g", "g", "g", "g", "g", "g", "g", "g", "m", "m", "m"],
  east: ["m", "m", "m", "g", "g", "g", "g", "g", "g", "m", "r", "r"],
  north: ["m", "g", "g", "g", "g", "g", "g", "g", "g", "m", "r", "r"],
};

export const exploreGuide = {
  en: {
    pageTitle: "Explore Sri Lanka",
    pageLead:
      "Where to go, when to come and how long to stay: what we'd tell a friend before their first trip here.",
    mapTitle: "Every destination on the map",
    mapSubtitle: "Tap a place to see what there is to do",
    regionsEyebrow: "Region by region",
    regionsTitle: "Where to go",
    regionsIntro:
      "You won't see all of Sri Lanka in two weeks, and that's fine. Pick two or three regions that fit your dates and give them time. That's how our happiest travellers do it.",
    labels: { best: "Best time", days: "How long", access: "Getting there", tip: "From our drivers:" },
    regions: [
      {
        name: "Cultural Triangle",
        best: "All year, driest from January to September",
        days: "2 to 3 days",
        access: "4 h from the airport to Sigiriya",
        tip: "Be at the foot of Sigiriya when it opens. By 10 am it's hot and the tour buses arrive. Keep the elephant safari for late afternoon, when the herds come down to the water.",
        places: [
          ["Sigiriya", "sigiriya"],
          ["Dambulla", "dambulla"],
          ["Polonnaruwa", "polonnaruwa"],
          ["Anuradhapura", "anuradhapura"],
          ["Habarana", "habarana"],
        ],
      },
      {
        name: "Tea country",
        best: "January to April",
        days: "3 to 4 days",
        access: "3 h from the airport to Kandy",
        tip: "Don't trust the map up here. Every leg takes 2.5 to 3 hours, bend after bend. For the train, Nanu Oya to Ella is the part everyone dreams of, and it's only about 3 hours.",
        places: [
          ["Kandy", "kandy"],
          ["Nuwara Eliya", "nuwara-eliya"],
          ["Ella", "ella"],
          ["Haputale", "haputale"],
          ["Horton Plains", "horton-plains"],
        ],
      },
      {
        name: "South coast",
        best: "December to April",
        days: "3 to 5 days",
        access: "2.5 h from the airport to Galle",
        tip: "Going whale watching? The boats leave Mirissa around 6 or 7 am and you'll be back around lunchtime, a bit tired. Plan nothing else that day except the beach.",
        places: [
          ["Galle", "galle"],
          ["Unawatuna", "unawatuna"],
          ["Mirissa", "mirissa"],
          ["Weligama", "weligama"],
          ["Tangalle", "tangalle"],
        ],
      },
      {
        name: "Safaris",
        best: "All year (parts of Yala can close around September–October)",
        days: "Half a day to a day per park",
        access: "2.5 h from Ella to Yala",
        tip: "One safari is usually enough, so pick the park that's on your way. Yala for leopards, early in the morning. Udawalawe if you want elephants for sure, and it sits nicely between Ella and the beaches.",
        places: [
          ["Yala", "yala"],
          ["Udawalawe", "udawalawe"],
          ["Minneriya", "minneriya"],
          ["Wilpattu", "wilpattu"],
        ],
      },
      {
        name: "East coast",
        best: "May to September",
        days: "3 to 4 days",
        access: "2.5 h from Sigiriya to Trincomalee, 3 h from Ella to Arugam Bay",
        tip: "When the monsoon soaks the south, the east is calm and sunny. Come in winter, though, and you may get rain and a rough sea.",
        places: [
          ["Trincomalee", "trincomalee"],
          ["Passikudah", "passikudah"],
          ["Arugam Bay", "arugambay"],
        ],
      },
      {
        name: "The north",
        best: "February to September",
        days: "2 to 3 days",
        access: "4 h from Anuradhapura or Trincomalee to Jaffna",
        tip: "Jaffna feels like another country: Tamil temples, palmyra palms, crab curry. Give it two nights at least. The island ferries don't run often, so one island a day is plenty.",
        places: [
          ["Jaffna", "jaffna"],
          ["Kalpitiya", "kalpitiya"],
        ],
      },
    ],

    weatherEyebrow: "When to go",
    weatherTitle: "Where the sun is, month by month",
    weatherIntro:
      "Good news: there's always somewhere sunny. The two monsoons hit different coasts at different times. Take this as a rough guide, not a promise. The weather never quite follows the calendar.",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weatherRows: [
      ["South & west coast", WEATHER.south],
      ["Tea country", WEATHER.hills],
      ["Cultural Triangle", WEATHER.triangle],
      ["East coast", WEATHER.east],
      ["The north", WEATHER.north],
    ],
    weatherLegend: { g: "Good", m: "Mixed", r: "Rainy" },
    weatherMore: { href: "/blog/best-time-to-visit-sri-lanka", label: "The full month-by-month guide" },

    trapsEyebrow: "We see it every week",
    trapsTitle: "Mistakes that ruin a day",
    traps: [
      {
        title: "Sigiriya to Mirissa in one go",
        text: "On the map it looks like a morning drive. In reality it's 6 to 7 hours. Here you average 30 to 40 km/h, so 4 to 5 hours of driving a day is already a lot.",
      },
      {
        title: "The whole train ride from Kandy",
        text: "Six or seven hours on a hard seat. Do the beautiful part, Nanu Oya to Ella. Your driver drops you at the station and is waiting in Ella with your bags.",
      },
      {
        title: "Two sunrises in one day",
        text: "Sigiriya, Lipton's Seat, Horton Plains, Little Adam's Peak, the whales… all of them start at dawn. You can only get up early once a day.",
      },
      {
        title: "A big drive straight off the plane",
        text: "After a long flight, keep day one short: under 3 hours. And try not to drive after dark. Country roads have no lights, and elephants do cross.",
      },
    ],

    goodEyebrow: "Little things that help",
    goodTitle: "Before you go",
    good: [
      "In temples, cover your shoulders and knees and take off your shoes and hat. And no selfies with your back to a Buddha.",
      "Poya, the full-moon day, is a public holiday every month: temples are packed, no alcohol is sold and banks are closed.",
      "Cash machines are easy to find in towns. Take cash for the national parks, Kalpitiya and the villages.",
      "Nuwara Eliya is at about 1,900 m. Evenings get chilly, so pack a warm layer.",
    ],

    ctaTitle: "Want a hand with your route?",
    ctaText:
      "Build a day-by-day plan in a minute, check the one you've already got, or just talk to one of our drivers. They do these roads every day.",
    ctas: [
      ["Plan my trip", "/plan-trip"],
      ["Check my itinerary", "/plan-trip/review"],
      ["Find a driver", "/private-driver"],
    ],
    destinationBase: "/destinations/",
  },

  fr: {
    pageTitle: "Explorer le Sri Lanka",
    pageLead:
      "Où aller, quand venir, combien de temps rester : ce qu'on dirait à un ami avant son premier voyage ici.",
    mapTitle: "Toutes les destinations sur la carte",
    mapSubtitle: "Touchez un lieu pour voir ce qu'il y a à faire",
    regionsEyebrow: "Région par région",
    regionsTitle: "Où aller",
    regionsIntro:
      "On ne voit pas tout le Sri Lanka en deux semaines, et ce n'est pas grave. Choisissez deux ou trois régions qui collent à vos dates et prenez votre temps. C'est comme ça que nos voyageurs les plus heureux font.",
    labels: { best: "Meilleure période", days: "Combien de temps", access: "Pour y aller", tip: "Le mot de nos chauffeurs :" },
    regions: [
      {
        name: "Le Triangle culturel",
        best: "Toute l'année, plus sec de janvier à septembre",
        days: "2 à 3 jours",
        access: "4 h de l'aéroport à Sigiriya",
        tip: "Soyez au pied du rocher de Sigiriya à l'ouverture. À 10 h, il fait déjà chaud et les cars arrivent. Gardez le safari éléphants pour la fin d'après-midi, quand les troupeaux descendent boire.",
        places: [
          ["Sigiriya", "sigiriya"],
          ["Dambulla", "dambulla"],
          ["Polonnaruwa", "polonnaruwa"],
          ["Anuradhapura", "anuradhapura"],
          ["Habarana", "habarana"],
        ],
      },
      {
        name: "Les collines du thé",
        best: "De janvier à avril",
        days: "3 à 4 jours",
        access: "3 h de l'aéroport à Kandy",
        tip: "Ici, ne vous fiez pas à la carte. Chaque étape prend 2 h 30 à 3 h, virage après virage. Pour le train, Nanu Oya – Ella, c'est le passage dont tout le monde rêve, et il ne dure qu'environ 3 h.",
        places: [
          ["Kandy", "kandy"],
          ["Nuwara Eliya", "nuwara-eliya"],
          ["Ella", "ella"],
          ["Haputale", "haputale"],
          ["Horton Plains", "horton-plains"],
        ],
      },
      {
        name: "La côte sud",
        best: "De décembre à avril",
        days: "3 à 5 jours",
        access: "2 h 30 de l'aéroport à Galle",
        tip: "Vous partez voir les baleines ? Les bateaux quittent Mirissa vers 6 ou 7 h et vous rentrez vers midi, un peu secoués. Ce jour-là, ne prévoyez rien d'autre que la plage.",
        places: [
          ["Galle", "galle"],
          ["Unawatuna", "unawatuna"],
          ["Mirissa", "mirissa"],
          ["Weligama", "weligama"],
          ["Tangalle", "tangalle"],
        ],
      },
      {
        name: "Les safaris",
        best: "Toute l'année (des zones de Yala peuvent fermer vers septembre–octobre)",
        days: "Une demi-journée à une journée par parc",
        access: "2 h 30 d'Ella à Yala",
        tip: "Un safari suffit souvent : prenez le parc qui est sur votre route. Yala pour les léopards, tôt le matin. Udawalawe si vous voulez des éléphants à coup sûr, et il tombe pile entre Ella et les plages.",
        places: [
          ["Yala", "yala"],
          ["Udawalawe", "udawalawe"],
          ["Minneriya", "minneriya"],
          ["Wilpattu", "wilpattu"],
        ],
      },
      {
        name: "La côte est",
        best: "De mai à septembre",
        days: "3 à 4 jours",
        access: "2 h 30 de Sigiriya à Trincomalee, 3 h d'Ella à Arugam Bay",
        tip: "Quand la mousson arrose le sud, l'est est calme et ensoleillé. En hiver, en revanche, attendez-vous à de la pluie et à une mer agitée.",
        places: [
          ["Trincomalee", "trincomalee"],
          ["Passikudah", "passikudah"],
          ["Arugam Bay", "arugambay"],
        ],
      },
      {
        name: "Le Nord",
        best: "De février à septembre",
        days: "2 à 3 jours",
        access: "4 h d'Anuradhapura ou de Trincomalee à Jaffna",
        tip: "Jaffna, c'est presque un autre pays : temples tamouls, palmiers palmyre, curry de crabe. Restez-y deux nuits au moins. Les ferries vers les îles sont rares, alors une île par jour, c'est déjà bien.",
        places: [
          ["Jaffna", "jaffna"],
          ["Kalpitiya", "kalpitiya"],
        ],
      },
    ],

    weatherEyebrow: "Quand partir",
    weatherTitle: "Où il fait beau, mois par mois",
    weatherIntro:
      "Bonne nouvelle : il fait toujours beau quelque part. Les deux moussons ne tombent pas au même endroit au même moment. Prenez ce tableau comme un repère, pas comme une promesse. La météo ne suit jamais tout à fait le calendrier.",
    months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    weatherRows: [
      ["Côte sud et ouest", WEATHER.south],
      ["Collines du thé", WEATHER.hills],
      ["Triangle culturel", WEATHER.triangle],
      ["Côte est", WEATHER.east],
      ["Le Nord", WEATHER.north],
    ],
    weatherLegend: { g: "Beau", m: "Variable", r: "Pluvieux" },
    weatherMore: { href: "/fr/blog/quand-partir-au-sri-lanka", label: "Le guide complet, mois par mois" },

    trapsEyebrow: "On le voit chaque semaine",
    trapsTitle: "Les erreurs qui gâchent une journée",
    traps: [
      {
        title: "Sigiriya – Mirissa d'une traite",
        text: "Sur la carte, ça ressemble à une matinée de route. En vrai, c'est 6 à 7 heures. Ici, on roule à 30–40 km/h de moyenne : 4 à 5 heures de route par jour, c'est déjà beaucoup.",
      },
      {
        title: "Tout le trajet en train depuis Kandy",
        text: "Six à sept heures sur une banquette dure. Faites la belle partie, Nanu Oya – Ella. Votre chauffeur vous dépose à la gare et vous attend à Ella avec vos bagages.",
      },
      {
        title: "Deux levers de soleil le même jour",
        text: "Sigiriya, Lipton's Seat, Horton Plains, Little Adam's Peak, les baleines… tout commence à l'aube. On ne se lève tôt qu'une fois par jour.",
      },
      {
        title: "Une grosse étape en sortant de l'avion",
        text: "Après un long vol, gardez le premier jour court : moins de 3 heures. Et évitez de rouler de nuit. Les routes de campagne ne sont pas éclairées, et les éléphants traversent vraiment.",
      },
    ],

    goodEyebrow: "Les petites choses qui aident",
    goodTitle: "Avant de partir",
    good: [
      "Au temple, épaules et genoux couverts, chaussures et chapeau retirés. Et pas de selfie dos à un Bouddha.",
      "Le Poya, jour de pleine lune, est férié chaque mois : temples pleins, pas d'alcool en vente, banques fermées.",
      "On trouve facilement des distributeurs en ville. Prenez du liquide pour les parcs nationaux, Kalpitiya et les villages.",
      "Nuwara Eliya est à environ 1 900 m. Les soirées sont fraîches : prévoyez une petite laine.",
    ],

    ctaTitle: "Un coup de main pour votre parcours ?",
    ctaText:
      "Créez un itinéraire jour par jour en une minute, faites vérifier celui que vous avez déjà, ou parlez directement à l'un de nos chauffeurs. Ces routes, ils les font tous les jours.",
    ctas: [
      ["Créer mon itinéraire", "/fr/plan-trip"],
      ["Vérifier mon itinéraire", "/fr/plan-trip/review"],
      ["Trouver un chauffeur", "/fr/private-driver"],
    ],
    destinationBase: "/fr/destinations/",
  },
};
