import { config } from "dotenv";
config({ path: ".env.local" });
import { db as prisma } from "../src/lib/db.ts";
import {
  aboutContent,
  articles,
  footerContent,
  heroContent,
  projects,
  services,
  siteConfig,
} from "../src/data/public-content.ts";

async function main() {
  console.log("Starting seed...");

  // Seed Projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        location: project.location,
        excerpt: project.excerpt,
        description: project.description,
        coverSrc: project.coverImage.src,
        coverAlt: project.coverImage.alt,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gallery: project.gallery as any, // Json
        featured: project.featured ?? false,
        year: project.year,
        scope: project.scope,
        status: "PUBLISHED",
      },
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  // Seed Articles
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        coverSrc: article.coverImage.src,
        coverAlt: article.coverImage.alt,
        category: article.category,
        featured: article.featured ?? false,
        publishedAt: new Date(article.publishedAt),
        content: article.content, // Arrays of strings are valid JSON
        status: "PUBLISHED",
      },
    });
  }
  console.log(`Seeded ${articles.length} articles.`);

  // Seed Services
  for (let i = 0; i < services.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services[i] as any; // Cast to any to bypass type check since id exists in data
    await prisma.service.upsert({
      where: { slug: service.id },
      update: {},
      create: {
        slug: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        imageSrc: service.image?.src,
        imageAlt: service.image?.alt,
        sortOrder: i,
      },
    });
  }
  console.log(`Seeded ${services.length} services.`);

  await prisma.siteSetting.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      siteName: siteConfig.name,
      siteDescription: siteConfig.description,
      email: siteConfig.email,
      phone: siteConfig.phone ?? "",
      address: siteConfig.address ?? "",
      socials: {
        instagram: siteConfig.socials.instagram,
        pinterest: siteConfig.socials.pinterest,
        behance: siteConfig.socials.behance,
      },
      heroTitle: heroContent.title,
      heroDescription: heroContent.description,
      heroImageSrc: heroContent.image.src,
      heroImageAlt: heroContent.image.alt,
      heroStatCards: heroContent.statCards,
      aboutLabel: aboutContent.label,
      aboutTitle: aboutContent.title,
      aboutDescription: aboutContent.description,
      aboutImageSrc: aboutContent.image.src,
      aboutImageAlt: aboutContent.image.alt,
      aboutBadgeTitle: aboutContent.badge?.title ?? null,
      aboutBadgeDesc: aboutContent.badge?.description ?? null,
      aboutValues: aboutContent.values,
      servicesLabel: "LAYANAN KAMI",
      servicesTitle: "Eksplorasi Layanan",
      servicesDesc: "Kami menawarkan berbagai layanan interior yang disesuaikan dengan kebutuhan ruang Anda.",
      projectsLabel: "PROYEK KAMI",
      projectsTitle: "Karya Unggulan",
      projectsDesc: "Lihat pilihan proyek interior yang telah kami kerjakan.",
      articlesLabel: "ARTIKEL KAMI",
      articlesTitle: "Inspirasi & Tips",
      articlesDesc: "Baca panduan praktis dan inspirasi seputar desain interior.",
      contactTitle: "Mulai Konsultasi",
      contactDesc: "Ceritakan kebutuhan ruang Anda dan kami akan membantu menentukan langkah awalnya.",
      footerHeadline: footerContent.headline,
      footerSummary: footerContent.summary,
      copyright: footerContent.copyright,
    },
  });
  console.log("Seeded site settings.");

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
