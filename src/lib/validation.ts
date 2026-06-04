import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(80, "Nama terlalu panjang."),
  email: z
    .string()
    .trim()
    .email("Masukkan alamat email yang valid."),
  projectType: z
    .string()
    .trim()
    .min(1, "Pilih jenis proyek."),
  style: z
    .string()
    .trim()
    .optional(),
  estimatedArea: z
    .string()
    .trim()
    .optional(),
  location: z
    .string()
    .trim()
    .min(2, "Lokasi minimal 2 karakter.")
    .max(120, "Lokasi terlalu panjang."),
  message: z
    .string()
    .trim()
    .min(20, "Pesan minimal 20 karakter.")
    .max(900, "Pesan terlalu panjang."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
