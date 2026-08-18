import { db } from "./db";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import type { IconName } from "@/lib/icons";
import type { Project, Article, Service, ImageAsset } from "@/data/public-content";
import type { Project as PrismaProject, Article as PrismaArticle, Service as PrismaService, SiteSetting } from "@prisma/client";

// DTO Mappers
function toProjectDTO(row: PrismaProject): Project {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200, blurDataURL: row.coverBlur || undefined }, // Dimensions handle next/image layout
    gallery: row.gallery as ImageAsset[],
  };
}

function toArticleDTO(row: PrismaArticle): Article {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200, blurDataURL: row.coverBlur || undefined },
    content: row.content as string[],
    publishedAt: row.publishedAt.toISOString(),
  };
}

function toServiceDTO(row: PrismaService): Service {
  return {
    ...row,
    icon: row.icon as IconName,
    image: row.imageSrc ? { src: row.imageSrc, alt: row.imageAlt ?? "", width: 800, height: 600 } : undefined,
  };
}

// PROJECTS
export const getPublishedProjects = unstable_cache(
  async () => {
    const rows = await db.project.findMany({ 
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" } 
    });
    return rows.map(toProjectDTO);
  },
  ["projects", "published"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getProjects = async () => {
  const isDraftMode = (await draftMode()).isEnabled;
  
  return unstable_cache(
    async () => {
      const rows = await db.project.findMany({ 
        where: isDraftMode ? undefined : { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" } 
      });
      return rows.map(toProjectDTO);
    },
    ["projects", isDraftMode ? "draft" : "published"],
    { tags: ["projects"], revalidate: 3600 }
  )();
};

export const getFeaturedProjects = async () => {
  const isDraftMode = (await draftMode()).isEnabled;
  
  return unstable_cache(
    async () => {
      const rows = await db.project.findMany({ 
        where: { 
          featured: true,
          ...(isDraftMode ? {} : { status: "PUBLISHED" })
        }, 
        orderBy: { sortOrder: "asc" } 
      });
      return rows.map(toProjectDTO);
    },
    ["projects-featured", isDraftMode ? "draft" : "published"],
    { tags: ["projects"], revalidate: 3600 }
  )();
};

export async function getProjectBySlug(slug: string) {
  const isDraftMode = (await draftMode()).isEnabled;

  return unstable_cache(
    async () => {
      const row = await db.project.findUnique({ where: { slug } });
      if (!row) return null;
      if (!isDraftMode && row.status !== "PUBLISHED") return null;
      return toProjectDTO(row);
    },
    ["project", slug, isDraftMode ? "draft" : "published"],
    { tags: ["projects", `project-${slug}`], revalidate: 3600 }
  )();
}

// ARTICLES
export const getPublishedArticles = unstable_cache(
  async () => {
    const rows = await db.article.findMany({ 
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" } 
    });
    return rows.map(toArticleDTO);
  },
  ["articles", "published"],
  { tags: ["articles"], revalidate: 3600 }
);

export const getArticles = async () => {
  const isDraftMode = (await draftMode()).isEnabled;

  return unstable_cache(
    async () => {
      const rows = await db.article.findMany({ 
        where: isDraftMode ? undefined : { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" } 
      });
      return rows.map(toArticleDTO);
    },
    ["articles", isDraftMode ? "draft" : "published"],
    { tags: ["articles"], revalidate: 3600 }
  )();
};

export async function getArticleBySlug(slug: string) {
  const isDraftMode = (await draftMode()).isEnabled;

  return unstable_cache(
    async () => {
      const row = await db.article.findUnique({ where: { slug } });
      if (!row) return null;
      if (!isDraftMode && row.status !== "PUBLISHED") return null;
      return toArticleDTO(row);
    },
    ["article", slug, isDraftMode ? "draft" : "published"],
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
) as () => Promise<Service[]>;

// SITE SETTINGS
export const getSiteSettings = unstable_cache(
  async () => {
    const settings = await db.siteSetting.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      throw new Error("Site settings belum tersedia. Jalankan `npm run db:seed` sebelum membuka situs.");
    }

    return settings;
  },
  ["site-settings"],
  { tags: ["site-settings"], revalidate: 3600 }
) as () => Promise<SiteSetting>;
