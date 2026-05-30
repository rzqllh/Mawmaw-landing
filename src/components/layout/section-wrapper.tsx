import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function SectionWrapper({
  id,
  label,
  title,
  description,
  children,
  className,
  muted,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-y scroll-mt-28",
        muted ? "surface-section-muted" : "surface-section",
        className
      )}
    >
      <div className="section-container">
        {(label || title || description) && (
          <div className="mb-12 max-w-3xl md:mb-16">
            {label ? (
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-gold-700">
                {label}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-serif text-[clamp(2.35rem,5vw,4.8rem)] leading-[0.92] text-forest-900 text-balance">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
