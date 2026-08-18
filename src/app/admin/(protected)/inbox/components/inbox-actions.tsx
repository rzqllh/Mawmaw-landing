"use client";

import { useTransition } from "react";
import { Trash, EnvelopeOpen } from "@phosphor-icons/react";
import { toast } from "sonner";
import { deleteSubmission, updateSubmissionStatus } from "@/app/actions/inbox";
import { ContactStatus } from "@prisma/client";

export function InboxActions({ id, status }: { id: string, status: ContactStatus }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    startTransition(async () => {
      try {
        await updateSubmissionStatus(id, "READ");
        toast.success("Pesan ditandai sudah dibaca");
      } catch {
        toast.error("Gagal mengupdate pesan");
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Hapus pesan ini secara permanen?")) return;
    startTransition(async () => {
      try {
        await deleteSubmission(id);
        toast.success("Pesan berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus pesan");
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      {status === "NEW" && (
        <button
          onClick={handleMarkAsRead}
          disabled={isPending}
          className="p-2 rounded-lg text-forest-900/40 hover:text-forest-900 hover:bg-forest-900/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:opacity-50"
          title="Tandai Sudah Dibaca"
        >
          <EnvelopeOpen weight="duotone" className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 rounded-lg text-red-500/60 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-50"
        title="Hapus Pesan"
      >
        <Trash weight="duotone" className="w-5 h-5" />
      </button>
    </div>
  );
}
