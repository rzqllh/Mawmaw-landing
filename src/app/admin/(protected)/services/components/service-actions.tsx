"use client";

import { useTransition } from "react";
import { Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { deleteService } from "@/app/actions/services";

export function ServiceActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Hapus layanan ini secara permanen?")) return;
    startTransition(async () => {
      try {
        await deleteService(id);
        toast.success("Layanan berhasil dihapus");
      } catch (e) {
        toast.error("Gagal menghapus layanan");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 rounded-lg text-red-500/60 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-50"
      title="Hapus Layanan"
    >
      <Trash weight="duotone" className="w-5 h-5" />
    </button>
  );
}
