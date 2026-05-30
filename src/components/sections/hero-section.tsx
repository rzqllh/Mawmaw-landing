"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { HeroShader } from "@/components/effects/hero-shader";
import { Button } from "@/components/ui/button";
import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { heroContent } from "@/data/public-content";

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
    [0, 1000],
    shouldReduceMotion ? [0, 0] : [-44, 56]
  );
  const imageScale = useTransform(
    scrollY,
    [0, 1000],
    shouldReduceMotion ? [1, 1] : [1.06, 1.02]
  );
  const copyY = useTransform(
    scrollY,
    [0, 820],
    shouldReduceMotion ? [0, 0] : [0, -24]
  );
  const shadeOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.72, 0.48]
  );

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      className="relative isolate min-h-[94svh] overflow-hidden bg-background text-forest-900"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-16 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.42] saturate-[0.82]"
        />
      </motion.div>
      <HeroShader />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,246,242,0.78)_0%,rgba(247,246,242,0.88)_58%,rgba(247,246,242,1)_100%)]"
        style={{ opacity: shadeOpacity }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-background via-background/72 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent" />

      <div className="section-container relative z-10 flex min-h-[94svh] items-center pb-14 pt-28 md:pb-16 md:pt-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          style={{ y: copyY }}
          transition={{ duration: 0.8, ease }}
          className="liquid-panel mx-auto w-full max-w-6xl rounded-[2rem] px-5 py-12 text-center will-change-transform sm:px-8 md:rounded-[2.5rem] md:py-16 lg:px-14"
        >
          <p className="mx-auto mb-7 inline-flex rounded-pill border border-forest-200/70 bg-surface/70 px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-forest-900 shadow-card">
            Studio Desain Interior
          </p>
          <h1 className="mx-auto max-w-5xl font-serif text-[clamp(2.65rem,6.2vw,5.9rem)] leading-[0.9] text-balance">
            {heroContent.title}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
            {heroContent.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <ConfirmWhatsappLink href={heroContent.primaryCta.href}>
                <WhatsappLogo aria-hidden className="h-5 w-5" weight="duotone" />
                {heroContent.primaryCta.label}
              </ConfirmWhatsappLink>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
                <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-9 flex w-px flex-col items-center">
            <span className="mb-3 text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-forest-900/70">
              Scroll
            </span>
            <span className="h-12 w-px bg-forest-900/22" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
