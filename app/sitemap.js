import { touristDestinations } from "@/data/touristDestinations";

export default function sitemap() {
  const baseUrl = "https://www.voyagees.com";

  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/explore-sri-lanka`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const destinationPages = (touristDestinations || [])
    .filter((destination) => destination.slug)
    .map((destination) => ({
      url: `${baseUrl}/destinations/${destination.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...destinationPages].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}