"use server";

import { revalidatePath } from "next/cache";
import { db as prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { ContactStatus } from "@prisma/client";

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

export async function getSubmissions(limit = 100) {
  await verifyAuth();
  
  const take = Math.min(Math.max(1, limit), 250);

  return prisma.contactSubmission.findMany({
    take,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSubmission(id: string) {
  await verifyAuth();
  
  return prisma.contactSubmission.findUnique({
    where: { id },
  });
}

export async function updateSubmissionStatus(id: string, status: ContactStatus) {
  await verifyAuth();
  
  try {
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });
    
    revalidatePath("/admin/inbox");
    revalidatePath(`/admin/inbox/${id}`);
    
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Gagal memperbarui status pesan." };
  }
}

export async function deleteSubmission(id: string) {
  await verifyAuth();
  
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
    
    revalidatePath("/admin/inbox");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus pesan." };
  }
}
