"use client";

import { useActionState } from "react";
import { createService } from "@/app/actions/services";
import { useRouter } from "next/navigation";
import { ServicePrimaryContent, ServiceSidebarContent } from "../components/service-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

const initialState = {
  success: false,
  error: "",
};

export default function NewServicePage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      try {
        await createService(formData);
        router.push("/admin/services");
        return { success: true, error: "" };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : "Gagal membuat layanan" };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Layanan Baru"
        backUrl="/admin/services"
        backLabel="Kembali ke Layanan"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Layanan"
        primaryContent={<ServicePrimaryContent />}
        sidebarContent={<ServiceSidebarContent />}
      />
    </form>
  );
}
