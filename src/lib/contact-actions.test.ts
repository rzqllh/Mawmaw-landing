import assert from "node:assert/strict";
import test from "node:test";

import {
  createContactActionHref,
  createContactMessage,
  createWizardWhatsappHref,
  escapeHtml,
  toWizardContactSubmission,
  type ContactFormPayload,
} from "./contact-actions.ts";
import { contactFormSchema as wizardContactFormSchema } from "./validations/contact.ts";

const payload: ContactFormPayload = {
  name: "Ayu Lestari",
  email: "ayu@example.com",
  projectType: "Hunian",
  location: "Jakarta Selatan",
  message: "Saya ingin konsultasi desain ruang keluarga dengan nuansa hangat.",
};

test("createContactMessage formats the validated form values", () => {
  assert.equal(
    createContactMessage(payload),
    [
      "Halo Mawmaw Interior, saya ingin konsultasi desain interior.",
      "",
      "Nama: Ayu Lestari",
      "Email: ayu@example.com",
      "Jenis Proyek: Hunian",
      "Lokasi: Jakarta Selatan",
      "Pesan: Saya ingin konsultasi desain ruang keluarga dengan nuansa hangat.",
    ].join("\n")
  );
});

test("createContactActionHref builds a WhatsApp link from form values", () => {
  const href = createContactActionHref("whatsapp", payload, {
    email: "halo@mawmawinterior.com",
    phone: "+62 812-3456-7890",
  });

  assert.equal(href.startsWith("https://wa.me/6281234567890?text="), true);
  assert.equal(decodeURIComponent(href.split("text=")[1]), createContactMessage(payload));
});

test("createContactActionHref builds an email link from form values", () => {
  const href = createContactActionHref("email", payload, {
    email: "halo@mawmawinterior.com",
    phone: "+62 812-3456-7890",
  });

  assert.equal(
    href,
    `mailto:halo@mawmawinterior.com?subject=${encodeURIComponent(
      "Permintaan Konsultasi Mawmaw Interior"
    )}&body=${encodeURIComponent(createContactMessage(payload))}`
  );
});

test("escapeHtml neutralizes user-controlled email markup", () => {
  assert.equal(
    escapeHtml(`<img src=x onerror="alert('x')"> & selesai`),
    "&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt; &amp; selesai"
  );
});

const wizardPayload = {
  services: ["interior-design", "custom-furniture"],
  spaceType: "rumah",
  spaceSize: "100-200",
  stylePreference: "japandi",
  budgetRange: "100-300jt",
  timeline: "1-3bulan",
  location: "jakarta",
  name: "Ayu Lestari",
  phone: "081234567890",
  email: "",
  notes: "Butuh penyimpanan tertutup.",
} as const;

test("wizard schema accepts a complete seven-step submission", () => {
  assert.equal(wizardContactFormSchema.safeParse(wizardPayload).success, true);
});

test("wizard schema rejects a submission missing an earlier step", () => {
  const incompletePayload = { ...wizardPayload, services: [] };
  assert.equal(wizardContactFormSchema.safeParse(incompletePayload).success, false);
});

test("toWizardContactSubmission maps wizard data to the shared persistence shape", () => {
  assert.deepEqual(toWizardContactSubmission(wizardPayload), {
    name: "Ayu Lestari",
    email: "",
    projectType: "interior-design, custom-furniture",
    location: "jakarta",
    style: "japandi",
    estimatedArea: "rumah - 100-200 m²",
    message: [
      "Phone: 081234567890",
      "Budget: 100-300jt",
      "Timeline: 1-3bulan",
      "",
      "Notes:",
      "Butuh penyimpanan tertutup.",
    ].join("\n"),
  });
});

test("createWizardWhatsappHref includes the complete wizard recap", () => {
  const href = createWizardWhatsappHref(wizardPayload, "+62 812-3456-7890");
  const message = decodeURIComponent(href.split("text=")[1]);

  assert.equal(href.startsWith("https://wa.me/6281234567890?text="), true);
  assert.match(message, /Interior Design, Custom Furniture/);
  assert.match(message, /Rumah/);
  assert.match(message, /100–200 m²/);
  assert.match(message, /Ayu Lestari/);
});
