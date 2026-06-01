import { db } from "./db";
import { unstable_cache } from "next/cache";
import type { Project, Article, Service, ImageAsset } from "@/data/public-content";

// DTO Mappers
function toProjectDTO(row: any): Project {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200 }, // Dimensions handle next/image layout
    gallery: row.gallery as ImageAsset[],
  };
}

function toArticleDTO(row: any): Article {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200 },
    content: row.content as string[],
  };
}

function toServiceDTO(row: any): Service {
  return {
    ...row,
    image: row.imageSrc ? { src: row.imageSrc, alt: row.imageAlt ?? "", width: 800, height: 600 } : undefined,
  };
}

// PROJECTS
export const getProjects = unstable_cache(
  async () => {
    const rows = await db.project.findMany({ orderBy: { year: "desc" } });
    return rows.map(toProjectDTO);
  },
  ["projects"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    const rows = await db.project.findMany({ where: { featured: true }, orderBy: { year: "desc" } });
    return rows.map(toProjectDTO);
  },
  ["projects-featured"],
  { tags: ["projects"], revalidate: 3600 }
);

export function getProjectBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const row = await db.project.findUnique({ where: { slug } });
      return row ? toProjectDTO(row) : null;
    },
    ["project", slug],
    { tags: ["projects", `project-${slug}`], revalidate: 3600 }
  )();
}

// ARTICLES
export const getArticles = unstable_cache(
  async () => {
    const rows = await db.article.findMany({ orderBy: { publishedAt: "desc" } });
    return rows.map(toArticleDTO);
  },
  ["articles"],
  { tags: ["articles"], revalidate: 3600 }
);

export function getArticleBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const row = await db.article.findUnique({ where: { slug } });
      return row ? toArticleDTO(row) : null;
    },
    ["article", slug],
    { tags: ["articles", `article-${slug}`], revalidate: 3600 }
  )();
}

// SERVICES
export const getServices = unstable_cache(
  async () => {
    const rows = await db.service.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(toServiceDTO);
  },
  ["services"],
  { tags: ["services"], revalidate: 3600 }
);
