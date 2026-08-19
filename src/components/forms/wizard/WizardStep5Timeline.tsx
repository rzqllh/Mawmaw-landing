"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";

const timelines = [
  { id: "asap", label: "Secepatnya", desc: "Siap memulai dalam waktu dekat" },
  { id: "1-3bulan", label: "1–3 bulan", desc: "Target mulai sudah cukup jelas" },
  { id: "3-6bulan", label: "3–6 bulan", desc: "Masih menyiapkan kebutuhan proyek" },
  { id: "masih-planning", label: "Masih merencanakan", desc: "Sedang mengeksplorasi pilihan" },
] as const;

export function WizardStep5Timeline() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  const isValid = !!data.timeline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 id="wizard-step-5-title" className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">Target waktu proyek</h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">Kapan Anda berencana memulai proyek?</p>
      </div>

      <div className="flex flex-col gap-3" role="group" aria-labelledby="wizard-step-5-title">
        {timelines.map((time) => {
          const isSelected = data.timeline === time.id;
          return (
            <button
              key={time.id}
              type="button"
              onClick={() => updateData({ timeline: time.id })}
              aria-pressed={isSelected}
              className={`flex min-h-11 items-center justify-between rounded-xl border p-5 text-left transition-colors ${
                isSelected
                  ? "border-gold-300 bg-gold-500/10 text-gold-200"
                  : "border-white/20 bg-white/[0.06] text-white hover:border-white/40"
              }`}
            >
              <div>
                <span className="font-sans font-medium block">{time.label}</span>
                <span className="mt-1 block font-sans text-sm text-white/70">
                  {time.desc}
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
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
