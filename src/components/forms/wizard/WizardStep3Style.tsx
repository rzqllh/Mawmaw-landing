"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";
import Image from "next/image";

const styleOptions = [
  { 
    id: "modern", 
    label: "Modern Minimalis", 
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "japandi", 
    label: "Japandi", 
    src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "klasik", 
    label: "Klasik Elegan", 
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "industrial", 
    label: "Industrial", 
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "kontemporer", 
    label: "Kontemporer", 
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" 
  },
] as const;

export function WizardStep3Style() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  const isValid = !!data.stylePreference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 id="wizard-step-3-title" className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">Preferensi gaya</h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">Pilih gaya yang paling dekat dengan suasana yang Anda inginkan.</p>
      </div>

      <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="wizard-step-3-title">
        {styleOptions.map((style) => {
          const isSelected = data.stylePreference === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => updateData({ stylePreference: style.id })}
              aria-pressed={isSelected}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                isSelected ? "border-gold-500" : "border-transparent"
              } ${style.id === "kontemporer" ? "col-span-2 aspect-[21/9]" : ""}`}
            >
              <Image 
                src={style.src} 
                alt={style.label} 
                fill 
                className={`object-cover transition-transform duration-700 ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
              />
              <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? "bg-black/60" : "bg-black/60 group-hover:bg-black/50"}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans font-medium text-white text-lg tracking-wide drop-shadow-md">
                  {style.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="min-h-11 rounded-md px-6 py-3 font-sans font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        >
          Kembali
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={nextStep}
          className="min-h-11 rounded-md bg-gold-200 px-8 py-3 font-sans font-semibold text-forest-950 transition-colors hover:bg-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Lanjut
        </button>
      </div>
    </motion.div>
  );
}
