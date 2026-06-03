"use server";

import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Helper for auth check
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
}

export async function createArticle(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverSrc = formData.get("coverSrc") as string;
  const coverAlt = formData.get("coverAlt") as string;
  const coverBlur = formData.get("coverBlur") as string;
  const featured = formData.get("featured") === "on";
  
  const publishedAtRaw = formData.get("publishedAt") as string;
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date();

  // Content is parsed as a JSON array of strings
  const contentRaw = formData.get("content") as string;
  let content = [];
  if (contentRaw) {
    try { 
      content = JSON.parse(contentRaw); 
    } catch (e) {
      // Fallback: split by newline if not valid JSON
      content = contentRaw.split('\n').map(p => p.trim()).filter(Boolean);
    }
  } else {
    // Also fallback to a 'content' text area if we just use a regular textarea
    const plainText = formData.get("contentText") as string;
    if (plainText) {
      content = plainText.split('\n').map(p => p.trim()).filter(Boolean);
    }
  }

  await db.article.create({
    data: {
      slug,
      title,
      category,
      excerpt,
      coverSrc,
      coverAlt,
      coverBlur: coverBlur || null,
      featured,
      publishedAt,
      content,
    }
  });

  revalidatePath("/articles", "page");
  // Also revalidate the landing page in case featured articles are shown there
  revalidatePath("/", "layout");
  
  return { success: true };
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverSrc = formData.get("coverSrc") as string;
  const coverAlt = formData.get("coverAlt") as string;
  const coverBlur = formData.get("coverBlur") as string;
  const featured = formData.get("featured") === "on";

  const publishedAtRaw = formData.get("publishedAt") as string;
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date();

  const contentRaw = formData.get("content") as string;
  let content = [];
  if (contentRaw) {
    try { 
      content = JSON.parse(contentRaw); 
    } catch (e) {
      content = contentRaw.split('\n').map(p => p.trim()).filter(Boolean);
    }
  } else {
    const plainText = formData.get("contentText") as string;
    if (plainText) {
      content = plainText.split('\n').map(p => p.trim()).filter(Boolean);
    }
  }

  // Get the existing article to know if the slug changed for revalidation
  const existing = await db.article.findUnique({ where: { id } });

  await db.article.update({
    where: { id },
    data: {
      slug,
      title,
      category,
      excerpt,
      coverSrc,
      coverAlt,
      coverBlur: coverBlur || null,
      featured,
      publishedAt,
      content,
    }
  });

  revalidatePath("/articles", "page");
  revalidatePath("/", "layout");
  revalidatePath(`/articles/${slug}`, "page");
  
  if (existing && existing.slug !== slug) {
    revalidatePath(`/articles/${existing.slug}`, "page");
  }

  return { success: true };
}

export async function deleteArticle(id: string) {
  await requireAuth();

  const existing = await db.article.findUnique({ where: { id } });

  await db.article.delete({
    where: { id }
  });

  revalidatePath("/articles", "page");
  revalidatePath("/", "layout");
  
  if (existing) {
    revalidatePath(`/articles/${existing.slug}`, "page");
  }

  return { success: true };
}
