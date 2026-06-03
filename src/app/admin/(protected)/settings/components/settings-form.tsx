"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import {
  ArrowSquareOut,
  CheckCircle,
  FloppyDisk,
} from "@phosphor-icons/react";
import { AdminInput } from "@/components/admin/ui/admin-input";
import { AdminTextarea } from "@/components/admin/ui/admin-textarea";
import { toast } from "sonner";
import { updateSiteSettings } from "@/app/actions/settings";
import { AdminLabel } from "@/components/admin/ui/admin-label";
import { AdminCard } from "@/components/admin/ui/admin-card";
import { Button } from "@/components/ui/button";
import { type SiteSetting } from "@prisma/client";

type SettingsProps = {
  initialData: Partial<SiteSetting> & { 
    socials?: Record<string, string>;
    heroStatCards?: Array<{ label: string; value: string; description: string; icon: string }>;
    aboutValues?: Array<{ title: string; description: string; icon: string }>;
  };
};

const FormInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string | boolean }>(({ label, error, ...props }, ref) => (
  <div className="space-y-1.5 w-full">
    {label && <AdminLabel>{label}</AdminLabel>}
    <AdminInput ref={ref} {...props} error={!!error} />
    {error && typeof error === "string" && <p className="text-red-500 text-[11px] font-semibold">{error}</p>}
  </div>
));
FormInput.displayName = "FormInput";

const FormTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string | boolean }>(({ label, error, ...props }, ref) => (
  <div className="space-y-1.5 w-full">
    {label && <AdminLabel>{label}</AdminLabel>}
    <AdminTextarea ref={ref} {...props} error={!!error} />
    {error && typeof error === "string" && <p className="text-red-500 text-[11px] font-semibold">{error}</p>}
  </div>
));
FormTextarea.displayName = "FormTextarea";

