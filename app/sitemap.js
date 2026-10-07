import { touristDestinations } from "@/data/touristDestinations";
import { destinationsFr } from "@/data/destinationsFr";

export default function sitemap() {
  const baseUrl = "https://www.voyagees.com";

  const paths = [
    "",
    "/about",
    "/airport-transfer",
    "/contact",
    "/explore-sri-lanka",
    "/map",
    "/plan-trip",
    "/private-driver",
    "/private-driver/colombo",
    "/private-tour",
    "/rides",
    "/search",
    "/terms",
    "/fr",
    "/fr/about",
    "/fr/airport-transfer",
    "/fr/contact",
    "/fr/explore-sri-lanka",
    "/fr/map",
    "/fr/plan-trip",
    "/fr/private-driver",
    "/fr/private-driver/colombo",
    "/fr/private-tour",
    "/fr/rides",
    "/fr/search",
    "/fr/terms",

    // destination pages, read from the same data the pages render from so
    // a new destination is listed automatically (each language from its
    // own list, since the two aren't guaranteed to match)
    ...touristDestinations.map((d) => `/destinations/${d.slug}`),
    ...destinationsFr.map((d) => `/fr/destinations/${d.slug}`),
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
