"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";

const locations = [
  { id: "jakarta", label: "Jakarta" },
  { id: "bogor", label: "Bogor" },
  { id: "depok", label: "Depok" },
  { id: "tangerang", label: "Tangerang" },
  { id: "bekasi", label: "Bekasi" },
] as const;

export function WizardStep6Location() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  const isValid = !!data.location;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 id="wizard-step-6-title" className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">Lokasi proyek</h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">Pilih area tempat properti berada.</p>
      </div>

      <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="wizard-step-6-title">
        {locations.map((loc) => {
          const isSelected = data.location === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => updateData({ location: loc.id })}
              aria-pressed={isSelected}
              className={`min-h-11 rounded-lg border px-4 py-4 font-sans text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
                isSelected
                  ? "border-gold-300 bg-gold-500/10 text-gold-200"
                  : "border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40"
              }`}
            >
              {loc.label}
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
