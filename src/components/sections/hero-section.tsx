"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";

import { Button } from "@/components/ui/button";
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
    restDelta: 0.001
  });

  const imageY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const imageScale = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.1, 1.0]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.5, 0.16, 0]);

  const copyY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-15%"]);

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
      className="relative isolate min-h-dvh overflow-hidden bg-background text-forest-900"
    >
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
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/72" />

      <div className="section-container relative z-10 flex min-h-dvh flex-col items-start justify-center pb-20 pt-28">
        <motion.div
          style={{ y: copyY }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 60, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative w-full max-w-4xl will-change-transform"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-start"
          >
            <motion.p 
              variants={itemVariants}
              className="section-eyebrow mb-6"
            >
              Studio Desain Interior
            </motion.p>
            
            <motion.h1 
              variants={itemVariants}
              className="heading-hero max-w-4xl tracking-tight text-forest-900"
            >
              {settings.heroTitle}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg"
            >
              {settings.heroDescription}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row"
            >
              <Button asChild size="lg" variant="primary" radius="lg" className="w-full sm:w-auto px-8 transition-all">
                <ConfirmWhatsappLink href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Mawmaw Interior, saya ingin konsultasi desain interior.")}`} className="group">
                  <WhatsappLogo aria-hidden className="h-5 w-5" weight="regular" />
                  Ceritakan Proyek Anda
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

    </section>
  );
}
