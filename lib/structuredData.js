// schema.org structured data (JSON-LD) builders. Rendered with
// components/JsonLd.jsx. These describe the business and page content to
// search engines; they don't change anything visitors see.

import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;

/** The business itself, rendered once site-wide from the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}/og-voyagees.jpg`,
        description:
          "Private drivers, airport transfers and tailor-made private tours across Sri Lanka.",
        telephone: "+94772200565",
        email: "contact@voyagees.com",
        address: { "@type": "PostalAddress", addressCountry: "LK" },
        areaServed: { "@type": "Country", name: "Sri Lanka" },
        availableLanguage: ["English", "French"],
        knowsAbout: ["Private drivers in Sri Lanka", "Airport transfers", "Private tours of Sri Lanka"],
        sameAs: Object.values(SOCIAL_LINKS),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ["en", "fr"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** @param {{ q: string, a: string }[]} items */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** @param {{ name: string, path: string }[]} trail, home first */
export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/** A service the business offers (private driver hire, airport transfers…). */
export function serviceSchema({ name, description, path, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  };
}

/** A blog article. */
export function articleSchema({ title, description, path, image, date, locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    ...(date ? { datePublished: date, dateModified: date } : {}),
    inLanguage: locale === "fr" ? "fr-FR" : "en",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
