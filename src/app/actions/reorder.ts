"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function reorderItems(
  items: { id: string; sortOrder: number }[],
  model: "Project" | "Service"
) {
  try {
    // We execute updates sequentially to keep it simple, or in a transaction.
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
      revalidatePath("/admin/(protected)/projects");
      revalidatePath("/");
    } else {
      revalidatePath("/services");
      revalidatePath("/admin/(protected)/services");
      revalidatePath("/");
    }

    return { success: true };
  } catch (error) {
    console.error("Error reordering items:", error);
    return { success: false, error: "Failed to reorder items." };
  }
}
