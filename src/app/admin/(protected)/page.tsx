import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Redirect ke halaman kelola proyek secara default
  redirect("/admin/projects");
}
