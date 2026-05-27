import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  label,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("section-container pt-32 md:pt-40", className)}>
      <div className="max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase text-gold-700">
          {label}
        </p>
        <h1 className="font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9] text-forest-900 text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
          {description}
        </p>
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
