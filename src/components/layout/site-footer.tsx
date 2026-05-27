import Image from "next/image";
import Link from "next/link";

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

export function SiteFooter() {
  return (
    <footer className="bg-forest-900 text-text-inverse">
      <div className="section-container py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 overflow-hidden rounded-pill bg-gold-500/12">
                <Image
                  src="/brand/mawmaw-icon.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </span>
              <span className="font-serif text-3xl leading-none">
                Mawmaw Interior
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-text-inverse/72">
              {footerContent.summary}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-text-inverse/15 text-text-inverse/78 transition hover:border-gold-500/60 hover:text-gold-300"
                  >
                    <IconGlyph name={item.icon} aria-hidden className="h-5 w-5" weight="duotone" />
                  </Link>
                ) : null
              )}
            </div>
          </div>

          <FooterColumn title={footerContent.navTitle}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${item.href}`}
                className="text-sm text-text-inverse/72 transition hover:text-gold-300"
              >
                {item.label === "Tentang" ? "Tentang Kami" : item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={footerContent.servicesTitle}>
            {services.map((service) => (
              <Link
                key={service.id}
                href="/#layanan"
                className="text-sm text-text-inverse/72 transition hover:text-gold-300"
              >
                {service.title}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={footerContent.contactTitle}>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-text-inverse/72 transition hover:text-gold-300"
            >
              {siteConfig.email}
            </Link>
            <Link
              href="tel:+6281234567890"
              className="text-sm text-text-inverse/72 transition hover:text-gold-300"
            >
              {siteConfig.phone}
            </Link>
            <p className="text-sm text-text-inverse/72">{siteConfig.address}</p>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-text-inverse/12 pt-6 text-xs text-text-inverse/58 md:flex-row md:items-center md:justify-between">
          <p>{footerContent.copyright}</p>
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
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gold-300">{title}</h2>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}
