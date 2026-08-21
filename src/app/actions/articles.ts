"use server";

import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { articleSchema } from "@/lib/validations/admin";
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

function parseArticleContent(formData: FormData): string[] {
  const contentRaw = formData.get("content") as string;
  if (contentRaw) {
    try {
      const parsed = JSON.parse(contentRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => String(item));
      }
      return [contentRaw];
    } catch {
      return [contentRaw];
    }
  }

  const plainText = formData.get("contentText") as string;
  if (plainText?.trim()) {
    return [plainText.trim()];
  }

  return [];
}

export async function createArticle(formData: FormData) {
  await requireAuth();

  const publishedAtRaw = formData.get("publishedAt") as string;
  const content = parseArticleContent(formData);

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    coverSrc: formData.get("coverSrc"),
    coverAlt: formData.get("coverAlt"),
    coverBlur: (formData.get("coverBlur") as string) || null,
    featured: formData.get("featured") === "on",
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
    content,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    await db.article.create({
      data: parsed.data,
    });

    revalidatePath("/articles", "page");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug artikel sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal menyimpan artikel. Silakan coba lagi." };
  }
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAuth();

  const publishedAtRaw = formData.get("publishedAt") as string;
  const content = parseArticleContent(formData);

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    coverSrc: formData.get("coverSrc"),
    coverAlt: formData.get("coverAlt"),
    coverBlur: (formData.get("coverBlur") as string) || null,
    featured: formData.get("featured") === "on",
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
    content,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    const existing = await db.article.findUnique({ where: { id } });

    await db.article.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/articles", "page");
    revalidatePath("/", "layout");
    revalidatePath(`/articles/${parsed.data.slug}`, "page");

    if (existing && existing.slug !== parsed.data.slug) {
      revalidatePath(`/articles/${existing.slug}`, "page");
    }

    return { success: true };
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug artikel sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal memperbarui artikel. Silakan coba lagi." };
  }
}

export async function deleteArticle(id: string) {
  await requireAuth();

  try {
    const existing = await db.article.findUnique({ where: { id } });

    await db.article.delete({
      where: { id },
    });

    revalidatePath("/articles", "page");
    revalidatePath("/", "layout");

    if (existing) {
      revalidatePath(`/articles/${existing.slug}`, "page");
    }

    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

export async function previewArticle(slug: string) {
  await requireAuth();

  const article = await db.article.findUnique({
    where: { slug },
    select: { slug: true },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  (await draftMode()).enable();
  redirect(`/articles/${article.slug}`);
}
