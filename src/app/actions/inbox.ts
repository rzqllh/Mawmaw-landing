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

export async function getSubmissions() {
  await verifyAuth();
  
  return prisma.contactSubmission.findMany({
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
  
  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });
  
  revalidatePath("/admin/inbox");
  revalidatePath(`/admin/inbox/${id}`);
  
  return updated;
}

export async function deleteSubmission(id: string) {
  await verifyAuth();
  
  await prisma.contactSubmission.delete({
    where: { id },
  });
  
  revalidatePath("/admin/inbox");
}
