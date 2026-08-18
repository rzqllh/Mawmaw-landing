import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/public-content";
import { getPublishedArticles, getPublishedProjects } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([
    getPublishedProjects(),
    getPublishedArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/articles`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/articles/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
