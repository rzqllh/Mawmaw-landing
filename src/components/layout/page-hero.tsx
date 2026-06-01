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
        <p className="section-eyebrow">
          {label}
        </p>
        <h1 className="heading-page text-forest-900">
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
