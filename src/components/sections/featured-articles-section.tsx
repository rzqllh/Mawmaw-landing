import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ArticleCard } from "@/components/cards/article-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
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
    <SectionWrapper
      id="artikel"
      label={articlesSection.label}
      title={articlesSection.title}
      description={articlesSection.description}
    >
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)]">
        <Reveal>
          <ArticleCard
            article={featuredArticle}
            variant="featured"
            featuredLayout="stacked"
            priority
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {supportingArticles.slice(0, 2).map((article, index) => (
            <Reveal key={article.id} delay={index * 0.05}>
              <ArticleCard article={article} variant="compact" />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Button asChild variant="secondary" size="lg">
          <Link href="/articles">
            {articlesSection.cta}
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
