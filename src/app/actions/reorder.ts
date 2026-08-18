"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
}

export async function reorderItems(
  items: { id: string; sortOrder: number }[],
  model: "Project" | "Service"
) {
  await requireAuth();

  try {
    const updates = items.map((item) => {
      if (model === "Project") {
        return db.project.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        });
      } else {
        return db.service.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        });
      }
    });

    await db.$transaction(updates);

    if (model === "Project") {
      revalidatePath("/projects");
      revalidatePath("/admin/projects");
      revalidatePath("/");
    } else {
      revalidatePath("/admin/services");
      revalidatePath("/");
    }

    return { success: true };
  } catch (error) {
    console.error("Error reordering items:", error);
    return { success: false, error: "Failed to reorder items." };
  }
}
