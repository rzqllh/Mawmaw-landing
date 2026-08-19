"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db as prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { serviceSchema } from "@/lib/validations/admin";

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

  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    imageSrc: (formData.get("imageSrc") as string) || null,
    imageAlt: (formData.get("imageAlt") as string) || null,
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    await prisma.service.create({
      data: parsed.data,
    });
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug layanan sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal menyimpan layanan. Silakan coba lagi." };
  }
  
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await verifyAuth();

  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    imageSrc: (formData.get("imageSrc") as string) || null,
    imageAlt: (formData.get("imageAlt") as string) || null,
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  try {
    await prisma.service.update({
      where: { id },
      data: parsed.data,
    });
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2002") {
      return { success: false, error: "Slug layanan sudah digunakan. Gunakan slug yang berbeda." };
    }
    return { success: false, error: "Gagal memperbarui layanan. Silakan coba lagi." };
  }
  
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifyAuth();

  try {
    await prisma.service.delete({
      where: { id },
    });
    
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus layanan." };
  }
}
