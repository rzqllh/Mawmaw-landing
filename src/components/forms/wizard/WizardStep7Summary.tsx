"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  CircleNotch,
  PaperPlaneRight,
  PencilSimple,
} from "@phosphor-icons/react";
import { useWizardStore } from "@/hooks/useWizardStore";
import { getWizardLabel } from "@/lib/contact-actions";
import { step7Schema } from "@/lib/validations/contact";

export function WizardStep7Summary({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const { data, updateData, prevStep, setStep } = useWizardStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const recap = [
    {
      step: 1,
      label: "Layanan",
      value: data.services?.map(getWizardLabel).join(", ") || "Belum dipilih",
    },
    {
      step: 2,
      label: "Ruang",
      value: `${getWizardLabel(data.spaceType || "")} · ${getWizardLabel(data.spaceSize || "")}`,
    },
    {
      step: 3,
      label: "Gaya",
      value: getWizardLabel(data.stylePreference || ""),
    },
    {
      step: 4,
      label: "Budget",
      value: getWizardLabel(data.budgetRange || ""),
    },
    {
      step: 5,
      label: "Timeline",
      value: getWizardLabel(data.timeline || ""),
    },
    {
      step: 6,
      label: "Lokasi",
      value: getWizardLabel(data.location || ""),
    },
  ];

  const validateAndSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = step7Schema.safeParse({
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      notes: data.notes || "",
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  const inputClassName =
    "w-full rounded-lg border border-white/20 bg-white/[0.07] px-4 py-3 font-sans text-white outline-none transition-colors placeholder:text-white/55 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <h2 className="mb-2 font-serif text-3xl text-white md:text-4xl">
          Periksa detail proyek
        </h2>
        <p className="font-sans text-white/70">
          Pastikan ringkasan berikut sudah benar sebelum lanjut ke WhatsApp.
        </p>
      </div>

      <dl className="divide-y divide-white/10 border-y border-white/10">
        {recap.map((item) => (
          <div
            key={item.step}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-4"
          >
            <div className="min-w-0">
              <dt className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.12em] text-white/60">
                {item.label}
              </dt>
              <dd className="break-words font-sans text-sm text-white">
                {item.value}
              </dd>
            </div>
            <button
              type="button"
              onClick={() => setStep(item.step)}
              className="inline-flex min-h-11 items-center gap-2 self-center rounded-md px-2 font-sans text-sm font-medium text-gold-200 transition-colors hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
              aria-label={`Ubah ${item.label.toLowerCase()}`}
            >
              <PencilSimple aria-hidden="true" className="size-4" />
              Ubah
            </button>
          </div>
        ))}
      </dl>

      <form className="space-y-5" onSubmit={validateAndSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="wizard-name" className="font-sans text-sm font-medium text-white">
            Nama lengkap <span aria-hidden="true">*</span>
          </label>
          <input
            id="wizard-name"
            name="name"
            type="text"
            autoComplete="name"
            value={data.name || ""}
            onChange={(event) => updateData({ name: event.target.value })}
            className={`${inputClassName} ${errors.name ? "border-red-300" : ""}`}
            placeholder="Nama lengkap"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "wizard-name-error" : undefined}
          />
          {errors.name && (
            <p id="wizard-name-error" role="alert" className="font-sans text-xs text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="wizard-phone" className="font-sans text-sm font-medium text-white">
            Nomor WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input
            id="wizard-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone || ""}
            onChange={(event) => updateData({ phone: event.target.value })}
            className={`${inputClassName} ${errors.phone ? "border-red-300" : ""}`}
            placeholder="0812 3456 7890"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "wizard-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="wizard-phone-error" role="alert" className="font-sans text-xs text-red-300">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="wizard-email" className="font-sans text-sm font-medium text-white">
            Email <span className="font-normal text-white/60">(opsional)</span>
          </label>
          <input
            id="wizard-email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email || ""}
            onChange={(event) => updateData({ email: event.target.value })}
            className={`${inputClassName} ${errors.email ? "border-red-300" : ""}`}
            placeholder="nama@contoh.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "wizard-email-error" : undefined}
          />
          {errors.email && (
            <p id="wizard-email-error" role="alert" className="font-sans text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="wizard-notes" className="font-sans text-sm font-medium text-white">
            Catatan <span className="font-normal text-white/60">(opsional)</span>
          </label>
          <textarea
            id="wizard-notes"
            name="notes"
            value={data.notes || ""}
            onChange={(event) => updateData({ notes: event.target.value })}
            rows={4}
            className={`${inputClassName} resize-y ${errors.notes ? "border-red-300" : ""}`}
            placeholder="Kebutuhan khusus atau detail lain yang perlu kami ketahui"
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "wizard-notes-error" : undefined}
          />
          {errors.notes && (
            <p id="wizard-notes-error" role="alert" className="font-sans text-xs text-red-300">
              {errors.notes}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="min-h-11 rounded-md px-6 py-3 font-sans font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 disabled:opacity-50"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gold-200 px-6 py-3 font-sans font-semibold text-forest-950 transition-colors hover:bg-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <CircleNotch aria-hidden="true" className="size-5 animate-spin" weight="bold" />
                Menyimpan…
              </>
            ) : (
              <>
                Kirim &amp; lanjut ke WhatsApp
                <PaperPlaneRight aria-hidden="true" className="size-5" weight="bold" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
