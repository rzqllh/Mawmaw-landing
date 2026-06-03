"use client";

import { useActionState } from "react";
import { createProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import { ProjectPrimaryContent, ProjectSidebarContent } from "../components/project-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

interface FormState {
  success: boolean;
  error: string;
}

const initialState: FormState = {
  success: false,
  error: "",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await createProject(formData);
        router.push("/admin/projects");
        return { success: true, error: "" };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Gagal membuat proyek";
        return { success: false, error: message };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Proyek Baru"
        backUrl="/admin/projects"
        backLabel="Kembali ke Proyek"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Proyek"
        primaryContent={<ProjectPrimaryContent />}
        sidebarContent={<ProjectSidebarContent />}
      />
    </form>
  );
}
