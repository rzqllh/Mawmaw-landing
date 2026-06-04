"use server";

import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation";
import { Resend } from "resend";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  // 1. Server-side Zod validation
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

  const { name, email, projectType, style, estimatedArea, location, message } = validatedFields.data;

  // 2. Rate limiting check (Upstash Redis)
  // Disable rate limiting locally if UPSTASH_REDIS_REST_URL is missing to avoid crashes during development
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi nanti." };
    }
  }

  // 3. Simpan ke database
  await db.contactSubmission.create({ data: validatedFields.data });

  // 4. Kirim notifikasi email ke admin (Graceful fallback)
  if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        subject: `New Lead: ${name} - ${projectType}`,
        html: `
          <h2>Pesan Baru dari Mawmaw Interior</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Jenis Proyek:</strong> ${projectType}</p>
          ${style ? `<p><strong>Style Favorit:</strong> ${style}</p>` : ""}
          ${estimatedArea ? `<p><strong>Estimasi Luas:</strong> ${estimatedArea}</p>` : ""}
          <p><strong>Lokasi:</strong> ${location}</p>
          <p><strong>Pesan:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send email notification", error);
      // Fail silently, data is already persisted
    }
  }

  return { success: true };
}
