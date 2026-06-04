"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";

import { HeroShader } from "@/components/effects/hero-shader";
import { Button } from "@/components/ui/button";
import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { siteConfig } from "@/data/public-content"; // Only using siteConfig for WhatsApp fallback if needed
import { SiteSetting } from "@prisma/client";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ settings }: { settings: SiteSetting }) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the scroll progress for a more "liquid" parallax feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  // Background Image Parallax (Moves down slowly, scales down, fades out)
  const imageY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const imageScale = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.1, 1.0]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.45, 0.1, 0]);

  // Copy Panel Parallax (Moves up faster to create depth)
  const copyY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-15%"]);
  
  // Shader/Overlay fade
  const shadeOpacity = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.5, 0.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease } 
    }
  };

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      className="relative isolate min-h-svh overflow-hidden bg-black text-forest-900"
    >
      {/* Background Layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform transform-gpu"
        style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src={settings.heroImageSrc}
          alt={settings.heroImageAlt}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          placeholder={settings.heroImageBlur ? "blur" : "empty"}
          blurDataURL={settings.heroImageBlur || undefined}
          className="object-cover saturate-[0.85] contrast-[1.05]"
        />
      </motion.div>
      
      {/* Interactive Liquid Glass Shader Background */}
      <HeroShader />
      
      {/* Gradients for depth and blending */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,250,245,0.4)_0%,rgba(247,246,242,0.7)_60%,rgba(247,246,242,1.0)_100%)]"
        style={{ opacity: shadeOpacity }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/90 via-background/40 to-transparent"
      />
      <div 
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/60 to-transparent" 
      />

      {/* Content Layer */}
      <div className="section-container relative z-10 flex min-h-svh flex-col items-center justify-center px-4 pt-24 pb-20">
        <motion.div
          style={{ y: copyY }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 60, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="glass-panel group relative w-full max-w-[64rem] overflow-hidden rounded-[2.5rem] px-5 py-10 text-center will-change-transform sm:px-10 md:rounded-[3rem] md:py-14 lg:px-16 shadow-2xl shadow-forest-900/5"
        >
          {/* Liquid Glass Sweep Animation */}
          <motion.div 
            aria-hidden
            className="absolute inset-0 -translate-x-[150%] bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            animate={{ translateX: ['-150%', '250%'] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6 }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center"
          >
            <motion.p 
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-forest-900/10 bg-forest-900/5 px-4 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-forest-900 backdrop-blur-md transition-colors hover:bg-forest-900/10 sm:text-[0.7rem]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500/80"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500/50"></span>
              </span>
              Studio Desain Interior
            </motion.p>
            
            <motion.h1 
              variants={itemVariants}
              className="heading-hero mx-auto max-w-4xl text-forest-900 tracking-tight"
            >
              {settings.heroTitle}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg"
            >
              {settings.heroDescription}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
            >
              <Button asChild size="lg" variant="primary" radius="lg" className="w-full sm:w-auto px-8 transition-all">
                <ConfirmWhatsappLink href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Mawmaw Interior, saya ingin konsultasi desain interior.")}`} className="group">
                  <WhatsappLogo aria-hidden className="h-5 w-5" weight="regular" />
                  Mulai Konsultasi
                </ConfirmWhatsappLink>
              </Button>
              <Button asChild size="lg" variant="secondary" radius="lg" className="w-full sm:w-auto px-8 transition-all">
                <Link href="#proyek" className="group">
                  Lihat Portfolio
                  <ArrowRight aria-hidden className="h-5 w-5" weight="regular" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Absolute Bottom */}
      <motion.div 
        aria-hidden
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center opacity-70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease }}
      >
        <div className="flex h-[34px] w-[22px] justify-center rounded-full border-[1.5px] border-forest-900/30 p-1">
          <motion.div 
            className="h-1.5 w-1.5 rounded-full bg-forest-900/60"
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
