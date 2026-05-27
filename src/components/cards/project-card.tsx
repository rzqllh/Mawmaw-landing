import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";

import type { Project } from "@/data/public-content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-forest-200/60 bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:hover:translate-y-0">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-background-muted">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute left-4 top-4 rounded-pill bg-surface/82 px-3 py-1 text-xs font-semibold text-forest-900 backdrop-blur-md">
            {project.category}
          </div>
        </div>
        <div className="p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-muted">
            <MapPin aria-hidden className="h-4 w-4 text-gold-700" weight="duotone" />
            {project.location}
          </div>
          <h3 className="text-xl font-semibold text-forest-900">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            {project.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
            Lihat detail
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
