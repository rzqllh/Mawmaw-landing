import Image from "next/image";

import type { Service } from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  if (service.image) {
    return (
      <article className="group relative min-h-[27rem] overflow-hidden rounded-[1.85rem] bg-forest-900 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:hover:translate-y-0">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="media-vignette absolute inset-0" />
        <div className="absolute inset-x-4 bottom-4">
          <div className="glass-dark rounded-[1.45rem] p-5 text-text-inverse md:p-6">
            <div className="mb-8 flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-surface text-forest-900 shadow-card">
                <IconGlyph
                  name={service.icon}
                  aria-hidden
                  className="h-6 w-6"
                  weight="duotone"
                />
              </span>
              <span className="text-xs font-extrabold tracking-[0.18em] text-text-inverse/72">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-serif text-3xl leading-none md:text-4xl">
              {service.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-text-inverse/76">
              {service.description}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-lg border border-forest-200/60 bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-soft motion-reduce:hover:translate-y-0">
      <div
        className={cn(
          "mb-7 flex h-12 w-12 items-center justify-center rounded-md bg-forest-50 text-forest-800 ring-1 ring-forest-100 transition",
          "group-hover:bg-forest-900 group-hover:text-gold-300"
        )}
      >
        <IconGlyph name={service.icon} aria-hidden className="h-6 w-6" weight="duotone" />
      </div>
      <h3 className="text-lg font-semibold text-forest-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {service.description}
      </p>
    </article>
  );
}
