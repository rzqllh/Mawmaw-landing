"use client";

import { useState } from "react";
import Image from "next/image";
import { IconGlyph } from "@/lib/icons";
import type { Service } from "@/data/public-content";

interface SiteSettings {
  servicesLabel: string;
  servicesTitle: string;
  servicesDesc: string;
}

interface InteractiveServicesProps {
  services: Service[];
  settings: SiteSettings;
}

export function InteractiveServices({ services, settings }: InteractiveServicesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-[100vh] min-h-[700px] max-h-[1080px] flex flex-col justify-center relative overflow-hidden py-24">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-50/50 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 xl:gap-32 items-center h-full max-h-[85vh]">
        
        {/* Left: Interactive Image Area (Takes up full height available) */}
        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
          {/* Subtle frame border */}
          <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] z-20 pointer-events-none"></div>
          
          {services.map((s, i) => {
            const isActive = activeIndex === i;
            // Fallback image if service doesn't have one
            const imgSrc = s.image?.src || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200";
            
            return (
              <div 
                key={s.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center ${
                  isActive 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-110 z-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10"></div>
                <Image
                  src={imgSrc}
                  alt={s.image?.alt || s.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-[10s] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  priority={i === 0}
                />
                
                {/* Floating Glass Label */}
                <div className={`absolute bottom-8 left-8 z-20 transition-all duration-700 delay-300 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  <div className="glass-dark rounded-2xl px-6 py-4 flex items-center gap-4 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-surface text-forest-900 flex items-center justify-center">
                      <IconGlyph name={s.icon as any} weight="duotone" className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-white/60 text-xs font-bold tracking-widest uppercase block mb-1">0{i+1}</span>
                      <span className="text-white font-serif text-xl">{s.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Accordion List (Scrollable) */}
        <div className="relative h-full flex flex-col justify-center pr-4 md:pr-12">
          {/* Top fade indicator */}
          <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none opacity-80"></div>
          
          <div className="accordion-scroll-container h-full overflow-y-auto overscroll-contain py-8 pb-32 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="mb-10 lg:mb-16 mt-8">
              <p className="section-eyebrow mb-4">{settings.servicesLabel}</p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-forest-900 leading-[1.1] mb-6">
                {settings.servicesTitle}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md">
                {settings.servicesDesc}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 relative">
              {services.map((s, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={s.id}
                    className={`group cursor-pointer border-b border-forest-900/10 py-5 transition-all duration-500 ease-out ${
                      isActive ? 'opacity-100 pl-4' : 'opacity-50 hover:opacity-80 hover:pl-2'
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className={`font-serif italic text-2xl transition-colors duration-500 ${
                          isActive ? 'text-gold-700' : 'text-forest-900/20 group-hover:text-gold-700/50'
                        }`}>
                          0{i+1}
                        </span>
                        <h3 className={`font-serif transition-all duration-500 ${
                          isActive ? 'text-3xl lg:text-4xl text-forest-900' : 'text-xl lg:text-2xl text-forest-900/70'
                        }`}>
                          {s.title}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                        isActive ? 'bg-gold-500 text-white shadow-md transform rotate-0' : 'bg-transparent text-text-muted transform -rotate-45'
                      }`}>
                        <IconGlyph name="ph-arrow-right" weight={isActive ? "bold" : "regular"} className="w-5 h-5" />
                      </div>
                    </div>
                    
                    {/* Accordion Content */}
                    <div 
                      className={`grid transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-base text-text-secondary max-w-md pr-8 pl-12 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom fade indicator */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
