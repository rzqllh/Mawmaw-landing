import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";

import type { Project } from "@/data/public-content";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  variant?: "default" | "showcase" | "portrait" | "wide";
  className?: string;
};

export function ProjectCard({
  project,
  priority,
  variant = "default",
  className,
}: ProjectCardProps) {
  if (variant !== "default") {
    return (
      <article
        className={cn(
          "group overflow-hidden rounded-[1.85rem] bg-forest-900 shadow-card transition duration-300  hover:shadow-soft motion-reduce:hover:translate-y-0",
          variant === "showcase" && "min-h-[31rem]",
          variant === "portrait" && "min-h-[31rem]",
          variant === "wide" && "min-h-[25rem]",
          className
        )}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="relative block h-full min-h-[inherit]"
        >
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes={
              variant === "portrait"
                ? "(min-width: 1024px) 32vw, 100vw"
                : "(min-width: 1024px) 68vw, 100vw"
            }
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="media-vignette absolute inset-0" />
          <div className="absolute left-5 top-5 rounded-pill border border-text-inverse/18 bg-text-inverse/18 px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-text-inverse backdrop-blur-lg">
            {project.category}
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5">
            <div className="max-w-xl text-text-inverse">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-inverse/70">
                <MapPin aria-hidden className="h-4 w-4 text-gold-300" weight="duotone" />
                {project.location} / {project.year}
              </p>
              <h3
                className={cn(
                  "font-serif leading-none text-balance",
                  variant === "portrait" ? "text-4xl" : "text-5xl md:text-6xl"
                )}
              >
                {project.title}
              </h3>
              {variant !== "portrait" ? (
                <p className="mt-4 max-w-xl text-sm leading-7 text-text-inverse/78">
                  {project.excerpt}
                </p>
              ) : null}
            </div>
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-pill bg-surface text-forest-900 shadow-card transition group-hover:-translate-y-1 group-hover:bg-gold-300 md:flex motion-reduce:group-hover:translate-y-0">
              <ArrowRight aria-hidden className="h-5 w-5 -rotate-45" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group overflow-hidden rounded-xl border border-forest-200/60 bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:hover:translate-y-0", className)}>
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
            Detail
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
