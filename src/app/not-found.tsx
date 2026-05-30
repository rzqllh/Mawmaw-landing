import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-container flex min-h-[72vh] items-center py-32">
      <div className="max-w-2xl">
        <p className="mb-5 font-sans text-sm font-semibold uppercase text-gold-700">
          Halaman Tidak Ditemukan
        </p>
        <h1 className="font-serif text-5xl leading-[0.95] text-forest-900 md:text-7xl">
          Ruang ini belum tersedia.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary">
          Tautan yang Anda buka mungkin sudah berubah atau belum dipublikasikan.
          Silakan kembali ke halaman utama atau jelajahi portfolio kami.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Beranda</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/projects">Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
