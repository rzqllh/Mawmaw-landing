import { SectionWrapper } from "@/components/layout/section-wrapper";
import { InteractiveServices } from "@/components/sections/interactive-services";
import { getServices, getSiteSettings } from "@/lib/queries";

export async function ServicesSection() {
  const services = await getServices();
  const settings = await getSiteSettings();

  return (
    <SectionWrapper id="layanan" className="!py-0">
      <InteractiveServices services={services} settings={settings} />
    </SectionWrapper>
  );
}
