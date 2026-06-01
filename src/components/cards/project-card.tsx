import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";

import type { Project } from "@/data/public-content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  variant?: "default" | "showcase" | "portrait" | "wide" | "compact";
  className?: string;
};

export function ProjectCard({
  project,
  priority,
  variant = "default",
  className,
}: ProjectCardProps) {
  if (variant !== "default" && variant !== "compact") {
    return (
      <article
        className={cn(
          "group overflow-hidden rounded-[var(--radius-card)] bg-forest-900 shadow-card ring-1 ring-white/30 card-lift",
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
            className="object-cover img-zoom"
          />
          <div className="media-vignette absolute inset-0" />
          <Badge variant="overlay" className="absolute left-5 top-5">
            {project.category}
          </Badge>
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
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-pill bg-surface text-forest-900 shadow-card transition group-hover:bg-gold-300 md:flex">
              <ArrowRight aria-hidden className="h-5 w-5 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("glass-surface group overflow-hidden rounded-[var(--radius-card)] card-lift", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className={cn("relative overflow-hidden bg-background-muted", variant === "compact" ? "aspect-video" : "aspect-[4/3]")}>
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover img-zoom"
          />
          <Badge className="absolute left-4 top-4 bg-surface/82 text-forest-900 ring-0 backdrop-blur-md hover:bg-surface/82 hover:text-forest-900">
            {project.category}
          </Badge>
        </div>
        <div className={cn("p-5", variant === "compact" ? "md:p-5" : "md:p-6")}>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-muted">
            <MapPin aria-hidden className="h-4 w-4 text-gold-700" weight="duotone" />
            {project.location}
          </div>
          <h3 className={cn("font-semibold text-forest-900", variant === "compact" ? "text-lg" : "text-xl")}>{project.title}</h3>
          {variant !== "compact" && (
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {project.excerpt}
            </p>
          )}
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
            Detail
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
