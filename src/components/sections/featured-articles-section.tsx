import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ArticleCard } from "@/components/cards/article-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  articlesSection,
  featuredArticle,
  supportingArticles,
} from "@/data/public-content";

export function FeaturedArticlesSection() {
  if (!featuredArticle) {
    return null;
  }

  return (
    <section id="artikel" className="section-y scroll-mt-28 bg-background">
      <div className="section-container">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_auto] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-forest-900">
              {articlesSection.label}
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2.45rem,5vw,5rem)] leading-[0.92] text-forest-900 text-balance">
              {articlesSection.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
              {articlesSection.description}
            </p>
          </div>
          <Button asChild variant="secondary" size="lg" className="w-fit justify-self-start lg:justify-self-end">
            <Link href="/articles">
              {articlesSection.cta}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </Button>
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
