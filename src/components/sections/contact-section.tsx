"use client";

import { useId, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContactForm } from "@/app/actions/submit-contact";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/data/public-content";
import { IconGlyph } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation";
import { SiteSetting } from "@prisma/client";
import { ContactWizard } from "./contact-wizard";
import { MagicWand, ListDashes } from "@phosphor-icons/react";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  location: "",
  message: "",
};

export function ContactSection({ settings }: { settings: SiteSetting }) {
  const formId = useId();
  const [mode, setMode] = useState<"form" | "wizard">("wizard");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });

      const result = await submitContactForm(formData);
      if (!result.success) {
        toast.error(result.error || "Gagal mengirim detail proyek.");
        return;
      }
      toast.success("Detail proyek terkirim. Tim kami akan segera menghubungi Anda.");
      reset();
    } catch {
      toast.error("Detail proyek belum terkirim. Silakan coba lagi.");
    }
  }

  function onInvalid() {
    toast.error("Mohon periksa kembali data yang Anda isi.");
  }

  return (
    <section id="kontak" className="relative scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#112019] text-[#FAF8F1] border-t border-forest-800/40">
      <div className="section-container relative z-10 w-full">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-0">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[0.65rem] lg:text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-300">
                  {contactContent.label || "KONSULTASI"}
                </span>
                <span className="inline-block h-px w-8 bg-gold-400/50" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.1] text-text-inverse tracking-tight text-balance">
                {settings.contactTitle}
              </h2>

              <p className="mt-2 max-w-[28rem] text-xs sm:text-sm text-text-inverse/75 leading-relaxed text-pretty">
                {settings.contactDesc}
              </p>

              <div className="mt-4 sm:mt-5 grid gap-2 sm:gap-2.5">
                {contactContent.trustBullets.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gold-500/10 text-gold-300">
                      <IconGlyph
                        name={item.icon}
                        aria-hidden
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        weight="duotone"
                      />
                    </span>

                    <span className="text-xs sm:text-sm font-medium text-text-inverse/90">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center">
            <div className="mb-4 sm:mb-6 flex justify-center lg:justify-start">
              <div className="flex rounded-pill border border-white/15 bg-white/[0.06] p-1" role="group" aria-label="Pilih cara mengirim detail proyek">
                <button
                  type="button"
                  onClick={() => setMode("wizard")}
                  aria-pressed={mode === "wizard"}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-pill transition-all",
                    mode === "wizard" ? "bg-white text-forest-900 shadow-sm" : "text-white/70 hover:text-white"
                  )}
                >
                  <MagicWand weight={mode === "wizard" ? "fill" : "regular"} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Mode Interaktif
                </button>
                <button
                  type="button"
                  onClick={() => setMode("form")}
                  aria-pressed={mode === "form"}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-pill transition-all",
                    mode === "form" ? "bg-white text-forest-900 shadow-sm" : "text-white/70 hover:text-white"
                  )}
                >
                  <ListDashes weight={mode === "form" ? "fill" : "regular"} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Form Langsung
                </button>
              </div>
            </div>

            {mode === "wizard" ? (
              <ContactWizard settings={settings} />
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="glass-dark contact-form-card"
              >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  id={`${formId}-name`}
                  label={contactContent.fields.name.label}
                  error={errors.name?.message}
                >
                  <Input
                    id={`${formId}-name`}
                    placeholder={contactContent.fields.name.placeholder}
                    variant="inverse"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `${formId}-name-error` : undefined
                    }
                    autoComplete="name"
                    {...register("name")}
                  />
                </Field>

                <Field
                  id={`${formId}-email`}
                  label={contactContent.fields.email.label}
                  error={errors.email?.message}
                >
                  <Input
                    id={`${formId}-email`}
                    type="email"
                    placeholder={contactContent.fields.email.placeholder}
                    variant="inverse"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${formId}-email-error` : undefined
                    }
                    autoComplete="email"
                    {...register("email")}
                  />
                </Field>

                <Field
                  id={`${formId}-projectType`}
                  label={contactContent.fields.projectType.label}
                  error={errors.projectType?.message}
                >
                  <Controller
                    name="projectType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={`${formId}-projectType`}
                          className="contact-select-trigger"
                          variant="inverse"
                          aria-invalid={Boolean(errors.projectType)}
                          aria-describedby={
                            errors.projectType
                              ? `${formId}-projectType-error`
                              : undefined
                          }
                          onBlur={field.onBlur}
                        >
                          <SelectValue
                            placeholder={
                              contactContent.fields.projectType.placeholder
                            }
                          />
                        </SelectTrigger>

                        <SelectContent
                          position="popper"
                          sideOffset={8}
                          collisionPadding={16}
                          variant="inverse"
                        >
                          {contactContent.projectTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              variant="inverse"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field
                  id={`${formId}-location`}
                  label={contactContent.fields.location.label}
                  error={errors.location?.message}
                >
                  <Input
                    id={`${formId}-location`}
                    placeholder={contactContent.fields.location.placeholder}
                    variant="inverse"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={
                      errors.location ? `${formId}-location-error` : undefined
                    }
                    autoComplete="address-level2"
                    {...register("location")}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  id={`${formId}-message`}
                  label={contactContent.fields.message.label}
                  error={errors.message?.message}
                >
                  <Textarea
                    id={`${formId}-message`}
                    placeholder={contactContent.fields.message.placeholder}
                    variant="inverse"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${formId}-message-error` : undefined
                    }
                    {...register("message")}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="contact-submit-button w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim…" : "Kirim detail proyek"}
                </Button>
              </div>
            </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="contact-field-label">
        {label}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="contact-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
