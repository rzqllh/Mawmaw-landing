import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Article as ArticleIcon, Trash } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { DataGrid, DataGridItem } from "@/components/admin/ui/data-grid";

export const metadata = {
  title: "Kelola Artikel - Admin",
};

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      featured: true,
      publishedAt: true,
      slug: true,
      excerpt: true,
      coverSrc: true,
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl">
      <AdminPageHeader
        title="Kelola Artikel"
        description="Perpustakaan editorial. Tulis inspirasi dan wawasan desain untuk pembaca Anda."
        action={
          <Link href="/admin/articles/new">
            <Button variant="primary" radius="md" className="group h-10 px-5 shadow-sm bg-forest-900 text-white hover:bg-forest-800">
              <Plus weight="bold" className="w-4 h-4 mr-2" />
              Artikel Baru
            </Button>
          </Link>
        }
      />

      {articles.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-forest-900/15 rounded-2xl bg-forest-900/[0.02]">
          <div className="flex flex-col items-center justify-center text-forest-900/40">
            <ArticleIcon weight="duotone" className="w-12 h-12 mb-4 opacity-40" />
            <p className="text-base font-semibold text-forest-900/70">Belum ada artikel.</p>
            <p className="text-sm mt-1">Mulai tulis artikel editorial pertama Anda.</p>
            <Link href="/admin/articles/new" className="mt-6">
              <Button variant="outline" size="sm">Tulis Artikel Baru</Button>
            </Link>
          </div>
        </div>
      ) : (
        <DataGrid>
          {articles.map((article) => (
            <DataGridItem
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt || ""}
              coverSrc={article.coverSrc}
              editUrl={`/admin/articles/${article.id}/edit`}
              viewUrl={`/articles/${article.slug}`}
              subtitle={
                <>
                  <span>{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-forest-900/20"></span>
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.featured && (
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
                    const { deleteArticle } = await import("@/app/actions/articles");
                    await deleteArticle(article.id);
                  }}
                >
                  <button
                    type="submit"
                    title="Hapus artikel"
                    className="text-[13px] font-bold text-red-600/70 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 flex items-center gap-1.5"
                  >
                    <Trash weight="bold" className="w-4 h-4" />
                    Hapus
                  </button>
                </form>
              }
            />
          ))}
        </DataGrid>
      )}
    </div>
  );
}
