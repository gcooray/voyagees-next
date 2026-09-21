export default function sitemap() {
  const baseUrl = "https://www.voyagees.com";

  const paths = [
    "",
    "/about",
    "/contact",
    "/explore-sri-lanka",
    "/map",
    "/plan-trip",
    "/private-driver",
    "/private-tour",
    "/request",
    "/rides",
    "/search",
    "/terms",
    "/fr",
    "/fr/about",
    "/fr/contact",
    "/fr/explore-sri-lanka",
    "/fr/map",
    "/fr/private-driver",
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
