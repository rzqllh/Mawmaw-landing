import React from "react";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { DataGrid, DataGridItem } from "@/components/admin/ui/data-grid";
import { getSubmissions } from "@/app/actions/inbox";
import { formatDate } from "@/lib/utils";
import { InboxActions } from "./components/inbox-actions";

export const metadata = {
  title: "Inbox | Admin Mawmaw",
};

export default async function InboxPage() {
  const submissions = await getSubmissions();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl">
      <AdminPageHeader 
        title="Inbox Pesan" 
        description="Pesan dan permintaan konsultasi dari website publik."
      />
      
      <div className="w-full">
        {submissions.length === 0 ? (
          <div className="admin-solid-surface flex flex-col items-center justify-center p-12 text-center">
            <p className="font-serif text-2xl text-forest-900 mb-2">Inbox Kosong</p>
            <p className="text-forest-900/60 text-sm">Belum ada pesan yang masuk.</p>
          </div>
        ) : (
          <DataGrid>
            {submissions.map((msg) => (
              <DataGridItem
                key={msg.id}
                id={msg.id}
                title={msg.name}
                subtitle={
                  <>
                    <span className="text-gold-700">{msg.status}</span>
                    <span className="opacity-40 px-1">•</span>
                    <span>{msg.projectType}</span>
                    <span className="opacity-40 px-1">•</span>
                    <span>{formatDate(msg.createdAt)}</span>
                  </>
                }
                excerpt={msg.message}
                coverSrc={null}
                editUrl={`/admin/inbox/${msg.id}`}
                deleteAction={<InboxActions id={msg.id} status={msg.status} />}
              />
            ))}
          </DataGrid>
        )}
      </div>
    </div>
  );
}
