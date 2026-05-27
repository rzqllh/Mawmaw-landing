"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { GlassCard } from "@/components/cards/glass-card";
import { HeroShader } from "@/components/effects/hero-shader";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollY,
    [0, 900],
    shouldReduceMotion ? [0, 0] : [-48, 128]
  );
  const imageScale = useTransform(
    scrollY,
    [0, 900],
    shouldReduceMotion ? [1, 1] : [1.12, 1.02]
  );
  const copyY = useTransform(
    scrollY,
    [0, 760],
    shouldReduceMotion ? [0, 0] : [0, -46]
  );
  const cardY = useTransform(
    scrollY,
    [0, 760],
    shouldReduceMotion ? [0, 0] : [0, -132]
  );
  const cardScale = useTransform(
    scrollY,
    [0, 760],
    shouldReduceMotion ? [1, 1] : [1, 0.96]
  );
  const shadeOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.96, 0.72]
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[84svh] overflow-hidden bg-forest-900 text-text-inverse md:min-h-[80svh]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-20 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </motion.div>
      <HeroShader />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,42,29,0.84)_0%,rgba(26,42,29,0.58)_44%,rgba(26,42,29,0.12)_100%)]"
        style={{ opacity: shadeOpacity }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-forest-900/72 to-transparent" />

      <div className="section-container relative z-10 flex min-h-[84svh] items-end pb-10 pt-32 md:min-h-[80svh] md:pb-14">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(19rem,0.38fr)] lg:items-end">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            style={{ y: copyY }}
            transition={{ duration: 0.8, ease }}
            className="max-w-4xl will-change-transform"
          >
            <h1 className="font-serif text-[clamp(2.6rem,6.2vw,5.8rem)] leading-[0.92] text-balance">
              {heroContent.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-text-inverse/82 md:text-lg">
              {heroContent.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverse">
                <Link href={heroContent.primaryCta.href}>
                  <WhatsappLogo aria-hidden className="h-5 w-5" weight="duotone" />
                  {heroContent.primaryCta.label}
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={heroContent.secondaryCta.href}>
                  {heroContent.secondaryCta.label}
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid max-w-sm gap-3 justify-self-start will-change-transform lg:justify-self-end"
            style={{ y: cardY, scale: cardScale }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
          >
            {heroContent.statCards.map((card, index) => (
              <GlassCard
                key={card.label}
                className={
                  index > 0
                    ? "hidden p-5 text-forest-900 sm:block"
                    : "flex items-center gap-4 p-4 text-forest-900 sm:block sm:p-5"
                }
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-forest-900 text-gold-300 sm:mb-4">
                  <IconGlyph
                    name={card.icon ?? "sparkle"}
                    aria-hidden
                    className="h-5 w-5"
                    weight="duotone"
                  />
                </div>
                <div>
                  <p className="font-serif text-3xl leading-none sm:text-4xl">
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:mt-2">
                    {card.label}
                  </p>
                  {card.description ? (
                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
