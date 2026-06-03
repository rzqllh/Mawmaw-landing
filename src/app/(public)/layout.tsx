import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteSettings } from "@/lib/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="pb-16 lg:pb-0">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest-900 focus:text-gold-300 focus:rounded-pill focus:font-semibold">
        Langsung ke konten
      </a>
      <SiteHeader settings={settings} />
      <main id="main-content">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
