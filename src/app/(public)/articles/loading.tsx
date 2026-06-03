import { PageHero } from "@/components/layout/page-hero";

export default function PublicArticlesLoading() {
  return (
    <>
      <PageHero
        label="Artikel & Wawasan"
        title="Perspektif di balik desain."
        description="Eksplorasi material, studi kasus desain, dan panduan praktis untuk menciptakan hunian yang lebih personal dan bermakna."
      />

      <section className="section-container section-y-compact animate-in fade-in duration-700">
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-surface rounded-[var(--radius-card)] flex flex-col overflow-hidden animate-pulse">
              <div className="h-48 w-full bg-forest-900/5 relative overflow-hidden" />
              <div className="p-6 space-y-4">
                <div className="h-3 w-1/3 bg-forest-900/10 rounded-full" />
                <div className="h-7 w-full bg-forest-900/10 rounded-md" />
                <div className="h-4 w-full bg-forest-900/10 rounded-full" />
                <div className="h-4 w-4/5 bg-forest-900/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
