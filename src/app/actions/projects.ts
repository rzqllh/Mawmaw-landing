"use server";

import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Helper for auth check
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
}

function parseGallery(formData: FormData) {
  const galleryRaw = formData.get("gallery") as string;
  if (galleryRaw) {
    try {
      const parsed = JSON.parse(galleryRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const gallery = parseGallery(formData);

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    location: formData.get("location"),
    year: formData.get("year"),
    excerpt: formData.get("excerpt"),
    description: formData.get("description"),
    coverSrc: formData.get("coverSrc"),
    coverAlt: formData.get("coverAlt"),
    coverBlur: (formData.get("coverBlur") as string) || null,
    featured: formData.get("featured") === "on",
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    gallery,
    scope: [],
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    await db.project.create({
      data: parsed.data,
    });

    revalidatePath("/", "layout");
    revalidatePath("/projects", "page");

    return { success: true };
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug proyek sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal menyimpan proyek. Silakan coba lagi." };
  }
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const gallery = parseGallery(formData);

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    location: formData.get("location"),
    year: formData.get("year"),
    excerpt: formData.get("excerpt"),
    description: formData.get("description"),
    coverSrc: formData.get("coverSrc"),
    coverAlt: formData.get("coverAlt"),
    coverBlur: (formData.get("coverBlur") as string) || null,
    featured: formData.get("featured") === "on",
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    gallery,
    scope: [],
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    await db.project.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/", "layout");
    revalidatePath("/projects", "page");
    revalidatePath(`/projects/${parsed.data.slug}`, "page");

    return { success: true };
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug proyek sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal memperbarui proyek. Silakan coba lagi." };
  }
}

export async function deleteProject(id: string) {
  await requireAuth();

  try {
    await db.project.delete({
      where: { id },
    });

    revalidatePath("/", "layout");
    revalidatePath("/projects", "page");

    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus proyek." };
  }
}

export async function previewProject(slug: string) {
  await requireAuth();

  const project = await db.project.findUnique({
    where: { slug },
    select: { slug: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  (await draftMode()).enable();
  redirect(`/projects/${project.slug}`);
}
