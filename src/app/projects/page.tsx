import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { contactContent, projects } from "@/data/public-content";

export const metadata: Metadata = {
  title: "Portfolio Proyek",
  description:
    "Jelajahi portfolio proyek desain interior Mawmaw Interior untuk hunian, apartemen, kantor, hospitality, dan ruang komersial.",
};

export default function ProjectsPage() {
  const categories = ["Semua", ...new Set(projects.map((project) => project.category))];

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Ruang yang dirancang dengan cerita dan fungsi."
        description="Setiap proyek memiliki ritme, kebutuhan, dan karakter berbeda. Portfolio ini disusun agar Anda dapat melihat bagaimana Mawmaw Interior menerjemahkan rasa nyaman ke dalam ruang nyata."
      >
        <div className="flex flex-wrap gap-2" aria-label="Kategori proyek">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-pill border border-forest-200/70 bg-surface px-4 py-2 text-sm font-semibold text-forest-900 shadow-[0_1px_0_rgba(26,42,29,0.03)]"
            >
              {category}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section-container section-y">
        {projects.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.035}>
                <ProjectCard project={project} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Belum ada proyek."
            description="Portfolio sedang disiapkan. Anda tetap dapat menghubungi kami untuk berdiskusi tentang kebutuhan ruang Anda."
            href="/#kontak"
            action="Kontak"
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
            <Button asChild variant="inverse" size="lg">
              <Link href="/#kontak">
                Konsultasi
                <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
