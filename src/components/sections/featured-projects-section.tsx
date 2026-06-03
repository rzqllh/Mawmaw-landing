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
    <section id="proyek" className="relative surface-section-muted section-y pb-32">
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="section-eyebrow">
            {settings.projectsLabel}
          </p>
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

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        {firstProject ? (
          <Reveal>
            <ProjectCard
              project={firstProject}
              priority
              variant="showcase"
            />
          </Reveal>
        ) : null}
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
      </div>
    </section>
  );
}
