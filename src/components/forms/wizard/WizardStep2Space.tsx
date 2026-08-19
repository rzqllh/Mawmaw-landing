"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";

const spaceTypes = [
  { id: "rumah", label: "Rumah" },
  { id: "apartemen", label: "Apartemen" },
  { id: "kantor", label: "Kantor" },
] as const;

const spaceSizes = [
  { id: "<50", label: "Di bawah 50 m²" },
  { id: "50-100", label: "50–100 m²" },
  { id: "100-200", label: "100–200 m²" },
  { id: ">200", label: "Di atas 200 m²" },
] as const;

export function WizardStep2Space() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  const isValid = !!data.spaceType && !!data.spaceSize;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">Tentang ruang Anda</h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">Berikan gambaran singkat mengenai properti yang akan dirancang.</p>
      </div>

      <div className="space-y-6">
        <fieldset className="space-y-3">
          <legend className="font-sans text-sm font-medium text-white">Tipe properti</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {spaceTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => updateData({ spaceType: type.id })}
                aria-pressed={data.spaceType === type.id}
                className={`min-h-11 rounded-lg border px-4 py-3 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
                  data.spaceType === type.id
                    ? "border-gold-500 bg-gold-500/10 text-gold-300"
                    : "border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="font-sans text-sm font-medium text-white">Estimasi luas</legend>
          <div className="grid grid-cols-2 gap-3">
            {spaceSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => updateData({ spaceSize: size.id })}
                aria-pressed={data.spaceSize === size.id}
                className={`min-h-11 rounded-lg border px-4 py-3 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
                  data.spaceSize === size.id
                    ? "border-gold-500 bg-gold-500/10 text-gold-300"
                    : "border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </fieldset>
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
