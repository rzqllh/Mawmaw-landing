"use client";

import React, { useTransition } from "react";
import { User, EnvelopeSimple, MapPin, Briefcase } from "@phosphor-icons/react";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/admin-card";
import { updateSubmissionStatus } from "@/app/actions/inbox";
import { ContactStatus, type ContactSubmission } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function InboxDetailForm({ submission }: { submission: ContactSubmission }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Next logical status
  const isNew = submission.status === "NEW";
  const nextStatus: ContactStatus = isNew ? "READ" : "RESPONDED";
  const submitLabel = isNew ? "Tandai Sudah Dibaca" : submission.status === "READ" ? "Tandai Sudah Dibalas" : "Telah Dibalas";

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submission.status === "RESPONDED") return;
    
    startTransition(async () => {
      try {
        await updateSubmissionStatus(submission.id, nextStatus);
        toast.success(`Status pesan diubah menjadi ${nextStatus}`);
        router.refresh();
      } catch {
        toast.error("Gagal mengupdate status pesan");
      }
    });
  };

  const primaryContent = (
    <div className="space-y-6">
      <AdminCard className="p-8">
        <div className="flex items-center justify-between border-b border-forest-900/10 pb-6 mb-6">
          <div className="text-forest-900 font-semibold font-serif text-xl">Isi Pesan</div>
          <div className="px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/10 text-xs font-bold uppercase tracking-wider text-forest-900">
            {submission.status}
          </div>
        </div>
        
        <div className="prose prose-forest prose-lg max-w-none text-forest-900/80 leading-relaxed whitespace-pre-wrap">
          {submission.message}
        </div>
      </AdminCard>
    </div>
  );

  const sidebarContent = (
    <div className="space-y-6">
      <AdminCard>
        <AdminCardContent className="p-6 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/50 pb-2 border-b border-forest-900/10">
            Detail Pengirim
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User weight="duotone" className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-forest-900/40 uppercase tracking-wider">Nama</p>
                <p className="text-sm font-medium text-forest-900">{submission.name}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <EnvelopeSimple weight="duotone" className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-forest-900/40 uppercase tracking-wider">Email</p>
                <a href={`mailto:${submission.email}`} className="text-sm font-medium text-gold-700 hover:underline">{submission.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin weight="duotone" className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-forest-900/40 uppercase tracking-wider">Lokasi</p>
                <p className="text-sm font-medium text-forest-900">{submission.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Briefcase weight="duotone" className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-forest-900/40 uppercase tracking-wider">Tipe Proyek</p>
                <p className="text-sm font-medium text-forest-900">{submission.projectType}</p>
              </div>
            </div>
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );

  return (
    <form onSubmit={handleAction}>
      <AdminEditorShell
        title={`Pesan dari ${submission.name}`}
        backUrl="/admin/inbox"
        backLabel="Inbox"
        isPending={isPending}
        submitLabel={submitLabel}
        primaryContent={primaryContent}
        sidebarContent={sidebarContent}
      />
    </form>
  );
}
