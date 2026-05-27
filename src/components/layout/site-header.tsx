"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, List, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { heroContent, navItems, siteConfig } from "@/data/public-content";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";

function resolveHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;

  return pathname === "/" ? href : `/${href}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const resolvedNav = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href: resolveHref(item.href, pathname),
      })),
    [pathname]
  );

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-5">
      <div className="section-container px-0">
        <div className="glass-strong mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-pill px-3 py-2 shadow-glass md:px-4">
          <Link
            href="/"
            aria-label={`${siteConfig.name} beranda`}
            className="flex min-w-0 items-center gap-3 rounded-pill pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
          >
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-pill bg-forest-900">
              <Image
                src="/brand/mawmaw-icon.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain p-1.5"
              />
            </span>
            <span className="truncate text-sm font-bold text-forest-900">
              Mawmaw Interior
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {resolvedNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-pill px-3 py-2 text-sm font-semibold text-forest-900/82 transition hover:bg-surface/75 hover:text-forest-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/projects">
                Lihat Portfolio
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={heroContent.primaryCta.href}>
                <WhatsappLogo aria-hidden className="h-4 w-4" weight="duotone" />
                Konsultasi via WhatsApp
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-forest-900 hover:bg-surface lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <List aria-hidden className="h-6 w-6" weight="bold" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        navItems={resolvedNav}
        primaryHref={heroContent.primaryCta.href}
        portfolioHref={heroContent.secondaryCta.href}
      />
    </header>
  );
}
