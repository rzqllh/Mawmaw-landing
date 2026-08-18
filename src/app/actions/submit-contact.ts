"use server";

import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation";
import { Resend } from "resend";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/rate-limit";
import {
  escapeHtml,
  toWizardContactSubmission,
  type ContactSubmissionInput,
} from "@/lib/contact-actions";
import {
  contactFormSchema as wizardContactFormSchema,
  type ContactFormData as WizardContactFormData,
} from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

async function persistContactSubmission(data: ContactSubmissionInput) {
  if (ratelimit) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi nanti." };
    }
  }

  try {
    await db.contactSubmission.create({ data });
  } catch (error) {
    console.error("Failed to save contact submission", error);
    return {
      success: false,
      error: "Permintaan belum tersimpan. Silakan coba lagi atau hubungi kami lewat WhatsApp.",
    };
  }

  if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL) {
    try {
      const safeName = escapeHtml(data.name);
      const safeEmail = escapeHtml(data.email || "Tidak diberikan");
      const safeProjectType = escapeHtml(data.projectType);
      const safeStyle = data.style ? escapeHtml(data.style) : "";
      const safeEstimatedArea = data.estimatedArea ? escapeHtml(data.estimatedArea) : "";
      const safeLocation = escapeHtml(data.location);
      const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        subject: `New Lead: ${data.name.replace(/[\r\n]/g, " ")} - ${data.projectType.replace(/[\r\n]/g, " ")}`,
        html: `
          <h2>Pesan Baru dari Mawmaw Interior</h2>
          <p><strong>Nama:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Jenis Proyek:</strong> ${safeProjectType}</p>
          ${safeStyle ? `<p><strong>Style Favorit:</strong> ${safeStyle}</p>` : ""}
          ${safeEstimatedArea ? `<p><strong>Estimasi Luas:</strong> ${safeEstimatedArea}</p>` : ""}
          <p><strong>Lokasi:</strong> ${safeLocation}</p>
          <p><strong>Pesan:</strong></p>
          <p>${safeMessage}</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send email notification", error);
    }
  }

  return { success: true };
}

export async function submitContactForm(formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    style: formData.get("style") || undefined,
    estimatedArea: formData.get("estimatedArea") || undefined,
    location: formData.get("location"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { success: false, error: "Data form tidak valid. Silakan periksa kembali." };
  }

  return persistContactSubmission(validatedFields.data);
}

export async function submitWizardContactForm(data: WizardContactFormData) {
  const validatedFields = wizardContactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Data form tidak valid. Silakan periksa kembali.",
    };
  }

  return persistContactSubmission(
    toWizardContactSubmission(validatedFields.data)
  );
}
