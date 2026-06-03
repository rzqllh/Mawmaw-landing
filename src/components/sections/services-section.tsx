import { InteractiveServices } from "@/components/sections/interactive-services";
import { getServices, getSiteSettings } from "@/lib/queries";

export async function ServicesSection() {
  const services = await getServices();
  const settings = await getSiteSettings();
  return (
    <section id="layanan" className="relative surface-section section-y">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-50/50 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      <div className="section-container relative z-10">
        <InteractiveServices services={services} settings={settings} />
      </div>
    </section>
  );
}
