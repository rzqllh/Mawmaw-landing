import { getSiteSettings } from "@/lib/queries";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedArticlesSection } from "@/components/sections/featured-articles-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="landing-page-shell">
        <HeroSection settings={settings} />
        <AboutSection />
        <ServicesSection />
        <FeaturedProjectsSection />
        <FeaturedArticlesSection />
      </div>
      <ContactSection settings={settings} />
    </>
  );
}
