// Per-page SEO metadata. Next.js has no automatic per-route canonical: a
// page without its own `alternates` inherits the root layout's, and
// `openGraph`/`twitter` are merged shallowly, so any page that doesn't set
// them inherits the homepage's. Every page.js wraps its metadata in
// withSeo(path, …) so it gets its own canonical, EN/FR hreflang links and
// share-preview tags.

export const SITE_URL = "https://www.voyagees.com";
export const SITE_NAME = "voyaGees";
export const SITE_TITLE = "Hire Trusted Private Drivers & Tours in Sri Lanka | voyaGees";
export const SITE_DESCRIPTION =
  "Book reliable private drivers and tours with voyaGees. Safe, flexible, and affordable travel across Sri Lanka with verified local drivers and clean vehicles.";

// Voyagees on social media — footer links and the Organization's sameAs.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61578932305103",
  instagram: "https://www.instagram.com/voyageausri/",
};

const OG_IMAGE = {
  url: "/og-voyagees.jpg",
  width: 1200,
  height: 630,
  alt: "voyaGees — your tour, your way",
};

// The layout's title template appends " | voyaGees"; several pages also
// ended their own title with it, so the brand was doubled in the tab.
function stripBrand(title) {
  return typeof title === "string" ? title.replace(/\s*\|\s*voyagees\s*$/i, "") : title;
}

// "/fr/private-tour" ↔ "/private-tour", "/fr" ↔ "/"
function counterparts(path) {
  if (path === "/fr" || path.startsWith("/fr/")) {
    return { en: path.slice(3) || "/", fr: path };
  }
  return { en: path, fr: path === "/" ? "/fr" : `/fr${path}` };
}

/**
 * @param {string} path      this page's path, e.g. "/private-driver"
 * @param {object} metadata  the page's own metadata (title, description, …)
 * @param {object} options   translated: false when there's no other-language
 *                           version; noindex: true for private/action pages;
 *                           image/imageAlt: the share image (default: the site
 *                           one); article: { publishedTime } for blog posts
 */
export function withSeo(
  path,
  metadata = {},
  { translated = true, noindex = false, image, imageAlt, article } = {}
) {
  const isFrench = path === "/fr" || path.startsWith("/fr/");
  const pageTitle = stripBrand(metadata.title);
  const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_TITLE;
  const description = metadata.description || SITE_DESCRIPTION;

  const languages = translated
    ? (({ en, fr }) => ({ en, fr, "x-default": en }))(counterparts(path))
    : undefined;

  const ogImage = image ? { url: image, alt: imageAlt || pageTitle || SITE_NAME } : OG_IMAGE;

  return {
    ...metadata,
    ...(pageTitle ? { title: pageTitle } : {}),
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: article ? "article" : "website",
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      locale: isFrench ? "fr_FR" : "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
