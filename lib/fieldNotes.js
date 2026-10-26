// Practical, on-the-ground notes for the AI trip planner and the itinerary
// review: best time of day, how long a visit really takes, what combines
// well in one day, and common pitfalls. These are what an experienced local
// driver would tell a traveller — the kind of detail that makes a plan
// realistic rather than just a list of places.
//
// Keep each note short and factual. No prices (those come from the verified
// knowledge base only). Add a line here whenever drivers or customers teach
// us something new about a place.

export const FIELD_NOTES = {
  // Cultural Triangle
  Sigiriya:
    "Climb Lion Rock at opening time (early morning) to avoid heat and crowds; allow about 3 hours. Pidurangala is best at sunrise or sunset. Sigiriya village itself has little else to do: pair the rock with Dambulla caves, Ritigala, a village tour or an elephant safari.",
  Dambulla:
    "Cave temples take about 1 hour; there are many steps; cover shoulders and knees, shoes off. Fits easily on the same day as Sigiriya or on the drive from Kandy.",
  Polonnaruwa:
    "Allow half a day; best explored by bicycle or with the driver between sites, starting early. About 1.5 h from Sigiriya, 1 h from Habarana. Combines with a late-afternoon elephant safari at Minneriya or Kaudulla.",
  Anuradhapura:
    "The sacred city is spread out: allow a full day, ideally by bicycle or tuk-tuk. Mihintale is about 30 minutes away, best early morning or late afternoon. Poya (full-moon) days bring large crowds of pilgrims.",
  Habarana:
    "Quiet base between Sigiriya, Polonnaruwa and the elephant parks. Jeep safaris (Minneriya, Kaudulla, Hurulu Eco Park) are best in the late afternoon; which park depends on where the herds are that season.",
  Ritigala:
    "Forest monastery ruins about 1 hour from Sigiriya; allow about 2 hours, closes in the late afternoon. Good for an afternoon after an early Sigiriya climb.",
  "Minneriya National Park":
    "Elephant gatherings are biggest around July to October; outside that, drivers and jeep operators know which nearby park (Kaudulla, Hurulu) has the herds. Go in the late afternoon.",

  // Hill country
  Kandy:
    "Temple of the Tooth is most atmospheric at the evening ceremony; dress modestly. Peradeniya gardens need about 2 hours. Embekka, Lankatilaka and Gadaladeniya temples together are a half-day on their own. Traffic in town is heavy at rush hour.",
  "Nuwara Eliya":
    "Cool (around 1,900 m): bring a warm layer for evenings. A good base for Horton Plains (leave at dawn). Visit a tea factory on the way in. Kandy to Nuwara Eliya is about 2.5 to 3 h.",
  "Horton Plains National Park":
    "Arrive at opening (around 6 am) before clouds hide the World's End view; the loop walk takes about 3 hours. From Nuwara Eliya about 1 to 1.5 h, from Haputale about 1 h. Cannot be combined with another sunrise activity the same morning.",
  Haputale:
    "Lipton's Seat is best at sunrise, before the mist rolls in; Dambatenne tea factory is on the way down. Adisham Bungalow has limited opening days. Lipton's Seat and Horton Plains both need early starts, so do them on different days.",
  Ella:
    "Little Adam's Peak is best early morning (about 1.5 h return); Nine Arches Bridge is crowded mid-day; Ravana Falls is 15 minutes away. Ella Rock is a half-day hike. Ella gets busy: book stays ahead in high season. Bogoda Wooden Bridge is about an hour in the opposite direction, so it rarely fits.",
  Bandarawela:
    "Mild, often drier than higher towns. Dowa rock temple is on the Bandarawela–Ella road and fits as a short stop.",
  "Knuckles Mountain Range":
    "A full-day hiking area 2 to 3 h from Kandy depending on the trailhead; needs a local guide and sometimes a permit. Leeches after rain. Cannot be added to a day that already includes other major sightseeing.",
  Kitulgala:
    "White-water rafting is in the morning; about 2.5 h from Colombo, 1.5 to 2 h from Kandy. Fits between Colombo and the hill country.",
  "Adam's Peak":
    "The pilgrimage climb is done overnight to reach the top at sunrise (about 3 to 4 h up); the main season is December to May. Plan a rest afternoon after it.",

  // South and west coast
  Galle:
    "Walk the Fort in the late afternoon and stay for sunset on the ramparts; mid-day is hot. Unawatuna is 15 minutes away.",
  Unawatuna:
    "Sheltered bay, calmest December to April. Jungle Beach and the Peace Pagoda are a short tuk-tuk ride away.",
  Mirissa:
    "Whale-watching boats leave around 6 to 7 am in season (roughly November to April) and take 3 to 5 hours: keep the rest of that day light. Coconut Tree Hill is best at sunset.",
  Weligama:
    "Gentle beginner surf, best November to April. Mirissa is 15 minutes away; stilt fishermen are along the coast towards Ahangama and Koggala.",
  Tangalle:
    "Quieter beaches; some have strong currents. Rekawa turtle watching is at night. Mulkirigala rock temple and Hummanaya blowhole are each about 30 minutes away.",
  "Yala National Park":
    "Jeep safaris run early morning (best for leopards) or afternoon; a morning safari plus an afternoon drive onwards works. Parts of the park may close for a few weeks around September to October. Base: Tissamaharama.",
  "Udawalawe National Park":
    "Very reliable for elephants year-round; a half-day jeep safari. Fits on the drive between the hill country (Ella) and the south coast. The Elephant Transit Home has a set feeding time.",
  Bentota:
    "River safari and water sports; about 1.5 h from Colombo by expressway. A good last beach stop before the airport (about 2 h).",
  Hikkaduwa:
    "Busy beach with surf and a reef; about 30 minutes from Galle.",
  Negombo:
    "About 20 minutes from the airport: ideal for the first night after a late arrival or the last night before an early flight. The lagoon and fish market are best early morning.",
  Colombo:
    "Traffic is heavy at rush hours (around 7 to 9 am and 4 to 7 pm). Galle Face Green is best at sunset. Many travellers spend only a half-day here.",

  // East and north
  Trincomalee:
    "Best May to September; from about November to January the north-east monsoon can bring rain and rough sea. Pigeon Island snorkelling and whale watching are seasonal.",
  "Arugam Bay":
    "Surf season roughly May to September; quiet outside it. Far from everywhere: about 3 h from Ella, longer from the south coast.",
  Passikudah:
    "Shallow, calm bay, best May to September.",
  Jaffna:
    "Very different culture and food; allow at least two nights. Island ferries (Nainativu, Delft) have limited schedules: one island per day. About 4 h from Trincomalee or Anuradhapura.",
  Kalpitiya:
    "Dolphin-watching boats leave early in season (roughly November to April); kite-surfing season is about May to October and December to March. Few ATMs: withdraw cash before arriving.",
  "Wilpattu National Park":
    "Sri Lanka's largest park, quieter than Yala; morning safaris are best. About 45 minutes from Anuradhapura.",
};

// General rules that apply everywhere
export const GENERAL_FIELD_NOTES = [
  "Plan sunrise activities (Lion Rock, Lipton's Seat, Horton Plains, Little Adam's Peak, whale watching, Adam's Peak) on separate mornings — only one per day.",
  "Avoid long drives after dark: many rural roads are unlit and wildlife (including elephants) can be on the road.",
  "Poya (full-moon) days are public holidays: temples are crowded, alcohol is not sold, and banks are closed.",
  "Temples: cover shoulders and knees, remove shoes and hats; don't pose with your back to a Buddha statue.",
  "Cash: ATMs are reliable in towns; carry cash for remote areas (Kalpitiya, national parks, small villages).",
];

export function fieldNotesText() {
  const places = Object.entries(FIELD_NOTES)
    .map(([place, note]) => `- ${place}: ${note}`)
    .join("\n");
  return `FIELD NOTES (local knowledge from our drivers — use it to make each day realistic):\n${GENERAL_FIELD_NOTES.map((n) => `- ${n}`).join("\n")}\n${places}`;
}
