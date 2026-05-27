import { createWhatsappLink } from "./whatsapp";

export type ContactChannel = "whatsapp" | "email";

export type ContactFormPayload = {
  name: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
};

type ContactDestination = {
  email: string;
  phone: string;
};

const emailSubject = "Permintaan Konsultasi Mawmaw Interior";

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
