"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/queries";

const settingsSchema = z.object({
  // SEO & General
  siteName: z.string().min(1, "Nama situs wajib diisi"),
  siteDescription: z.string().min(1, "Deskripsi wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string(),
  address: z.string(),
  
  // JSONs (we accept strings from the form and parse them, or just objects if we handle it cleanly)
  socialsJson: z.string(), // We'll parse this on server
  
  // Hero
  heroTitle: z.string().min(1, "Hero title wajib diisi"),
  heroDescription: z.string().min(1, "Hero deskripsi wajib diisi"),
  heroImageSrc: z.string().url("URL gambar tidak valid"),
  heroImageAlt: z.string(),
  heroStatCardsJson: z.string(),

  // About
  aboutLabel: z.string(),
  aboutTitle: z.string().min(1, "About title wajib diisi"),
  aboutDescription: z.string().min(1, "About deskripsi wajib diisi"),
  aboutImageSrc: z.string().url("URL gambar tidak valid"),
  aboutImageAlt: z.string(),
  aboutBadgeTitle: z.string().optional().nullable(),
  aboutBadgeDesc: z.string().optional().nullable(),
  aboutValuesJson: z.string(),

  // Sections
  servicesLabel: z.string(),
  servicesTitle: z.string(),
  servicesDesc: z.string(),
  projectsLabel: z.string(),
  projectsTitle: z.string(),
  projectsDesc: z.string(),
  articlesLabel: z.string(),
  articlesTitle: z.string(),
  articlesDesc: z.string(),

  // Footer & Contact
  contactTitle: z.string(),
  contactDesc: z.string(),
  footerHeadline: z.string(),
  footerSummary: z.string(),
  copyright: z.string(),
});

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Ensure record exists
  await getSiteSettings();

  const data = {
    siteName: formData.get("siteName") as string,
    siteDescription: formData.get("siteDescription") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    socialsJson: formData.get("socialsJson") as string,

    heroTitle: formData.get("heroTitle") as string,
    heroDescription: formData.get("heroDescription") as string,
    heroImageSrc: formData.get("heroImageSrc") as string,
    heroImageAlt: formData.get("heroImageAlt") as string,
    heroStatCardsJson: formData.get("heroStatCardsJson") as string,

    aboutLabel: formData.get("aboutLabel") as string,
    aboutTitle: formData.get("aboutTitle") as string,
    aboutDescription: formData.get("aboutDescription") as string,
    aboutImageSrc: formData.get("aboutImageSrc") as string,
    aboutImageAlt: formData.get("aboutImageAlt") as string,
    aboutBadgeTitle: formData.get("aboutBadgeTitle") as string,
    aboutBadgeDesc: formData.get("aboutBadgeDesc") as string,
    aboutValuesJson: formData.get("aboutValuesJson") as string,

    servicesLabel: formData.get("servicesLabel") as string,
    servicesTitle: formData.get("servicesTitle") as string,
    servicesDesc: formData.get("servicesDesc") as string,
    projectsLabel: formData.get("projectsLabel") as string,
    projectsTitle: formData.get("projectsTitle") as string,
    projectsDesc: formData.get("projectsDesc") as string,
    articlesLabel: formData.get("articlesLabel") as string,
    articlesTitle: formData.get("articlesTitle") as string,
    articlesDesc: formData.get("articlesDesc") as string,

    contactTitle: formData.get("contactTitle") as string,
    contactDesc: formData.get("contactDesc") as string,
    footerHeadline: formData.get("footerHeadline") as string,
    footerSummary: formData.get("footerSummary") as string,
    copyright: formData.get("copyright") as string,
  };

  const parsed = settingsSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Data tidak valid", details: parsed.error.flatten() };
  }

  try {
    const socials = JSON.parse(parsed.data.socialsJson);
    const heroStatCards = JSON.parse(parsed.data.heroStatCardsJson);
    const aboutValues = JSON.parse(parsed.data.aboutValuesJson);

    await db.siteSetting.update({
      where: { id: "global" },
      data: {
        siteName: parsed.data.siteName,
        siteDescription: parsed.data.siteDescription,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        socials: socials,

        heroTitle: parsed.data.heroTitle,
        heroDescription: parsed.data.heroDescription,
        heroImageSrc: parsed.data.heroImageSrc,
        heroImageAlt: parsed.data.heroImageAlt,
        heroStatCards: heroStatCards,

        aboutLabel: parsed.data.aboutLabel,
        aboutTitle: parsed.data.aboutTitle,
        aboutDescription: parsed.data.aboutDescription,
        aboutImageSrc: parsed.data.aboutImageSrc,
        aboutImageAlt: parsed.data.aboutImageAlt,
        aboutBadgeTitle: parsed.data.aboutBadgeTitle || null,
        aboutBadgeDesc: parsed.data.aboutBadgeDesc || null,
        aboutValues: aboutValues,

        servicesLabel: parsed.data.servicesLabel,
        servicesTitle: parsed.data.servicesTitle,
        servicesDesc: parsed.data.servicesDesc,
        projectsLabel: parsed.data.projectsLabel,
        projectsTitle: parsed.data.projectsTitle,
        projectsDesc: parsed.data.projectsDesc,
        articlesLabel: parsed.data.articlesLabel,
        articlesTitle: parsed.data.articlesTitle,
        articlesDesc: parsed.data.articlesDesc,

        contactTitle: parsed.data.contactTitle,
        contactDesc: parsed.data.contactDesc,
        footerHeadline: parsed.data.footerHeadline,
        footerSummary: parsed.data.footerSummary,
        copyright: parsed.data.copyright,
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Settings Update Error:", error);
    return { error: error instanceof Error ? error.message : "Gagal menyimpan pengaturan" };
  }
}
