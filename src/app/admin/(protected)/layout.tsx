import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/shell/admin-sidebar";
import { AdminHeader } from "@/components/admin/shell/admin-header";
import { AdminLayoutShell } from "@/components/admin/shell/admin-layout-shell";
import { type ReactNode } from "react";

import { AdminCommandPalette } from "@/components/admin/shell/admin-command-palette";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutShell
      sidebar={<AdminSidebar userEmail={user.email || ""} />}
      header={<AdminHeader />}
    >
      {children}
      <AdminCommandPalette />
    </AdminLayoutShell>
  );
}
