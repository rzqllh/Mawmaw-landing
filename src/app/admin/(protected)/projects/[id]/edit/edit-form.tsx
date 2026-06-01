"use client";

import { useActionState } from "react";
import { updateProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectFormFields } from "../../components/project-form";

const initialState = {
  success: false,
  error: "",
};

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  
  const updateWithId = updateProject.bind(null, project.id);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await updateWithId(formData);
        router.push("/admin/projects");
        return { success: true, error: "" };
      } catch (err: any) {
        return { success: false, error: err.message || "Gagal menyimpan proyek" };
      }
    },
    initialState
  );

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="mb-6">
        <Link 
          href="/admin/projects" 
          className="inline-flex items-center gap-2 text-forest-900/50 hover:text-gold-700 transition-colors text-xs font-bold uppercase tracking-widest mb-4"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          Daftar Proyek
        </Link>
        <h1 className="text-3xl font-serif font-medium text-forest-900">Edit Proyek</h1>
        <p className="text-forest-700 mt-2 text-sm leading-relaxed">
          Perbarui detail karya interior <strong className="text-gold-700 font-bold">"{project.title}"</strong>.
        </p>
      </div>

      <div className="admin-glass-surface p-6 md:p-8 rounded-[var(--radius-card)]">
        <form action={formAction} className="space-y-8">
          
          <ProjectFormFields project={project} />

          {state?.error && (
            <div className="p-4 flex items-start gap-3 text-[13px] text-red-800 bg-red-100 border border-red-200 rounded-xl font-medium">
              <div className="mt-0.5 font-bold">X</div>
              <div>{state.error}</div>
            </div>
          )}

          <div className="pt-6 border-t border-forest-900/10 flex items-center justify-end gap-4">
            <Link href="/admin/projects" className="text-sm font-bold text-forest-900/60 hover:text-forest-900 transition-colors">
              Batal
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className=""
              disabled={isPending}
            >
              <CheckCircle weight="bold" className="w-5 h-5" />
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
