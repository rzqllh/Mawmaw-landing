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
  compact?: boolean;
};

export function SectionWrapper({
  id,
  label,
  title,
  description,
  children,
  className,
  muted,
  compact,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "section-y-compact" : "section-y",
        "scroll-mt-0",
        muted ? "surface-section-muted" : "surface-section",
        className
      )}
    >
      <div className="section-container">
        {(label || title || description) && (
          <div className="mb-14 max-w-3xl">
            {label ? (
              <p className="section-eyebrow">
                {label}
              </p>
            ) : null}
            {title ? (
              <h2 className="heading-section text-forest-900">
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
