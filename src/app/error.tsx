"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-[#17181C] border border-[#2B2D33] rounded-2xl p-8 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#F3F1EC]">
            Gagal Memuat Konten
          </h2>
          <p className="text-sm text-[#A0A2AB] leading-relaxed">
            Terjadi kesalahan saat memproses data halaman ini. Silakan coba kembali.
          </p>
        </div>

        <button
          type="button"
          onClick={() => reset()}
          className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#E8DCC4] text-[#17181C] font-medium text-sm hover:bg-[#DFCDB1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181C] transition-colors cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
