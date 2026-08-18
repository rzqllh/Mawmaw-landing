"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useWizardStore } from "@/hooks/useWizardStore";
import { submitContactForm } from "@/actions/contact";
import type { ContactFormData } from "@/lib/validations/contact";
import { createWizardWhatsappHref } from "@/lib/contact-actions";

import { WizardProgress } from "./WizardProgress";
import { WizardStep1Service } from "./WizardStep1Service";
import { WizardStep2Space } from "./WizardStep2Space";
import { WizardStep3Style } from "./WizardStep3Style";
import { WizardStep4Budget } from "./WizardStep4Budget";
import { WizardStep5Timeline } from "./WizardStep5Timeline";
import { WizardStep6Location } from "./WizardStep6Location";
import { WizardStep7Summary } from "./WizardStep7Summary";
import type { SiteSetting } from "@prisma/client";

export function WizardForm({ settings }: { settings: SiteSetting }) {
  const { step, data, reset } = useWizardStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const values = data as ContactFormData;
    const waUrl = createWizardWhatsappHref(values, settings.phone);

    window.open(waUrl, "_blank", "noopener,noreferrer");

    try {
      const response = await submitContactForm(values);
      
      if (response.success) {
        toast.success("Detail proyek tersimpan. Percakapan WhatsApp sudah dibuka.");
        reset();
      } else {
        toast.error(
          response.error ||
            "WhatsApp sudah dibuka, tetapi detail proyek belum tersimpan."
        );
      }
    } catch {
      toast.error("WhatsApp sudah dibuka, tetapi detail proyek belum tersimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-card relative flex min-h-[400px] w-full flex-col overflow-x-hidden">
      <WizardProgress />
      
      <div className="relative flex-1 pb-4">
        <AnimatePresence mode="wait">
          {step === 1 && <WizardStep1Service key="step1" />}
          {step === 2 && <WizardStep2Space key="step2" />}
          {step === 3 && <WizardStep3Style key="step3" />}
          {step === 4 && <WizardStep4Budget key="step4" />}
          {step === 5 && <WizardStep5Timeline key="step5" />}
          {step === 6 && <WizardStep6Location key="step6" />}
          {step === 7 && <WizardStep7Summary key="step7" onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
