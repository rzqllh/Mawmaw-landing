import { db } from "@/lib/db";
import Link from "next/link";
import {
  FolderOpen,
  Article,
  Gear,
  ArrowRight,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/utils";

export default async function AdminIndexPage() {
  const [totalProjects, totalArticles, recentProjects, recentArticles] =
    await Promise.all([
      db.project.count(),
      db.article.count(),
      db.project.findMany({
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          category: true,
          updatedAt: true,
          slug: true,
        },
      }),
      db.article.findMany({
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          category: true,
          updatedAt: true,
          slug: true,
        },
      }),
    ]);

  const recentItems = [
    ...recentProjects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      updatedAt: p.updatedAt,
      editUrl: `/admin/projects/${p.id}/edit`,
      type: "Proyek" as const,
    })),
    ...recentArticles.map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      updatedAt: a.updatedAt,
      editUrl: `/admin/articles/${a.id}/edit`,
      type: "Artikel" as const,
    })),
  ]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl space-y-10 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-900">
          Dashboard
        </h1>
        <p className="mt-2 text-text-secondary">
          Kelola konten dan tampilan Mawmaw Interior.
        </p>
      </div>

      {/* Quick Stats & Shortcuts */}
      <div>
        <h2 className="text-[10px] font-bold text-forest-900/40 uppercase tracking-widest mb-4">
          Ringkasan Konten
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/projects"
            className="group block admin-solid-surface p-6 hover:border-forest-900/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center">
                <FolderOpen weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">
                Kelola →
              </span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">Proyek</h2>
            <p className="text-3xl font-serif mt-2 text-forest-900">
              {totalProjects}
            </p>
          </Link>

          <Link
            href="/admin/articles"
            className="group block admin-solid-surface p-6 hover:border-forest-900/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center">
                <Article weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">
                Kelola →
              </span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">Artikel</h2>
            <p className="text-3xl font-serif mt-2 text-forest-900">
              {totalArticles}
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="group block admin-solid-surface p-6 hover:border-forest-900/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-100/40 text-gold-700 flex items-center justify-center">
                <Gear weight="duotone" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-forest-900/40 group-hover:text-forest-900/60 transition-colors">
                Buka →
              </span>
            </div>
            <h2 className="text-lg font-bold text-forest-900">
              Pengaturan Website
            </h2>
            <p className="text-sm mt-2 text-text-secondary leading-relaxed">
              Edit konten global halaman publik
            </p>
          </Link>
        </div>
      </div>

      {/* Recently Updated Content */}
      {recentItems.length > 0 && (
        <div className="pt-6 border-t border-forest-900/10">
          <h2 className="text-[10px] font-bold text-forest-900/40 uppercase tracking-widest mb-4">
            Terakhir Diperbarui
          </h2>
          <div className="admin-solid-surface divide-y divide-forest-900/8 overflow-hidden">
            {recentItems.map((item) => (
              <Link
                key={item.id}
                href={item.editUrl}
                className="flex items-center gap-4 px-5 py-4 hover:bg-forest-900/[0.02] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-900 flex items-center justify-center shrink-0">
                  {item.type === "Proyek" ? (
                    <FolderOpen weight="duotone" className="w-4 h-4" />
                  ) : (
                    <Article weight="duotone" className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-forest-900 truncate group-hover:text-gold-700 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-forest-900/50 mt-0.5 flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-forest-900/5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span>{item.category}</span>
                  </p>
                </div>
                <div className="text-xs text-forest-900/40 flex items-center gap-1.5 shrink-0">
                  <Clock weight="regular" className="w-3.5 h-3.5" />
                  {formatDate(item.updatedAt)}
                </div>
                <ArrowRight
                  weight="bold"
                  className="w-4 h-4 text-forest-900/20 group-hover:text-forest-900/50 transition-colors shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
