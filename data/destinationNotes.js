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

  anuradhapura: {
    en: {
      intro:
        "Anuradhapura was Sri Lanka's first great capital, more than two thousand years ago. Giant white and brick dagobas rise above the trees, and pilgrims in white still come every day to the sacred Bodhi tree. It's spread out, quiet and deeply spiritual: less of a ruin site, more of a living holy city.",
      facts: {
        time: "A full day",
        when: "Early morning or late afternoon; the middle of the day is hot and shadeless",
        access: "2 h from Sigiriya, 45 minutes from Wilpattu, 4 h from Jaffna",
      },
      sections: [
        {
          title: "How to see it",
          text: "The sites are kilometres apart, so go by bicycle, tuk-tuk or with your driver. Don't miss the Sri Maha Bodhi, grown from a cutting of the tree under which the Buddha found enlightenment, the white Ruwanwelisaya and the huge brick Jetavanaramaya. Isurumuniya, a small rock temple, is lovely at the end of the day.",
        },
        {
          title: "Good to know",
          text: "White or light clothing is best, with shoulders and knees covered; you'll take your shoes off often. On Poya (full-moon) days, thousands of pilgrims come: it's beautiful but very crowded. Mihintale, where Buddhism arrived on the island, is 30 minutes away and best early morning or late afternoon.",
        },
      ],
    },
    fr: {
      intro:
        "Anuradhapura fut la première grande capitale du Sri Lanka, il y a plus de deux mille ans. D'immenses dagobas blancs et de brique dépassent des arbres, et des pèlerins en blanc viennent encore chaque jour vers l'arbre sacré de la Bodhi. C'est étendu, calme et profondément spirituel : moins un site de ruines qu'une ville sainte bien vivante.",
      facts: {
        time: "Une journée entière",
        when: "Tôt le matin ou en fin d'après-midi ; le milieu de journée est chaud et sans ombre",
        access: "2 h de Sigiriya, 45 minutes de Wilpattu, 4 h de Jaffna",
      },
      sections: [
        {
          title: "Comment la visiter",
          text: "Les sites sont à plusieurs kilomètres les uns des autres : à vélo, en tuk-tuk ou avec votre chauffeur. Ne manquez pas le Sri Maha Bodhi, né d'une bouture de l'arbre sous lequel le Bouddha a atteint l'Éveil, le Ruwanwelisaya tout blanc et l'immense Jetavanaramaya en brique. Isurumuniya, un petit temple dans la roche, est très beau en fin de journée.",
        },
        {
          title: "Bon à savoir",
          text: "Mieux vaut des vêtements blancs ou clairs, épaules et genoux couverts ; vous retirerez souvent vos chaussures. Les jours de Poya (pleine lune), des milliers de pèlerins viennent : c'est très beau, mais bondé. Mihintale, où le bouddhisme est arrivé sur l'île, est à 30 minutes, idéal tôt le matin ou en fin d'après-midi.",
        },
      ],
    },
  },

  jaffna: {
    en: {
      intro:
        "Jaffna feels like another country. Colourful Hindu temples, palmyra palms, bicycles everywhere and the best crab curry on the island. The north was closed to travellers for years, so it's still wonderfully authentic. People are curious and welcoming: give it time.",
      facts: {
        time: "2 nights at least, 3 if you want an island",
        when: "Temple ceremonies are in the morning and evening",
        access: "4 h from Anuradhapura or Trincomalee",
      },
      sections: [
        {
          title: "In town",
          text: "Nallur Kandaswamy Kovil is the heart of Jaffna: go for a puja, and note that men take their shirts off to enter. Walk the old Dutch fort, see the rebuilt public library, and eat: crab curry, kool (a seafood soup) and palmyra sweets. Jaffna is at its liveliest during the Nallur festival, usually in July–August.",
        },
        {
          title: "The islands",
          text: "Causeways lead to the islands, and small ferries go further. Nainativu has a Hindu temple and a Buddhist shrine side by side. Delft is wilder, with coral stone walls and wild ponies. Boats are few and depend on the weather: one island per day is plenty.",
        },
        {
          title: "Further north",
          text: "Point Pedro, the northern tip of the island, the Keerimalai springs and Casuarina beach make an easy half-day loop with your driver.",
        },
      ],
    },
    fr: {
      intro:
        "Jaffna, c'est presque un autre pays. Temples hindous colorés, palmiers palmyre, vélos partout et le meilleur curry de crabe de l'île. Le Nord a longtemps été fermé aux voyageurs, il est donc resté merveilleusement authentique. Les gens sont curieux et accueillants : prenez votre temps.",
      facts: {
        time: "2 nuits minimum, 3 si vous voulez une île",
        when: "Les cérémonies au temple ont lieu le matin et le soir",
        access: "4 h depuis Anuradhapura ou Trincomalee",
      },
      sections: [
        {
          title: "En ville",
          text: "Le Nallur Kandaswamy Kovil est le cœur de Jaffna : allez-y pour une puja, et sachez que les hommes retirent leur chemise pour entrer. Promenez-vous dans le vieux fort hollandais, voyez la bibliothèque reconstruite, et mangez : curry de crabe, kool (une soupe de fruits de mer) et douceurs au palmyre. Jaffna est la plus animée pendant le festival de Nallur, en général en juillet–août.",
        },
        {
          title: "Les îles",
          text: "Des chaussées mènent aux îles, et de petits ferries vont plus loin. À Nainativu, un temple hindou et un sanctuaire bouddhiste se font face. Delft est plus sauvage, avec ses murets de corail et ses poneys en liberté. Les bateaux sont rares et dépendent de la météo : une île par jour, c'est déjà bien.",
        },
        {
          title: "Plus au nord",
          text: "Point Pedro, la pointe nord de l'île, les sources de Keerimalai et la plage de Casuarina font une jolie boucle d'une demi-journée avec votre chauffeur.",
        },
      ],
    },
  },

  trincomalee: {
    en: {
      intro:
        "Trincomalee has one of the deepest natural harbours in the world, a temple perched on a cliff and long, quiet beaches just north of town. When the south coast gets the monsoon, the sea here turns calm and turquoise. It's the place for snorkelling and lazy days.",
      facts: {
        time: "2 to 3 nights",
        when: "May to September; from November to January it can be rainy with rough sea",
        access: "2.5 h from Sigiriya, 4 h from Jaffna",
      },
      sections: [
        {
          title: "Beaches and Pigeon Island",
          text: "Most people stay at Uppuveli or Nilaveli, a little north of town. From Nilaveli, boats go to Pigeon Island, a small marine park where you snorkel with reef fish, turtles and often small blacktip reef sharks. Go early, before the crowds.",
        },
        {
          title: "In town",
          text: "Koneswaram temple sits on Swami Rock, high above the sea: go for the view and the evening atmosphere. On the way you pass through Fort Frederick, where spotted deer wander between the buildings.",
        },
      ],
    },
    fr: {
      intro:
        "Trincomalee possède l'un des ports naturels les plus profonds du monde, un temple perché sur une falaise et de longues plages tranquilles juste au nord de la ville. Quand la mousson touche la côte sud, la mer devient ici calme et turquoise. C'est l'endroit pour le snorkeling et les journées paresseuses.",
      facts: {
        time: "2 à 3 nuits",
        when: "De mai à septembre ; de novembre à janvier, pluie et mer agitée sont possibles",
        access: "2 h 30 de Sigiriya, 4 h de Jaffna",
      },
      sections: [
        {
          title: "Les plages et Pigeon Island",
          text: "On loge en général à Uppuveli ou Nilaveli, un peu au nord de la ville. De Nilaveli, des bateaux partent pour Pigeon Island, un petit parc marin où l'on nage avec des poissons de récif, des tortues et souvent de petits requins à pointe noire. Allez-y tôt, avant la foule.",
        },
        {
          title: "En ville",
          text: "Le temple de Koneswaram est posé sur le Swami Rock, au-dessus de la mer : venez pour la vue et l'ambiance du soir. En chemin, vous traversez Fort Frederick, où des cerfs tachetés se promènent entre les bâtiments.",
        },
      ],
    },
  },

  arugambay: {
    en: {
      intro:
        "Arugam Bay is a surf village on the east coast: one main road, sandy cafés, fishing boats and a famous right-hand point break. In season it's buzzing with surfers from all over the world; out of season it goes very quiet. It's far from everything, and that's part of its charm.",
      facts: {
        time: "3 nights or more",
        when: "Surf season is roughly May to September",
        access: "3 h from Ella, longer from the south coast",
      },
      sections: [
        {
          title: "Surf for every level",
          text: "Main Point is for experienced surfers. Beginners go to the softer spots south of the bay, like Whiskey Point, Peanut Farm or Elephant Rock, often with a tuk-tuk and a board on the roof. Plenty of schools offer lessons.",
        },
        {
          title: "Beyond the waves",
          text: "A lagoon safari near Pottuvil for crocodiles, birds and sometimes elephants. Kumana National Park further south, quiet and wonderful for birds. And Muhudu Maha Viharaya, an old temple right on the beach.",
        },
      ],
    },
    fr: {
      intro:
        "Arugam Bay, c'est un village de surf sur la côte est : une rue principale, des cafés les pieds dans le sable, des barques de pêcheurs et une vague droite célèbre. En saison, ça vibre avec des surfeurs du monde entier ; hors saison, tout devient très calme. C'est loin de tout, et ça fait partie de son charme.",
      facts: {
        time: "3 nuits ou plus",
        when: "La saison de surf va environ de mai à septembre",
        access: "3 h depuis Ella, plus depuis la côte sud",
      },
      sections: [
        {
          title: "Du surf pour tous les niveaux",
          text: "Main Point est pour les surfeurs confirmés. Les débutants vont sur les spots plus doux au sud de la baie, comme Whiskey Point, Peanut Farm ou Elephant Rock, souvent en tuk-tuk avec la planche sur le toit. Beaucoup d'écoles proposent des cours.",
        },
        {
          title: "Au-delà des vagues",
          text: "Un safari sur la lagune près de Pottuvil pour les crocodiles, les oiseaux et parfois des éléphants. Le parc national de Kumana, plus au sud, calme et magnifique pour les oiseaux. Et Muhudu Maha Viharaya, un vieux temple posé sur la plage.",
        },
      ],
    },
  },

  "horton-plains": {
    en: {
      intro:
        "A high, windswept plateau of grassland and cloud forest, more than 2,000 metres up, that suddenly ends at World's End: a cliff with a sheer drop of several hundred metres. On a clear morning you can see all the way to the south coast. A few hours later, it's often just white cloud.",
      facts: {
        time: "About 3 hours for the loop walk",
        when: "Be at the gate when it opens, around 6 am",
        access: "1 to 1.5 h from Nuwara Eliya, about 1 h from Haputale",
      },
      sections: [
        {
          title: "The walk",
          text: "A loop of about 9 km, mostly flat, past World's End, Mini World's End and Baker's Falls. Walk it clockwise to reach World's End before the clouds. Sambar deer graze near the entrance in the early morning.",
        },
        {
          title: "Good to know",
          text: "It's cold at dawn: bring a warm layer and a rain jacket. Plastic bags and wrappers are checked at the entrance. It's an early start, so don't plan another sunrise activity the same morning.",
        },
      ],
    },
    fr: {
      intro:
        "Un haut plateau balayé par le vent, fait de prairies et de forêt de nuages, à plus de 2 000 mètres, qui s'arrête net à World's End : une falaise de plusieurs centaines de mètres de vide. Par un matin clair, on voit jusqu'à la côte sud. Quelques heures plus tard, ce n'est souvent plus qu'un nuage blanc.",
      facts: {
        time: "Environ 3 heures pour la boucle à pied",
        when: "Soyez à l'entrée à l'ouverture, vers 6 h",
        access: "1 h à 1 h 30 de Nuwara Eliya, environ 1 h de Haputale",
      },
      sections: [
        {
          title: "La balade",
          text: "Une boucle d'environ 9 km, presque plate, qui passe par World's End, Mini World's End et les chutes de Baker. Faites-la dans le sens des aiguilles d'une montre pour arriver à World's End avant les nuages. Tôt le matin, des cerfs sambar broutent près de l'entrée.",
        },
        {
          title: "Bon à savoir",
          text: "Il fait froid à l'aube : prévoyez une couche chaude et un coupe-vent. Les sacs et emballages en plastique sont contrôlés à l'entrée. Le réveil est très matinal : ne prévoyez pas un autre lever de soleil le même jour.",
        },
      ],
    },
  },

  haputale: {
    en: {
      intro:
        "Haputale clings to the edge of a ridge, with tea estates falling away on both sides. It's quieter than Ella and Nuwara Eliya, and the views are just as big. On a clear morning, you can see all the way down to the plains and the south coast.",
      facts: {
        time: "1 night",
        when: "Sunrise, before the mist rolls in",
        access: "1 to 1.5 h from Ella, about 1 h from Horton Plains",
      },
      sections: [
        {
          title: "Lipton's Seat",
          text: "The viewpoint where Thomas Lipton is said to have admired his tea empire. Go up at sunrise, by tuk-tuk or on foot through the estates, and visit Dambatenne tea factory on the way down. Workers walk up the same road to start their day: it's a beautiful moment.",
        },
        {
          title: "Good to know",
          text: "Adisham Bungalow, an English country house turned monastery, only opens on certain days. Lipton's Seat and Horton Plains both need an early start, so do them on different mornings.",
        },
      ],
    },
    fr: {
      intro:
        "Haputale s'accroche au bord d'une crête, avec des plantations de thé qui dévalent de chaque côté. C'est plus calme qu'Ella et Nuwara Eliya, et les vues sont tout aussi grandes. Par un matin clair, on voit jusqu'aux plaines et à la côte sud.",
      facts: {
        time: "1 nuit",
        when: "Au lever du soleil, avant que la brume ne monte",
        access: "1 h à 1 h 30 d'Ella, environ 1 h de Horton Plains",
      },
      sections: [
        {
          title: "Lipton's Seat",
          text: "Le point de vue d'où Thomas Lipton aurait admiré son empire du thé. Montez-y au lever du soleil, en tuk-tuk ou à pied à travers les plantations, et visitez la fabrique de Dambatenne en redescendant. Les cueilleuses montent par la même route pour commencer leur journée : c'est un très beau moment.",
        },
        {
          title: "Bon à savoir",
          text: "Adisham Bungalow, un manoir anglais devenu monastère, n'ouvre que certains jours. Lipton's Seat et Horton Plains demandent tous deux un réveil matinal : faites-les sur des matins différents.",
        },
      ],
    },
  },

  unawatuna: {
    en: {
      intro:
        "A sheltered bay of soft sand, 15 minutes from Galle, with calm water that's great for a swim. It's lively, with restaurants right on the beach, but a short walk or tuk-tuk ride takes you to quieter corners in the jungle.",
      facts: {
        time: "2 to 3 nights",
        when: "December to April, when the sea is calmest",
        access: "15 minutes from Galle, about 2.5 h from the airport",
      },
      sections: [
        {
          title: "Around the bay",
          text: "Jungle Beach, a small cove below Rumassala hill, and the white Japanese Peace Pagoda above it with a view over Galle. Dalawella beach next door, with its famous rope swing. Snorkelling is easy straight off the beach when the sea is calm.",
        },
        {
          title: "Good to know",
          text: "Unawatuna makes a great base for Galle Fort in the late afternoon. Outside the dry season, the sea can be rough and the beach narrower.",
        },
      ],
    },
    fr: {
      intro:
        "Une baie abritée de sable fin, à 15 minutes de Galle, avec une eau calme parfaite pour se baigner. C'est animé, avec des restaurants les pieds dans le sable, mais une courte marche ou un tuk-tuk vous emmène vers des coins plus tranquilles dans la jungle.",
      facts: {
        time: "2 à 3 nuits",
        when: "De décembre à avril, quand la mer est la plus calme",
        access: "15 minutes de Galle, environ 2 h 30 de l'aéroport",
      },
      sections: [
        {
          title: "Autour de la baie",
          text: "Jungle Beach, une petite crique au pied de la colline de Rumassala, et la pagode japonaise de la Paix, toute blanche, juste au-dessus avec vue sur Galle. La plage de Dalawella, à côté, avec sa célèbre balançoire. Le snorkeling se fait directement depuis la plage quand la mer est calme.",
        },
        {
          title: "Bon à savoir",
          text: "Unawatuna est une base idéale pour le fort de Galle en fin d'après-midi. Hors saison sèche, la mer peut être agitée et la plage plus étroite.",
        },
      ],
    },
  },

  weligama: {
    en: {
      intro:
        "Weligama is a wide, gentle bay where half the island seems to learn to surf. Soft waves, sandy bottom, boards for rent every few metres. It's more of a real town than a resort, with fishing boats at one end and surf camps at the other.",
      facts: {
        time: "2 to 3 nights",
        when: "November to April for the best beginner waves",
        access: "15 minutes from Mirissa, about 3 h from the airport",
      },
      sections: [
        {
          title: "Surfing",
          text: "Perfect for a first lesson: the waves are soft and break slowly over sand. Book a lesson with a school rather than just renting a board on day one. Mornings are usually the calmest.",
        },
        {
          title: "Along the coast",
          text: "Stilt fishermen perch on their poles along the coast towards Ahangama and Koggala. In the middle of the bay, the tiny Taprobane Island holds a single villa. Mirissa and its whales are 15 minutes away.",
        },
      ],
    },
    fr: {
      intro:
        "Weligama, c'est une grande baie tranquille où la moitié de l'île semble apprendre à surfer. Vagues douces, fond sableux, planches à louer tous les dix mètres. C'est plus une vraie ville qu'une station balnéaire, avec les barques de pêcheurs d'un côté et les surf camps de l'autre.",
      facts: {
        time: "2 à 3 nuits",
        when: "De novembre à avril pour les meilleures vagues de débutant",
        access: "15 minutes de Mirissa, environ 3 h de l'aéroport",
      },
      sections: [
        {
          title: "Le surf",
          text: "Parfait pour un premier cours : les vagues sont douces et déroulent lentement sur le sable. Prenez un cours avec une école plutôt que de simplement louer une planche le premier jour. Le matin est en général le plus calme.",
        },
        {
          title: "Le long de la côte",
          text: "Les pêcheurs sur échasses sont perchés sur leurs pieux le long de la côte, vers Ahangama et Koggala. Au milieu de la baie, la minuscule île de Taprobane abrite une seule villa. Mirissa et ses baleines sont à 15 minutes.",
        },
      ],
    },
  },

  tangalle: {
    en: {
      intro:
        "Tangalle is the south coast before everyone arrived: long empty beaches, small coves, palm trees and very few crowds. It's the place to slow down at the end of a trip, with a good book and a hammock.",
      facts: {
        time: "2 to 3 nights",
        when: "December to April",
        access: "About 1 h east of Mirissa, 2.5 h from Yala",
      },
      sections: [
        {
          title: "Swimming safely",
          text: "Some beaches here have strong currents and steep shores. Goyambokka and Silent Beach are calmer coves. Ask your hotel where it's safe, and swim where the locals swim.",
        },
        {
          title: "Around Tangalle",
          text: "At night, the Rekawa turtle project lets you watch turtles come ashore to lay their eggs, quietly and without flash. Mulkirigala rock temple, a smaller cousin of Dambulla, and the Hummanaya blowhole are each about 30 minutes away.",
        },
      ],
    },
    fr: {
      intro:
        "Tangalle, c'est la côte sud d'avant la foule : de longues plages vides, de petites criques, des cocotiers et très peu de monde. C'est l'endroit pour ralentir en fin de voyage, avec un bon livre et un hamac.",
      facts: {
        time: "2 à 3 nuits",
        when: "De décembre à avril",
        access: "Environ 1 h à l'est de Mirissa, 2 h 30 de Yala",
      },
      sections: [
        {
          title: "Se baigner en sécurité",
          text: "Certaines plages ont de forts courants et des fonds qui plongent vite. Goyambokka et Silent Beach sont des criques plus calmes. Demandez à votre hôtel où l'on peut se baigner, et faites comme les locaux.",
        },
        {
          title: "Autour de Tangalle",
          text: "La nuit, le projet de Rekawa permet d'observer les tortues qui viennent pondre sur la plage, en silence et sans flash. Le temple-rocher de Mulkirigala, un petit cousin de Dambulla, et le geyser marin de Hummanaya sont chacun à 30 minutes environ.",
        },
      ],
    },
  },

  negombo: {
    en: {
      intro:
        "Negombo is the town by the airport, and the perfect place to land gently or spend your last night. A long beach, a lagoon full of fishing boats and so many churches that it's nicknamed Little Rome. Nobody comes for a week, but it's a much nicer first night than Colombo.",
      facts: {
        time: "1 night, at the start or the end of the trip",
        when: "The fish market and lagoon are best early in the morning",
        access: "About 20 minutes from the airport",
      },
      sections: [
        {
          title: "What to do",
          text: "Walk through the fish market at dawn, when the boats come in and fish dries on the sand. Take a boat on the lagoon or along the old Dutch canal. In the evening, watch the sunset from the beach with fresh seafood.",
        },
        {
          title: "Why stay here",
          text: "Arriving late or flying early? Negombo saves you the Colombo traffic and lets your first real day start fresh. Your driver can pick you up straight from the hotel the next morning.",
        },
      ],
    },
    fr: {
      intro:
        "Negombo, c'est la ville de l'aéroport, et l'endroit parfait pour atterrir en douceur ou passer votre dernière nuit. Une longue plage, une lagune pleine de barques de pêcheurs et tellement d'églises qu'on la surnomme la Petite Rome. On n'y reste pas une semaine, mais c'est une première nuit bien plus agréable qu'à Colombo.",
      facts: {
        time: "1 nuit, au début ou à la fin du voyage",
        when: "Le marché aux poissons et la lagune se font tôt le matin",
        access: "Environ 20 minutes de l'aéroport",
      },
      sections: [
        {
          title: "Que faire",
          text: "Promenez-vous au marché aux poissons à l'aube, quand les bateaux rentrent et que le poisson sèche sur le sable. Faites un tour en bateau sur la lagune ou le long du vieux canal hollandais. Le soir, regardez le coucher du soleil sur la plage avec des fruits de mer frais.",
        },
        {
          title: "Pourquoi y dormir",
          text: "Arrivée tardive ou vol très tôt ? Negombo vous évite les bouchons de Colombo et permet de commencer votre premier vrai jour en forme. Votre chauffeur vient vous chercher directement à l'hôtel le lendemain matin.",
        },
      ],
    },
  },

  colombo: {
    en: {
      intro:
        "Colombo is a busy, noisy, fascinating capital where colonial buildings, Buddhist temples, markets and new towers sit side by side. Most travellers only pass through, and half a day is enough to get a real taste of it, as long as you avoid the rush hours.",
      facts: {
        time: "Half a day, or one night",
        when: "Avoid roughly 7–9 am and 4–7 pm; Galle Face at sunset",
        access: "About 1 h from the airport, 2 h from Galle",
      },
      sections: [
        {
          title: "Our favourite half-day",
          text: "Gangaramaya temple, wonderfully cluttered, and Seema Malaka floating on Beira Lake. The colours and noise of Pettah market. The old Dutch Hospital for a drink. Then Galle Face Green at sunset, with families, kites and street food by the sea.",
        },
        {
          title: "Good to know",
          text: "Traffic decides everything here: a 5 km trip can take 45 minutes at rush hour. Let your driver plan the order of the visits.",
        },
      ],
    },
    fr: {
      intro:
        "Colombo est une capitale animée, bruyante et fascinante, où bâtiments coloniaux, temples bouddhistes, marchés et nouvelles tours se côtoient. La plupart des voyageurs ne font qu'y passer, et une demi-journée suffit pour en avoir un vrai aperçu, à condition d'éviter les heures de pointe.",
      facts: {
        time: "Une demi-journée, ou une nuit",
        when: "Évitez environ 7 h–9 h et 16 h–19 h ; Galle Face au coucher du soleil",
        access: "Environ 1 h de l'aéroport, 2 h de Galle",
      },
      sections: [
        {
          title: "Notre demi-journée préférée",
          text: "Le temple de Gangaramaya, joyeusement encombré, et Seema Malaka qui flotte sur le lac Beira. Les couleurs et le bruit du marché de Pettah. Le vieil hôpital hollandais pour boire un verre. Puis Galle Face Green au coucher du soleil, avec les familles, les cerfs-volants et la street food face à la mer.",
        },
        {
          title: "Bon à savoir",
          text: "Ici, la circulation décide de tout : 5 km peuvent prendre 45 minutes à l'heure de pointe. Laissez votre chauffeur organiser l'ordre des visites.",
        },
      ],
    },
  },

  kalpitiya: {
    en: {
      intro:
        "Kalpitiya is a long, sandy peninsula on the north-west coast, between a lagoon and the ocean. It's windy, wild and still very local. People come for two things: dolphins in winter and kite-surfing when the wind blows.",
      facts: {
        time: "2 nights",
        when: "Dolphin boats leave early, roughly November to April",
        access: "About 3 h north of the airport",
      },
      sections: [
        {
          title: "Dolphins and kites",
          text: "In season, boats go out at dawn to find large pods of spinner dolphins, sometimes hundreds together. Kite-surfing is best roughly May to October and again December to March, on the flat water of the lagoon. Schools offer lessons for beginners.",
        },
        {
          title: "Good to know",
          text: "There are few cash machines on the peninsula: withdraw cash before you arrive. It pairs well with Wilpattu, which is not far.",
        },
      ],
    },
    fr: {
      intro:
        "Kalpitiya est une longue presqu'île de sable sur la côte nord-ouest, entre une lagune et l'océan. C'est venté, sauvage et encore très local. On y vient pour deux choses : les dauphins en hiver et le kitesurf quand le vent souffle.",
      facts: {
        time: "2 nuits",
        when: "Les bateaux pour les dauphins partent tôt, environ de novembre à avril",
        access: "Environ 3 h au nord de l'aéroport",
      },
      sections: [
        {
          title: "Dauphins et kitesurf",
          text: "En saison, les bateaux partent à l'aube à la recherche de grands groupes de dauphins à long bec, parfois des centaines ensemble. Le kitesurf se pratique surtout de mai à octobre environ, puis de décembre à mars, sur l'eau plate de la lagune. Des écoles proposent des cours pour débutants.",
        },
        {
          title: "Bon à savoir",
          text: "Il y a peu de distributeurs sur la presqu'île : retirez du liquide avant d'arriver. Kalpitiya se combine bien avec Wilpattu, qui n'est pas loin.",
        },
      ],
    },
  },

  passikudah: {
    en: {
      intro:
        "Passikudah is a wide, shallow bay on the east coast where you can walk out a long way with the water at your waist. Calm, clear and warm, it's ideal for families and for anyone who just wants to float. It's quieter and more resort-like than Trincomalee.",
      facts: {
        time: "2 to 3 nights",
        when: "May to September",
        access: "About 2 h from Polonnaruwa",
      },
      sections: [
        {
          title: "What to do",
          text: "Swim, snorkel and do very little. Next door, Kalkudah beach is longer and almost empty. Batticaloa, under an hour away, has a lagoon, an old Dutch fort and a very local feel.",
        },
        {
          title: "Good to know",
          text: "It's a good beach stop after the Cultural Triangle in summer, when the south coast is rainy. From November to January, the east coast gets its monsoon.",
        },
      ],
    },
    fr: {
      intro:
        "Passikudah, c'est une grande baie peu profonde sur la côte est, où l'on peut marcher très loin avec de l'eau à la taille. Calme, claire et chaude, elle est idéale pour les familles et pour tous ceux qui veulent simplement flotter. C'est plus calme et plus « hôtel » que Trincomalee.",
      facts: {
        time: "2 à 3 nuits",
        when: "De mai à septembre",
        access: "Environ 2 h de Polonnaruwa",
      },
      sections: [
        {
          title: "Que faire",
          text: "Se baigner, faire du snorkeling et ne pas faire grand-chose. Juste à côté, la plage de Kalkudah est plus longue et presque déserte. Batticaloa, à moins d'une heure, a une lagune, un vieux fort hollandais et une ambiance très locale.",
        },
        {
          title: "Bon à savoir",
          text: "C'est une bonne étape plage après le Triangle culturel en été, quand la côte sud est pluvieuse. De novembre à janvier, c'est la mousson sur la côte est.",
        },
      ],
    },
  },

  hikkaduwa: {
    en: {
      intro:
        "Hikkaduwa is the lively one: surf, reef, beach bars and sea turtles grazing in the shallows. It's busier and more backpacker than its neighbours, and its sunsets are among the best on the coast.",
      facts: {
        time: "1 to 2 nights",
        when: "December to April",
        access: "About 30 minutes from Galle, 2.5 h from the airport",
      },
      sections: [
        {
          title: "Turtles and reef",
          text: "Green turtles often feed close to the beach. Watch them from a respectful distance, and don't feed them, even if others do. The coral reef in front of the town is easy to snorkel when the sea is calm.",
        },
        {
          title: "A moment of memory",
          text: "Just north of town, Peraliya has a memorial and a small museum for the 2004 tsunami, which hit this coast very hard. A short, moving stop that many travellers are glad they made.",
        },
      ],
    },
    fr: {
      intro:
        "Hikkaduwa, c'est la plage animée : surf, récif, bars de plage et tortues qui broutent dans l'eau peu profonde. Plus fréquentée et plus routarde que ses voisines, elle offre aussi certains des plus beaux couchers de soleil de la côte.",
      facts: {
        time: "1 à 2 nuits",
        when: "De décembre à avril",
        access: "Environ 30 minutes de Galle, 2 h 30 de l'aéroport",
      },
      sections: [
        {
          title: "Tortues et récif",
          text: "Des tortues vertes viennent souvent se nourrir tout près de la plage. Observez-les à distance, et ne les nourrissez pas, même si d'autres le font. Le récif devant la ville se fait facilement en snorkeling quand la mer est calme.",
        },
        {
          title: "Un moment de mémoire",
          text: "Juste au nord de la ville, Peraliya abrite un mémorial et un petit musée du tsunami de 2004, qui a durement frappé cette côte. Un arrêt court et émouvant, que beaucoup de voyageurs sont contents d'avoir fait.",
        },
      ],
    },
  },

  bentota: {
    en: {
      intro:
        "Bentota is where a river meets the sea, with a wide golden beach, quiet hotels and calm water. It's an easy, relaxing place, close enough to the airport to be the perfect last stop of a trip.",
      facts: {
        time: "1 to 2 nights",
        when: "December to April",
        access: "About 1.5 h from Colombo, about 2 h from the airport",
      },
      sections: [
        {
          title: "River and water sports",
          text: "Take a boat up the Bentota river through the mangroves, with monitor lizards, kingfishers and small islands. On the river mouth, the calm water is good for jet ski, kayak or paddle.",
        },
        {
          title: "For garden lovers",
          text: "Two famous gardens are close by: Lunuganga, the country estate of architect Geoffrey Bawa, and Brief Garden, created by his brother Bevis. Both are peaceful and full of surprises.",
        },
      ],
    },
    fr: {
      intro:
        "Bentota, c'est là où une rivière rejoint la mer, avec une grande plage dorée, des hôtels tranquilles et une eau calme. Un endroit facile et reposant, assez proche de l'aéroport pour être la dernière étape idéale d'un voyage.",
      facts: {
        time: "1 à 2 nuits",
        when: "De décembre à avril",
        access: "Environ 1 h 30 de Colombo, 2 h de l'aéroport",
      },
      sections: [
        {
          title: "Rivière et sports nautiques",
          text: "Remontez la rivière de Bentota en bateau à travers la mangrove, avec varans, martins-pêcheurs et petites îles. À l'embouchure, l'eau calme se prête au jet-ski, au kayak ou au paddle.",
        },
        {
          title: "Pour les amoureux des jardins",
          text: "Deux jardins célèbres sont tout près : Lunuganga, la maison de campagne de l'architecte Geoffrey Bawa, et Brief Garden, créé par son frère Bevis. Deux lieux paisibles et pleins de surprises.",
        },
      ],
    },
  },

  habarana: {
    en: {
      intro:
        "Habarana is a small crossroads town in the middle of the Cultural Triangle. There isn't much to see in town, but it's a very practical base: Sigiriya, Polonnaruwa, Dambulla and the elephant parks are all close.",
      facts: {
        time: "2 to 3 nights as a base",
        when: "Elephant safaris in the late afternoon",
        access: "About 30 minutes from Sigiriya, 1 h from Polonnaruwa",
      },
      sections: [
        {
          title: "Village life",
          text: "A village tour is the classic here: a ride in a bullock cart, a crossing of the lake in a small boat, and lunch cooked in a family's home. Touristy, yes, but warm and fun, especially with children.",
        },
        {
          title: "Safaris",
          text: "Minneriya, Kaudulla and Hurulu Eco Park are all nearby. Which one is best depends on where the herds are that week: the jeep drivers know.",
        },
      ],
    },
    fr: {
      intro:
        "Habarana est un petit bourg-carrefour au milieu du Triangle culturel. Il n'y a pas grand-chose à voir en ville, mais c'est une base très pratique : Sigiriya, Polonnaruwa, Dambulla et les parcs à éléphants sont tous proches.",
      facts: {
        time: "2 à 3 nuits comme base",
        when: "Safaris éléphants en fin d'après-midi",
        access: "Environ 30 minutes de Sigiriya, 1 h de Polonnaruwa",
      },
      sections: [
        {
          title: "La vie au village",
          text: "Le grand classique ici, c'est le village tour : une balade en char à bœufs, une traversée du lac en petite barque, et un déjeuner cuisiné chez une famille. Touristique, oui, mais chaleureux et amusant, surtout avec des enfants.",
        },
        {
          title: "Les safaris",
          text: "Minneriya, Kaudulla et l'Eco Park de Hurulu sont tous tout près. Le meilleur dépend de l'endroit où sont les troupeaux cette semaine-là : les chauffeurs de jeep le savent.",
        },
      ],
    },
  },

  kitulgala: {
    en: {
      intro:
        "Kitulgala is a green river valley on the road from Colombo to the hill country, surrounded by rainforest. It's Sri Lanka's white-water rafting spot, and the place where the film The Bridge on the River Kwai was shot.",
      facts: {
        time: "A morning, or one night",
        when: "Rafting runs in the morning",
        access: "About 2.5 h from Colombo, 1.5 to 2 h from Kandy",
      },
      sections: [
        {
          title: "Rafting and more",
          text: "The rafting on the Kelani river is fun rather than extreme, fine for beginners with a guide. Canyoning, waterfall jumps and jungle walks are also on offer. Bring clothes that can get wet and a dry change for the car.",
        },
        {
          title: "Good to know",
          text: "It fits nicely between Colombo and Nuwara Eliya or Adam's Peak, and breaks up a long drive.",
        },
      ],
    },
    fr: {
      intro:
        "Kitulgala est une vallée verdoyante sur la route entre Colombo et les collines, entourée de forêt tropicale. C'est le spot de rafting du Sri Lanka, et l'endroit où a été tourné le film Le Pont de la rivière Kwaï.",
      facts: {
        time: "Une matinée, ou une nuit",
        when: "Le rafting se fait le matin",
        access: "Environ 2 h 30 de Colombo, 1 h 30 à 2 h de Kandy",
      },
      sections: [
        {
          title: "Rafting et plus",
          text: "Le rafting sur la rivière Kelani est plus ludique qu'extrême, accessible aux débutants avec un guide. Canyoning, sauts dans les cascades et balades en forêt sont aussi proposés. Prenez des vêtements qui peuvent être mouillés et de quoi vous changer pour la voiture.",
        },
        {
          title: "Bon à savoir",
          text: "Kitulgala s'insère bien entre Colombo et Nuwara Eliya ou l'Adam's Peak, et coupe agréablement un long trajet.",
        },
      ],
    },
  },

  knuckles: {
    en: {
      intro:
        "The Knuckles range is wild mountain country north-east of Kandy: cloud forest, rivers, waterfalls and remote villages reached by narrow roads. It's for walkers who want real nature, far from the tourist trail.",
      facts: {
        time: "A full day, or 1 to 2 nights in a village",
        when: "Start early; the dry months are easiest for hiking",
        access: "2 to 3 h from Kandy depending on the trailhead",
      },
      sections: [
        {
          title: "Hiking",
          text: "Trails range from easy walks to Pitawala Pathana and Mini World's End to long hikes across the range. A local guide is needed, and some trails require a permit. Your driver can drop you at one end and collect you at the other.",
        },
        {
          title: "Good to know",
          text: "After rain, leeches are everywhere: long socks and a little salt help. It's a full day on its own, so don't add other big visits.",
        },
      ],
    },
    fr: {
      intro:
        "La chaîne des Knuckles, c'est un pays de montagnes sauvages au nord-est de Kandy : forêt de nuages, rivières, cascades et villages reculés au bout de petites routes. Pour les marcheurs qui veulent de la vraie nature, loin des circuits touristiques.",
      facts: {
        time: "Une journée entière, ou 1 à 2 nuits dans un village",
        when: "Partez tôt ; les mois secs sont les plus faciles pour marcher",
        access: "2 à 3 h de Kandy selon le point de départ",
      },
      sections: [
        {
          title: "La randonnée",
          text: "Les sentiers vont des balades faciles vers Pitawala Pathana et Mini World's End aux longues randonnées à travers le massif. Un guide local est nécessaire, et certains sentiers demandent un permis. Votre chauffeur peut vous déposer à un bout et vous récupérer à l'autre.",
        },
        {
          title: "Bon à savoir",
          text: "Après la pluie, les sangsues sont partout : de longues chaussettes et un peu de sel aident. C'est une journée complète à elle seule : n'ajoutez pas d'autres grosses visites.",
        },
      ],
    },
  },

  "adams-peak": {
    en: {
      intro:
        "Adam's Peak, or Sri Pada, is a sacred mountain for Buddhists, Hindus, Muslims and Christians alike, each with their own story about the footprint at the top. Pilgrims climb through the night to reach the summit for sunrise. It's hard, cold and unforgettable.",
      facts: {
        time: "3 to 4 h up, overnight, then a rest afternoon",
        when: "The pilgrim season runs from December to May",
        access: "From the village of Dalhousie, about 1 h from Hatton",
      },
      sections: [
        {
          title: "The climb",
          text: "Around 5,500 steps, lit all the way in season, with tea stalls to rest at. Most people start between 2 and 3 am to be at the top before dawn. At sunrise, the peak casts a perfect triangle of shadow over the clouds.",
        },
        {
          title: "Good to know",
          text: "It's cold at the top: bring a warm jacket, a hat and a change of shirt. Weekends and Poya days are very crowded. Out of season the lights and stalls are off, and it's best climbed only with a guide.",
        },
      ],
    },
    fr: {
      intro:
        "L'Adam's Peak, ou Sri Pada, est une montagne sacrée pour les bouddhistes, les hindous, les musulmans et les chrétiens, chacun avec sa propre histoire sur l'empreinte du sommet. Les pèlerins montent de nuit pour arriver en haut au lever du soleil. C'est dur, froid et inoubliable.",
      facts: {
        time: "3 à 4 h de montée, de nuit, puis un après-midi de repos",
        when: "La saison des pèlerins va de décembre à mai",
        access: "Depuis le village de Dalhousie, à environ 1 h de Hatton",
      },
      sections: [
        {
          title: "La montée",
          text: "Environ 5 500 marches, éclairées tout du long en saison, avec des échoppes de thé pour se reposer. La plupart des gens partent entre 2 h et 3 h du matin pour être au sommet avant l'aube. Au lever du soleil, le pic projette un triangle d'ombre parfait sur les nuages.",
        },
        {
          title: "Bon à savoir",
          text: "Il fait froid au sommet : prenez une veste chaude, un bonnet et un t-shirt de rechange. Les week-ends et les jours de Poya, il y a énormément de monde. Hors saison, les lumières et les échoppes sont éteintes : mieux vaut monter avec un guide.",
        },
      ],
    },
  },

  bandarawela: {
    en: {
      intro:
        "Bandarawela is a small, busy hill town with one of the best climates on the island: mild days, cool nights and often less rain than the higher towns. Few tourists stop here, which is exactly why some love it as a calm base near Ella.",
      facts: {
        time: "1 night",
        when: "Any time of day: it's a place to slow down",
        access: "About 30 to 40 minutes from Ella",
      },
      sections: [
        {
          title: "Around Bandarawela",
          text: "Dowa rock temple, with a large Buddha carved into the rock beside a stream, is a short stop on the road to Ella. Tea estates and walks are all around, and the market is very local.",
        },
        {
          title: "Why stay here",
          text: "When Ella is full or too busy, Bandarawela gives you the same hills with far fewer people, and Ella is close enough for the day.",
        },
      ],
    },
    fr: {
      intro:
        "Bandarawela est une petite ville des collines, animée, avec l'un des meilleurs climats de l'île : journées douces, nuits fraîches, et souvent moins de pluie que dans les villes plus hautes. Peu de touristes s'y arrêtent, et c'est justement pour ça que certains l'adorent comme base tranquille près d'Ella.",
      facts: {
        time: "1 nuit",
        when: "À tout moment : c'est un endroit pour ralentir",
        access: "Environ 30 à 40 minutes d'Ella",
      },
      sections: [
        {
          title: "Autour de Bandarawela",
          text: "Le temple-rocher de Dowa, avec un grand Bouddha taillé dans la roche au bord d'un ruisseau, est un court arrêt sur la route d'Ella. Plantations de thé et balades tout autour, et un marché très local.",
        },
        {
          title: "Pourquoi y dormir",
          text: "Quand Ella est complète ou trop animée, Bandarawela offre les mêmes collines avec beaucoup moins de monde, et Ella est assez proche pour la journée.",
        },
      ],
    },
  },

  pinnawala: {
    en: {
      intro:
        "Pinnawala is the elephant orphanage on the road between Colombo and Kandy, famous for its herd bathing in the river. We'll be honest: many travellers now feel uncomfortable there, as some elephants are chained and it feels more like a show than a sanctuary.",
      facts: {
        time: "About 1 to 2 hours",
        when: "Bath times at the river are set by the orphanage",
        access: "On the Colombo–Kandy road",
      },
      sections: [
        {
          title: "What we suggest instead",
          text: "To see elephants in a way that feels right, go on a jeep safari in Udawalawe, Minneriya or Kaudulla, where they live free. At Udawalawe, the Elephant Transit Home cares for orphaned babies and releases them into the wild: you watch the feeding from a distance.",
        },
        {
          title: "If you still want to go",
          text: "Your driver can stop on the way to Kandy. Watch from the viewing areas and skip any paid contact, rides or photos with the elephants.",
        },
      ],
    },
    fr: {
      intro:
        "Pinnawala, c'est l'orphelinat d'éléphants sur la route entre Colombo et Kandy, célèbre pour son troupeau qui se baigne dans la rivière. Soyons honnêtes : beaucoup de voyageurs s'y sentent mal à l'aise aujourd'hui, car certains éléphants sont enchaînés et cela ressemble plus à un spectacle qu'à un refuge.",
      facts: {
        time: "Environ 1 à 2 heures",
        when: "Les horaires du bain à la rivière sont fixés par l'orphelinat",
        access: "Sur la route Colombo – Kandy",
      },
      sections: [
        {
          title: "Ce que nous conseillons plutôt",
          text: "Pour voir des éléphants d'une façon qui fait du bien, faites un safari en jeep à Udawalawe, Minneriya ou Kaudulla, où ils vivent en liberté. À Udawalawe, l'Elephant Transit Home recueille des éléphanteaux orphelins et les relâche dans la nature : on assiste au repas à distance.",
        },
        {
          title: "Si vous tenez à y aller",
          text: "Votre chauffeur peut s'y arrêter sur la route de Kandy. Restez dans les zones d'observation et évitez tout contact payant, balade ou photo avec les éléphants.",
        },
      ],
    },
  },
};
