"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

import { ConfirmWhatsappLink } from "@/components/ui/confirm-whatsapp-link";
import { IconGlyph, type IconName } from "@/lib/icons";
import { resolveInPageHref } from "@/lib/navigation";
import { SiteSetting } from "@prisma/client";
import { cn } from "@/lib/utils";

type DockItem = {
  label: string;
  href: string;
  icon: IconName;
  activeHref?: string;
  scrollTop?: boolean;
};

const dockItems: DockItem[] = [
  {
    label: "Top",
    href: "#home-hero",
    activeHref: "/",
    icon: "house",
    scrollTop: true,
  },
  { label: "Layanan", href: "#layanan", icon: "ruler" },
  { label: "Proyek", href: "#proyek", icon: "notebook" },
  { label: "Kontak", href: "#kontak", icon: "chat" },
];

export function MobileDock({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [activeSectionHref, setActiveSectionHref] = useState<string | null>(
    "/"
  );
  const [isDockCompact, setIsDockCompact] = useState(false);
  const activeHref = pathname === "/" ? activeSectionHref : null;

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frame = 0;
    const sectionIds = dockItems
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    const updateActiveHref = () => {
      frame = 0;

      const hero = document.getElementById("home-hero");

      if (
        hero &&
        hero.getBoundingClientRect().bottom > window.innerHeight * 0.35
      ) {
        setActiveSectionHref("/");
        return;
      }

      const current = sectionIds.reduce<string | null>((active, id) => {
        if (id === "home-hero") return active;

        const section = document.getElementById(id);
        if (!section) return active;

        const rect = section.getBoundingClientRect();
        const entersViewport = rect.top <= window.innerHeight * 0.58;
        const stillVisible = rect.bottom >= window.innerHeight * 0.24;

        return entersViewport && stillVisible ? `#${id}` : active;
      }, null);

      setActiveSectionHref(current);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveHref);
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

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let frame = 0;
    let resetFrame = 0;
    let idleTimer: number | null = null;
    let lastScrollY = window.scrollY;

    const revealDock = () => {
      setIsDockCompact(false);
    };

    const updateDockVisibility = () => {
      frame = 0;

      const nextScrollY = window.scrollY;
      const delta = nextScrollY - lastScrollY;

      if (nextScrollY > 220 && delta > 8) {
        setIsDockCompact(true);
      }

      if (delta < -6 || nextScrollY < 160) {
        setIsDockCompact(false);
      }

      lastScrollY = nextScrollY;

      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }

      idleTimer = window.setTimeout(revealDock, 900);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateDockVisibility);
    };

    resetFrame = window.requestAnimationFrame(revealDock);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", revealDock);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", revealDock);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (resetFrame) {
        window.cancelAnimationFrame(resetFrame);
      }
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
    };
  }, [pathname, shouldReduceMotion]);

  function handleTopAction() {
    setActiveSectionHref("/");
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "/");
  }

  return (
    <nav
      aria-label="Dock navigasi seluler"
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 px-3 pb-[env(safe-area-inset-bottom)] transition duration-300 ease-out hover:translate-y-0 hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 motion-reduce:transition-none md:hidden",
        isDockCompact && !shouldReduceMotion
          ? "translate-y-9 opacity-60"
          : "translate-y-0 opacity-100"
      )}
      onPointerDown={() => setIsDockCompact(false)}
    >
      <div className="mx-auto grid h-16 max-w-[22rem] grid-cols-[1fr_1fr_3.5rem_1fr_1fr] items-center gap-1.5 rounded-[2.5rem] clear-liquid-nav px-2">
        {dockItems.slice(0, 2).map((item) => (
          item.scrollTop && pathname === "/" ? (
            <DockButton
              key={item.label}
              item={item}
              active={activeHref === (item.activeHref ?? item.href)}
              onClick={handleTopAction}
            />
          ) : (
            <DockLink
              key={item.label}
              item={item}
              href={resolveInPageHref(item.href, pathname)}
              active={activeHref === (item.activeHref ?? item.href)}
            />
          )
        ))}

        <ConfirmWhatsappLink
          href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Mawmaw Interior, saya ingin konsultasi desain interior.")}`}
          aria-label="Konsultasi via WhatsApp"
          className="group grid h-[3.25rem] w-[3.25rem] place-items-center justify-self-center rounded-full bg-forest-900 text-gold-300 shadow-xl shadow-forest-900/20 ring-2 ring-white/50 transition duration-300 hover:bg-forest-800 hover:shadow-forest-900/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
        >
          <IconGlyph
            name="whatsapp"
            aria-hidden
            className="h-6 w-6 text-gold-300 transition-colors duration-300"
            weight="fill"
          />
        </ConfirmWhatsappLink>

        {dockItems.slice(2).map((item) => (
          <DockLink
            key={item.label}
            item={item}
            href={resolveInPageHref(item.href, pathname)}
            active={activeHref === (item.activeHref ?? item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

function DockLink({
  item,
  href,
  active,
}: {
  item: DockItem;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "location" : undefined}
      className={dockControlClassName(active)}
    >
      <DockActiveMark active={active} />
      <IconGlyph
        name={item.icon}
        aria-hidden
        className={dockIconClassName(active)}
        weight={active ? "fill" : "duotone"}
      />
      <span className={dockLabelClassName(active)}>
        {item.label}
      </span>
    </Link>
  );
}

function DockButton({
  item,
  active,
  onClick,
}: {
  item: DockItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "location" : undefined}
      className={dockControlClassName(active)}
      onClick={onClick}
    >
      <DockActiveMark active={active} />
      <IconGlyph
        name={item.icon}
        aria-hidden
        className={dockIconClassName(active)}
        weight={active ? "fill" : "duotone"}
      />
      <span className={dockLabelClassName(active)}>
        {item.label}
      </span>
    </button>
  );
}

function DockActiveMark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-x-3 -bottom-1 h-[2px] origin-center rounded-t-full bg-forest-900 transition-all duration-300 ease-out",
        active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
      )}
    />
  );
}

function dockIconClassName(active: boolean) {
  return cn(
    "h-4 w-4 transition-all duration-300",
    active ? "text-forest-900 scale-110" : "text-forest-900/60"
  );
}

function dockLabelClassName(active: boolean) {
  return cn(
    "text-[0.65rem] font-bold tracking-tight leading-none transition-all duration-300 mt-1",
    active ? "text-forest-900" : "text-forest-900/60"
  );
}

function dockControlClassName(active: boolean) {
  return cn(
    "relative flex min-h-12 min-w-0 flex-col items-center justify-center rounded-[1.25rem] px-1 py-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500",
    active
      ? "bg-surface/60"
      : "hover:bg-surface/40"
  );
}
