"use client";

import { AdminCard } from "@/components/admin/ui/admin-card";
import { AdminInput } from "@/components/admin/ui/admin-input";
import { AdminLabel } from "@/components/admin/ui/admin-label";
import { AdminTextarea } from "@/components/admin/ui/admin-textarea";
import { type Service } from "@prisma/client";

export function ServicePrimaryContent({ service = {} }: { service?: Partial<Service> }) {
  return (
    <>
      <AdminCard className="p-8">
        <div>
          <label htmlFor="title" className="sr-only">Nama Layanan</label>
          <input 
            id="title" 
            name="title" 
            defaultValue={service.title} 
            required 
            placeholder="Nama Layanan"
            className="w-full text-4xl md:text-5xl font-serif font-semibold text-forest-900 placeholder:text-forest-900/20 bg-transparent border-none focus:outline-none focus:ring-0 resize-none p-0 mb-6"
          />
        </div>

        <div className="space-y-6">
          <div>
            <AdminLabel htmlFor="description" required>Deskripsi Layanan</AdminLabel>
            <AdminTextarea 
              id="description" 
              name="description" 
              defaultValue={service.description} 
              required 
              rows={4} 
              placeholder="Tulis deskripsi detail mengenai layanan ini..." 
              className="text-lg leading-relaxed resize-none bg-forest-900/[0.02]"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <AdminLabel htmlFor="icon" required>Nama Icon (Phosphor)</AdminLabel>
              <AdminInput id="icon" name="icon" defaultValue={service.icon || "Sparkle"} required placeholder="Misal: House, Chair, Sparkle" />
            </div>
            <div>
              <AdminLabel htmlFor="slug" required>Slug URL</AdminLabel>
              <AdminInput id="slug" name="slug" defaultValue={service.slug} required placeholder="interior-design" />
            </div>
          </div>
        </div>
      </AdminCard>
    </>
  );
}

export function ServiceSidebarContent({ service = {} }: { service?: Partial<Service> }) {
  return (
    <>
      <AdminCard className="p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/50 pb-2 border-b border-forest-900/10 mb-4">
          Pengaturan Tambahan
        </h3>
        <div className="space-y-4">
          <div>
            <AdminLabel htmlFor="sortOrder">Urutan (Sort Order)</AdminLabel>
            <AdminInput id="sortOrder" name="sortOrder" type="number" defaultValue={service.sortOrder ?? 0} placeholder="0" />
          </div>
          <div>
            <AdminLabel htmlFor="imageSrc">Cover Image (Opsional)</AdminLabel>
            <AdminInput id="imageSrc" name="imageSrc" defaultValue={service.imageSrc || undefined} placeholder="https://..." />
          </div>
          <div>
            <AdminLabel htmlFor="imageAlt">Cover Alt Text</AdminLabel>
            <AdminInput id="imageAlt" name="imageAlt" defaultValue={service.imageAlt || undefined} placeholder="Deskripsi gambar..." />
          </div>
        </div>
      </AdminCard>
    </>
  );
}
