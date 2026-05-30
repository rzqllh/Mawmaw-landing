import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";

import { ArticleCard } from "@/components/cards/article-card";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/public-content";
import { formatDate } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage.src],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="section-container pt-32 md:pt-40">
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/articles">
              <CaretLeft aria-hidden className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-gold-700">
              {article.category} · {formatDate(article.publishedAt)}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9] text-forest-900 text-balance">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
              {article.excerpt}
            </p>
          </div>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-background-muted shadow-soft">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </header>

        <section className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            {article.content.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-7 text-lg leading-9 text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </article>

      <section className="bg-background-muted">
        <div className="section-container py-16 md:py-24">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-gold-700">
                Bacaan Terkait
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-none text-forest-900 md:text-6xl">
                Wawasan lain untuk ruang Anda.
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/#kontak">
                Konsultasi
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {relatedArticles.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/articles">Semua Artikel</Link>
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
