"use client";

import { useActionState } from "react";
import { type Project } from "@prisma/client";
import { updateProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import { ProjectPrimaryContent, ProjectSidebarContent } from "../../components/project-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

const initialState = {
  success: false,
  error: "",
};

export default function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  
  const updateWithId = updateProject.bind(null, project.id);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      try {
        await updateWithId(formData);
        router.push("/admin/projects");
        return { success: true, error: "" };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : "Gagal menyimpan proyek" };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Edit Proyek"
        backUrl="/admin/projects"
        backLabel="Kembali ke Proyek"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Perubahan"
        primaryContent={<ProjectPrimaryContent project={project} />}
        sidebarContent={<ProjectSidebarContent project={project} />}
      />
    </form>
  );
}
