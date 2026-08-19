import assert from "node:assert/strict";
import test from "node:test";

import {
  articleSchema,
  projectSchema,
  serviceSchema,
} from "./validations/admin.ts";

test("articleSchema accepts valid article payload", () => {
  const result = articleSchema.safeParse({
    title: "Ruang Tamu Hangat",
    slug: "ruang-tamu-hangat",
    category: "Inspirasi",
    excerpt: "Panduan menata ruang tamu dengan nuansa Japandi.",
    coverSrc: "https://example.com/cover.jpg",
    coverAlt: "Ruang tamu bernuansa kayu",
    featured: true,
    status: "PUBLISHED",
    content: ["Paragraf pertama artikel."],
  });

  assert.equal(result.success, true);
});

test("articleSchema rejects invalid slug with spaces or uppercase", () => {
  const result = articleSchema.safeParse({
    title: "Ruang Tamu Hangat",
    slug: "Ruang Tamu Hangat!",
    category: "Inspirasi",
    excerpt: "Panduan menata ruang tamu.",
    coverSrc: "https://example.com/cover.jpg",
    coverAlt: "Alt text",
    featured: false,
    status: "DRAFT",
    content: ["Paragraf."],
  });

  assert.equal(result.success, false);
});

test("projectSchema accepts valid project payload", () => {
  const result = projectSchema.safeParse({
    title: "Serenity Residence",
    slug: "serenity-residence",
    category: "Residensial",
    location: "Jakarta Selatan",
    year: "2026",
    excerpt: "Hunian modern bernuansa Japandi.",
    description: "Deskripsi lengkap proyek.",
    coverSrc: "https://example.com/cover.jpg",
    coverAlt: "Tampak depan ruang utama",
    featured: true,
    status: "PUBLISHED",
    gallery: [],
  });

  assert.equal(result.success, true);
});

test("serviceSchema validates slug format and required fields", () => {
  const valid = serviceSchema.safeParse({
    title: "Desain Interior",
    slug: "desain-interior",
    description: "Perencanaan ruang menyeluruh.",
    icon: "house",
  });
  assert.equal(valid.success, true);

  const invalid = serviceSchema.safeParse({
    title: "",
    slug: "Invalid Slug!",
    description: "",
    icon: "",
  });
  assert.equal(invalid.success, false);
});
