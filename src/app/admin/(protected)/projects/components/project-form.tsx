import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProjectFormFields({ project = {} }: { project?: any }) {
  return (
    <>
      <div className="space-y-6">
        <div className="border-b border-forest-900/10 pb-4">
          <h2 className="text-xl font-serif font-semibold text-forest-900">Informasi Dasar</h2>
          <p className="text-sm text-forest-900/60 mt-1 font-medium">Identitas utama dari proyek interior.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Judul Proyek</label>
            <Input id="title" name="title" variant="admin" size="compact" defaultValue={project.title} required placeholder="Contoh: Villa Moderna" />
          </div>

          <div>
            <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Slug (URL)</label>
            <Input id="slug" name="slug" variant="admin" size="compact" defaultValue={project.slug} required placeholder="contoh: villa-moderna" />
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Kategori</label>
            <Input id="category" name="category" variant="admin" size="compact" defaultValue={project.category} required placeholder="Contoh: Hunian, Apartemen, Komersial" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Lokasi</label>
              <Input id="location" name="location" variant="admin" size="compact" defaultValue={project.location} required placeholder="Jakarta Selatan" />
            </div>
            <div>
              <label htmlFor="year" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Tahun</label>
              <Input id="year" name="year" variant="admin" size="compact" defaultValue={project.year} required placeholder="2024" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-forest-900/5 border border-forest-900/10">
          <input 
            type="checkbox" 
            id="featured"
            name="featured" 
            defaultChecked={project.featured}
            className="w-4 h-4 rounded border-forest-900/30 bg-white/50 text-gold-500 focus:ring-gold-500/30 focus:ring-offset-0" 
          />
          <label htmlFor="featured" className="text-[13px] font-bold text-forest-900 cursor-pointer select-none">
            Jadikan Proyek Pilihan (Featured)
            <span className="block text-xs text-forest-900/60 mt-0.5 font-medium">Akan ditampilkan di area utama landing page.</span>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-b border-forest-900/10 pb-4">
          <h2 className="text-xl font-serif font-semibold text-forest-900">Konten & Visual</h2>
          <p className="text-sm text-forest-900/60 mt-1 font-medium">Deskripsi dan aset media untuk mempresentasikan proyek.</p>
        </div>
        
        <div className="grid gap-5">
          <div>
            <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Ringkasan (Excerpt)</label>
            <Textarea id="excerpt" name="excerpt" variant="admin" inputSize="compact" defaultValue={project.excerpt} required rows={2} placeholder="Satu atau dua kalimat pembuka yang menarik..." />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-forest-900/70 mb-1.5">Deskripsi Lengkap</label>
            <Textarea id="description" name="description" variant="admin" inputSize="compact" defaultValue={project.description} required rows={6} placeholder="Ceritakan konsep, material, dan perjalanan desain proyek ini..." />
          </div>

          <div className="p-5 rounded-2xl bg-forest-900/5 border border-forest-900/5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-700">Gambar Cover Utama</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="coverSrc" className="block text-[11px] font-bold text-forest-900/60 mb-1.5">URL Gambar (Host Eksternal)</label>
                <Input id="coverSrc" name="coverSrc" variant="admin" size="compact" defaultValue={project.coverSrc} required placeholder="https://..." />
              </div>
              <div>
                <label htmlFor="coverAlt" className="block text-[11px] font-bold text-forest-900/60 mb-1.5">Alt Text (Aksesibilitas)</label>
                <Input id="coverAlt" name="coverAlt" variant="admin" size="compact" defaultValue={project.coverAlt} required placeholder="Ruang tamu modern dengan..." />
              </div>
              <div>
                <label htmlFor="coverBlur" className="block text-[11px] font-bold text-forest-900/60 mb-1.5">Blur Data URL (Opsional)</label>
                <Input id="coverBlur" name="coverBlur" variant="admin" size="compact" defaultValue={project.coverBlur || ""} placeholder="data:image/jpeg;base64,..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
