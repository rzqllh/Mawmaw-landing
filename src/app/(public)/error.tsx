"use client";

import { useEffect } from "react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page failed to load", error);
  }, [error]);

  return (
    <section className="section-container flex min-h-dvh items-center py-32">
      <div className="max-w-xl border-y border-forest-900/15 py-12">
        <p className="section-eyebrow">Terjadi kendala</p>
        <h1 className="font-serif text-4xl text-forest-900 md:text-6xl">
          Halaman belum dapat dimuat.
        </h1>
        <p className="mt-5 leading-7 text-text-secondary">
          Data situs tidak berhasil diambil. Coba muat ulang, atau hubungi kami jika kendala berlanjut.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 min-h-11 rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        >
          Coba lagi
        </button>
      </div>
    </section>
  );
}
