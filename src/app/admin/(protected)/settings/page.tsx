import { getSiteSettings } from "@/lib/queries";
import { SettingsForm } from "./components/settings-form";

export const metadata = {
  title: "Pengaturan Website | Mawmaw Admin",
};

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-700 pb-12">
      <SettingsForm initialData={settings as Parameters<typeof SettingsForm>[0]["initialData"]} />
    </div>
  );
}
