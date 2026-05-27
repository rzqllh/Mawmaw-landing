import Image from "next/image";

import { GlassCard } from "@/components/cards/glass-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { aboutContent } from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";

export function AboutSection() {
  return (
    <SectionWrapper id="tentang" muted className="!pt-10 md:!pt-14">
      <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-background shadow-soft md:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={aboutContent.image.src}
              alt={aboutContent.image.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          {aboutContent.badge ? (
            <GlassCard className="absolute bottom-5 left-5 max-w-[17rem] p-5">
              <p className="text-sm font-semibold text-forest-900">
                {aboutContent.badge.title}
              </p>
              <p className="mt-2 text-xs leading-6 text-text-secondary">
                {aboutContent.badge.description}
              </p>
            </GlassCard>
          ) : null}
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-gold-700">
            {aboutContent.label}
          </p>
          <h2 className="font-serif text-[clamp(2.35rem,5vw,4.8rem)] leading-[0.95] text-forest-900 text-balance">
            {aboutContent.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
            {aboutContent.description}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutContent.values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-forest-200/60 bg-surface/78 p-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-pill bg-forest-50 text-forest-800">
                  <IconGlyph name={value.icon} aria-hidden className="h-5 w-5" weight="duotone" />
                </div>
                <h3 className="font-semibold text-forest-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
