import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function ArticlesLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl" style={{ viewTransitionName: "articles-page" }}>
      <AdminPageHeader
        title="Kelola Artikel"
        description="Perpustakaan editorial. Tulis inspirasi dan wawasan desain untuk pembaca Anda."
        action={
          <Button variant="primary" radius="md" disabled className="group h-10 px-5 shadow-sm bg-forest-900 text-white opacity-50">
            <Plus weight="bold" className="w-4 h-4 mr-2" />
            Artikel Baru
          </Button>
        }
      />

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group admin-surface flex flex-col sm:flex-row gap-6 p-5 rounded-2xl animate-pulse">
            <div className="shrink-0 w-full sm:w-48 h-32 bg-forest-900/10 rounded-xl" />
            <div className="flex-1 flex flex-col min-w-0 py-1 space-y-3">
              <div className="h-6 bg-forest-900/10 rounded w-2/5" />
              <div className="h-4 bg-forest-900/10 rounded w-1/3" />
              <div className="h-4 bg-forest-900/10 rounded w-full mt-4" />
              <div className="h-4 bg-forest-900/10 rounded w-4/5" />
              <div className="mt-auto pt-4 flex gap-3">
                <div className="h-8 bg-forest-900/10 rounded w-24" />
                <div className="h-8 bg-forest-900/10 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
