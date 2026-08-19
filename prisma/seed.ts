import { config } from "dotenv";
config({ path: ".env.local" });
import { db as prisma } from "../src/lib/db.ts";
import {
  aboutContent,
  articles,
  contactContent,
  footerContent,
  heroContent,
  legacyMockProjectSlugs,
  services,
  servicesSection,
  siteConfig,
} from "../src/data/public-content.ts";

async function main() {
  console.log("Starting seed...");

  const { count: removedMockProjects } = await prisma.project.deleteMany({
    where: {
      slug: { in: [...legacyMockProjectSlugs] },
    },
  });
  console.log(`Removed ${removedMockProjects} legacy mock projects.`);

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
    update: {
      heroStatCards: heroContent.statCards,
    },
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
