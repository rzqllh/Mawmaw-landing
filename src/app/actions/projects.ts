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

export async function createProject(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const description = formData.get("description") as string;
  const coverSrc = formData.get("coverSrc") as string;
  const coverAlt = formData.get("coverAlt") as string;
  const coverBlur = formData.get("coverBlur") as string;
  const location = formData.get("location") as string;
  const year = formData.get("year") as string;
  const featured = formData.get("featured") === "on";

  // Note: For gallery, ideally you'd parse JSON or multiple inputs. 
  // For simplicity in this demo, we'll initialize an empty array or parse a JSON string.
  const galleryRaw = formData.get("gallery") as string;
  let gallery = [];
  if (galleryRaw) {
    try { gallery = JSON.parse(galleryRaw); } catch (e) {}
  }

  await db.project.create({
    data: {
      slug,
      title,
      category,
      excerpt,
      description,
      coverSrc,
      coverAlt,
      coverBlur: coverBlur || null,
      location,
      year,
      featured,
      gallery,
    }
  });

  revalidatePath("/", "layout");
  revalidatePath("/projects", "page");
  
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const description = formData.get("description") as string;
  const coverSrc = formData.get("coverSrc") as string;
  const coverAlt = formData.get("coverAlt") as string;
  const coverBlur = formData.get("coverBlur") as string;
  const location = formData.get("location") as string;
  const year = formData.get("year") as string;
  const featured = formData.get("featured") === "on";

  const galleryRaw = formData.get("gallery") as string;
  let gallery = [];
  if (galleryRaw) {
    try { gallery = JSON.parse(galleryRaw); } catch (e) {}
  }

  await db.project.update({
    where: { id },
    data: {
      slug,
      title,
      category,
      excerpt,
      description,
      coverSrc,
      coverAlt,
      coverBlur: coverBlur || null,
      location,
      year,
      featured,
      gallery,
    }
  });

  revalidatePath("/", "layout");
  revalidatePath("/projects", "page");
  revalidatePath(`/projects/${slug}`, "page");

  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAuth();

  await db.project.delete({
    where: { id }
  });

  revalidatePath("/", "layout");
  revalidatePath("/projects", "page");

  return { success: true };
}
