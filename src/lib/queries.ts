import { db } from "./db";
import { unstable_cache } from "next/cache";
import type { IconName } from "@/lib/icons";
import type { Project, Article, Service, ImageAsset } from "@/data/public-content";
import type { Project as PrismaProject, Article as PrismaArticle, Service as PrismaService } from "@prisma/client";

// DTO Mappers
function toProjectDTO(row: PrismaProject): Project {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200 }, // Dimensions handle next/image layout
    gallery: row.gallery as ImageAsset[],
  };
}

function toArticleDTO(row: PrismaArticle): Article {
  return {
    ...row,
    coverImage: { src: row.coverSrc, alt: row.coverAlt, width: 1600, height: 1200 },
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
export const getProjects = unstable_cache(
  async () => {
    const rows = await db.project.findMany({ orderBy: { year: "desc" } });
    return rows.map(toProjectDTO);
  },
  ["projects"],
  { tags: ["projects"], revalidate: 3600 }
) as () => Promise<Project[]>;

export const getFeaturedProjects = unstable_cache(
  async () => {
    const rows = await db.project.findMany({ where: { featured: true }, orderBy: { year: "desc" } });
    return rows.map(toProjectDTO);
  },
  ["projects-featured"],
  { tags: ["projects"], revalidate: 3600 }
) as () => Promise<Project[]>;

export function getProjectBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const row = await db.project.findUnique({ where: { slug } });
      return row ? toProjectDTO(row) : null;
    },
    ["project", slug],
    { tags: ["projects", `project-${slug}`], revalidate: 3600 }
  )() as Promise<Project | null>;
}

// ARTICLES
export const getArticles = unstable_cache(
  async () => {
    const rows = await db.article.findMany({ orderBy: { publishedAt: "desc" } });
    return rows.map(toArticleDTO);
  },
  ["articles"],
  { tags: ["articles"], revalidate: 3600 }
) as () => Promise<Article[]>;

export function getArticleBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const row = await db.article.findUnique({ where: { slug } });
      return row ? toArticleDTO(row) : null;
    },
    ["article", slug],
    { tags: ["articles", `article-${slug}`], revalidate: 3600 }
  )() as Promise<Article | null>;
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
import { siteConfig, heroContent, aboutContent, servicesSection, projectsSection, articlesSection, contactContent, footerContent } from "@/data/public-content";

export const getSiteSettings = unstable_cache(
  async () => {
    const defaultSocials = {
      instagram: siteConfig.socials.instagram,
      pinterest: siteConfig.socials.pinterest,
      behance: siteConfig.socials.behance,
    };

    const settings = await db.siteSetting.upsert({
      where: { id: "global" },
      update: {},
      create: {
        id: "global",
        siteName: siteConfig.name,
        siteDescription: siteConfig.description,
        email: siteConfig.email,
        phone: siteConfig.phone ?? "",
        address: siteConfig.address ?? "",
        socials: defaultSocials,

        heroTitle: heroContent.title,
        heroDescription: heroContent.description,
        heroImageSrc: heroContent.image.src,
        heroImageAlt: heroContent.image.alt,
        heroStatCards: heroContent.statCards as object[],

        aboutLabel: aboutContent.label,
        aboutTitle: aboutContent.title,
        aboutDescription: aboutContent.description,
        aboutImageSrc: aboutContent.image.src,
        aboutImageAlt: aboutContent.image.alt,
        aboutBadgeTitle: (aboutContent as Record<string, unknown>).badge ? (aboutContent.badge as { title?: string }).title ?? null : null,
        aboutBadgeDesc: (aboutContent as Record<string, unknown>).badge ? (aboutContent.badge as { description?: string }).description ?? null : null,
        aboutValues: aboutContent.values as object[],

        servicesLabel: "LAYANAN KAMI",
        servicesTitle: "Eksplorasi Layanan",
        servicesDesc: "Kami menawarkan berbagai layanan...",
        projectsLabel: "PROYEK KAMI",
        projectsTitle: "Karya Unggulan",
        projectsDesc: "Lihat portofolio karya kami...",
        articlesLabel: "ARTIKEL KAMI",
        articlesTitle: "Inspirasi & Tips",
        articlesDesc: "Temukan artikel terbaru...",

        contactTitle: "Mulai Konsultasi",
        contactDesc: "Hubungi kami untuk...",
        footerHeadline: footerContent.headline,
        footerSummary: footerContent.summary,
        copyright: footerContent.copyright,
      },
    });

    return settings;
  },
  ["site-settings"],
  { tags: ["site-settings"], revalidate: 3600 }
) as () => Promise<any>;
