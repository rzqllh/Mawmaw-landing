import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { IconGlyph, IconName } from "@/lib/icons";
import { getSiteSettings } from "@/lib/queries";

export async function AboutSection() {
  const settings = await getSiteSettings();
  const aboutValues = settings.aboutValues as { title: string, description: string, icon: string }[];

  return (
    <section id="tentang" className="surface-section-muted relative flex min-h-dvh scroll-mt-24 flex-col justify-center py-20 md:py-24">
      <div className="section-container relative z-10 flex w-full flex-col justify-center">

        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <Reveal className="relative h-[50dvh] min-h-80 w-full shrink-0 overflow-hidden rounded-2xl border border-forest-900/10 lg:h-[70dvh] lg:max-h-[700px] lg:w-[45%]">
            <Image
              src={settings.aboutImageSrc}
              alt={settings.aboutImageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder={settings.aboutImageBlur ? "blur" : "empty"}
              blurDataURL={settings.aboutImageBlur || undefined}
              className="object-cover saturate-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </Reveal>

          <div className="flex h-auto w-full flex-col justify-center pb-4 pr-2 lg:w-[55%] lg:pb-0">
            <Reveal delay={0.1} className="shrink-0">
              <p className="text-[0.65rem] lg:text-[0.75rem] font-bold tracking-[0.2em] uppercase text-gold-700 mb-3">
                {settings.aboutLabel}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] leading-[0.9] text-forest-900 tracking-tight text-balance">
                {settings.aboutTitle}
              </h2>
              <div className="mt-5 h-px w-12 bg-gold-500/80" />
              <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-text-secondary text-pretty">
                {settings.aboutDescription}
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap lg:flex-nowrap gap-4 shrink-0">
              {(settings.heroStatCards as { label: string; value: string; icon?: IconName }[]).map((card, i) => (
                <Reveal key={card.label} delay={0.2 + (i * 0.1)} className="flex-1 min-w-[160px]">
                  <div className="flex items-center gap-4 border-t border-forest-900/15 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-forest-800">
                      <IconGlyph name={card.icon ?? "sparkle"} className="h-6 w-6" weight="duotone" />
                    </span>
                    <div>
                      <span className="block font-serif text-3xl leading-none text-forest-900">
                        {card.value}
                      </span>
                      <span className="block text-[0.65rem] font-extrabold uppercase tracking-widest text-forest-900/50 mt-1">
                        {card.label}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 shrink-0">
              {aboutValues.map((value, i) => (
                <Reveal key={value.title} delay={0.4 + (i * 0.1)}>
                  <div className="border-t border-forest-900/10 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center text-gold-700">
                        <IconGlyph name={(value.icon as IconName) || "heart"} className="h-3.5 w-3.5" weight="fill" />
                      </div>
                      <h3 className="font-semibold text-sm text-forest-900">{value.title}</h3>
                    </div>
                    <p className="text-[0.75rem] sm:text-xs leading-relaxed text-text-secondary/80 line-clamp-2 lg:line-clamp-none">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
