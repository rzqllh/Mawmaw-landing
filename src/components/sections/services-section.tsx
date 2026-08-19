import { InteractiveServices } from "@/components/sections/interactive-services";
import { getServices, getSiteSettings } from "@/lib/queries";

export async function ServicesSection() {
  const services = await getServices();
  const settings = await getSiteSettings();
  return (
    <section id="layanan" className="relative scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F4F1EA] border-t border-forest-900/[0.08]">
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
