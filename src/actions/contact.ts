"use server";

import { submitWizardContactForm } from "@/app/actions/submit-contact";
import type { ContactFormData } from "@/lib/validations/contact";

export async function submitContactForm(data: ContactFormData) {
  return submitWizardContactForm(data);
}
