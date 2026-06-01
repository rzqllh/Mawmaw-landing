"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  footerContent,
  navItems,
  services,
  siteConfig,
} from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram, icon: "instagram" },
  { label: "Pinterest", href: siteConfig.socials.pinterest, icon: "pinterest" },
  { label: "Behance", href: siteConfig.socials.behance, icon: "behance" },
];

function normalizeHref(href: string) {
  if (href.startsWith("/")) return href;
  if (href.startsWith("#")) return `/${href}`;
  return `/${href}`;
}

function normalizeTelHref(phone?: string) {
  if (!phone) return "#kontak";

  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "#kontak";
}

function externalLinkProps(href?: string) {
  if (!href?.startsWith("http")) return {};

  return {
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

export function SiteFooter() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <footer className={cn(
      "relative isolate overflow-hidden bg-forest-900 text-text-inverse",
      !isLanding && "rounded-t-[2.5rem] mt-8 shadow-[0_-20px_40px_rgba(4,12,8,0.05)]"
    )}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(212,190,66,0.14),transparent_28rem),radial-gradient(circle_at_82%_28%,rgba(78,114,88,0.18),transparent_34rem),linear-gradient(180deg,#112019_0%,#0b1711_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(90deg,rgba(250,248,241,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(250,248,241,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,transparent_0%,black_22%,black_72%,transparent_100%)]"
      />

      <div className={cn("section-container relative pb-8 md:pb-10 lg:pb-12", isLanding ? "pt-16 md:pt-20 lg:pt-24" : "pt-12 md:pt-16")}>
        {isLanding && (
          <section className="glass-dark grid gap-8 rounded-[2rem] p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
            <div>
              <p className="section-eyebrow-inverse !mb-4">
                Studio Interior & Furnitur
              </p>

              <h2 className="heading-section max-w-4xl tracking-[-0.045em] text-text-inverse">
                {footerContent.headline}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-text-inverse/80">
                {footerContent.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" className="h-12 px-5 text-sm font-extrabold">
                <Link href="/#kontak" className="group">
                  Mulai Konsultasi
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
                </Link>
              </Button>

              <Button asChild variant="darkOutline" className="h-12 px-5 text-sm font-extrabold hover:border-gold-300/50 hover:text-gold-300">
                <Link href="/#proyek" className="group">
                  Lihat Proyek
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        <div className={cn("grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16", isLanding ? "mt-12" : "mt-4")}>
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex !bg-forest-700 h-12 w-12 overflow-hidden rounded-pill bg-gold-500/14 ring-1 ring-text-inverse/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_34px_rgba(4,12,8,0.18)]">
                <Image
                  src="/brand/mawmaw-icon.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </span>

              <span className="font-serif text-3xl leading-none tracking-[-0.035em] text-text-inverse">
                Mawmaw.
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-text-inverse/68">
              {siteConfig.description ?? footerContent.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-pill bg-text-inverse/5 text-text-inverse transition-colors duration-200 hover:bg-gold-500/20 hover:text-gold-300"
                    {...externalLinkProps(item.href)}
                  >
                    <IconGlyph
                      name={item.icon}
                      aria-hidden
                      className="h-5 w-5"
                      weight="duotone"
                    />
                  </Link>
                ) : null
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FooterColumn title={footerContent.navTitle}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={normalizeHref(item.href)}
                  className="w-fit text-sm leading-6 text-text-inverse/80 transition hover:text-gold-300"
                >
                  {item.label === "Tentang" ? "Tentang Kami" : item.label}
                </Link>
              ))}
            </FooterColumn>

            <FooterColumn title={footerContent.servicesTitle}>
              {services.slice(0, 5).map((service) => (
                <Link
                  key={service.id}
                  href="/#layanan"
                  className="w-fit text-sm leading-6 text-text-inverse/80 transition hover:text-gold-300"
                >
                  {service.title}
                </Link>
              ))}
            </FooterColumn>

            <FooterColumn title={footerContent.contactTitle}>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="break-words text-sm leading-6 text-text-inverse/80 transition hover:text-gold-300"
              >
                {siteConfig.email}
              </Link>

              {siteConfig.phone ? (
                <Link
                  href={normalizeTelHref(siteConfig.phone)}
                  className="w-fit text-sm leading-6 text-text-inverse/80 transition hover:text-gold-300"
                >
                  {siteConfig.phone}
                </Link>
              ) : null}

              <p className="text-sm leading-7 text-text-inverse/80">
                {siteConfig.address}
              </p>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-text-inverse/12 pt-6 text-xs text-text-inverse/54 md:flex-row md:items-center md:justify-between">
          <p>{footerContent.copyright}</p>

          {footerContent.legal.length ? (
            <div className="flex flex-wrap gap-4">
              {footerContent.legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-gold-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="p-5">
      <h2 className="section-eyebrow-inverse !mb-0">
        {title}
      </h2>

      <div className="mt-5 grid gap-3">{children}</div>
    </section>
  );
}