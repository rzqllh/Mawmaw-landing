import { ServiceCard } from "@/components/cards/service-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Reveal } from "@/components/motion/reveal";
import { services, servicesSection } from "@/data/public-content";

export function ServicesSection() {
  return (
    <SectionWrapper
      id="layanan"
      label={servicesSection.label}
      title={servicesSection.title}
      description={servicesSection.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.04}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
