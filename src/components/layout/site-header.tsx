"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
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
  const showLiquidHeader = true;
  const showHeaderActions = pathname !== "/" || isPastHero;
  const activeNavHref = pathname.startsWith("/projects")
    ? "#proyek"
    : pathname.startsWith("/articles")
      ? "#artikel"
      : activeSectionHref;
  const headerTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: headerEase };

  const resolvedNav = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href: resolveInPageHref(item.href, pathname),
      })),
    [pathname]
  );

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "/");
  }

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
            "glass-nav mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-2 rounded-pill px-3 py-2 text-forest-900 transition duration-300 ease-out md:px-4",
            hasScrolled && "shadow-glass"
          )}
          transition={headerTransition}
        >
          {/* LEFT: BRAND */}
          <Link
            href="/"
            aria-label={`${settings.siteName} beranda`}
            onClick={handleBrandClick}
            className="flex min-w-0 shrink-0 items-center gap-3 rounded-pill pr-2 transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
          >
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-pill bg-forest-700">
              <Image
                src="/brand/mawmaw-icon.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain p-1.5"
              />
            </span>
            <span className="truncate text-sm font-extrabold tracking-[-0.01em]">
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
                        "relative rounded-pill px-2 py-2 md:px-3 text-[0.8rem] lg:text-sm font-semibold text-text-secondary transition hover:bg-surface/75 hover:text-forest-900 whitespace-nowrap",
                        isActive && "text-forest-900"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-t-full bg-forest-900 transition-all duration-300 ease-out",
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
                    Konsultasi
                  </ConfirmWhatsappLink>
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
