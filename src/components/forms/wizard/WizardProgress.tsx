"use client";

import { motion } from "motion/react";
import { useWizardStore } from "@/hooks/useWizardStore";

export function WizardProgress() {
  const { step } = useWizardStore();
  const totalSteps = 7;

  return (
    <div
      className="mb-8 flex items-center gap-2"
      role="progressbar"
      aria-label="Progres konsultasi"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={step}
      aria-valuetext={`Langkah ${step} dari ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === step;
        const isCompleted = stepNum < step;

        return (
          <div key={stepNum} className="flex-1 h-1.5 rounded-full bg-neutral-200 overflow-hidden relative">
            {(isActive || isCompleted) && (
              <motion.div
                layoutId={`progress-${stepNum}`}
                className="absolute inset-0 rounded-full bg-gold-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
