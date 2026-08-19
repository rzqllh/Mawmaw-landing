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
    stiffness: 40,
    damping: 15,
    restDelta: 0.001,
  });

  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "20%"]
  );
  const imageScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.08, 1.0]
  );
  const imageOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.95, 0.5, 0.1]);

  const copyY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-12%"]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease },
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
      {/* BACKGROUND IMAGE WITH PARALLAX */}
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
          className="object-cover object-center saturate-[0.95] contrast-[1.04]"
        />
      </motion.div>

      {/* LUXURY WARM GRADIENT VIGNETTE OVERLAY (Ensures WCAG AAA contrast) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-900/65 via-forest-900/35 to-forest-900/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,190,66,0.08),transparent_55%)]"
      />

      {/* MAIN HERO CONTENT */}
      <div className="section-container relative z-10 flex min-h-dvh w-full flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12">
        {/* CENTER CONTENT */}
        <motion.div
          style={{ y: copyY }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="my-auto w-full max-w-3xl pt-8 sm:pt-12 will-change-transform"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            {/* EYEBROW / STUDIO TAG */}
            <motion.div
              variants={itemVariants}
              className="mb-5 sm:mb-7 flex flex-col items-start gap-1"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-stone-300 uppercase">
                STUDIO DESAIN INTERIOR
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-stone-300 uppercase">
                  JAKARTA
                </span>
                <span className="inline-block h-px w-10 sm:w-14 bg-stone-300/60" />
              </div>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[2.65rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.015em] text-[#FDFBF7] text-balance"
            >
              {settings.heroTitle || "Ruang yang mengerti cara Anda hidup."}
            </motion.h1>

            {/* SUBHEADLINE */}
            <motion.p
              variants={itemVariants}
              className="mt-5 sm:mt-7 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#E5DFD7]"
            >
              {settings.heroDescription ||
                "Desain interior yang personal, fungsional, dan mencerminkan siapa Anda."}
            </motion.p>

            {/* CTAS */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto"
            >
              {/* PRIMARY SPLIT PILL BUTTON */}
              <ConfirmWhatsappLink
                href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "Halo Mawmaw Interior, saya ingin konsultasi desain interior."
                )}`}
                className="group inline-flex w-full sm:w-auto items-center justify-between sm:justify-start rounded-full bg-[#13251B]/90 hover:bg-[#1A3326] border border-white/20 hover:border-gold-400/50 text-white shadow-xl backdrop-blur-md transition-all duration-300 min-h-[52px] pl-2 pr-6 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-gold-500/20 text-gold-300 transition-colors">
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    weight="bold"
                  />
                </span>
                <span className="mx-3.5 h-4 w-px bg-white/20" />
                <span className="text-sm sm:text-base font-semibold tracking-wide text-[#FDFBF7]">
                  Ceritakan Proyek Anda
                </span>
              </ConfirmWhatsappLink>

              {/* SECONDARY UNDERLINED LINK */}
              <Link
                href="#proyek"
                className="inline-flex items-center text-sm font-medium text-[#E2DCD5] hover:text-white underline underline-offset-8 decoration-white/35 hover:decoration-gold-400 transition-all py-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
              >
                Lihat Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* BOTTOM META BAR / PILLAR INDICATOR */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          className="relative z-10 w-full pt-8 sm:pt-10"
        >
          <div className="flex w-full items-end justify-between gap-4">
            {/* LEFT PILLAR TAG & MICRO-COPY */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-gold-300 leading-none">
                  01
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-bold text-stone-400 uppercase">
                  RESIDENTIAL
                </span>
                <span className="mt-1.5 h-6 sm:h-8 w-px bg-white/25" />
              </div>
              <p className="text-xs sm:text-sm text-[#D1C9BE] leading-relaxed max-w-[210px] sm:max-w-xs pt-0.5">
                Setiap ruang punya cerita. Kami hadir untuk merancangnya bersama Anda.
              </p>
            </div>

            {/* RIGHT CIRCULAR SCROLL DOWN BUTTON */}
            <div className="flex flex-col items-end gap-2">
              <Link
                href="#about"
                aria-label="Gulir ke tentang kami"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[#E2DCD5] hover:text-white hover:border-gold-400/60 hover:bg-white/15 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
              >
                <ArrowDown className="h-4 w-4 text-stone-300 animate-bounce" weight="regular" />
              </Link>
            </div>
          </div>

          {/* SLIDE PROGRESS BAR */}
          <div className="mt-4 flex h-0.5 w-20 sm:w-28 gap-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-2/5 rounded-full bg-gold-400" />
            <div className="h-full w-3/5 rounded-full bg-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
