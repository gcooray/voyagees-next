import Link from "next/link";
import Image from "next/image";
import { itineraries } from "@/data/itineraries";
import { touristDestinations } from "@/data/touristDestinations";
import { destinationsFr } from "@/data/destinationsFr";
import "./Itineraries.css";

// Suggested itineraries (/itineraries, /fr/itineraries): classic routes for a
// first trip, then routes most visitors miss, each laid out day by day with
// realistic drive times.

const T = {
  en: {
    eyebrow: "Suggested itineraries",
    title: "Sri Lanka itineraries, day by day",
    intro:
      "Classic routes for a first trip, and routes that take you where few travellers go. Each one is put together from our drivers' experience, with realistic drive times for every day.",
    groups: {
      classic: { title: "Classic routes", text: "The great first trip, in one or two weeks." },
      offbeat: { title: "Off the beaten track", text: "For a second trip, or to escape the usual loop." },
    },
    days: (n) => `${n} days`,
    duration: "Duration",
    best: "Best season",
    route: "Route",
    colon: ":",
    drive: "Drive",
    places: "See",
    tip: "Good to know",
    plan: "Find a driver for this trip",
    adapt: "Adapt it with the free planner",
    jump: "Jump to",
  },
  fr: {
    eyebrow: "Idées d'itinéraires",
    title: "Itinéraires au Sri Lanka, jour par jour",
    intro:
      "Des parcours classiques pour un premier voyage, et d'autres qui vous emmènent là où peu de voyageurs vont. Chacun est conçu avec l'expérience de nos chauffeurs, avec des temps de route réalistes pour chaque journée.",
    groups: {
      classic: { title: "Les grands classiques", text: "Le premier voyage idéal, en une ou deux semaines." },
      offbeat: { title: "Hors des sentiers battus", text: "Pour un second voyage, ou pour sortir de la boucle habituelle." },
    },
    days: (n) => `${n} jours`,
    duration: "Durée",
    best: "Meilleure saison",
    route: "Parcours",
    colon: " :",
    drive: "Route",
    places: "À voir",
    tip: "Bon à savoir",
    plan: "Trouver un chauffeur pour ce circuit",
    adapt: "L'adapter avec le planificateur gratuit",
    jump: "Aller à",
  },
};

const GROUPS = ["classic", "offbeat"];

export default function Itineraries({ locale = "en" }) {
  const t = T[locale] || T.en;
  const prefix = locale === "fr" ? "/fr" : "";
  const list = itineraries[locale] || itineraries.en;
  const destinations = locale === "fr" ? destinationsFr : touristDestinations;
  const nameOf = (slug) => destinations.find((d) => d.slug === slug)?.name || slug;

  return (
    <main className="itin-page">
      <header className="itin-header">
        <p className="itin-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="itin-intro">{t.intro}</p>
        {GROUPS.map((g) => (
          <nav key={g} className="itin-jump" aria-label={`${t.jump}: ${t.groups[g].title}`}>
            <span className="itin-jump-label">{t.groups[g].title}</span>
            {list.filter((it) => it.group === g).map((it) => (
              <a key={it.id} href={`#${it.id}`}>
                {it.title} <span>· {t.days(it.days)}</span>
              </a>
            ))}
          </nav>
        ))}
      </header>

      {GROUPS.map((g) => (
        <div key={g} id={g} className="itin-group">
          <div className="itin-group-head">
            <h2>{t.groups[g].title}</h2>
            <p>{t.groups[g].text}</p>
          </div>
          {list.filter((it) => it.group === g).map((it, i) => (
        <section key={it.id} id={it.id} className="itin-block">
          <div className="itin-hero">
            <Image
              src={it.image}
              alt={it.imageAlt}
              fill
              priority={g === GROUPS[0] && i === 0}
              sizes="(max-width: 900px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
            <div className="itin-hero-text">
              <span className="itin-number">{String(i + 1).padStart(2, "0")}</span>
              <h2>{it.title}</h2>
            </div>
          </div>

          <div className="itin-facts">
            <div><span>{t.duration}</span><b>{t.days(it.days)}</b></div>
            <div><span>{t.best}</span><b>{it.season}</b></div>
            <div className="itin-facts-route"><span>{t.route}</span><b>{it.route}</b></div>
          </div>

          <p className="itin-lead">{it.intro}</p>

          <ol className="itin-days">
            {it.plan.map((d) => (
              <li key={d.day}>
                <div className="itin-day-label">{d.day}</div>
                <div className="itin-day-body">
                  <h3>
                    {d.title}
                    {d.travel && <span className="itin-travel">🚗 {t.drive}{t.colon} {d.travel}</span>}
                  </h3>
                  <p>{d.text}</p>
                  {d.places?.length > 0 && (
                    <p className="itin-places">
                      {t.places}{t.colon}{" "}
                      {d.places.map((slug, k) => (
                        <span key={slug}>
                          {k > 0 && ", "}
                          <Link href={`${prefix}/destinations/${slug}`}>{nameOf(slug)}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="itin-tip"><strong>{t.tip}{t.colon}</strong> {it.tip}</p>

          <div className="itin-ctas">
            <Link href={`${prefix}/search`} className="itin-btn itin-btn-primary">{t.plan}</Link>
            <Link href={`${prefix}/plan-trip`} className="itin-btn itin-btn-ghost">{t.adapt}</Link>
          </div>
        </section>
          ))}
        </div>
      ))}
    </main>
  );
}
