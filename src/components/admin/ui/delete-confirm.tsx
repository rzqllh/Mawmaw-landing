"use client";

import { useTransition } from "react";
import { Trash } from "@phosphor-icons/react";
import { toast } from "sonner";

interface DeleteConfirmProps {
  itemTitle: string;
  action: () => Promise<{ success: boolean; error?: string } | void | unknown>;
  onSuccessMessage?: string;
  onErrorMessage?: string;
}

/**
 * Renders a delete button that confirms before calling a server action.
 * Provides user feedback (isPending state, toasts) and prevents accidental deletion.
 */
export function DeleteConfirm({
  itemTitle,
  action,
  onSuccessMessage = "Data berhasil dihapus",
  onErrorMessage = "Gagal menghapus data",
}: DeleteConfirmProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      !window.confirm(
        `Hapus "${itemTitle}"?\n\nTindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await action();
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          !(res as { success: boolean }).success
        ) {
          toast.error((res as { error?: string }).error || onErrorMessage);
        } else {
          toast.success(onSuccessMessage);
        }
      } catch {
        toast.error(onErrorMessage);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      title="Hapus"
      className="text-[13px] font-bold text-red-600/70 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 flex items-center gap-1.5 disabled:opacity-50"
    >
      <Trash weight="bold" className="w-4 h-4" />
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}

