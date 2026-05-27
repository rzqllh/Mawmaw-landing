"use client";

import { useId, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretDown, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactContent, siteConfig } from "@/data/public-content";
import {
  createContactActionHref,
  type ContactChannel,
} from "@/lib/contact-actions";
import { IconGlyph } from "@/lib/icons";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  location: "",
  message: "",
};

export function ContactSection() {
  const formId = useId();
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  function onSubmit(values: ContactFormValues, channel: ContactChannel) {
    const href = createContactActionHref(channel, values, {
      email: siteConfig.email,
      phone: siteConfig.phone ?? "",
    });

    setActiveChannel(channel);

    if (channel === "whatsapp") {
      const opened = window.open(href, "_blank", "noopener,noreferrer");

      if (!opened) {
        window.location.assign(href);
      }
    } else {
      window.location.assign(href);
    }

    toast.info(contactContent.handoffToast[channel]);

    window.setTimeout(() => setActiveChannel(null), 800);
  }

  function onInvalid() {
    toast.error(contactContent.errorToast);
  }

  return (
    <section id="kontak" className="section-y scroll-mt-28 bg-background-muted">
      <div className="section-container">
        <div className="grid gap-10 rounded-2xl bg-forest-900 p-5 text-text-inverse shadow-soft md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-sm font-semibold uppercase text-gold-300">
                {contactContent.label}
              </p>
              <h2 className="font-serif text-[clamp(2.35rem,5vw,4.8rem)] leading-[0.95] text-balance">
                {contactContent.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-text-inverse/76">
                {contactContent.description}
              </p>
              <div className="mt-8 grid gap-3">
                {contactContent.trustBullets.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-gold-500/14 text-gold-300">
                        <IconGlyph name={item.icon} aria-hidden className="h-5 w-5" weight="duotone" />
                      </span>
                      <span className="text-sm text-text-inverse/82">
                        {item.label}
                      </span>
                    </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              noValidate
              onSubmit={handleSubmit(
                (values) => onSubmit(values, "whatsapp"),
                onInvalid
              )}
              className="rounded-xl bg-surface p-5 text-forest-900 shadow-glass md:p-7"
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
                  <div className="relative">
                    <Select
                      id={`${formId}-projectType`}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={
                        errors.projectType
                          ? `${formId}-projectType-error`
                          : undefined
                      }
                      defaultValue=""
                      {...register("projectType")}
                    >
                      <option value="" disabled>
                        {contactContent.fields.projectType.placeholder}
                      </option>
                      {contactContent.projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <CaretDown aria-hidden className="h-4 w-4" weight="bold" />
                    </span>
                  </div>
                </Field>

                <Field
                  id={`${formId}-location`}
                  label={contactContent.fields.location.label}
                  error={errors.location?.message}
                >
                  <Input
                    id={`${formId}-location`}
                    placeholder={contactContent.fields.location.placeholder}
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
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${formId}-message-error` : undefined
                    }
                    {...register("message")}
                  />
                </Field>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || Boolean(activeChannel)}
                >
                  <IconGlyph
                    name="whatsapp"
                    aria-hidden
                    className="h-5 w-5"
                    weight="duotone"
                  />
                  {activeChannel === "whatsapp"
                    ? contactContent.loadingLabels.whatsapp
                    : contactContent.submitLabels.whatsapp}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  disabled={isSubmitting || Boolean(activeChannel)}
                  onClick={handleSubmit(
                    (values) => onSubmit(values, "email"),
                    onInvalid
                  )}
                >
                  <EnvelopeSimple
                    aria-hidden
                    className="h-5 w-5"
                    weight="duotone"
                  />
                  {activeChannel === "email"
                    ? contactContent.loadingLabels.email
                    : contactContent.submitLabels.email}
                </Button>
              </div>
            </form>
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
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
