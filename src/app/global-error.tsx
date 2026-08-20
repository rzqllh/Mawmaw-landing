"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected root errors to client console or monitoring provider
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0F1012] text-[#F3F1EC] font-sans antialiased flex items-center justify-center p-6">
        <main className="max-w-md w-full text-center space-y-6 bg-[#17181C] border border-[#2B2D33] rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-[#F3F1EC]">
              Terjadi Kendala Sistem
            </h1>
            <p className="text-sm text-[#A0A2AB] leading-relaxed">
              Halaman mengalami kesalahan teknis yang tidak terduga. Silakan coba muat ulang halaman.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#E8DCC4] text-[#17181C] font-medium text-sm hover:bg-[#DFCDB1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181C] transition-colors cursor-pointer"
          >
            Muat Ulang Halaman
          </button>
        </main>
      </body>
    </html>
  );
}
