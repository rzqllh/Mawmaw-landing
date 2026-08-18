import { InteractiveServices } from "@/components/sections/interactive-services";
import { getServices, getSiteSettings } from "@/lib/queries";

export async function ServicesSection() {
  const services = await getServices();
  const settings = await getSiteSettings();
  return (
    <section id="layanan" className="surface-section relative flex min-h-dvh scroll-mt-24 flex-col justify-center py-20 md:py-24">
      <div className="section-container relative z-10 w-full">
        {services.length ? (
          <InteractiveServices services={services} settings={settings} />
        ) : (
          <div className="mx-auto max-w-2xl border-y border-forest-900/15 py-12 text-center">
            <p className="section-eyebrow">{settings.servicesLabel}</p>
            <h2 className="heading-section text-forest-900">{settings.servicesTitle}</h2>
            <p className="mt-5 text-text-secondary">
              Detail layanan sedang disiapkan. Hubungi kami untuk membahas kebutuhan ruang Anda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
