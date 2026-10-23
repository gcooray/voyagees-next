import Link from "next/link";
import "./RelatedLinks.css";

// "Plan your trip" link block near the end of the service and destination
// pages. Internal links tell search engines which pages matter and how
// they relate; before this, the main pages linked to almost nothing.
// `current` is the page's own path, which is left out of the list.

const SERVICES = [
  { en: "Private driver in Sri Lanka", fr: "Chauffeur privé au Sri Lanka", href: "/private-driver" },
  { en: "Airport transfers", fr: "Transferts aéroport", href: "/airport-transfer" },
  { en: "Private driver in Colombo", fr: "Chauffeur privé à Colombo", href: "/private-driver/colombo" },
  { en: "Private driver in Galle", fr: "Chauffeur privé à Galle", href: "/private-driver/galle" },
  { en: "Private tours of Sri Lanka", fr: "Circuits privés au Sri Lanka", href: "/private-tour" },
  { en: "Plan your trip", fr: "Planifier votre voyage", href: "/plan-trip" },
];

// the most-searched destinations; slugs exist in both language datasets
const DESTINATIONS = [
  { name: "Kandy", slug: "kandy" },
  { name: "Ella", slug: "ella" },
  { name: "Galle", slug: "galle" },
  { name: "Sigiriya", slug: "sigiriya" },
  { name: "Nuwara Eliya", slug: "nuwara-eliya" },
  { name: "Mirissa", slug: "mirissa" },
  { name: "Yala", slug: "yala" },
  { name: "Negombo", slug: "negombo" },
];

const STRINGS = {
  en: { eyebrow: "Plan your trip", services: "Our services", places: "Popular destinations" },
  fr: { eyebrow: "Préparez votre voyage", services: "Nos services", places: "Destinations populaires" },
};

export default function RelatedLinks({ locale = "en", current = "" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const prefix = locale === "fr" ? "/fr" : "";
  const here = current.replace(/^\/fr(?=\/|$)/, "") || "/";

  const services = SERVICES.filter((s) => s.href !== here);
  const places = DESTINATIONS.filter((d) => `/destinations/${d.slug}` !== here);

  return (
    <nav className="related-links" aria-label={t.eyebrow}>
      <div className="related-links-inner">
        <p className="related-links-eyebrow">{t.eyebrow}</p>

        <div className="related-links-groups">
          <div>
            <h2>{t.services}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={`${prefix}${s.href}`}>{s[locale] || s.en}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>{t.places}</h2>
            <ul className="related-links-places">
              {places.map((d) => (
                <li key={d.slug}>
                  <Link href={`${prefix}/destinations/${d.slug}`}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
