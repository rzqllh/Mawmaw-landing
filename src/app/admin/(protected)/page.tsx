import { db } from "@/lib/db";
import Link from "next/link";
import { FolderOpen, Article, Gear, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getSiteSettings } from "@/lib/queries";

export default async function AdminIndexPage() {
  const [totalProjects, totalArticles, settings] = await Promise.all([
    db.project.count(),
    db.article.count(),
    getSiteSettings()
  ]);

  const stats = (settings?.heroStatCards as Array<{ label: string; value: string; description: string; icon?: string }>) || [];

  return (
    <div className="mx-auto max-w-5xl space-y-12 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-900">Dashboard</h1>
        <p className="mt-2 text-text-secondary">Kelola konten dan tampilan Mawmaw Interior.</p>
      </div>

      <div>
        <h2 className="text-[10px] font-bold text-forest-900/40 uppercase tracking-widest mb-4">Ringkasan Sistem</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/admin/projects" className="group block admin-solid-surface p-6 hover:border-forest-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center">
                <FolderOpen weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">Kelola →</span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">Proyek Tersimpan</h2>
            <p className="text-3xl font-serif mt-2 text-forest-900">{totalProjects}</p>
          </Link>

          <Link href="/admin/articles" className="group block admin-solid-surface p-6 hover:border-forest-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center">
                <Article weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">Kelola →</span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">Artikel Publikasi</h2>
            <p className="text-3xl font-serif mt-2 text-forest-900">{totalArticles}</p>
          </Link>

          <Link href="/admin/settings" className="group block admin-solid-surface p-6 hover:border-forest-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center">
                <Gear weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">Buka →</span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">Pengaturan Website</h2>
            <p className="text-sm mt-2 text-text-secondary leading-relaxed">Edit profil & kontak</p>
          </Link>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="pt-6 border-t border-forest-900/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">Statistik Publik (Landing Page)</h2>
            <Link href="/admin/settings" className="text-xs font-bold text-forest-900/60 hover:text-forest-900 transition-colors">
              Edit Statistik →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="admin-solid-surface p-5">
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-900 flex items-center justify-center mb-3">
                  <Sparkle weight="duotone" className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-serif text-forest-900">{stat.value}</h3>
                <p className="text-sm font-bold text-forest-900 mt-1">{stat.label}</p>
                {stat.description && (
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">{stat.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
