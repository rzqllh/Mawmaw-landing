import { PageHero } from "@/components/layout/page-hero";

export default function PublicProjectsLoading() {
  return (
    <>
      <PageHero
        label="Portfolio"
        title="Ruang yang dirancang dengan cerita dan fungsi."
        description="Setiap proyek memiliki ritme, kebutuhan, dan karakter berbeda. Portfolio ini disusun agar Anda dapat melihat bagaimana Mawmaw Interior menerjemahkan rasa nyaman ke dalam ruang nyata."
      />

      <section className="section-container section-y-compact animate-in fade-in duration-700">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-surface rounded-[var(--radius-card)] p-5 aspect-[4/3] animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-forest-900/5" />
              <div className="absolute bottom-5 left-5 right-5 space-y-3">
                <div className="h-4 w-1/4 bg-forest-900/10 rounded-full" />
                <div className="h-8 w-3/4 bg-forest-900/10 rounded-md" />
                <div className="h-4 w-full bg-forest-900/10 rounded-full" />
                <div className="h-4 w-5/6 bg-forest-900/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
