"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsappLogo, List, X, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { navItems } from "@/data/public-content";
import { SiteSetting } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { cn } from "@/lib/utils";
import { resolveInPageHref } from "@/lib/navigation";

const headerEase = [0.16, 1, 0.3, 1] as const;

const menuOverlayVariants = {
  closed: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: headerEase },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: headerEase,
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: headerEase },
  },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: headerEase },
  },
};

export function SiteHeader({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const showLiquidHeader = true;
  const showHeaderActions = pathname !== "/" || isPastHero;
  const activeNavHref = pathname.startsWith("/projects")
    ? "#proyek"
    : pathname.startsWith("/articles")
      ? "#artikel"
      : activeSectionHref;
      
  // Ketika di hero section atau di seksi kontak, header bergaya dark frosted glass agar teks dan aksen terlihat kontras sempurna.
  const isDarkHero = pathname === "/" && !isPastHero;
  const isDarkSection = activeSectionHref === "#kontak" || isDarkHero;

  const headerTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: headerEase };

  const resolvedNav = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href: resolveInPageHref(item.href),
      })),
    []
  );

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "/");
    setIsMobileMenuOpen(false);
  }

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    mobileMenuCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frame = 0;
    const sectionIds = navItems
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    const updateHeaderActions = () => {
      frame = 0;
      setHasScrolled(window.scrollY > 4);
      const hero = document.getElementById("home-hero");

      if (!hero) {
        setIsPastHero(true);
      } else {
        setIsPastHero(hero.getBoundingClientRect().bottom <= 112);
      }

      const activeSection = sectionIds.reduce<string | null>((active, id) => {
        const section = document.getElementById(id);
        if (!section) return active;

        const rect = section.getBoundingClientRect();
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
        
        // Section is active if its top edge has reached the header area (approx 112px from top)
        // OR if we are at the bottom of the page and this is the last section in the array
        const isActiveArea = (rect.top <= 120 && rect.bottom > 120) || 
                             (isAtBottom && id === sectionIds[sectionIds.length - 1]);

        return isActiveArea ? `#${id}` : active;
      }, null);

      setActiveSectionHref(activeSection);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeaderActions);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-5">
      <div className="section-container px-0">
        <motion.div
          layout
          data-header-state={showLiquidHeader ? "glass" : "hero"}
          className={cn(
            "mx-auto flex min-h-14 md:min-h-16 max-w-6xl items-center justify-between gap-2 rounded-pill px-3 py-2 transition-all duration-300 ease-out md:px-4",
            isDarkHero
              ? hasScrolled
                ? "bg-black/30 border border-white/15 backdrop-blur-2xl text-[#FDFBF7] shadow-glass"
                : "bg-transparent border border-transparent text-[#FDFBF7]"
              : hasScrolled
                ? "bg-surface/85 border border-black/5 backdrop-blur-2xl shadow-glass text-forest-900"
                : isDarkSection
                  ? "bg-forest-900/80 border border-white/10 backdrop-blur-2xl text-text-inverse"
                  : "bg-surface/60 border border-transparent backdrop-blur-sm text-forest-900"
          )}
          transition={headerTransition}
        >
          {/* LEFT: BRAND */}
          <Link
            href="/"
            aria-label={`${settings.siteName} beranda`}
            onClick={handleBrandClick}
            className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3 rounded-pill pr-2 transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
          >
            <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-pill bg-forest-700/90 border border-white/20">
              <Image
                src="/brand/mawmaw-icon.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain p-1.5"
              />
            </span>
            <span className="truncate font-serif text-lg sm:text-xl font-semibold tracking-tight">
              Mawmaw.
            </span>
          </Link>

          {/* CENTER: NAV */}
          <motion.nav
            layout
            aria-label="Navigasi utama"
            className={cn(
              "hidden flex-1 min-w-0 md:flex items-center px-4",
              showHeaderActions ? "justify-center" : "justify-end"
            )}
            transition={headerTransition}
          >
            <motion.ul
              layout
              className="flex items-center gap-1 xl:gap-2"
              transition={headerTransition}
            >
              {resolvedNav.map((item) => {
                const isActive = activeNavHref
                  ? item.href.endsWith(activeNavHref)
                  : false;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative rounded-pill px-2 py-2 md:px-3 text-[0.8rem] lg:text-sm font-semibold transition-colors hover:bg-surface/75 hover:text-forest-900 whitespace-nowrap",
                        isDarkSection ? "text-text-inverse/70" : "text-text-secondary",
                        isActive && (isDarkSection ? "text-text-inverse" : "text-forest-900")
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-t-full transition-all duration-300 ease-out",
                          isDarkSection ? "bg-text-inverse" : "bg-forest-900",
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          </motion.nav>

          {/* RIGHT: ACTIONS */}
          <AnimatePresence initial={false} mode="popLayout">
            {showHeaderActions ? (
              <motion.div
                key="header-actions"
                data-header-actions
                layout
                className="hidden shrink-0 items-center gap-2 md:flex"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 16, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 16, filter: "blur(4px)" }
                }
                transition={headerTransition}
              >
                <Button asChild size="sm" variant="primary" radius="md" className="transition-all">
                  <ConfirmWhatsappLink href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Mawmaw Interior, saya ingin konsultasi desain interior.")}`} className="group">
                    <WhatsappLogo
                      aria-hidden
                      className="h-4 w-4"
                      weight="bold"
                    />
                    Konsultasi Proyek
                  </ConfirmWhatsappLink>
                </Button>
              </motion.div>
            ) : null}
            
            {/* MOBILE MENU TOGGLE */}
            <motion.button
              ref={mobileMenuTriggerRef}
              layout
              key="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "flex items-center justify-center rounded-full p-2 md:hidden transition-colors min-h-[44px] min-w-[44px]",
                isDarkSection ? "text-[#FDFBF7] hover:bg-white/10" : "text-forest-900 hover:bg-forest-900/5"
              )}
              aria-label="Buka menu"
              aria-controls="mobile-navigation-dialog"
              aria-expanded={isMobileMenuOpen}
            >
              <List aria-hidden="true" className="h-6 w-6" />
            </motion.button>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULLSCREEN LUXURY EDITORIAL MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            variants={shouldReduceMotion ? undefined : menuOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-[#0A1610]/98 backdrop-blur-3xl px-6 sm:px-8 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] text-[#FDFBF7] md:hidden"
          >
            {/* WARM AMBIENT GLOW ACCENTS */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold-400/[0.08] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-12 -left-20 h-72 w-72 rounded-full bg-forest-700/25 blur-3xl"
            />

            <h2 id="mobile-navigation-title" className="sr-only">Menu navigasi</h2>

            {/* TOP HEADER */}
            <div className="relative z-10 flex items-center justify-between">
              <Link
                href="/"
                onClick={handleBrandClick}
                className="flex items-center gap-3 rounded-pill focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
              >
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-pill bg-forest-700/90 border border-white/20">
                  <Image src="/brand/mawmaw-icon.png" alt="" fill sizes="40px" className="object-contain p-1.5" />
                </span>
                <span className="truncate font-serif text-xl font-bold tracking-tight text-[#FDFBF7]">
                  Mawmaw.
                </span>
              </Link>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  mobileMenuTriggerRef.current?.focus();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#FDFBF7] hover:bg-white/20 hover:border-gold-400/50 transition-all active:scale-95 shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
                aria-label="Tutup menu"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {/* STAGGERED NUMBERED EDITORIAL NAVIGATION */}
            <motion.nav className="relative z-10 my-auto flex flex-col gap-4 py-8">
              {resolvedNav.map((item, index) => {
                const isActive = activeNavHref ? item.href.endsWith(activeNavHref) : false;
                const itemNumber = String(index + 1).padStart(2, "0");
                return (
                  <motion.div key={item.href} variants={shouldReduceMotion ? undefined : menuItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-baseline justify-between border-b border-white/[0.08] pb-3.5 pt-1 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif text-xs font-semibold tracking-wider text-gold-300/80">
                          {itemNumber}
                        </span>
                        <span
                          className={cn(
                            "font-serif text-3xl sm:text-4xl font-normal tracking-tight transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold-300",
                            isActive ? "text-[#FDFBF7] font-medium" : "text-[#E2DCD5]/80"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-gold-300 group-hover:translate-x-1"
                        weight="bold"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* FOOTER & CTA */}
            <motion.div
              variants={shouldReduceMotion ? undefined : menuItemVariants}
              className="relative z-10 flex flex-col gap-4 pt-2"
            >
              <div className="flex flex-col gap-0.5 border-t border-white/[0.08] pt-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400 font-semibold">
                  STUDIO DESAIN INTERIOR
                </span>
                <span className="text-xs text-[#D1C9BE] leading-relaxed">
                  {settings.address || "Jakarta, Indonesia"} • {settings.email}
                </span>
              </div>

              <ConfirmWhatsappLink
                href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "Halo Mawmaw Interior, saya ingin konsultasi desain interior."
                )}`}
                className="group inline-flex w-full items-center justify-center rounded-full bg-[#13251B] hover:bg-[#1A3326] border border-white/20 hover:border-gold-400/50 text-white shadow-xl backdrop-blur-md transition-all duration-300 min-h-[50px] px-6 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 active:scale-[0.98]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-gold-500/20 text-gold-300 transition-colors mr-3">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" weight="bold" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-[#FDFBF7]">
                  Ceritakan Proyek Anda
                </span>
              </ConfirmWhatsappLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
