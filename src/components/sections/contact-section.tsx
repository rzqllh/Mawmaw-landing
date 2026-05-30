"use client";

import { useId, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { contactContent, siteConfig } from "@/data/public-content";
import {
  createContactActionHref,
  type ContactChannel,
} from "@/lib/contact-actions";
import { openConfirmedWhatsappLink } from "@/lib/external-links";
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
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(
    null
  );

  const {
    register,
    control,
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
      if (!openConfirmedWhatsappLink(href)) {
        setActiveChannel(null);
        return;
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
    <section id="kontak" className="section-y contact-section">
      <div className="section-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-gold-300">
                {contactContent.label}
              </p>

              <h2 className="contact-copy-title">{contactContent.title}</h2>

              <p className="contact-copy-description">
                {contactContent.description}
              </p>

              <div className="mt-8 grid gap-3">
                {contactContent.trustBullets.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="contact-trust-icon">
                      <IconGlyph
                        name={item.icon}
                        aria-hidden
                        className="h-5 w-5"
                        weight="duotone"
                      />
                    </span>

                    <span className="contact-trust-text">{item.label}</span>
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
                    className="contact-field-dark"
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
                    className="contact-field-dark"
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
                          className="contact-field-dark contact-select-trigger"
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
                          className="contact-select-content"
                        >
                          {contactContent.projectTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="contact-select-item"
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
                    className="contact-field-dark"
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
                    className="contact-field-dark"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${formId}-message-error` : undefined
                    }
                    {...register("message")}
                  />
                </Field>
              </div>

              <div className="mt-6 grid gap-3">
                <Button
                  type="button"
                  size="lg"
                  className="dark-outline-button contact-submit-button"
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
      <label htmlFor={id} className="contact-field-label">
        {label}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} className="contact-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}