"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
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
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-20 xl:gap-32 items-start">
        
        {/* Left: Interactive Image Area (Hidden on Mobile) */}
        <div className="hidden lg:block relative h-[80vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group sticky top-28">
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
                      <IconGlyph name={s.icon as import("@/lib/icons").IconName} weight="duotone" className="w-5 h-5" />
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

        {/* Right: Tabbed Layout */}
        <div className="relative flex flex-col justify-center pr-4 md:pr-12">
          <div className="py-8">
            <div className="mb-8 lg:mb-10 mt-2">
              <p className="section-eyebrow mb-4">{settings.servicesLabel}</p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-forest-900 leading-[1.1] mb-6">
                {settings.servicesTitle}
              </h2>
              
              {/* Dynamic Description Box (Hidden on Mobile) */}
              <div className="hidden lg:block relative min-h-[140px] md:min-h-[120px] max-w-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {services[activeIndex]?.description || settings.servicesDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Compact Interactive List */}
            <div className="flex flex-col border-t border-forest-900/10">
              {services.map((s, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={s.id}
                    className="flex flex-col border-b border-forest-900/10"
                  >
                    <button 
                      className={`group cursor-pointer py-5 transition-all duration-300 ease-out flex items-center justify-between ${
                        isActive ? 'bg-forest-50/50 pl-4' : 'hover:pl-2 hover:bg-forest-50/30'
                      }`}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => setActiveIndex(i)}
                    >
                      <div className="flex items-center gap-4 sm:gap-5 text-left">
                        <span className={`font-serif italic text-lg transition-colors duration-300 ${
                          isActive ? 'text-gold-700' : 'text-forest-900/30 group-hover:text-gold-700/50'
                        }`}>
                          0{i+1}
                        </span>
                        <h3 className={`font-serif transition-colors duration-300 leading-tight ${
                          isActive ? 'text-2xl text-forest-900' : 'text-xl text-forest-900/70 group-hover:text-forest-900'
                        }`}>
                          {s.title}
                        </h3>
                      </div>
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-2 mr-2 ${
                        isActive ? 'bg-gold-500 text-white transform rotate-90 lg:rotate-0 shadow-sm' : 'bg-transparent text-text-muted transform -rotate-45'
                      }`}>
                        <IconGlyph name="ph-arrow-right" weight={isActive ? "bold" : "regular"} className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Content for Mobile */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="lg:hidden overflow-hidden"
                        >
                          <div className="pb-6 pt-2 pl-4 pr-2">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md border border-forest-900/5">
                              <Image
                                src={s.image?.src || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"}
                                alt={s.image?.alt || s.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/5" />
                            </div>
                            <p className="text-base text-text-secondary leading-relaxed">
                              {s.description || settings.servicesDesc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}