export function SettingsForm({ initialData }: SettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "about" | "sections" | "footer">("general");

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      siteName: initialData.siteName || "",
      siteDescription: initialData.siteDescription || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      
      heroTitle: initialData.heroTitle || "",
      heroDescription: initialData.heroDescription || "",
      heroImageSrc: initialData.heroImageSrc || "",
      heroImageAlt: initialData.heroImageAlt || "",

      aboutLabel: initialData.aboutLabel || "",
      aboutTitle: initialData.aboutTitle || "",
      aboutDescription: initialData.aboutDescription || "",
      aboutImageSrc: initialData.aboutImageSrc || "",
      aboutImageAlt: initialData.aboutImageAlt || "",
      aboutBadgeTitle: initialData.aboutBadgeTitle || "",
      aboutBadgeDesc: initialData.aboutBadgeDesc || "",

      servicesLabel: initialData.servicesLabel || "",
      servicesTitle: initialData.servicesTitle || "",
      servicesDesc: initialData.servicesDesc || "",
      projectsLabel: initialData.projectsLabel || "",
      projectsTitle: initialData.projectsTitle || "",
      projectsDesc: initialData.projectsDesc || "",
      articlesLabel: initialData.articlesLabel || "",
      articlesTitle: initialData.articlesTitle || "",
      articlesDesc: initialData.articlesDesc || "",

      contactTitle: initialData.contactTitle || "",
      contactDesc: initialData.contactDesc || "",
      footerHeadline: initialData.footerHeadline || "",
      footerSummary: initialData.footerSummary || "",
      copyright: initialData.copyright || "",

      socials: [
        { network: "instagram", url: initialData.socials?.instagram || "" },
        { network: "pinterest", url: initialData.socials?.pinterest || "" },
        { network: "behance", url: initialData.socials?.behance || "" },
      ],
      heroStatCards: initialData.heroStatCards || [],
      aboutValues: initialData.aboutValues || [],
    }
  });

  const { fields: socialFields } = useFieldArray({ control, name: "socials" });
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "heroStatCards" });
  const { fields: valueFields, append: appendValue, remove: removeValue } = useFieldArray({ control, name: "aboutValues" });

  const onSubmit = (data: Record<string, unknown>) => {
    startTransition(async () => {
      const formData = new FormData();
      
      // Basic text fields
      Object.keys(data).forEach(key => {
        if (key !== "socials" && key !== "heroStatCards" && key !== "aboutValues") {
          formData.append(key, String(data[key]));
        }
      });

      // Parse socials array back to object
      const socialsObj: Record<string, string> = {};
      const socialsArray = data.socials as Array<{ network: string; url: string }>;
      socialsArray.forEach((item) => {
        if (item.url) socialsObj[item.network] = item.url;
      });

      formData.append("socialsJson", JSON.stringify(socialsObj));
      formData.append("heroStatCardsJson", JSON.stringify(data.heroStatCards));
      formData.append("aboutValuesJson", JSON.stringify(data.aboutValues));

      const result = await updateSiteSettings(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Pengaturan berhasil disimpan.");
      }
    });
  };

  const tabs = [
    { id: "general", label: "Umum & SEO", desc: "Nama situs, deskripsi, sosial media" },
    { id: "hero", label: "Hero", desc: "Judul utama dan statistik" },
    { id: "about", label: "Tentang Studio", desc: "Profil, gambar, dan values" },
    { id: "sections", label: "Judul Section", desc: "Label untuk services, projects, dll" },
    { id: "footer", label: "Kontak & Footer", desc: "Formulir kontak dan area footer" },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-forest-900/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-forest-900">
            Pengaturan Website
          </h1>
          <p className="mt-1.5 text-sm text-text-secondary">
            Atur seluruh konten statis, teks landing page, dan info umum website.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-forest-900/50 hover:text-forest-900 transition-colors px-3 py-2 rounded-lg hover:bg-forest-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
          >
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
            Lihat Website
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isPending}
            className="shadow-sm bg-forest-900 text-white hover:bg-forest-800"
          >
            <FloppyDisk weight="bold" className="w-4 h-4 mr-2" />
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>

      {/* Side-nav + Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        {/* Tab Navigation (Side) */}
        <nav className="space-y-2 lg:sticky lg:top-24" aria-label="Tab pengaturan">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-colors border ${
                activeTab === tab.id
                  ? "bg-forest-900 text-gold-300 border-forest-900"
                  : "bg-white text-forest-900 hover:bg-forest-900/5 border-forest-900/10"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50`}
            >
              <div className="text-sm font-bold">{tab.label}</div>
              <div className={`text-xs mt-0.5 ${activeTab === tab.id ? "text-gold-300/70" : "text-forest-900/50"}`}>
                {tab.desc}
              </div>
            </button>
          ))}
        </nav>

        {/* Active Tab Content */}
        <AdminCard className="p-8">
          {/* === GENERAL TAB === */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Pengaturan Umum</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Nama Situs" {...register("siteName")} error={errors.siteName?.message as string} />
                <FormInput label="Email Utama" type="email" {...register("email")} error={errors.email?.message as string} />
                <div className="md:col-span-2">
                  <FormTextarea label="Deskripsi Situs (SEO)" {...register("siteDescription")} error={errors.siteDescription?.message as string} />
                </div>
                <FormInput label="Nomor Telepon (WhatsApp)" {...register("phone")} />
                <FormInput label="Alamat Studio" {...register("address")} />
              </div>

              <h3 className="text-lg font-bold text-forest-900 mt-8 mb-4 border-t border-forest-900/10 pt-6">Sosial Media</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {socialFields.map((field, index) => (
                  <div key={field.id}>
                    <FormInput label={`URL ${field.network}`} {...register(`socials.${index}.url` as const)} placeholder={`https://${field.network}.com/...`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === HERO TAB === */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Hero Section</h2>
              <FormInput label="Hero Title" {...register("heroTitle")} error={errors.heroTitle?.message as string} />
              <FormTextarea label="Hero Description" {...register("heroDescription")} error={errors.heroDescription?.message as string} />
              
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <FormInput label="URL Gambar Hero" {...register("heroImageSrc")} error={errors.heroImageSrc?.message as string} placeholder="https://..." />
                <FormInput label="Alt Text Gambar" {...register("heroImageAlt")} />
              </div>

              <div className="pt-8 border-t border-forest-900/10">
                <div className="flex justify-between items-center mb-4">
                  <AdminLabel>Statistik / Highlights</AdminLabel>
                  <button
                    type="button"
                    onClick={() => appendStat({ label: "", value: "", description: "", icon: "seal" })}
                    className="text-xs bg-forest-900/5 text-forest-900 px-3 py-1.5 rounded-md font-bold hover:bg-forest-900/10 transition-colors"
                  >
                    + Tambah Stat
                  </button>
                </div>
                <div className="space-y-4">
                  {statFields.map((item, index) => (
                    <div key={item.id} className="flex gap-4 items-start bg-forest-900/[0.02] p-4 rounded-xl border border-forest-900/10">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Label (Cth: Proyek Selesai)" {...register(`heroStatCards.${index}.label`)} />
                          <FormInput label="Value (Cth: 150+)" {...register(`heroStatCards.${index}.value`)} />
                        </div>
                        <FormInput label="Deskripsi Pendek" {...register(`heroStatCards.${index}.description`)} />
                      </div>
                      <button type="button" onClick={() => removeStat(index)} className="text-red-500 font-bold p-2 hover:bg-red-50 rounded-lg mt-6">X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === ABOUT TAB === */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Tentang Studio</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Label Kecil (Eyebrow)" {...register("aboutLabel")} />
                <FormInput label="Judul Besar" {...register("aboutTitle")} error={errors.aboutTitle?.message as string} />
                <div className="md:col-span-2">
                  <FormTextarea label="Deskripsi Profil" {...register("aboutDescription")} error={errors.aboutDescription?.message as string} />
                </div>
                <FormInput label="URL Gambar Profil" {...register("aboutImageSrc")} error={errors.aboutImageSrc?.message as string} />
                <FormInput label="Alt Text Gambar" {...register("aboutImageAlt")} />
                <FormInput label="Teks Lencana (Badge Title)" {...register("aboutBadgeTitle")} placeholder="Opsional" />
                <FormInput label="Deskripsi Lencana" {...register("aboutBadgeDesc")} placeholder="Opsional" />
              </div>

              <div className="pt-8 border-t border-forest-900/10">
                <div className="flex justify-between items-center mb-4">
                  <AdminLabel>Nilai-Nilai Studio (Values)</AdminLabel>
                  <button
                    type="button"
                    onClick={() => appendValue({ title: "", description: "", icon: "heart" })}
                    className="text-xs bg-forest-900/5 text-forest-900 px-3 py-1.5 rounded-md font-bold hover:bg-forest-900/10 transition-colors"
                  >
                    + Tambah Value
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {valueFields.map((item, index) => (
                    <div key={item.id} className="bg-forest-900/[0.02] p-4 rounded-xl border border-forest-900/10 relative pr-12">
                      <FormInput label="Judul" {...register(`aboutValues.${index}.title`)} />
                      <div className="mt-4">
                        <FormInput label="Deskripsi" {...register(`aboutValues.${index}.description`)} />
                      </div>
                      <button type="button" onClick={() => removeValue(index)} className="absolute right-2 top-2 text-red-500 font-bold p-2 hover:bg-red-50 rounded-lg">X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === SECTIONS TAB === */}
          {activeTab === "sections" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Bagian Layanan</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Label (Eyebrow)" {...register("servicesLabel")} />
                  <FormInput label="Judul" {...register("servicesTitle")} />
                  <div className="md:col-span-2">
                    <FormTextarea label="Deskripsi Pendek" {...register("servicesDesc")} />
                  </div>
                </div>
              </div>

              <div className="border-t border-forest-900/10 pt-8">
                <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Bagian Proyek</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Label (Eyebrow)" {...register("projectsLabel")} />
                  <FormInput label="Judul" {...register("projectsTitle")} />
                  <div className="md:col-span-2">
                    <FormTextarea label="Deskripsi Pendek" {...register("projectsDesc")} />
                  </div>
                </div>
              </div>

              <div className="border-t border-forest-900/10 pt-8">
                <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Bagian Artikel</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Label (Eyebrow)" {...register("articlesLabel")} />
                  <FormInput label="Judul" {...register("articlesTitle")} />
                  <div className="md:col-span-2">
                    <FormTextarea label="Deskripsi Pendek" {...register("articlesDesc")} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === FOOTER TAB === */}
          {activeTab === "footer" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Formulir Kontak</h2>
                <div className="grid gap-6">
                  <FormInput label="Judul Bagian Kontak" {...register("contactTitle")} />
                  <FormTextarea label="Teks Penjelasan" {...register("contactDesc")} />
                </div>
              </div>

              <div className="border-t border-forest-900/10 pt-8">
                <h2 className="text-2xl font-serif text-forest-900 font-semibold mb-6">Footer Global</h2>
                <div className="grid gap-6">
                  <FormInput label="Headline Besar" {...register("footerHeadline")} />
                  <FormTextarea label="Teks Summary" {...register("footerSummary")} />
                  <FormInput label="Teks Copyright" {...register("copyright")} />
                </div>
              </div>
            </div>
          )}
        </AdminCard>
      </div>
    </form>
  );
}
