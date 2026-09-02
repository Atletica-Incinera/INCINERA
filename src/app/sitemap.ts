import type { MetadataRoute } from "next";

const BASE_URL = "https://incinera.cin.ufpe.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/equipes`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seja-patrocinador`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
