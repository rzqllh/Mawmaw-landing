import React from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { DataGrid, DataGridItem } from "@/components/admin/ui/data-grid";
import { getServices } from "@/app/actions/services";
import { ServiceActions } from "./components/service-actions";

export const metadata = {
  title: "Layanan | Admin Mawmaw",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl">
      <AdminPageHeader 
        title="Kelola Layanan" 
        description="Layanan yang ditawarkan oleh Mawmaw Interior."
        action={
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-gold-300 font-bold rounded-lg hover:bg-forest-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 shadow-sm"
          >
            Tambah Layanan
          </Link>
        }
      />
      
      <div className="w-full">
        {services.length === 0 ? (
          <div className="admin-solid-surface flex flex-col items-center justify-center p-12 text-center">
            <p className="font-serif text-2xl text-forest-900 mb-2">Belum ada Layanan</p>
            <p className="text-forest-900/60 text-sm">Buat layanan pertama Anda untuk menampilkannya di halaman publik.</p>
          </div>
        ) : (
          <DataGrid>
            {services.map((service) => (
              <DataGridItem
                key={service.id}
                id={service.id}
                title={service.title}
                subtitle={`Urutan: ${service.sortOrder} • Icon: ${service.icon}`}
                excerpt={service.description}
                coverSrc={service.imageSrc}
                editUrl={`/admin/services/${service.id}/edit`}
                deleteAction={<ServiceActions id={service.id} />}
              />
            ))}
          </DataGrid>
        )}
      </div>
    </div>
  );
}
