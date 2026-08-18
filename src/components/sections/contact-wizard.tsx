import { WizardForm } from "@/components/forms/wizard/WizardForm";
import type { SiteSetting } from "@prisma/client";

export function ContactWizard({ settings }: { settings: SiteSetting }) {
  return <WizardForm settings={settings} />;
}
