import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ArticleCard } from "@/components/cards/article-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getArticles, getSiteSettings } from "@/lib/queries";

export async function FeaturedArticlesSection() {
  const articles = await getArticles();
  const settings = await getSiteSettings();
  const topArticles = articles.slice(0, 3);
  const featuredArticle = topArticles[0];
  const supportingArticles = topArticles.slice(1);

  if (!featuredArticle) {
    return null;
  }

  return (
    <section id="artikel" className="relative surface-section section-y">
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="section-eyebrow">
            {settings.articlesLabel}
          </p>
          <h2 className="heading-section text-forest-900">
            {settings.articlesTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            {settings.articlesDesc}
          </p>
        </div>
        <div className="shrink-0">
          <Button asChild variant="secondary" radius="pill">
            <Link href="/articles" className="group">
              Semua Artikel
              <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid items-start gap-8">
        <Reveal>
          <ArticleCard
            article={featuredArticle}
            variant="featured"
            featuredLayout="split"
            priority
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {supportingArticles.slice(0, 2).map((article, index) => (
            <Reveal key={article.id} delay={index * 0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
