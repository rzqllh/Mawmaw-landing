import { createWhatsappLink } from "./whatsapp.ts";

export type ContactChannel = "whatsapp" | "email";

export type ContactFormPayload = {
  name: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
};

export type WizardContactPayload = {
  services: readonly string[];
  spaceType: string;
  spaceSize: string;
  stylePreference: string;
  budgetRange: string;
  timeline: string;
  location: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export type ContactSubmissionInput = {
  name: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
  style?: string;
  estimatedArea?: string;
};

type ContactDestination = {
  email: string;
  phone: string;
};

const emailSubject = "Permintaan Konsultasi Mawmaw Interior";

const wizardLabels: Record<string, string> = {
  "interior-design": "Interior Design",
  "custom-furniture": "Custom Furniture",
  keduanya: "Interior Design & Custom Furniture",
  rumah: "Rumah",
  apartemen: "Apartemen",
  kantor: "Kantor",
  "<50": "<50 m²",
  "50-100": "50–100 m²",
  "100-200": "100–200 m²",
  ">200": ">200 m²",
  modern: "Modern",
  japandi: "Japandi",
  klasik: "Klasik",
  industrial: "Industrial",
  kontemporer: "Kontemporer",
  "<100jt": "< Rp100 juta",
  "100-300jt": "Rp100–300 juta",
  "300-500jt": "Rp300–500 juta",
  ">500jt": "> Rp500 juta",
  asap: "Secepatnya",
  "1-3bulan": "1–3 bulan",
  "3-6bulan": "3–6 bulan",
  "masih-planning": "Masih merencanakan",
  jakarta: "Jakarta",
  bogor: "Bogor",
  depok: "Depok",
  tangerang: "Tangerang",
  bekasi: "Bekasi",
};

export function getWizardLabel(value: string) {
  return wizardLabels[value] ?? value;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export function toWizardContactSubmission(
  values: WizardContactPayload
): ContactSubmissionInput {
  return {
    name: values.name,
    email: values.email ?? "",
    projectType: values.services.join(", "),
    location: values.location,
    style: values.stylePreference,
    estimatedArea: `${values.spaceType} - ${values.spaceSize} m²`,
    message: [
      `Phone: ${values.phone}`,
      `Budget: ${values.budgetRange}`,
      `Timeline: ${values.timeline}`,
      "",
      "Notes:",
      values.notes || "Tidak ada catatan tambahan.",
    ].join("\n"),
  };
}

export function createWizardWhatsappHref(
  values: WizardContactPayload,
  phone: string
) {
  const services = values.services.map(getWizardLabel).join(", ");
  const message = [
    "Halo Mawmaw Interior, saya ingin konsultasi.",
    "",
    `Layanan: ${services}`,
    `Tipe ruang: ${getWizardLabel(values.spaceType)}`,
    `Luas: ${getWizardLabel(values.spaceSize)}`,
    `Gaya: ${getWizardLabel(values.stylePreference)}`,
    `Budget: ${getWizardLabel(values.budgetRange)}`,
    `Timeline: ${getWizardLabel(values.timeline)}`,
    `Lokasi: ${getWizardLabel(values.location)}`,
    "",
    `Nama: ${values.name}`,
    `No. WhatsApp: ${values.phone}`,
    values.notes ? `Catatan: ${values.notes}` : "",
  ].filter(Boolean).join("\n");

  return createWhatsappLink(phone, message);
}

export function createContactMessage(values: ContactFormPayload) {
  return [
    "Halo Mawmaw Interior, saya ingin konsultasi desain interior.",
    "",
    `Nama: ${values.name}`,
    `Email: ${values.email}`,
    `Jenis Proyek: ${values.projectType}`,
    `Lokasi: ${values.location}`,
    `Pesan: ${values.message}`,
  ].join("\n");
}

export function createContactActionHref(
  channel: ContactChannel,
  values: ContactFormPayload,
  destination: ContactDestination
) {
  const message = createContactMessage(values);

  if (channel === "whatsapp") {
    return createWhatsappLink(destination.phone, message);
  }

  return `mailto:${destination.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(message)}`;
}
