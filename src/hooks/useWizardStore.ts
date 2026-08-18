import { create } from "zustand";
import { ContactFormData } from "@/lib/validations/contact";

interface WizardState {
  step: number;
  data: Partial<ContactFormData>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<ContactFormData>) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  data: {
    services: [],
  },
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 7) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () => set(initialState),
}));
