export default function PublicLoading() {
  return (
    <div className="min-h-dvh" aria-busy="true" aria-label="Memuat halaman">
      <div className="section-container flex min-h-[70dvh] items-center pt-24">
        <div className="w-full max-w-3xl animate-pulse space-y-5">
          <div className="h-3 w-32 rounded bg-forest-900/10" />
          <div className="h-14 w-full rounded bg-forest-900/10 md:h-20" />
          <div className="h-5 w-4/5 rounded bg-forest-900/10" />
          <span className="sr-only">Memuat konten Mawmaw Interior…</span>
        </div>
      </div>
    </div>
  );
}
