"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";
import { HouseLine, Armchair, Plus } from "@phosphor-icons/react";

const servicesList = [
  { id: "interior-design", title: "Desain Interior", icon: HouseLine, description: "Perencanaan ruang dan konsep desain menyeluruh" },
  { id: "custom-furniture", title: "Furnitur Custom", icon: Armchair, description: "Furnitur yang dibuat sesuai ukuran dan kebutuhan ruang" },
  { id: "keduanya", title: "Keduanya", icon: Plus, description: "Desain interior dan furnitur dalam satu proses" },
] as const;

export function WizardStep1Service() {
  const { data, updateData, nextStep } = useWizardStore();
  const selected = data.services || [];
  type ServiceId = (typeof servicesList)[number]["id"];

  const toggleService = (id: ServiceId) => {
    if (id === "keduanya") {
      updateData({ services: ["keduanya"] });
      return;
    }

    let newSelected = [...selected].filter(s => s !== "keduanya");
    if (newSelected.includes(id)) {
      newSelected = newSelected.filter((s) => s !== id);
    } else {
      newSelected.push(id);
    }
    updateData({ services: newSelected });
  };

  const isValid = selected.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5 sm:space-y-6"
    >
      <div>
        <h2 id="wizard-step-1-title" className="mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">
          Layanan yang Anda butuhkan
        </h2>
        <p className="text-xs sm:text-sm font-sans text-white/70">
          Pilih satu atau beberapa layanan untuk proyek Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2" role="group" aria-labelledby="wizard-step-1-title">
        {servicesList.map((service) => {
          const isSelected = selected.includes(service.id);
          const Icon = service.icon;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleService(service.id)}
              aria-pressed={isSelected}
              className={`min-h-11 rounded-xl border p-4 sm:p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
                isSelected
                  ? "border-gold-300 bg-gold-500/10 text-gold-200"
                  : "border-white/20 bg-white/[0.06] text-white hover:border-white/40"
              } ${service.id === "keduanya" ? "md:col-span-2" : ""}`}
            >
              <Icon weight="duotone" className="w-6 h-6 sm:w-7 sm:h-7 mb-2 sm:mb-3 opacity-85 text-gold-300" />
              <h3 className="font-sans font-medium text-base sm:text-lg mb-0.5">{service.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
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
