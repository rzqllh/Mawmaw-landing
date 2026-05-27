import assert from "node:assert/strict";
import test from "node:test";

import {
  createContactActionHref,
  createContactMessage,
  type ContactFormPayload,
} from "./contact-actions";

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
