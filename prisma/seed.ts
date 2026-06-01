import { config } from "dotenv";
config({ path: ".env.local" });
import { db as prisma } from "../src/lib/db";
import { projects, articles, services } from "../src/data/public-content";

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
        gallery: project.gallery as any, // Json
        featured: project.featured ?? false,
        year: project.year,
        scope: project.scope,
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
      },
    });
  }
  console.log(`Seeded ${articles.length} articles.`);

  // Seed Services
  for (let i = 0; i < services.length; i++) {
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

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
