import { z } from "zod";

export const step1Schema = z.object({
  services: z.array(z.enum(["interior-design", "custom-furniture", "keduanya"]))
    .min(1, "Pilih setidaknya satu layanan"),
});

export const step2Schema = z.object({
  spaceType: z.enum(["rumah", "apartemen", "kantor"], { message: "Pilih tipe ruangan" }),
  spaceSize: z.enum(["<50", "50-100", "100-200", ">200"], { message: "Pilih estimasi luas ruangan" }),
});

export const step3Schema = z.object({
  stylePreference: z.enum(["modern", "japandi", "klasik", "industrial", "kontemporer"], { message: "Pilih style preferensi" }),
});

export const step4Schema = z.object({
  budgetRange: z.enum(["<100jt", "100-300jt", "300-500jt", ">500jt"], { message: "Pilih estimasi budget" }),
});

export const step5Schema = z.object({
  timeline: z.enum(["asap", "1-3bulan", "3-6bulan", "masih-planning"], { message: "Pilih target timeline" }),
});

export const step6Schema = z.object({
  location: z.enum(["jakarta", "bogor", "depok", "tangerang", "bekasi"], { message: "Pilih lokasi proyek" }),
});

export const step7Schema = z.object({
  name: z.string().min(2, "Nama terlalu pendek").max(100),
  phone: z.string().regex(/^(^\+62|62|^08)(?=.*[0-9]).{9,15}$/, "Format nomor handphone tidak valid"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  notes: z.string().max(500, "Catatan terlalu panjang").optional(),
});

export const contactFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
  ...step5Schema.shape,
  ...step6Schema.shape,
  ...step7Schema.shape,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
