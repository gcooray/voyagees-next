// "From our drivers" content for the destination pages
// (components/DriverNotes.jsx): a plain-spoken intro that replaces the
// generic overview, quick facts, and practical sections (park blocks,
// which entrance, what to skip). Written the way our drivers explain a
// place to their guests. Drive times match the trip planner's table
// (app/api/generate-itinerary/route.js) and lib/fieldNotes.js; keep them
// in line when either changes. No prices here: they change too often.

export const destinationNotes = {
  yala: {
    en: {
      intro:
        "Yala is where most people come hoping to see a leopard, and with a bit of patience many do. It's dry, scrubby country with big rocks, lagoons and a stretch of wild coastline. The park is split into blocks, and which one you go into changes the day completely.",
      facts: {
        time: "A half-day safari, or a full day if you love wildlife",
        when: "Gates open at 6 am: the first hours are the best for leopards",
        access: "2.5 h from Ella. Most people sleep in Tissamaharama",
      },
      sections: [
        {
          title: "Block 1: the famous one",
          text: "Most jeeps go in through the main Palatupana gate into Block 1. It has the best leopard odds, and also the most jeeps: when someone spots a leopard, a small traffic jam forms. It's still worth it, especially if it's your first safari.",
        },
        {
          title: "The quieter blocks",
          text: "Blocks 2, 3 and 5 see far fewer vehicles. Leopards are harder to find, but you get the park almost to yourself, with elephants, birds and crocodiles. Block 3 is reached from the Galge side, near Kataragama. If you've done Block 1 before or hate crowds, ask your driver which one fits your day.",
        },
        {
          title: "Good to know",
          text: "Parts of the park, Block 1 included, usually close for a few weeks around September–October. Avoid weekends and Sri Lankan holidays when you can. Patanangala beach and its tsunami memorial are a moving stop inside the park.",
        },
      ],
    },
    fr: {
      intro:
        "Yala, c'est là que la plupart des voyageurs viennent avec l'espoir de voir un léopard, et avec un peu de patience, beaucoup y arrivent. C'est un pays sec, fait de broussailles, de gros rochers, de lagunes et d'une côte sauvage. Le parc est découpé en blocs, et celui que vous choisissez change complètement la journée.",
      facts: {
        time: "Un safari d'une demi-journée, ou la journée entière si vous aimez la faune",
        when: "Ouverture à 6 h : les premières heures sont les meilleures pour les léopards",
        access: "2 h 30 depuis Ella. On dort en général à Tissamaharama",
      },
      sections: [
        {
          title: "Le bloc 1 : le plus connu",
          text: "La plupart des jeeps entrent par la porte principale de Palatupana, dans le bloc 1. C'est là qu'on a le plus de chances de voir un léopard… et qu'il y a le plus de jeeps : quand un léopard est repéré, un petit embouteillage se forme. Ça vaut quand même le coup, surtout pour un premier safari.",
        },
        {
          title: "Les blocs plus calmes",
          text: "Les blocs 2, 3 et 5 voient beaucoup moins de véhicules. Le léopard y est plus rare, mais vous avez presque le parc pour vous, avec éléphants, oiseaux et crocodiles. Le bloc 3 se fait côté Galge, près de Kataragama. Si vous connaissez déjà le bloc 1 ou si vous fuyez la foule, demandez à votre chauffeur lequel colle à votre journée.",
        },
        {
          title: "Bon à savoir",
          text: "Une partie du parc, dont le bloc 1, ferme en général quelques semaines vers septembre–octobre. Évitez si possible les week-ends et les jours fériés sri-lankais. La plage de Patanangala et son mémorial du tsunami sont un arrêt émouvant à l'intérieur du parc.",
        },
      ],
    },
  },

  udawalawe: {
    en: {
      intro:
        "If you want elephants without any doubt, this is the place. Udawalawe is open grassland around a big reservoir, so you see the herds from far away, often with babies. It's less famous than Yala and much less crowded, and it sits right on the road between the hills and the south coast.",
      facts: {
        time: "A half-day jeep safari",
        when: "Early morning or late afternoon, when it's cooler and the animals move",
        access: "Halfway between Ella and the south coast: an easy stop on that drive",
      },
      sections: [
        {
          title: "Elephant Transit Home",
          text: "Next to the park, this centre looks after orphaned baby elephants before releasing them into the wild. You don't touch them: you watch the feeding from a platform, at set times a few times a day. Your driver can time the safari around it.",
        },
        {
          title: "Why it works so well",
          text: "Few trees, lots of open ground: the elephants are easy to see and the jeeps don't need to chase them. You'll also see water buffalo, crocodiles, peacocks and plenty of birds of prey.",
        },
      ],
    },
    fr: {
      intro:
        "Si vous voulez des éléphants sans aucun doute, c'est ici. Udawalawe, ce sont de grandes plaines ouvertes autour d'un réservoir : on voit les troupeaux de loin, souvent avec des petits. Moins connu que Yala, beaucoup moins fréquenté, et pile sur la route entre les collines et la côte sud.",
      facts: {
        time: "Un safari en jeep d'une demi-journée",
        when: "Tôt le matin ou en fin d'après-midi, quand il fait plus frais et que les animaux bougent",
        access: "À mi-chemin entre Ella et la côte sud : un arrêt facile sur ce trajet",
      },
      sections: [
        {
          title: "L'Elephant Transit Home",
          text: "Juste à côté du parc, ce centre recueille des éléphanteaux orphelins avant de les relâcher dans la nature. On ne les touche pas : on assiste au repas depuis une plateforme, à heures fixes, plusieurs fois par jour. Votre chauffeur peut caler le safari autour.",
        },
        {
          title: "Pourquoi ça marche si bien",
          text: "Peu d'arbres, beaucoup d'espace : les éléphants se voient facilement et les jeeps n'ont pas besoin de leur courir après. Vous verrez aussi des buffles, des crocodiles, des paons et beaucoup de rapaces.",
        },
      ],
    },
  },

  wilpattu: {
    en: {
      intro:
        "Wilpattu is Sri Lanka's biggest park and its best-kept secret. Thick forest, red sandy tracks and natural lakes called villus. You'll see far fewer jeeps than in Yala, and when a leopard or a sloth bear crosses the track, it often feels like you're the only ones there.",
      facts: {
        time: "A half-day, or a full day to reach the deeper villus",
        when: "Morning safaris are the best",
        access: "About 45 minutes from Anuradhapura",
      },
      sections: [
        {
          title: "What to expect",
          text: "It's a forest park, so animals appear suddenly rather than being spotted from far away. Leopards, sloth bears, deer, elephants and lots of birds live around the villus. The tracks are bumpy: it's a real adventure, not a quick drive.",
        },
        {
          title: "Who it's for",
          text: "People who prefer calm over a guaranteed sighting, and travellers heading north to Anuradhapura or Jaffna. It fits easily on the drive from the airport towards the Cultural Triangle.",
        },
      ],
    },
    fr: {
      intro:
        "Wilpattu, c'est le plus grand parc du Sri Lanka et son secret le mieux gardé. Forêt dense, pistes de sable rouge et lacs naturels qu'on appelle les villus. On y croise beaucoup moins de jeeps qu'à Yala, et quand un léopard ou un ours lippu traverse la piste, on a souvent l'impression d'être seuls au monde.",
      facts: {
        time: "Une demi-journée, ou la journée entière pour aller jusqu'aux villus les plus reculés",
        when: "Les safaris du matin sont les meilleurs",
        access: "Environ 45 minutes depuis Anuradhapura",
      },
      sections: [
        {
          title: "À quoi s'attendre",
          text: "C'est un parc de forêt : les animaux surgissent d'un coup au lieu d'être repérés de loin. Léopards, ours lippus, cerfs, éléphants et beaucoup d'oiseaux vivent autour des villus. Les pistes secouent : c'est une vraie aventure, pas une petite balade.",
        },
        {
          title: "Pour qui",
          text: "Ceux qui préfèrent le calme à l'observation garantie, et les voyageurs qui montent vers Anuradhapura ou Jaffna. Il s'intègre facilement sur la route entre l'aéroport et le Triangle culturel.",
        },
      ],
    },
  },

  minneriya: {
    en: {
      intro:
        "In the dry months, elephants from all around walk to the great Minneriya reservoir to drink and graze. On a good evening you can see dozens, sometimes far more, in one place. It's one of the most beautiful wildlife scenes in Asia, and it's only about half an hour from Sigiriya.",
      facts: {
        time: "An afternoon safari, about 3 hours",
        when: "Late afternoon, when the herds come down to the water",
        access: "About 30 minutes from Habarana, under an hour from Sigiriya",
      },
      sections: [
        {
          title: "Minneriya, Kaudulla or Hurulu?",
          text: "The herds move with the water. Around July to October they gather at Minneriya (the famous Gathering). At other times they may be at Kaudulla or in Hurulu Eco Park next door. Jeep drivers know where the elephants are that week, so don't fix the park in advance: decide on the day.",
        },
        {
          title: "Good to know",
          text: "It's an easy add-on after a morning at Sigiriya or Polonnaruwa. Bring a light jacket against the dust and a zoom if you have one.",
        },
      ],
    },
    fr: {
      intro:
        "Pendant les mois secs, les éléphants de toute la région marchent jusqu'au grand réservoir de Minneriya pour boire et brouter. Un bon soir, on en voit des dizaines, parfois bien plus, au même endroit. C'est l'une des plus belles scènes de faune d'Asie, à une demi-heure environ de Sigiriya.",
      facts: {
        time: "Un safari d'après-midi, environ 3 heures",
        when: "En fin d'après-midi, quand les troupeaux descendent vers l'eau",
        access: "Environ 30 minutes de Habarana, moins d'une heure de Sigiriya",
      },
      sections: [
        {
          title: "Minneriya, Kaudulla ou Hurulu ?",
          text: "Les troupeaux suivent l'eau. De juillet à octobre environ, ils se rassemblent à Minneriya (le fameux « Gathering »). Le reste de l'année, ils peuvent être à Kaudulla ou dans l'Eco Park de Hurulu, juste à côté. Les chauffeurs de jeep savent où sont les éléphants cette semaine-là : ne fixez pas le parc à l'avance, décidez le jour même.",
        },
        {
          title: "Bon à savoir",
          text: "C'est un ajout facile après une matinée à Sigiriya ou Polonnaruwa. Prenez une petite veste contre la poussière, et un zoom si vous en avez un.",
        },
      ],
    },
  },

  sigiriya: {
    en: {
      intro:
        "A 200-metre rock rising out of the jungle, with a fifth-century palace on top. Halfway up you pass painted ladies on the rock face and two giant lion paws carved in stone. The climb takes some effort, but the view from the top is something you don't forget.",
      facts: {
        time: "About 3 hours for the rock and gardens",
        when: "Be there when it opens, early morning, before the heat and the tour groups",
        access: "4 h from the airport. Dambulla is 30 minutes away",
      },
      sections: [
        {
          title: "The climb",
          text: "Around 1,200 steps, with metal staircases on the steepest parts. It's fine for most people who take their time. If you're scared of heights, the last stretch after the lion paws is the airiest. Water, a hat and good shoes are enough.",
        },
        {
          title: "Pidurangala, the rock next door",
          text: "Pidurangala is the rock opposite. It's cheaper and quieter, and from the top you see Sigiriya itself, which you can't do from Sigiriya. The end is a short scramble over boulders. Go at sunrise or sunset, on a different day or session from Lion Rock.",
        },
        {
          title: "Around Sigiriya",
          text: "The village itself has little else to do. Pair the rock with the Dambulla caves, an elephant safari in the late afternoon, Ritigala's forest ruins or a village tour.",
        },
      ],
    },
    fr: {
      intro:
        "Un rocher de 200 mètres qui surgit de la jungle, avec un palais du Ve siècle au sommet. À mi-hauteur, vous passez devant des demoiselles peintes sur la paroi et deux pattes de lion géantes taillées dans la pierre. La montée demande un effort, mais la vue d'en haut ne s'oublie pas.",
      facts: {
        time: "Environ 3 heures pour le rocher et les jardins",
        when: "Dès l'ouverture, tôt le matin, avant la chaleur et les groupes",
        access: "4 h depuis l'aéroport. Dambulla est à 30 minutes",
      },
      sections: [
        {
          title: "La montée",
          text: "Environ 1 200 marches, avec des escaliers métalliques sur les passages les plus raides. Ça passe pour la plupart des gens qui prennent leur temps. Si vous avez le vertige, la dernière partie après les pattes de lion est la plus aérienne. De l'eau, un chapeau et de bonnes chaussures suffisent.",
        },
        {
          title: "Pidurangala, le rocher d'en face",
          text: "Pidurangala, c'est le rocher juste en face. Moins cher, plus calme, et d'en haut on voit Sigiriya, ce qu'on ne peut évidemment pas faire depuis Sigiriya. La fin se fait en escaladant quelques gros blocs. Allez-y au lever ou au coucher du soleil, sur un autre créneau que le rocher du Lion.",
        },
        {
          title: "Autour de Sigiriya",
          text: "Le village lui-même n'offre pas grand-chose d'autre. Associez le rocher aux grottes de Dambulla, à un safari éléphants en fin d'après-midi, aux ruines en forêt de Ritigala ou à une balade dans les villages.",
        },
      ],
    },
  },

  dambulla: {
    en: {
      intro:
        "Five caves dug into a rock, packed with Buddha statues and painted from floor to ceiling. Walking in from the heat into the cool, dim caves is a special moment. It's been a place of pilgrimage for over two thousand years, and it still feels like one.",
      facts: {
        time: "About 1 hour, including the walk up",
        when: "Early morning or late afternoon: the rock gets very hot at midday",
        access: "30 minutes from Sigiriya, easy to visit on the drive from Kandy",
      },
      sections: [
        {
          title: "Before you go up",
          text: "The walk up takes about 15–20 minutes on steps. Cover your shoulders and knees, and leave your shoes at the entrance. Bring socks: the stone is burning in the afternoon. Don't confuse the cave temple with the big golden Buddha at the bottom: the caves are the real treasure.",
        },
        {
          title: "Dambulla market",
          text: "Dambulla is also home to one of the country's biggest wholesale fruit and vegetable markets. Lorries from all over the island unload there: it's chaotic, colourful and very real. Ask your driver to stop for ten minutes.",
        },
      ],
    },
    fr: {
      intro:
        "Cinq grottes creusées dans un rocher, remplies de statues de Bouddha et peintes du sol au plafond. Passer de la chaleur du dehors à la fraîcheur et à la pénombre des grottes est un vrai moment. C'est un lieu de pèlerinage depuis plus de deux mille ans, et on le sent encore.",
      facts: {
        time: "Environ 1 heure, montée comprise",
        when: "Tôt le matin ou en fin d'après-midi : le rocher chauffe beaucoup à midi",
        access: "30 minutes de Sigiriya, facile à faire sur la route depuis Kandy",
      },
      sections: [
        {
          title: "Avant de monter",
          text: "La montée prend 15 à 20 minutes, sur des marches. Épaules et genoux couverts, chaussures laissées à l'entrée. Prenez des chaussettes : la pierre brûle l'après-midi. Ne confondez pas le temple-grotte avec le grand Bouddha doré en bas : le vrai trésor, ce sont les grottes.",
        },
        {
          title: "Le marché de Dambulla",
          text: "Dambulla accueille aussi l'un des plus grands marchés de gros de fruits et légumes du pays. Des camions de toute l'île y déchargent : c'est chaotique, coloré et très authentique. Demandez à votre chauffeur de s'y arrêter dix minutes.",
        },
      ],
    },
  },

  polonnaruwa: {
    en: {
      intro:
        "Polonnaruwa was the royal capital almost a thousand years ago, and much of it is still standing: palaces, round relic houses, a huge man-made lake and Buddhas carved straight into a granite wall. It's more compact than Anuradhapura and easier to understand, which makes it the one most travellers choose.",
      facts: {
        time: "Half a day",
        when: "Start early: it's hot and there's little shade between the ruins",
        access: "1.5 h from Sigiriya, 1 h from Habarana",
      },
      sections: [
        {
          title: "How to visit",
          text: "Buy the ticket at the museum near the entrance: it's worth 20 minutes to get the story first. The ruins are spread out, so either cycle between them or let your driver take you from one group to the next.",
        },
        {
          title: "Don't miss",
          text: "Gal Vihara and its four Buddha figures carved in a single granite wall, including a 14-metre reclining Buddha. The Vatadage, the round relic house in the Quadrangle. And the Parakrama Samudra reservoir at the end of the day. Watch out for the monkeys and your snacks.",
        },
        {
          title: "Make a day of it",
          text: "Pair it with an elephant safari at Minneriya or Kaudulla in the late afternoon: both are close by.",
        },
      ],
    },
    fr: {
      intro:
        "Polonnaruwa était la capitale royale il y a près de mille ans, et une grande partie tient encore debout : palais, reliquaires circulaires, un immense lac artificiel et des Bouddhas taillés à même une paroi de granit. Plus compacte qu'Anuradhapura et plus facile à comprendre, c'est celle que choisissent la plupart des voyageurs.",
      facts: {
        time: "Une demi-journée",
        when: "Commencez tôt : il fait chaud et il y a peu d'ombre entre les ruines",
        access: "1 h 30 de Sigiriya, 1 h de Habarana",
      },
      sections: [
        {
          title: "Comment la visiter",
          text: "Le billet s'achète au musée, près de l'entrée : prenez-y 20 minutes pour avoir l'histoire en tête. Les ruines sont étalées : faites le tour à vélo, ou laissez votre chauffeur vous emmener d'un groupe de ruines à l'autre.",
        },
        {
          title: "À ne pas manquer",
          text: "Gal Vihara et ses quatre Bouddhas sculptés dans une seule paroi de granit, dont un Bouddha couché de 14 mètres. Le Vatadage, le reliquaire circulaire du Quadrilatère. Et le réservoir de Parakrama Samudra en fin de journée. Gare aux singes et à vos en-cas.",
        },
        {
          title: "Pour une belle journée",
          text: "Associez-la à un safari éléphants à Minneriya ou Kaudulla en fin d'après-midi : les deux sont tout près.",
        },
      ],
    },
  },

  kandy: {
    en: {
      intro:
        "Kandy is the last royal capital and the spiritual heart of the island. The town wraps around a lake, with the Temple of the Tooth on its shore. It's busy and a little chaotic, but in the evening, with the drums and the smell of flowers at the temple, it has a charm of its own.",
      facts: {
        time: "1 to 2 nights",
        when: "The temple is at its most beautiful during the evening ceremony",
        access: "3 h from the airport, 2.5 to 3 h from Sigiriya",
      },
      sections: [
        {
          title: "The Temple of the Tooth",
          text: "The temple keeps a relic of the Buddha's tooth. Come for a ceremony, ideally in the evening, when the drums play and pilgrims bring flowers. Dress modestly: white or light clothes, shoulders and knees covered.",
        },
        {
          title: "Around Kandy",
          text: "The Peradeniya botanical gardens need about 2 hours and are lovely in the morning. Just outside town, the Embekke, Lankatilaka and Gadaladeniya temples make a quiet half-day loop that few visitors do. The big white Buddha on the hill gives a nice view over the town.",
        },
        {
          title: "Good to know",
          text: "Traffic in town is heavy at rush hours. In July or August, the Esala Perahera brings dozens of decorated elephants into the streets for ten nights: book your room months ahead.",
        },
      ],
    },
    fr: {
      intro:
        "Kandy, c'est la dernière capitale royale et le cœur spirituel de l'île. La ville s'enroule autour d'un lac, avec le temple de la Dent sur sa rive. Elle est animée, un peu chaotique, mais le soir, avec les tambours et l'odeur des fleurs au temple, elle a un charme bien à elle.",
      facts: {
        time: "1 à 2 nuits",
        when: "Le temple est le plus beau pendant la cérémonie du soir",
        access: "3 h depuis l'aéroport, 2 h 30 à 3 h depuis Sigiriya",
      },
      sections: [
        {
          title: "Le temple de la Dent",
          text: "Le temple conserve une relique de la dent du Bouddha. Venez pour une cérémonie, idéalement le soir, quand les tambours jouent et que les pèlerins apportent des fleurs. Tenue correcte : vêtements blancs ou clairs, épaules et genoux couverts.",
        },
        {
          title: "Autour de Kandy",
          text: "Le jardin botanique de Peradeniya demande environ 2 heures et il est très agréable le matin. Juste à la sortie de la ville, les temples d'Embekke, Lankatilaka et Gadaladeniya forment une jolie boucle d'une demi-journée que peu de visiteurs font. Le grand Bouddha blanc sur la colline offre une belle vue sur la ville.",
        },
        {
          title: "Bon à savoir",
          text: "La circulation en ville est dense aux heures de pointe. En juillet ou en août, l'Esala Perahera fait défiler des dizaines d'éléphants parés dans les rues pendant dix nuits : réservez votre chambre des mois à l'avance.",
        },
      ],
    },
  },

  "nuwara-eliya": {
    en: {
      intro:
        "At around 1,900 metres, Nuwara Eliya is the coolest town on the island, surrounded by tea estates as far as you can see. The British built it as a summer escape, and you can still feel it in the old hotels, the post office and the golf course. Mornings can be misty, and evenings are chilly.",
      facts: {
        time: "1 night, 2 if you're doing Horton Plains",
        when: "Mornings are clearest; clouds often roll in after lunch",
        access: "2.5 to 3 h from Kandy, 2.5 to 3 h from Ella",
      },
      sections: [
        {
          title: "Tea, for real",
          text: "Stop at a tea factory on the way in: you'll see the leaves withered, rolled and dried, and taste the result. Watching the pickers at work on the slopes is often the moment people remember most. Just ask before taking photos.",
        },
        {
          title: "Base for Horton Plains",
          text: "Horton Plains and World's End are best at opening time, around 6 am, before the clouds hide the view. From Nuwara Eliya it's about 1 to 1.5 h, so it means a very early start.",
        },
        {
          title: "Catching the train",
          text: "The station for Nuwara Eliya is Nanu Oya, a short drive away. Nanu Oya to Ella is the most beautiful part of the line: about 3 hours. Your driver takes your bags and meets you in Ella.",
        },
      ],
    },
    fr: {
      intro:
        "À environ 1 900 mètres, Nuwara Eliya est la ville la plus fraîche de l'île, entourée de plantations de thé à perte de vue. Les Britanniques en avaient fait leur refuge d'été, et on le sent encore dans les vieux hôtels, la poste et le golf. Les matins peuvent être brumeux, et les soirées sont fraîches.",
      facts: {
        time: "1 nuit, 2 si vous faites Horton Plains",
        when: "Le matin est le plus dégagé ; les nuages arrivent souvent après le déjeuner",
        access: "2 h 30 à 3 h depuis Kandy, 2 h 30 à 3 h depuis Ella",
      },
      sections: [
        {
          title: "Le thé, en vrai",
          text: "Arrêtez-vous dans une fabrique de thé en arrivant : vous verrez les feuilles flétries, roulées et séchées, puis vous goûterez le résultat. Voir les cueilleuses au travail sur les pentes, c'est souvent le moment dont on se souvient le plus. Demandez simplement avant de prendre des photos.",
        },
        {
          title: "La base pour Horton Plains",
          text: "Horton Plains et World's End se font à l'ouverture, vers 6 h, avant que les nuages ne cachent la vue. Depuis Nuwara Eliya, comptez 1 h à 1 h 30 : le réveil est donc très matinal.",
        },
        {
          title: "Prendre le train",
          text: "La gare de Nuwara Eliya, c'est Nanu Oya, à quelques minutes de route. Nanu Oya – Ella est la plus belle partie de la ligne : environ 3 heures. Votre chauffeur emporte vos bagages et vous retrouve à Ella.",
        },
      ],
    },
  },

  ella: {
    en: {
      intro:
        "Ella is a small mountain village that became everyone's favourite stop. Green hills, waterfalls, short hikes with huge views and cafés where you lose track of time. It gets busy in high season, but get up early and you'll find the calm that made people fall for it.",
      facts: {
        time: "2 nights",
        when: "Hikes are best early, before the heat and the clouds",
        access: "2.5 to 3 h from Nuwara Eliya, 2.5 h from Yala",
      },
      sections: [
        {
          title: "The three classics",
          text: "Little Adam's Peak: an easy walk, about 1.5 h return, magical at sunrise. Nine Arch Bridge: go early or check when a train is due, it's packed at midday. Ella Rock: a real half-day hike, with a local guide if you're not sure of the path.",
        },
        {
          title: "A little further",
          text: "Ravana Falls is 15 minutes down the road, easy to see on the way south. Dowa rock temple is a quiet stop on the Bandarawela road. Many visitors also enjoy a cooking class in a family home.",
        },
        {
          title: "Good to know",
          text: "Book your room early in high season: Ella fills up. Don't plan Little Adam's Peak and another sunrise activity on the same morning.",
        },
      ],
    },
    fr: {
      intro:
        "Ella est un petit village de montagne devenu l'étape préférée de tout le monde. Des collines vertes, des cascades, de courtes randonnées avec des vues immenses et des cafés où l'on perd la notion du temps. C'est animé en haute saison, mais levez-vous tôt et vous retrouverez le calme qui a fait son charme.",
      facts: {
        time: "2 nuits",
        when: "Les randonnées se font tôt, avant la chaleur et les nuages",
        access: "2 h 30 à 3 h depuis Nuwara Eliya, 2 h 30 depuis Yala",
      },
      sections: [
        {
          title: "Les trois classiques",
          text: "Little Adam's Peak : une marche facile, environ 1 h 30 aller-retour, magique au lever du soleil. Le Nine Arch Bridge : allez-y tôt ou renseignez-vous sur l'heure de passage d'un train, c'est bondé à midi. Ella Rock : une vraie randonnée d'une demi-journée, avec un guide local si vous n'êtes pas sûr du chemin.",
        },
        {
          title: "Un peu plus loin",
          text: "Les chutes de Ravana sont à 15 minutes en contrebas, faciles à voir en descendant vers le sud. Le temple-rocher de Dowa est un arrêt tranquille sur la route de Bandarawela. Beaucoup de voyageurs adorent aussi un cours de cuisine chez l'habitant.",
        },
        {
          title: "Bon à savoir",
          text: "Réservez tôt en haute saison : Ella se remplit vite. Ne prévoyez pas Little Adam's Peak et une autre activité au lever du soleil le même matin.",
        },
      ],
    },
  },

  galle: {
    en: {
      intro:
        "Inside the old ramparts of Galle Fort, time slows down. Narrow streets, colonial houses, small churches, cafés and shops, all surrounded by the ocean. It's a place for wandering with no plan, and for watching the sun go down from the walls with half the town.",
      facts: {
        time: "Half a day, or one night to enjoy the Fort in the evening",
        when: "Late afternoon until sunset; midday is very hot",
        access: "2.5 h from the airport, 2 h from Colombo. Unawatuna is 15 minutes away",
      },
      sections: [
        {
          title: "Walking the Fort",
          text: "Follow the ramparts all the way round: the lighthouse, Flag Rock, the old Dutch church and the bastions over the sea. The Fort is small and easy on foot. Your driver drops you at one gate and picks you up at the other.",
        },
        {
          title: "Why stay a night",
          text: "Day visitors leave around 6 pm. After that, the streets go quiet, the restaurants light up and it feels like a different place. A night inside the Fort is a lovely way to break the drive along the coast.",
        },
      ],
    },
    fr: {
      intro:
        "Derrière les vieux remparts du fort de Galle, le temps ralentit. Ruelles étroites, maisons coloniales, petites églises, cafés et boutiques, le tout entouré par l'océan. C'est un endroit pour flâner sans plan, et pour regarder le soleil se coucher depuis les remparts avec la moitié de la ville.",
      facts: {
        time: "Une demi-journée, ou une nuit pour profiter du fort le soir",
        when: "En fin d'après-midi jusqu'au coucher du soleil ; il fait très chaud à midi",
        access: "2 h 30 depuis l'aéroport, 2 h depuis Colombo. Unawatuna est à 15 minutes",
      },
      sections: [
        {
          title: "Faire le tour du fort",
          text: "Suivez les remparts tout du long : le phare, Flag Rock, la vieille église hollandaise et les bastions au-dessus de la mer. Le fort est petit et se fait facilement à pied. Votre chauffeur vous dépose à une porte et vous récupère à l'autre.",
        },
        {
          title: "Pourquoi y dormir",
          text: "Les visiteurs de la journée repartent vers 18 h. Ensuite, les rues se calment, les restaurants s'allument et l'ambiance change complètement. Une nuit dans le fort, c'est une belle façon de couper la route le long de la côte.",
        },
      ],
    },
  },

  mirissa: {
    en: {
      intro:
        "Mirissa is a curved beach of golden sand with palm trees leaning over the water. Days here are simple: a swim, a fresh coconut, fish grilled on the beach in the evening. From November to April, it's also one of the best places in the world to see blue whales.",
      facts: {
        time: "2 to 3 nights",
        when: "Whale boats leave at 6 to 7 am; Coconut Tree Hill is best at sunset",
        access: "3 h from the airport, 4 h from Ella. Weligama is 15 minutes away",
      },
      sections: [
        {
          title: "Whale watching",
          text: "Boats go out early and take 3 to 5 hours. The sea can be rough: take something for seasickness the night before if you need it. Choose an operator that keeps its distance from the whales. Keep the rest of that day for the beach.",
        },
        {
          title: "Around the bay",
          text: "Coconut Tree Hill for the sunset photo, Parrot Rock at low tide, and Secret Beach for a quieter swim. Weligama next door is great for a first surf lesson.",
        },
        {
          title: "Good to know",
          text: "December to March is busy: book your room ahead. Some beaches on this coast have strong currents: swim where the locals swim.",
        },
      ],
    },
    fr: {
      intro:
        "Mirissa, c'est une plage de sable doré en arc de cercle, avec des cocotiers penchés au-dessus de l'eau. Ici, les journées sont simples : une baignade, une noix de coco fraîche, du poisson grillé sur la plage le soir. De novembre à avril, c'est aussi l'un des meilleurs endroits au monde pour voir des baleines bleues.",
      facts: {
        time: "2 à 3 nuits",
        when: "Les bateaux pour les baleines partent à 6–7 h ; Coconut Tree Hill est à voir au coucher du soleil",
        access: "3 h depuis l'aéroport, 4 h depuis Ella. Weligama est à 15 minutes",
      },
      sections: [
        {
          title: "Voir les baleines",
          text: "Les bateaux partent tôt et la sortie dure 3 à 5 heures. La mer peut être agitée : prenez un médicament contre le mal de mer la veille si besoin. Choisissez un opérateur qui garde ses distances avec les baleines. Gardez le reste de la journée pour la plage.",
        },
        {
          title: "Autour de la baie",
          text: "Coconut Tree Hill pour la photo au coucher du soleil, Parrot Rock à marée basse, et Secret Beach pour une baignade plus tranquille. Weligama, juste à côté, est idéale pour un premier cours de surf.",
        },
        {
          title: "Bon à savoir",
          text: "De décembre à mars, il y a du monde : réservez votre chambre à l'avance. Certaines plages de cette côte ont de forts courants : baignez-vous là où se baignent les locaux.",
        },
      ],
    },
  },
};
