import Link from "next/link";
import TouristMapLoader from "@/components/TouristMapLoader";
import { exploreGuide } from "@/data/exploreGuide";
import "./ExploreGuide.css";

// The Explore Sri Lanka page: regions and month-by-month weather first,
// then the map, then common planning mistakes and practical tips. The map
// sits in the middle so visitors read the guide before clicking around it.
export default function ExploreGuide({ locale = "en" }) {
  const g = exploreGuide[locale] || exploreGuide.en;

  return (
    <div className="explore-guide">
      <header className="eg-header">
        <h1>{g.pageTitle}</h1>
        <p>{g.pageLead}</p>
      </header>

      <section className="eg-section">
        <p className="eg-eyebrow">{g.regionsEyebrow}</p>
        <h2>{g.regionsTitle}</h2>
        <p className="eg-intro">{g.regionsIntro}</p>

        <div className="eg-regions">
          {g.regions.map((r) => (
            <article key={r.name} className="eg-region">
              <h3>{r.name}</h3>
              <dl>
                <div>
                  <dt>{g.labels.best}</dt>
                  <dd>{r.best}</dd>
                </div>
                <div>
                  <dt>{g.labels.days}</dt>
                  <dd>{r.days}</dd>
                </div>
                <div>
                  <dt>{g.labels.access}</dt>
                  <dd>{r.access}</dd>
                </div>
              </dl>
              <p className="eg-tip">
                <strong>{g.labels.tip}</strong> {r.tip}
              </p>
              <ul className="eg-places">
                {r.places.map(([label, slug]) => (
                  <li key={slug}>
                    <Link href={`${g.destinationBase}${slug}`}>{label}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="eg-alt">
        <div className="eg-section">
          <p className="eg-eyebrow">{g.weatherEyebrow}</p>
          <h2>{g.weatherTitle}</h2>
          <p className="eg-intro">{g.weatherIntro}</p>

          <div className="eg-table-wrap">
            <table className="eg-weather">
              <thead>
                <tr>
                  <th scope="col" />
                  {g.months.map((m) => (
                    <th key={m} scope="col">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.weatherRows.map(([region, values]) => (
                  <tr key={region}>
                    <th scope="row">{region}</th>
                    {values.map((v, i) => (
                      <td key={i} className={`eg-w-${v}`}>
                        <span className="eg-sr">{g.weatherLegend[v]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="eg-legend">
            {Object.entries(g.weatherLegend).map(([k, label]) => (
              <li key={k}>
                <span className={`eg-dot eg-w-${k}`} /> {label}
              </li>
            ))}
          </ul>
          {g.weatherMore && (
            <p className="eg-more">
              <Link href={g.weatherMore.href}>{g.weatherMore.label} →</Link>
            </p>
          )}
        </div>
      </section>

      <TouristMapLoader
        headingLevel="h2"
        title={g.mapTitle}
        subtitle={g.mapSubtitle}
      />

      <section className="eg-section">
        <p className="eg-eyebrow">{g.trapsEyebrow}</p>
        <h2>{g.trapsTitle}</h2>
        <div className="eg-traps">
          {g.traps.map((t) => (
            <article key={t.title} className="eg-trap">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>

        <p className="eg-eyebrow eg-good-eyebrow">{g.goodEyebrow}</p>
        <h2>{g.goodTitle}</h2>
        <ul className="eg-good">
          {g.good.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="eg-cta">
        <h2>{g.ctaTitle}</h2>
        <p>{g.ctaText}</p>
        <div className="eg-cta-row">
          {g.ctas.map(([label, href], i) => (
            <Link
              key={href}
              href={href}
              className={i === 0 ? "eg-btn eg-btn-main" : "eg-btn"}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
