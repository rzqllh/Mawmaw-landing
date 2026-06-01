"use client";

import { SignOut } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";

export function SignOutSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      title="Keluar"
      className="p-2.5 rounded-xl text-forest-900/60 hover:text-gold-700 hover:bg-gold-500/10 transition-interactive disabled:opacity-50"
    >
      <SignOut weight="duotone" className="w-5 h-5" />
    </button>
  );
}
