"use client";

import { useState } from "react";
import { Image as ImageIcon } from "@phosphor-icons/react";
import { MarkdownEditor } from "@/components/editor/markdown-editor";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/admin-card";
import { AdminInput } from "@/components/admin/ui/admin-input";
import { AdminLabel } from "@/components/admin/ui/admin-label";
import { AdminTextarea } from "@/components/admin/ui/admin-textarea";
import { GalleryPreview } from "@/components/admin/ui/gallery-preview";
import { type Project } from "@prisma/client";

export function ProjectPrimaryContent({ project = {} }: { project?: Partial<Project> }) {
  return (
    <>
      <AdminCard className="p-8">
        <div>
          <label htmlFor="title" className="sr-only">Judul Proyek</label>
          <input 
            id="title" 
            name="title" 
            defaultValue={project.title} 
            required 
            placeholder="Judul Proyek"
            className="w-full text-4xl md:text-5xl font-serif font-semibold text-forest-900 placeholder:text-forest-900/55 bg-transparent border-none focus:outline-none focus:ring-0 resize-none p-0 mb-6"
          />
        </div>

        <div className="space-y-6">
          <div>
            <AdminLabel htmlFor="excerpt" required>Ringkasan (Excerpt)</AdminLabel>
            <AdminTextarea 
              id="excerpt" 
              name="excerpt" 
              defaultValue={project.excerpt} 
              required 
              rows={2} 
              placeholder="Tulis satu atau dua kalimat ringkasan yang menarik untuk proyek ini..." 
              className="text-lg leading-relaxed resize-none min-h-[5rem] bg-forest-900/[0.02]"
            />
          </div>

          <div>
            <MarkdownEditor 
              id="description" 
              name="description" 
              label="Cerita Proyek" 
              defaultValue={project.description} 
              required 
              rows={12} 
              placeholder="Ceritakan tentang klien, konsep ruang, pemilihan material, dan tantangan desain yang diselesaikan di proyek ini. Mendukung Markdown..." 
              variant="project"
            />
          </div>
        </div>
      </AdminCard>
    </>
  );
}

export function ProjectSidebarContent({ project = {} }: { project?: Partial<Project> }) {
  const [coverUrl, setCoverUrl] = useState(project.coverSrc || "");
  const initialGallery = project.gallery ? (typeof project.gallery === "string" ? JSON.parse(project.gallery) : project.gallery) : [];

  return (
    <>
      <AdminCard>
        <AdminCardContent className="p-6 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/50 pb-2 border-b border-forest-900/10">Metadata Proyek</h3>
          
          <div>
            <AdminLabel htmlFor="slug" className="text-[11px]" required>Slug URL</AdminLabel>
            <AdminInput id="slug" name="slug" defaultValue={project.slug} required placeholder="contoh-proyek" />
          </div>

          <div>
            <AdminLabel htmlFor="category" className="text-[11px]" required>Kategori</AdminLabel>
            <AdminInput id="category" name="category" defaultValue={project.category} required placeholder="Hunian, Komersial..." />
          </div>

          <div>
            <AdminLabel htmlFor="location" className="text-[11px]" required>Lokasi</AdminLabel>
            <AdminInput id="location" name="location" defaultValue={project.location} required placeholder="Jakarta Selatan" />
          </div>

          <div>
            <AdminLabel htmlFor="year" className="text-[11px]" required>Tahun</AdminLabel>
            <AdminInput id="year" name="year" defaultValue={project.year} required placeholder="2025" />
          </div>

          <div>
            <AdminLabel htmlFor="status" className="text-[11px]" required>Status</AdminLabel>
            <select
              id="status"
              name="status"
              defaultValue={project.status ?? "DRAFT"}
              className="min-h-11 w-full rounded-lg border border-forest-900/15 bg-white px-3 text-sm text-forest-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="pt-4 border-t border-forest-900/10">
            <label htmlFor="featured" className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  id="featured"
                  name="featured" 
                  defaultChecked={project.featured}
                  className="peer appearance-none w-4 h-4 rounded border border-forest-900/30 bg-white checked:bg-gold-500 checked:border-gold-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-1" 
                />
                <svg className="absolute w-2.5 h-2.5 text-forest-900 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="block text-[12px] font-bold text-forest-900 group-hover:text-gold-700 transition-colors">Featured Project</span>
                <span className="block text-[11px] text-forest-900/60 mt-0.5 leading-tight">Tampilkan di area unggulan landing page.</span>
              </div>
            </label>
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard className="p-6">
        <h3 className="text-sm font-bold text-forest-900 mb-6 pb-4 border-b border-forest-900/10">Media & Galeri</h3>
        
        <div className="space-y-8">
          <div>
            <AdminLabel htmlFor="coverSrc" required>Gambar Utama (Cover)</AdminLabel>
            <div className="p-4 rounded-xl border border-forest-900/10 bg-forest-900/[0.02] space-y-4">
              {/* Live Preview */}
              <div className="w-full aspect-[21/9] bg-white rounded-lg overflow-hidden border border-forest-900/10 flex items-center justify-center relative">
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={coverUrl} 
                    alt="Cover Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = 'block'; }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-forest-900/30">
                    <ImageIcon weight="duotone" className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Preview Kosong</span>
                  </div>
                )}
              </div>

              <div>
                <AdminLabel htmlFor="coverSrc" className="text-[11px]">URL Gambar</AdminLabel>
                <AdminInput 
                  id="coverSrc" 
                  name="coverSrc" 
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  required 
                  placeholder="https://..." 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <AdminLabel htmlFor="coverAlt" className="text-[11px]" required>Alt Text</AdminLabel>
                  <AdminInput id="coverAlt" name="coverAlt" defaultValue={project.coverAlt} required placeholder="Deskripsi gambar..." />
                </div>
                <div>
                  <AdminLabel htmlFor="coverBlur" className="text-[11px]">Blur Data (Opsional)</AdminLabel>
                  <AdminInput id="coverBlur" name="coverBlur" defaultValue={project.coverBlur || ""} placeholder="data:image/..." />
                </div>
              </div>
            </div>
          </div>

          <div>
            <AdminLabel>Galeri Proyek</AdminLabel>
            <GalleryPreview initialItems={initialGallery} name="gallery" />
          </div>
        </div>
      </AdminCard>
    </>
  );
}
