import { ServiceCard } from "@/components/cards/service-card";
import { Reveal } from "@/components/motion/reveal";
import { services, servicesSection } from "@/data/public-content";

export function ServicesSection() {
  return (
    <section id="layanan" className="section-y scroll-mt-28 bg-background">
      <div className="section-container">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.55fr)] lg:items-start">
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-gold-700">
              {servicesSection.label}
            </p>
            <h2 className="max-w-3xl font-serif text-[clamp(2.45rem,5vw,5rem)] leading-[0.92] text-forest-900 text-balance">
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
