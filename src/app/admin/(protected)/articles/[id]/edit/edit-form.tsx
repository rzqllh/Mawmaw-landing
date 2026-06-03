"use client";

import { useActionState } from "react";
import { type Article } from "@prisma/client";
import { updateArticle } from "@/app/actions/articles";
import { useRouter } from "next/navigation";
import { ArticlePrimaryContent, ArticleSidebarContent } from "../../components/article-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

const initialState = {
  success: false,
  error: "",
};

export default function EditArticleForm({ article }: { article: Article }) {
  const router = useRouter();
  
  const updateWithId = updateArticle.bind(null, article.id);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      try {
        await updateWithId(formData);
        router.push("/admin/articles");
        return { success: true, error: "" };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : "Gagal menyimpan artikel" };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Edit Artikel"
        backUrl="/admin/articles"
        backLabel="Kembali ke Artikel"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Perubahan"
        previewUrl={`/articles/${article.slug}`}
        primaryContent={<ArticlePrimaryContent article={article} />}
        sidebarContent={<ArticleSidebarContent article={article} />}
      />
    </form>
  );
}
