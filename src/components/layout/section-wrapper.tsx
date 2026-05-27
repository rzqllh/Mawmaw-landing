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
      className={cn("section-y scroll-mt-28", muted && "bg-background-muted", className)}
    >
      <div className="section-container">
        {(label || title || description) && (
          <div className="mb-10 max-w-3xl md:mb-14">
            {label ? (
              <p className="mb-4 text-sm font-semibold uppercase text-gold-700">
                {label}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] text-forest-900 text-balance">
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
