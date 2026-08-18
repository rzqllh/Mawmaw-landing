import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, FolderOpen, Trash } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { DataGridItem } from "@/components/admin/ui/data-grid";
import { SortableList } from "@/components/admin/ui/sortable-list";
import { previewProject } from "@/app/actions/projects";

export const metadata = {
  title: "Kelola Proyek - Admin",
};

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      title: true,
      category: true,
      featured: true,
      slug: true,
      excerpt: true,
      coverSrc: true,
      year: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl">
      <AdminPageHeader
        title="Kelola Proyek"
        description="Koleksi portfolio interior. Tulis dan publikasikan karya terbaru Anda."
        action={
          <Link href="/admin/projects/new">
            <Button variant="primary" radius="md" className="group h-10 px-5 shadow-sm bg-forest-900 text-white hover:bg-forest-800">
              <Plus weight="bold" className="w-4 h-4 mr-2" />
              Proyek Baru
            </Button>
          </Link>
        }
      />

      {projects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-forest-900/15 rounded-2xl bg-forest-900/[0.02]">
          <div className="flex flex-col items-center justify-center text-forest-900/40">
            <FolderOpen weight="duotone" className="w-12 h-12 mb-4 opacity-40" />
            <p className="text-base font-semibold text-forest-900/70">Belum ada proyek.</p>
            <p className="text-sm mt-1">Mulai tulis cerita untuk proyek pertama Anda.</p>
            <Link href="/admin/projects/new" className="mt-6">
              <Button variant="outline" size="sm">Tulis Proyek Baru</Button>
            </Link>
          </div>
        </div>
      ) : (
        <SortableList
          items={projects}
          model="Project"
          renderItem={(project, dragHandle) => (
            <div className="relative">
              <div className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                {dragHandle}
              </div>
              <DataGridItem
                key={project.id}
                id={project.id}
                title={project.title}
                excerpt={project.excerpt || ""}
                coverSrc={project.coverSrc}
                editUrl={`/admin/projects/${project.id}/edit`}
                viewUrl={project.status === "PUBLISHED" ? `/projects/${project.slug}` : undefined}
                previewAction={project.status === "DRAFT" ? (
                  <form action={previewProject.bind(null, project.slug)}>
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-bold text-gold-700 transition-colors hover:bg-gold-500/10 hover:text-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
                    >
                      Preview
                    </button>
                  </form>
                ) : undefined}
                statusBadge={
                  project.status === "DRAFT" ? (
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-gray-200">
                      Draft
                    </span>
                  ) : (
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-green-200">
                      Published
                    </span>
                  )
                }
                subtitle={
                  <>
                    <span>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-forest-900/20"></span>
                    <span>{project.year || new Date(project.createdAt).getFullYear()}</span>
                    {project.featured && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-forest-900/20"></span>
                        <span className="text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">Featured</span>
                      </>
                    )}
                  </>
                }
                deleteAction={
                  <form
                    action={async () => {
                      "use server";
                      const { deleteProject } = await import("@/app/actions/projects");
                      await deleteProject(project.id);
                    }}
                  >
                    <button
                      type="submit"
                      title="Hapus proyek"
                      className="text-[13px] font-bold text-red-600/70 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 flex items-center gap-1.5"
                    >
                      <Trash weight="bold" className="w-4 h-4" />
                      Hapus
                    </button>
                  </form>
                }
              />
            </div>
          )}
        />
      )}
    </div>
  );
}
