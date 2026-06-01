import { ServiceCard } from "@/components/cards/service-card";
import { Reveal } from "@/components/motion/reveal";
import { getServices } from "@/lib/queries";
import { servicesSection } from "@/data/public-content";

export async function ServicesSection() {
  const services = await getServices();
  return (
    <section id="layanan" className="section-y surface-section scroll-mt-0">
      <div className="section-container">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.55fr)] lg:items-start">
          <div>
            <p className="section-eyebrow">
              {servicesSection.label}
            </p>
            <h2 className="heading-section max-w-3xl text-forest-900">
              {servicesSection.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-text-secondary md:text-lg lg:pt-16">
            {servicesSection.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.04}>
            <ServiceCard service={service} index={index} />
          </Reveal>
        ))}
        </div>
      </div>
    </section>
  );
}
