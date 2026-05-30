import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { featuredProjects, projectsSection } from "@/data/public-content";

export function FeaturedProjectsSection() {
  const [firstProject, secondProject, thirdProject] = featuredProjects;

  return (
    <section id="proyek" className="section-y surface-section-muted scroll-mt-28">
      <div className="section-container">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_auto] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-gold-700">
              {projectsSection.label}
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2.45rem,5vw,5rem)] leading-[0.92] text-forest-900 text-balance">
              {projectsSection.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
              {projectsSection.description}
            </p>
          </div>
          <Button asChild variant="secondary" size="lg" className="w-fit justify-self-start lg:justify-self-end">
            <Link href="/projects">
              {projectsSection.cta}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </Button>
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
