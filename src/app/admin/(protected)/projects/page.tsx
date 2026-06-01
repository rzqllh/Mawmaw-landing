import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, PencilSimple, Trash, Eye, ArrowUpRight, FolderOpen } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Kelola Proyek - Admin",
};

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      featured: true,
      createdAt: true,
      slug: true,
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-700 mb-2">Workspace</div>
          <h1 className="text-3xl font-serif font-semibold text-forest-900">Kelola Proyek</h1>
          <p className="text-forest-700 mt-2.5 text-[15px] leading-relaxed">
            Kelola portfolio desain interior. Tambahkan karya terbaru atau perbarui detail proyek yang sudah ada.
          </p>
        </div>
        <Link href="/admin/projects/new" className="shrink-0">
          <Button variant="primary" className="group h-11 px-6 text-sm shadow-lg shadow-forest-900/10 rounded-full">
            <Plus weight="bold" className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
            Proyek Baru
          </Button>
        </Link>
      </div>

      {/* Table Surface */}
      <div className="bg-white/80 backdrop-blur-xl border border-forest-900/10 rounded-2xl shadow-[0_8px_30px_rgba(4,12,8,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-forest-900/[0.02] border-b border-forest-900/10 text-[11px] uppercase tracking-[0.15em] text-forest-900/50 font-bold">
              <tr>
                <th className="px-6 py-4">Proyek</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-forest-900/40">
                      <FolderOpen weight="duotone" className="w-12 h-12 mb-4 opacity-40" />
                      <p className="text-base font-semibold text-forest-900/70">Belum ada proyek portfolio.</p>
                      <p className="text-sm mt-1">Tambahkan proyek pertama Anda untuk mulai memamerkan karya.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="group hover:bg-forest-900/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[15px] text-forest-900 group-hover:text-gold-700 transition-colors">
                        {project.title}
                      </div>
                      <div className="text-[12px] text-forest-900/50 mt-0.5 font-medium">
                        /{project.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-forest-900/70 font-medium">
                      {project.category}
                    </td>
                    <td className="px-6 py-4">
                      {project.featured ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gold-500/15 text-gold-700 border border-gold-500/20">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-forest-900/5 text-forest-900/60 border border-forest-900/10">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-forest-900/60 font-medium">
                      {new Date(project.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          title="Lihat di Web"
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-forest-900/5 text-forest-900/60 transition-all hover:bg-forest-900/10 hover:text-forest-900 focus-visible:ring-2 focus-visible:ring-forest-900/20 outline-none"
                        >
                          <ArrowUpRight weight="duotone" className="w-[15px] h-[15px]" />
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-forest-900/5 text-forest-900/60 transition-all hover:bg-forest-900/10 hover:text-forest-900 focus-visible:ring-2 focus-visible:ring-forest-900/20 outline-none"
                        >
                          <PencilSimple weight="duotone" className="w-[15px] h-[15px]" />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            const { deleteProject } = await import("@/app/actions/projects");
                            await deleteProject(project.id);
                          }}
                        >
                          <button
                            type="submit"
                            title="Hapus"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-600/80 transition-all hover:bg-red-500/20 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-500/20 outline-none"
                          >
                            <Trash weight="duotone" className="w-[15px] h-[15px]" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
