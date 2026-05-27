import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { featuredProjects, projectsSection } from "@/data/public-content";

export function FeaturedProjectsSection() {
  return (
    <SectionWrapper
      id="proyek"
      muted
      label={projectsSection.label}
      title={projectsSection.title}
      description={projectsSection.description}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {featuredProjects.slice(0, 3).map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button asChild variant="secondary" size="lg">
          <Link href="/projects">
            {projectsSection.cta}
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
