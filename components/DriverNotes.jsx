import { destinationNotes } from "@/data/destinationNotes";
import "./DriverNotes.css";

const LABELS = {
  en: { title: "From our drivers", time: "Time needed", when: "Best time", access: "Getting there" },
  fr: { title: "L'avis de nos chauffeurs", time: "Temps à prévoir", when: "Le bon moment", access: "Pour y aller" },
};

/** The driver's notes for a destination, or null when it has none yet. */
export function getDriverNotes(slug, locale) {
  return destinationNotes[slug]?.[locale] || null;
}

// "From our drivers" block on a destination page: quick facts, then the
// practical sections (park blocks, which entrance, what to pair it with).
export default function DriverNotes({ slug, locale = "en" }) {
  const notes = getDriverNotes(slug, locale);
  if (!notes) return null;
  const l = LABELS[locale] || LABELS.en;

  return (
    <section className="driver-notes">
      <h2>{l.title}</h2>
      <dl className="dn-facts">
        {["time", "when", "access"].map((key) => (
          <div key={key}>
            <dt>{l[key]}</dt>
            <dd>{notes.facts[key]}</dd>
          </div>
        ))}
      </dl>
      <div className="dn-sections">
        {notes.sections.map((s) => (
          <article key={s.title} className="dn-section">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
