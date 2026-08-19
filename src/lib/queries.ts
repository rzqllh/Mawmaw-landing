import { db } from "./db";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import type { IconName } from "@/lib/icons";
import {
  aboutContent,
  contactContent,
  footerContent,
  heroContent,
  servicesSection,
  siteConfig,
  type Project,
  type Article,
  type Service,
  type ImageAsset,
} from "@/data/public-content";
import type { Project as PrismaProject, Article as PrismaArticle, Service as PrismaService, SiteSetting } from "@prisma/client";

function getDefaultSiteSettings(): SiteSetting {
  return {
    id: "global",
    siteName: siteConfig.name,
    siteDescription: siteConfig.description,
    email: siteConfig.email,
    phone: siteConfig.phone ?? "",
    address: siteConfig.address ?? "",
    socials: siteConfig.socials,
    heroTitle: heroContent.title,
    heroDescription: heroContent.description,
    heroImageSrc: heroContent.image.src,
    heroImageAlt: heroContent.image.alt,
    heroImageBlur: heroContent.image.blurDataURL || null,
    heroStatCards: heroContent.statCards,
    aboutLabel: aboutContent.label,
    aboutTitle: aboutContent.title,
    aboutDescription: aboutContent.description,
    aboutImageSrc: aboutContent.image.src,
    aboutImageAlt: aboutContent.image.alt,
    aboutImageBlur: aboutContent.image.blurDataURL || null,
    aboutBadgeTitle: aboutContent.badge?.title ?? null,
    aboutBadgeDesc: aboutContent.badge?.description ?? null,
    aboutValues: aboutContent.values,
    servicesLabel: servicesSection.label,
    servicesTitle: servicesSection.title,
    servicesDesc: servicesSection.description,
    projectsLabel: "PROYEK KAMI",
    projectsTitle: "Karya Unggulan",
    projectsDesc: "Pilihan proyek interior yang telah kami rancang dengan sentuhan personal.",
    articlesLabel: "ARTIKEL KAMI",
    articlesTitle: "Inspirasi & Wawasan",
    articlesDesc: "Catatan dan panduan seputar desain interior dan tata ruang.",
    contactTitle: contactContent.title,
    contactDesc: contactContent.description,
    footerHeadline: footerContent.headline,
    footerSummary: footerContent.summary,
    copyright: footerContent.copyright,
    updatedAt: new Date(),
  };
}

// DTO Mappers
function toProjectDTO(row: PrismaProject): Project {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200, blurDataURL: row.coverBlur || undefined },
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
    try {
      const settings = await db.siteSetting.findUnique({
        where: { id: "global" },
      });

      if (!settings) {
        return getDefaultSiteSettings();
      }

      return settings;
    } catch {
      return getDefaultSiteSettings();
    }
  },
  ["site-settings"],
  { tags: ["site-settings"], revalidate: 3600 }
) as () => Promise<SiteSetting>;
