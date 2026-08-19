"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsappLogo, List, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { navItems } from "@/data/public-content";
import { SiteSetting } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { cn } from "@/lib/utils";
import { resolveInPageHref } from "@/lib/navigation";

const headerEase = [0.16, 1, 0.3, 1] as const;

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
              ? "bg-forest-900/35 border border-white/15 backdrop-blur-md text-[#FDFBF7]"
              : hasScrolled
                ? "bg-surface/85 border border-black/5 backdrop-blur-md shadow-glass text-forest-900"
                : isDarkSection
                  ? "bg-forest-900/80 border border-white/10 backdrop-blur-md text-text-inverse"
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

      {/* FULLSCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: headerEase }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl px-6 py-8 md:hidden"
          >
            <h2 id="mobile-navigation-title" className="sr-only">Menu navigasi</h2>
            <div className="flex items-center justify-between">
              <Link href="/" onClick={handleBrandClick} className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-pill bg-forest-700">
                  <Image src="/brand/mawmaw-icon.png" alt="" fill sizes="40px" className="object-contain p-1.5" />
                </span>
                <span className="truncate text-lg font-extrabold tracking-[-0.01em] text-forest-900">
                  Mawmaw.
                </span>
              </Link>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  mobileMenuTriggerRef.current?.focus();
                }}
                className="flex items-center justify-center rounded-full p-2 bg-surface shadow-sm border border-black/5 hover:bg-surface-warm transition-colors text-forest-900"
                aria-label="Tutup menu"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              {resolvedNav.map((item) => {
                const isActive = activeNavHref ? item.href.endsWith(activeNavHref) : false;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl font-cormorant font-semibold tracking-tight transition-colors",
                      isActive ? "text-forest-900" : "text-text-secondary"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pb-8">
              <Button asChild size="lg" variant="primary" radius="md" className="w-full text-base">
                <ConfirmWhatsappLink href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Mawmaw Interior, saya ingin konsultasi desain interior.")}`} className="group justify-center">
                  <WhatsappLogo aria-hidden className="h-5 w-5" weight="bold" />
                  Ceritakan Proyek Anda
                </ConfirmWhatsappLink>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
