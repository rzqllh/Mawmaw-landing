import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/data/public-content";
import { getSiteSettings } from "@/lib/queries";
import { serializeJsonLd } from "@/lib/seo";
import { draftMode } from "next/headers";
import { Info } from "@phosphor-icons/react/dist/ssr";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const isDraftMode = (await draftMode()).isEnabled;
  const socialUrls = Object.values(
    settings.socials as Record<string, unknown>
  ).filter(
    (value): value is string =>
      typeof value === "string" && /^https?:\/\//.test(value)
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteConfig.url,
    image: settings.heroImageSrc,
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.address ? { address: settings.address } : {}),
    ...(socialUrls.length ? { sameAs: socialUrls } : {}),
  };

  return (
    <>
      <script
        id="mawmaw-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <div className="flex min-h-dvh flex-col selection:bg-gold-500 selection:text-forest-900">
        {isDraftMode && (
          <div className="bg-gold-500 px-4 py-2 text-center text-sm font-semibold text-forest-900 flex items-center justify-center gap-2 relative z-50">
            <Info weight="fill" className="w-4 h-4" />
            Preview Mode (Drafts Visible)
            <a href="/api/disable-draft" className="underline ml-2 hover:text-forest-800">
              Exit
            </a>
          </div>
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-forest-900"
        >
          Langsung ke konten
        </a>
        <SiteHeader settings={settings} />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </div>
    </>
  );
}
