"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CaretRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-16 items-center h-full w-full">
        
        <Reveal className="group relative hidden h-[70vh] max-h-[700px] w-full overflow-hidden rounded-2xl border border-forest-900/10 lg:block">
          <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] z-20 pointer-events-none"></div>

          {services.map((s, i) => {
            const isActive = activeIndex === i;

            return (
              <div 
                key={s.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center ${
                  isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10"></div>
                {s.image ? (
                  <Image
                    src={s.image.src}
                    alt={s.image.alt || s.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-[10s] ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                    priority={i === 0}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-forest-100 text-forest-700">
                    <IconGlyph name={s.icon} aria-hidden className="size-16" weight="duotone" />
                  </div>
                )}
                
                <div className={`absolute bottom-8 left-8 z-20 transition-all duration-700 delay-300 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-forest-950/90 px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-surface text-forest-900 flex items-center justify-center">
                      <IconGlyph name={s.icon} weight="duotone" className="w-5 h-5" />
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
        </Reveal>

        {/* Right: Tabbed Layout */}
        <Reveal delay={0.1} className="relative flex flex-col justify-center h-auto lg:h-[70vh] max-h-[700px] pr-2">
          <div className="pb-4 shrink-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[0.65rem] lg:text-xs font-bold tracking-[0.22em] uppercase text-gold-700">
                {settings.servicesLabel || "LAYANAN KAMI"}
              </span>
              <span className="inline-block h-px w-8 bg-gold-700/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-serif text-forest-900 leading-[1.08] mb-4 tracking-tight text-balance">
              {settings.servicesTitle}
            </h2>
            
            {/* Dynamic Description Box (Hidden on Mobile) */}
            <div className="hidden lg:block relative min-h-[100px] max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <p className="text-sm lg:text-base text-text-secondary leading-relaxed">
                    {services[activeIndex]?.description || settings.servicesDesc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex shrink-0 flex-col border-t border-forest-900/10" role="tablist" aria-label="Daftar layanan">
            {services.map((s, i) => {
              const isActive = activeIndex === i;
              return (
                <div key={s.id} className="flex flex-col border-b border-forest-900/10">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${s.id}`}
                    className={`group cursor-pointer py-4 lg:py-5 transition-all duration-300 ease-out flex items-center justify-between ${
                      isActive ? 'bg-forest-50/50 pl-3' : 'hover:pl-2 hover:bg-forest-50/30'
                    }`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') setActiveIndex(i);
                    }}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 text-left">
                      <span className={`font-serif italic text-base lg:text-lg transition-colors duration-300 ${
                        isActive ? 'text-gold-700' : 'text-forest-900/30 group-hover:text-gold-700/50'
                      }`}>
                        0{i+1}
                      </span>
                      <h3 className={`font-serif transition-colors duration-300 leading-tight ${
                        isActive ? 'text-xl lg:text-2xl text-forest-900' : 'text-lg lg:text-xl text-forest-900/70 group-hover:text-forest-900'
                      }`}>
                        {s.title}
                      </h3>
                    </div>

                    <div className={`ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors lg:h-8 lg:w-8 ${
                      isActive ? 'bg-gold-500 text-forest-950' : 'bg-transparent text-text-muted'
                    }`}>
                      <CaretRight aria-hidden="true" weight={isActive ? "bold" : "regular"} className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Accordion Content for Mobile (Compact) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`service-panel-${s.id}`}
                        role="tabpanel"
                        key={`accordion-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="pb-4 pt-1 pl-3 pr-2">
                          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed border-l-2 border-gold-500 pl-3">
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
        </Reveal>
    </div>
  );
}
