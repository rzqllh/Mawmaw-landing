"use client";

import { useActionState } from "react";
import { type Service } from "@prisma/client";
import { updateService } from "@/app/actions/services";
import { useRouter } from "next/navigation";
import { ServicePrimaryContent, ServiceSidebarContent } from "../../components/service-form";
import { AdminEditorShell } from "@/components/admin/shell/admin-editor-shell";

const initialState = {
  success: false,
  error: "",
};

export default function EditServiceForm({ service }: { service: Service }) {
  const router = useRouter();
  
  const updateWithId = updateService.bind(null, service.id);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      try {
        await updateWithId(formData);
        router.push("/admin/services");
        return { success: true, error: "" };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : "Gagal menyimpan layanan" };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <AdminEditorShell
        title="Edit Layanan"
        backUrl="/admin/services"
        backLabel="Kembali ke Layanan"
        isPending={isPending}
        error={state?.error}
        submitLabel="Simpan Perubahan"
        primaryContent={<ServicePrimaryContent service={service} />}
        sidebarContent={<ServiceSidebarContent service={service} />}
      />
    </form>
  );
}
