import { getSiteSettings } from "@/lib/queries";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { SettingsForm } from "./components/settings-form";

export const metadata = {
  title: "Pengaturan Web | Mawmaw Admin",
};

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Pengaturan Web"
        description="Atur seluruh konten statis, teks landing page, dan info umum website."
      />
      <div className="mt-8">
        <SettingsForm initialData={settings as any} />
      </div>
    </div>
  );
}
