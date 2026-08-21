import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { contactContent } from "@/data/public-content";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Portfolio Proyek",
  description:
    "Jelajahi portfolio proyek desain interior Mawmaw Interior untuk hunian, apartemen, kantor, hospitality, dan ruang komersial.",
};

type ProjectsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getProjects();
  const categories = ["Semua", ...new Set(projects.map((project) => project.category))];
  const requestedCategory = (await searchParams).category;
  const activeCategory = categories.includes(requestedCategory ?? "")
    ? requestedCategory ?? "Semua"
    : "Semua";
  const visibleProjects = activeCategory === "Semua"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Ruang yang dirancang dengan cerita dan fungsi."
        description="Setiap proyek memiliki ritme, kebutuhan, dan karakter berbeda. Portfolio ini disusun agar Anda dapat melihat bagaimana Mawmaw Interior menerjemahkan rasa nyaman ke dalam ruang nyata."
      >
        {categories.length > 1 ? (
          <div className="flex flex-wrap gap-2" aria-label="Kategori proyek">
            {categories.map((category) => (
              <Link
                key={category}
                href={category === "Semua" ? "/projects" : `/projects?category=${encodeURIComponent(category)}`}
                aria-current={category === activeCategory ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  category === activeCategory
                    ? "border-forest-900 bg-[#112019] text-[#FAF8F1] shadow-sm"
                    : "border-forest-900/15 bg-forest-50/80 text-forest-800 hover:border-forest-500 hover:bg-forest-100"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        ) : null}
      </PageHero>

      <section className="section-container section-y">
        {visibleProjects.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.035}>
                <ProjectCard project={project} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title={activeCategory === "Semua" ? "Belum ada proyek." : `Belum ada proyek ${activeCategory}.`}
            description="Portfolio sedang disiapkan. Anda tetap dapat menghubungi kami untuk berdiskusi tentang kebutuhan ruang Anda."
            href="/#kontak"
            action="Ceritakan proyek Anda"
          />
        )}
      </section>

      <section className="bg-background-muted">
        <div className="section-container py-16 md:py-24">
          <div className="grid items-center gap-8 rounded-2xl bg-forest-900 p-7 text-text-inverse shadow-soft md:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase text-gold-300">
                {contactContent.label}
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">
                Ada ruang yang ingin Anda rancang?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-inverse/72 md:text-base">
                Ceritakan kebutuhan proyek Anda melalui formulir, lalu tim kami
                akan membantu memetakan langkah awal dengan tenang.
              </p>
            </div>
            <Button asChild variant="gold" size="lg">
              <Link href="/#kontak" className="group">
                Ceritakan Proyek Anda
                <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
