"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db as prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

async function verifyAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function getServices() {
  await verifyAuth();
  
  return prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getService(id: string) {
  await verifyAuth();
  
  return prisma.service.findUnique({
    where: { id },
  });
}

export async function createService(formData: FormData) {
  await verifyAuth();
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const imageSrc = (formData.get("imageSrc") as string) || null;
  const imageAlt = (formData.get("imageAlt") as string) || null;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  
  const service = await prisma.service.create({
    data: {
      title,
      slug,
      description,
      icon,
      imageSrc,
      imageAlt,
      sortOrder,
    }
  });
  
  revalidatePath("/admin/services");
  revalidatePath("/(public)");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await verifyAuth();
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const imageSrc = (formData.get("imageSrc") as string) || null;
  const imageAlt = (formData.get("imageAlt") as string) || null;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  
  await prisma.service.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      icon,
      imageSrc,
      imageAlt,
      sortOrder,
    }
  });
  
  revalidatePath("/admin/services");
  revalidatePath("/(public)");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifyAuth();
  
  await prisma.service.delete({
    where: { id },
  });
  
  revalidatePath("/admin/services");
  revalidatePath("/(public)");
}
