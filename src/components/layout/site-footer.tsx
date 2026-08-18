"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

import {
  navItems,
  services,
} from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";
import { SiteSetting } from "@prisma/client";

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

export function SiteFooter({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  
  const socials = settings.socials as Record<string, string> | null;
  const socialLinks = [
    { label: "Instagram", href: socials?.instagram || "", icon: "instagram" },
    { label: "Pinterest", href: socials?.pinterest || "", icon: "pinterest" },
    { label: "Behance", href: socials?.behance || "", icon: "behance" },
  ];

  return (
    <footer className={cn(
      "relative isolate overflow-hidden bg-forest-900 text-text-inverse",
      !isLanding && "rounded-t-[2.5rem] mt-8 shadow-[0_-20px_40px_rgba(4,12,8,0.05)]"
    )}>
      <div className={cn("section-container relative pb-8 md:pb-10 lg:pb-12", isLanding ? "pt-16 md:pt-20 lg:pt-24" : "pt-12 md:pt-16")}>
        {isLanding && (
          <Reveal>
            <section className="grid gap-8 border-y border-text-inverse/15 py-8 lg:grid-cols-[1fr_auto] lg:items-end lg:py-10">
              <div>
                <p className="section-eyebrow-inverse !mb-4">
                Studio Interior & Furnitur
              </p>

              <h2 className="heading-section max-w-4xl tracking-[-0.045em] text-text-inverse">
                {settings.footerHeadline}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-text-inverse/80">
                {settings.footerSummary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" className="h-12 px-5 text-sm font-extrabold">
                <Link href="/#kontak" className="group">
                  Ceritakan Proyek Anda
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
          </Reveal>
        )}

        <div className={cn("grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16", isLanding ? "mt-12" : "mt-4")}>
          <Reveal delay={0.1} className="max-w-md">
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
              {settings.siteDescription || settings.footerSummary}
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
          </Reveal>

          <Reveal delay={0.2} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            <FooterColumn title="Pintasan Navigasi">
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

            <FooterColumn title="Layanan Kami">
              <ul className="grid gap-2 text-sm leading-6 text-text-inverse/72">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>{service.title}</li>
                ))}
              </ul>
              <Link
                href="/#layanan"
                className="mt-1 w-fit text-sm font-semibold text-gold-300 transition hover:text-gold-200"
              >
                Lihat rincian layanan
              </Link>
            </FooterColumn>

            <FooterColumn title="Hubungi Kami">
              <Link
                href={`mailto:${settings.email}`}
                className="break-words text-sm leading-6 text-text-inverse/80 transition hover:text-gold-300"
              >
                {settings.email}
              </Link>

              {settings.phone ? (
                <Link
                  href={normalizeTelHref(settings.phone)}
                  className="mt-1 flex items-center gap-2 hover:text-gold-300"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {settings.phone}
                </Link>
              ) : null}

              <p className="text-sm leading-7 text-text-inverse/80">
                {settings.address}
              </p>
            </FooterColumn>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-text-inverse/12 pt-6 text-xs text-text-inverse/54 md:flex-row md:items-center md:justify-between">
          <p>{settings.copyright}</p>
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
