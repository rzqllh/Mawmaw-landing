import { getSiteSettings } from "@/lib/queries";
import { 
  HeroVariant1, 
  HeroVariant2, 
  HeroVariant3, 
  HeroVariant4, 
  HeroVariant5 
} from "@/components/demos/hero-variants";

export default async function DemoPage() {
  const settings = await getSiteSettings();

  return (
    <main className="bg-neutral-900">
      <div className="fixed top-0 left-0 w-full bg-black text-white text-center py-2 text-xs tracking-widest uppercase z-50 font-mono">
        Design Consultant Mode — Scroll to view 5 anti-slop variants
      </div>

      <div className="pt-10">
        <HeroVariant1 settings={settings} />
        <div className="h-4 bg-red-500 w-full" /> {/* Separator */}
        
        <HeroVariant2 settings={settings} />
        <div className="h-4 bg-red-500 w-full" />
        
        <HeroVariant3 settings={settings} />
        <div className="h-4 bg-red-500 w-full" />
        
        <HeroVariant4 settings={settings} />
        <div className="h-4 bg-red-500 w-full" />
        
        <HeroVariant5 settings={settings} />
      </div>
    </main>
  );
}
