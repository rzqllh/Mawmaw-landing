import Image from "next/image";

import { GlassCard } from "@/components/cards/glass-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { featuredProjects } from "@/data/public-content";
import { IconGlyph, IconName } from "@/lib/icons";
import { getSiteSettings } from "@/lib/queries";

export async function AboutSection() {
  const settings = await getSiteSettings();
  const aboutValues = settings.aboutValues as { title: string, description: string, icon: string }[];
  const insetImage =
    featuredProjects[0]?.gallery[0] ?? featuredProjects[0]?.coverImage;

  return (
    <SectionWrapper id="tentang" muted compact>
      <div className="grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-20">
        <div className="relative max-w-2xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface/60 shadow-soft md:aspect-[4/3] lg:aspect-[1/1]">
            <Image
              src={settings.aboutImageSrc}
              alt={settings.aboutImageAlt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              placeholder={settings.aboutImageBlur ? "blur" : "empty"}
              blurDataURL={settings.aboutImageBlur || undefined}
              className="object-cover"
            />
          </div>
          {insetImage ? (
            <div className="glass-surface absolute -bottom-6 right-4 w-[48%] rounded-[1.65rem] p-2 shadow-glass md:right-8 lg:-bottom-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
                <Image
                  src={insetImage.src}
                  alt={insetImage.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
          {settings.aboutBadgeTitle || settings.aboutBadgeDesc ? (
            <GlassCard className="absolute left-4 top-4 max-w-[15rem] p-4 md:left-6 md:top-6">
              {settings.aboutBadgeTitle && (
                <p className="text-sm font-semibold text-forest-900">
                  {settings.aboutBadgeTitle}
                </p>
              )}
              {settings.aboutBadgeDesc && (
                <p className="mt-2 text-xs leading-6 text-text-secondary">
                  {settings.aboutBadgeDesc}
                </p>
              )}
            </GlassCard>
          ) : null}
        </div>

        <div className="pt-8 lg:pt-0">
          <p className="section-eyebrow">
            {settings.aboutLabel}
          </p>
          <h2 className="heading-section max-w-3xl text-forest-900">
            {settings.aboutTitle}
          </h2>
          <div className="mt-6 h-px w-14 bg-gold-500" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {settings.aboutDescription}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(settings.heroStatCards as { label: string; value: string; icon?: IconName }[]).map((card) => (
              <div
                key={card.label}
                className="glass-surface flex items-center gap-4 rounded-xl p-3 lg:p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-forest-900 text-gold-300">
                  <IconGlyph
                    name={card.icon ?? "sparkle"}
                    aria-hidden
                    className="h-5 w-5"
                    weight="duotone"
                  />
                </span>
                <span>
                  <span className="block font-serif text-3xl leading-none text-forest-900">
                    {card.value}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-forest-900">
                    {card.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {aboutValues.map((value) => (
              <div
                key={value.title}
                className="border-t border-forest-200/70 pt-4"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-pill bg-forest-50 text-forest-800 ring-1 ring-forest-100">
                  <IconGlyph name={(value.icon as IconName) || "heart"} aria-hidden className="h-4 w-4" weight="duotone" />
                </div>
                <h3 className="font-semibold text-forest-900">{value.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
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
