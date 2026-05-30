import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import type { Article } from "@/data/public-content";
import { cn, formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
  variant?: "featured" | "default" | "compact";
  featuredLayout?: "split" | "stacked";
  priority?: boolean;
};

export function ArticleCard({
  article,
  variant = "default",
  featuredLayout = "split",
  priority,
}: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const isSplitFeatured = isFeatured && featuredLayout === "split";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[1.65rem] border border-forest-200/60 bg-surface shadow-card transition duration-300 hover:shadow-soft motion-reduce:hover:translate-y-0",
        isSplitFeatured && "grid md:grid-cols-[1.05fr_0.95fr]",
        isCompact && "grid sm:grid-cols-[11rem_1fr]"
      )}
    >
      <Link href={`/articles/${article.slug}`} className="contents">
        <div
          className={cn(
            "relative overflow-hidden bg-background-muted",
            isSplitFeatured && "min-h-[24rem]",
            isFeatured && !isSplitFeatured && "aspect-[16/9]",
            isCompact && "min-h-[12rem] sm:min-h-0 sm:h-full",
            !isFeatured && !isCompact && "aspect-[16/10]"
          )}
        >
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes={
              variant === "featured"
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </div>
        <div
          className={cn(
            "p-5 md:p-6",
            isSplitFeatured && "flex flex-col justify-center md:p-10",
            isFeatured && !isSplitFeatured && "md:p-7",
            isCompact && "md:p-5"
          )}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-700">
            {article.category} · {formatDate(article.publishedAt)}
          </p>
          <h3
            className={cn(
              "mt-4 font-serif leading-[1.02] text-forest-900 text-balance",
              isSplitFeatured && "text-4xl md:text-5xl",
              isFeatured && !isSplitFeatured && "text-3xl md:text-4xl",
              isCompact && "text-2xl",
              !isFeatured && !isCompact && "text-2xl"
            )}
          >
            {article.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-text-secondary">
            {article.excerpt}
          </p>
          <span className={cn("inline-flex items-center gap-2 text-sm font-semibold text-forest-900", isCompact ? "mt-4" : "mt-6")}>
            Baca artikel
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
