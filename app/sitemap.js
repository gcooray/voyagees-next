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
    "/request",
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
    "/fr/request",
    "/fr/rides",
    "/fr/search",
    "/fr/terms",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
