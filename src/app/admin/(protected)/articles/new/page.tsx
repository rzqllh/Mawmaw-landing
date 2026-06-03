"use client";

import { useActionState } from "react";
import { createArticle } from "@/app/actions/articles";
import { useRouter } from "next/navigation";
import { ArticlePrimaryContent, ArticleSidebarContent } from "../components/article-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

type ActionState = {
  success: boolean;
  error: string;
};

const initialState: ActionState = {
  success: false,
  error: "",
};

export default function NewArticlePage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      try {
        await createArticle(formData);
        router.push("/admin/articles");
        return { success: true, error: "" };
      } catch (err: unknown) {
        return { 
          success: false, 
          error: err instanceof Error ? err.message : "Gagal membuat artikel" 
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Artikel Baru"
        backUrl="/admin/articles"
        backLabel="Kembali ke Artikel"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Artikel"
        primaryContent={<ArticlePrimaryContent />}
        sidebarContent={<ArticleSidebarContent />}
      />
    </form>
  );
}
