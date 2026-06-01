import type { Metadata } from "next";

import { ArticleCard } from "@/components/cards/article-card";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import {
  articlesSection,
} from "@/data/public-content";
import { getArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Artikel Interior",
  description:
    "Inspirasi dan wawasan desain interior dari Mawmaw Interior untuk hunian, apartemen, dan ruang komersial.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const supportingArticles = articles.filter((a) => a.id !== featuredArticle?.id);
  const categories = ["Semua", ...new Set(articles.map((article) => article.category))];

  return (
    <>
      <PageHero
        label="Artikel"
        title={articlesSection.title}
        description={articlesSection.description}
      >
        <div className="flex flex-wrap gap-2" aria-label="Kategori artikel">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="default"
              className="px-4 py-2 text-sm shadow-[0_1px_0_rgba(26,42,29,0.03)]"
            >
              {category}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="section-container section-y">
        {articles.length ? (
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
            title="Belum ada artikel."
            description="Catatan desain sedang disiapkan. Silakan kembali lagi nanti atau hubungi kami untuk konsultasi ruang Anda."
            href="/#kontak"
            action="Kontak"
          />
        )}
      </section>
    </>
  );
}
