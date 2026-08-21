import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import {
  articlesSection,
} from "@/data/public-content";
import { getArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Artikel Interior",
  description:
    "Inspirasi dan wawasan desain interior dari Mawmaw Interior untuk hunian, apartemen, dan ruang komersial.",
};

type ArticlesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const articles = await getArticles();
  const categories = ["Semua", ...new Set(articles.map((article) => article.category))];
  const requestedCategory = (await searchParams).category;
  const activeCategory = categories.includes(requestedCategory ?? "")
    ? requestedCategory ?? "Semua"
    : "Semua";
  const visibleArticles = activeCategory === "Semua"
    ? articles
    : articles.filter((article) => article.category === activeCategory);
  const featuredArticle = visibleArticles.find((article) => article.featured) || visibleArticles[0];
  const supportingArticles = visibleArticles.filter((article) => article.id !== featuredArticle?.id);

  return (
    <>
      <PageHero
        label="Artikel"
        title={articlesSection.title}
        description={articlesSection.description}
      >
        <div className="flex flex-wrap gap-2" aria-label="Kategori artikel">
          {categories.map((category) => (
            <Link
              key={category}
              href={category === "Semua" ? "/articles" : `/articles?category=${encodeURIComponent(category)}`}
              aria-current={category === activeCategory ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                category === activeCategory
                  ? "border-forest-900 bg-forest-900 text-text-inverse"
                  : "border-forest-200 bg-forest-50 text-forest-800 hover:border-forest-500"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="section-container section-y">
        {visibleArticles.length ? (
          <div className="grid gap-8">
            {featuredArticle ? (
              <Reveal>
                <ArticleCard article={featuredArticle} variant="featured" priority />
              </Reveal>
            ) : null}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {supportingArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.035}>
                  <ArticleCard article={article} priority={index < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title={activeCategory === "Semua" ? "Belum ada artikel." : `Belum ada artikel ${activeCategory}.`}
            description="Catatan desain sedang disiapkan. Silakan kembali lagi nanti atau hubungi kami untuk konsultasi ruang Anda."
            href="/#kontak"
            action="Tanyakan kebutuhan ruang"
          />
        )}
      </section>
    </>
  );
}
