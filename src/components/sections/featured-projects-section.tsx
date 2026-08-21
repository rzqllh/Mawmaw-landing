import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, getSiteSettings } from "@/lib/queries";

export async function FeaturedProjectsSection() {
  const featuredProjects = await getFeaturedProjects();
  const settings = await getSiteSettings();
  const [firstProject, secondProject, thirdProject] = featuredProjects;

  return (
    <section id="proyek" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-[#FAF8F5] border-t border-forest-900/[0.08]">
      <div className="section-container relative z-10 w-full">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-[0.65rem] lg:text-xs font-bold tracking-[0.22em] uppercase text-gold-700">
              {settings.projectsLabel || "PROYEK KAMI"}
            </span>
            <span className="inline-block h-px w-8 bg-gold-700/40" />
          </div>
          <h2 className="heading-section text-forest-900">
            {settings.projectsTitle}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
            {settings.projectsDesc}
          </p>
        </div>
        <div className="shrink-0">
          <Button asChild variant="secondary" radius="pill">
            <Link href="/projects" className="group">
              Semua Proyek
              <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {firstProject ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <Reveal>
            <ProjectCard
              project={firstProject}
              priority
              variant="showcase"
            />
          </Reveal>
          {secondProject ? (
            <Reveal delay={0.05}>
              <ProjectCard project={secondProject} variant="portrait" />
            </Reveal>
          ) : null}
          {thirdProject ? (
            <Reveal className="lg:col-span-2" delay={0.1}>
              <ProjectCard project={thirdProject} variant="wide" />
            </Reveal>
          ) : null}
        </div>
      ) : (
        <div className="border-y border-forest-900/15 py-10 text-text-secondary">
          Portfolio pilihan sedang disiapkan.
        </div>
      )}
      </div>
    </section>
  );
}
