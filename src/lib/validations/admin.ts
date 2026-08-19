import { z } from "zod";

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articleSchema = z.object({
  title: z.string().trim().min(1, "Judul artikel wajib diisi").max(200, "Judul maksimal 200 karakter"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .max(120, "Slug maksimal 120 karakter")
    .regex(slugRegex, "Format slug harus berupa huruf kecil, angka, dan tanda hubung (contoh: ruang-tamu-modern)"),
  category: z.string().trim().min(1, "Kategori wajib diisi").max(80),
  excerpt: z.string().trim().min(1, "Ringkasan wajib diisi").max(500),
  coverSrc: z.string().trim().min(1, "URL cover gambar wajib diisi"),
  coverAlt: z.string().trim().min(1, "Deskripsi gambar cover (alt) wajib diisi").max(200),
  coverBlur: z.string().trim().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  publishedAt: z.date().default(() => new Date()),
  content: z.array(z.string()).min(1, "Konten artikel tidak boleh kosong"),
});

export type ArticleInput = z.infer<typeof articleSchema>;

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Judul proyek wajib diisi").max(200, "Judul maksimal 200 karakter"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .max(120, "Slug maksimal 120 karakter")
    .regex(slugRegex, "Format slug harus berupa huruf kecil, angka, dan tanda hubung (contoh: serenity-residence)"),
  category: z.string().trim().min(1, "Kategori wajib diisi").max(80),
  location: z.string().trim().min(1, "Lokasi wajib diisi").max(120),
  year: z.string().trim().min(1, "Tahun wajib diisi").max(20),
  excerpt: z.string().trim().min(1, "Ringkasan wajib diisi").max(500),
  description: z.string().trim().min(1, "Deskripsi lengkap wajib diisi"),
  coverSrc: z.string().trim().min(1, "URL cover gambar wajib diisi"),
  coverAlt: z.string().trim().min(1, "Deskripsi gambar cover (alt) wajib diisi").max(200),
  coverBlur: z.string().trim().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  gallery: z.array(z.any()).default([]),
  scope: z.array(z.string()).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Judul layanan wajib diisi").max(120, "Judul maksimal 120 karakter"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .max(120, "Slug maksimal 120 karakter")
    .regex(slugRegex, "Format slug harus berupa huruf kecil, angka, dan tanda hubung (contoh: desain-interior)"),
  description: z.string().trim().min(1, "Deskripsi layanan wajib diisi"),
  icon: z.string().trim().min(1, "Icon layanan wajib diisi").max(60),
  imageSrc: z.string().trim().optional().nullable(),
  imageAlt: z.string().trim().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
