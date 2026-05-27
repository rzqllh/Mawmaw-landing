import type { Service } from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group rounded-lg border border-forest-200/60 bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-soft motion-reduce:hover:translate-y-0">
      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-md bg-forest-50 text-forest-800 ring-1 ring-forest-100 transition group-hover:bg-forest-900 group-hover:text-gold-300">
        <IconGlyph name={service.icon} aria-hidden className="h-6 w-6" weight="duotone" />
      </div>
      <h3 className="text-lg font-semibold text-forest-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {service.description}
      </p>
    </article>
  );
}
