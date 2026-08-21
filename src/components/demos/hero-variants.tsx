import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SiteSetting } from "@prisma/client";

/* 
  VARIANT 1: THE BRUTALIST EDITORIAL
  Anti-slop: No gradients, no soft shadows, hard lines, massive contrast, 
  asymmetric 1/3 to 2/3 split. Heavy use of negative space.
*/
export function HeroVariant1({ settings }: { settings: SiteSetting }) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col md:flex-row bg-surface text-forest-900 border-b border-forest-900/10">
      <div className="w-full md:w-[40%] flex flex-col justify-between p-8 md:p-16 lg:p-24 border-r border-forest-900/10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-forest-900/50">Mawmaw Interior</span>
        </div>
        <div className="mt-20 md:mt-0">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-8">
            {settings.heroTitle.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-sm font-sans mb-12">
            {settings.heroDescription}
          </p>
          <Link href="/#kontak" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-forest-900 pb-2 hover:opacity-50 transition-opacity">
            Start a project <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[60%] relative h-[50vh] md:h-auto">
        <Image src={settings.heroImageSrc} alt="Interior" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
      </div>
    </section>
  );
}

/* 
  VARIANT 2: THE IMMERSIVE CINEMATIC
  Anti-slop: Full bleed, extreme dark mode, delicate thin serif over rich photography,
  bottom-aligned text to anchor the composition.
*/
export function HeroVariant2({ settings }: { settings: SiteSetting }) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end p-8 md:p-16 bg-black text-white">
      <Image src={settings.heroImageSrc} alt="Interior" fill className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        <h1 className="font-serif text-5xl md:text-8xl font-light tracking-wide max-w-4xl leading-tight">
          {settings.heroTitle}
        </h1>
        <div className="flex flex-col gap-6 max-w-sm">
          <p className="text-sm text-white/70 leading-relaxed font-light">
            {settings.heroDescription}
          </p>
          <button className="h-12 px-8 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 hover:bg-white hover:text-black transition-colors self-start">
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}

/* 
  VARIANT 3: THE JAPANDI GALLERY
  Anti-slop: Off-grid overlapping images, warm cream background, 
  organic spacing, delicate typography.
*/
export function HeroVariant3({ settings }: { settings: SiteSetting }) {
  return (
    <section className="relative w-full min-h-[100dvh] bg-[#fdfcf9] text-[#3e3b35] overflow-hidden flex items-center">
      <div className="absolute top-12 left-12 text-xs uppercase tracking-widest font-semibold text-[#8c887e]">
        Crafted Environments
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 z-20">
          <h1 className="font-serif text-6xl lg:text-[5.5rem] leading-[0.9] italic text-[#2c2a26] mb-8">
            {settings.heroTitle}
          </h1>
          <p className="text-[#6b675d] mb-10 max-w-md leading-relaxed">
            {settings.heroDescription}
          </p>
          <div className="flex items-center gap-6">
            <button className="flex items-center justify-center w-14 h-14 rounded-full border border-[#d6d2c4] hover:bg-[#2c2a26] hover:text-[#fdfcf9] transition-all">
              <ArrowDownRight weight="light" size={24} />
            </button>
            <span className="text-sm font-medium tracking-widest uppercase">Explore</span>
          </div>
        </div>
        
        <div className="md:col-span-7 relative h-[60vh] md:h-[80vh] w-full">
          {/* Main Image */}
          <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl shadow-[#3e3b35]/10 z-10">
            <Image src={settings.heroImageSrc} alt="Interior" fill className="object-cover" />
          </div>
          {/* Accent overlapping image (using same source for demo, cropped differently via CSS) */}
          <div className="absolute bottom-0 left-0 w-[45%] h-[50%] rounded-2xl overflow-hidden shadow-2xl shadow-[#3e3b35]/10 z-20 border-8 border-[#fdfcf9]">
            <Image src={settings.heroImageSrc} alt="Detail" fill className="object-cover object-bottom" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 
  VARIANT 4: THE TECHNICAL BENTO
  Anti-slop: Structured, architectural feel. Grid lines visible. 
  Utilitarian typography (sans-serif dominant).
*/
export function HeroVariant4({ settings }: { settings: SiteSetting }) {
  return (
    <section className="relative w-full min-h-[100dvh] bg-neutral-50 p-4 md:p-8">
      <div className="w-full h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4">
        {/* Title Box */}
        <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 md:p-12 flex flex-col justify-end border border-neutral-200">
          <div className="mb-auto">
            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-mono text-neutral-500">v2.0 / Architecture</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-none text-neutral-900">
            {settings.heroTitle}
          </h1>
        </div>
        
        {/* Main Image Box */}
        <div className="md:col-span-2 md:row-span-3 bg-neutral-200 rounded-3xl relative overflow-hidden">
          <Image src={settings.heroImageSrc} alt="Interior" fill className="object-cover" />
        </div>
        
        {/* Description Box */}
        <div className="md:col-span-1 md:row-span-1 bg-forest-900 text-white rounded-3xl p-8 flex flex-col justify-center">
          <p className="text-sm leading-relaxed opacity-80">
            {settings.heroDescription}
          </p>
        </div>
        
        {/* Action Box */}
        <div className="md:col-span-1 md:row-span-1 bg-gold-500 rounded-3xl p-8 flex flex-col justify-center items-center cursor-pointer hover:bg-gold-400 transition-colors">
          <WhatsappLogo size={48} className="text-forest-900 mb-4" />
          <span className="font-semibold text-forest-900">Start Consultation</span>
        </div>
      </div>
    </section>
  );
}

/* 
  VARIANT 5: THE MUSEUM MONOLITH
  Anti-slop: Extreme whitespace. The image is treated as an art piece, 
  not a background. Centered but highly curated proportions.
*/
export function HeroVariant5({ settings }: { settings: SiteSetting }) {
  return (
    <section className="relative w-full min-h-[100dvh] bg-white text-black flex flex-col items-center justify-center pt-32 pb-16">
      <h1 className="font-serif text-5xl md:text-[5rem] lg:text-[7rem] leading-[0.8] text-center max-w-6xl mx-auto px-4 z-10 mix-blend-difference text-white">
        {settings.heroTitle}
      </h1>
      
      <div className="relative w-[80vw] max-w-4xl h-[40vh] md:h-[55vh] mt-[-3rem] md:mt-[-5rem] z-0 overflow-hidden shadow-2xl">
        <Image src={settings.heroImageSrc} alt="Interior" fill className="object-cover" />
      </div>
      
      <div className="mt-16 max-w-md text-center px-4">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-4">Mawmaw Studio</p>
        <p className="text-neutral-600 leading-relaxed font-serif text-lg italic">
          {settings.heroDescription}
        </p>
      </div>
    </section>
  );
}
