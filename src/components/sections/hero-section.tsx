"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";

import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { SiteSetting } from "@prisma/client";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ settings }: { settings: SiteSetting }) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"]
  );
  const imageScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.06, 1.0]
  );
  const imageOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.95, 0.45, 0.1]);

  const copyY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-10%"]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.0, ease },
    },
  };

  const heroImage =
    settings.heroImageSrc ||
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=85";

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden bg-forest-900 text-[#FDFBF7]"
    >
      {/* BACKGROUND IMAGE WITH SMOOTH PARALLAX */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform transform-gpu"
        style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src={heroImage}
          alt={settings.heroImageAlt || "Desain interior hunian elegan dan hangat oleh Mawmaw Interior"}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          placeholder={settings.heroImageBlur ? "blur" : "empty"}
          blurDataURL={settings.heroImageBlur || undefined}
          className="object-cover object-center saturate-[0.92] contrast-[1.03]"
        />
      </motion.div>

      {/* APPLE HIG / VIGNETTE GRADIENT (Ensures WCAG AAA contrast across mobile and desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/30 to-forest-900/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,190,66,0.06),transparent_60%)]"
      />

      {/* MAIN HERO CONTAINER (With safe-area padding top & bottom) */}
      <div className="section-container relative z-10 flex min-h-dvh w-full flex-col justify-between pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] sm:pt-32 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] sm:pb-10">
        {/* CENTER CONTENT */}
        <motion.div
          style={{ y: copyY }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="my-auto w-full max-w-3xl py-4 sm:py-8 will-change-transform"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            {/* EYEBROW / STUDIO TAG — R-31: real studio category + city, not decorative filler; wide tracking sets editorial eyebrow scale consistent with serif headline below */}
            <motion.div
              variants={itemVariants}
              className="mb-4 sm:mb-6 flex flex-col items-start gap-1"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-stone-300 uppercase">
                STUDIO DESAIN INTERIOR
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-stone-300 uppercase">
                  JAKARTA
                </span>
                <span className="inline-block h-px w-8 sm:w-12 bg-stone-300/50" />
              </div>
            </motion.div>

            {/* HEADLINE (Fluid clamp scaling + text-balance to prevent awkward 5-line wraps) */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[clamp(2.15rem,5.5vw,4.5rem)] leading-[1.12] sm:leading-[1.1] font-normal tracking-[-0.015em] text-[#FDFBF7] max-w-2xl text-balance"
            >
              {settings.heroTitle || "Ruang yang mengerti cara Anda hidup."}
            </motion.h1>

            {/* SUBHEADLINE (Human, anti-slop, clean readable line height) */}
            <motion.p
              variants={itemVariants}
              className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#E5DFD7]/90 text-pretty"
            >
              {settings.heroDescription ||
                "Desain interior yang personal, fungsional, dan mencerminkan siapa Anda."}
            </motion.p>

            {/* CTAS (Compact intrinsic width, 44px+ touch targets, tight ergonomic spacing) */}
            <motion.div
              variants={itemVariants}
              className="mt-7 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* PRIMARY COMPACT SPLIT-PILL CTA */}
              <ConfirmWhatsappLink
                href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "Halo Mawmaw Interior, saya ingin konsultasi desain interior."
                )}`}
                className="group inline-flex max-w-max items-center rounded-full bg-[#13251B]/95 hover:bg-[#1A3326] border border-white/20 hover:border-gold-400/50 text-white shadow-xl backdrop-blur-md transition-all duration-300 min-h-[48px] pl-1.5 pr-5 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 active:scale-[0.98]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-gold-500/20 text-gold-300 transition-colors">
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    weight="bold"
                  />
                </span>
                <span className="mx-3 h-4 w-px bg-white/20" />
                <span className="text-sm font-semibold tracking-wide text-[#FDFBF7]">
                  Ceritakan Proyek Anda
                </span>
              </ConfirmWhatsappLink>

              {/* SECONDARY UNDERLINED LINK */}
              <Link
                href="#proyek"
                className="inline-flex items-center text-sm font-medium text-[#E2DCD5] hover:text-white underline underline-offset-8 decoration-white/35 hover:decoration-gold-400 transition-all min-h-[44px] px-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 active:scale-[0.98]"
              >
                Lihat Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* BOTTOM META BAR (Clean Inline iOS Meta Strip per Decision 4) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease }}
          className="relative z-10 w-full pt-4"
        >
          <div className="flex w-full items-end justify-between gap-4">
            {/* LEFT MICRO-COPY */}
            <div className="flex flex-col items-start gap-1">
              <p className="text-xs sm:text-sm text-[#D1C9BE] leading-snug max-w-[240px] sm:max-w-md">
                Setiap ruang punya cerita. Kami hadir untuk merancangnya bersama Anda.
              </p>
            </div>

            {/* RIGHT CIRCULAR SCROLL DOWN BUTTON */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Link
                href="#tentang"
                aria-label="Gulir ke tentang kami"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#E2DCD5] hover:text-white hover:border-gold-400/60 hover:bg-white/15 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 active:scale-[0.95]"
              >
                <ArrowDown className="h-4 w-4 text-stone-300 animate-bounce" weight="regular" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
