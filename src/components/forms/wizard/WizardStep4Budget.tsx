"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";

const budgetRanges = [
  { id: "<100jt", label: "Di bawah Rp100 juta" },
  { id: "100-300jt", label: "Rp100–300 juta" },
  { id: "300-500jt", label: "Rp300–500 juta" },
  { id: ">500jt", label: "Di atas Rp500 juta" },
] as const;

export function WizardStep4Budget() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  const isValid = !!data.budgetRange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 id="wizard-step-4-title" className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">Estimasi budget</h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">Informasi ini membantu kami menyusun solusi yang realistis.</p>
      </div>

      <div className="flex flex-col gap-3" role="group" aria-labelledby="wizard-step-4-title">
        {budgetRanges.map((budget) => {
          const isSelected = data.budgetRange === budget.id;
          return (
            <button
              key={budget.id}
              type="button"
              onClick={() => updateData({ budgetRange: budget.id })}
              aria-pressed={isSelected}
              className={`flex min-h-11 items-center justify-between rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
                isSelected
                  ? "border-gold-300 bg-gold-500/10 text-gold-200"
                  : "border-white/20 bg-white/[0.06] text-white hover:border-white/40"
              }`}
            >
              <span className="font-sans font-medium">{budget.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected ? "border-white" : "border-white/20"
              }`}>
                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-gold-200" />}
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
