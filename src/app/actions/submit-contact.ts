"use server";

import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation";
import { Resend } from "resend";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: unknown) {
  // 1. Server-side Zod validation
  const parsed = contactFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "Data form tidak valid. Silakan periksa kembali." };
  }

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
  await db.contactSubmission.create({ data: parsed.data });

  // 4. Kirim notifikasi email ke admin (Graceful fallback)
  if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        subject: `Konsultasi Baru: ${parsed.data.name}`,
        text: `Nama: ${parsed.data.name}\nEmail: ${parsed.data.email}\nJenis: ${parsed.data.projectType}\nLokasi: ${parsed.data.location}\nPesan:\n${parsed.data.message}`,
      });
    } catch (error) {
      console.error("Failed to send email notification", error);
      // Fail silently, data is already persisted
    }
  }

  return { success: true };
}
