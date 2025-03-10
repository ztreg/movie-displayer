import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ztregmdb.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: "weekly",
    },
    // Add more URLs as needed
  ];
}
