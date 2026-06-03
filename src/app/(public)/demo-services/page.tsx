"use client";

import { useState } from "react";
import { IconGlyph } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";

// Mock data based on the real services
const services = [
  { id: "01", icon: "ph-pen-nib", title: "Konsultasi & Desain", desc: "Perencanaan tata ruang dan konsep visual mendalam.", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" },
  { id: "02", icon: "ph-hammer", title: "Renovasi Total", desc: "Transformasi ruang komprehensif tanpa pusing.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" },
  { id: "03", icon: "ph-armchair", title: "Custom Furniture", desc: "Perabot presisi buatan tangan yang proporsional.", img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200" },
  { id: "04", icon: "ph-plant", title: "Styling & Dekorasi", desc: "Sentuhan akhir material visual yang menghidupkan suasana.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" },
];

export default function DemoServicesPage() {
  return (
    <div className="landing-page-shell min-h-screen pt-32 pb-24">
      
      <div className="section-container mb-16 text-center">
        <h1 className="heading-page text-forest-900 mb-6">5 Opsi Layout Layanan</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          (Opsi 1 dipertahankan, Opsi 2-5 adalah variasi desain baru)
        </p>
      </div>

      {/* OPSI 1: Interactive Split (DIPERTAHANKAN) */}
      <div className="section-container mb-40">
        <div className="mb-12 border-b border-forest-900/10 pb-4">
          <Badge variant="gold">Opsi 1 (Dipertahankan)</Badge>
          <h2 className="text-4xl font-serif mt-4 text-forest-900">Interactive Split (Image & Accordion)</h2>
          <p className="text-text-secondary mt-2">Gambar di kiri (sticky), daftar layanan interaktif di kanan.</p>
        </div>
        <InteractiveSplitDemo />
      </div>

      {/* OPSI 2: Dark Mode Cinematic */}
      <div className="section-container mb-40">
        <div className="mb-12 border-b border-forest-900/10 pb-4">
          <Badge variant="gold">Opsi 2 (Baru)</Badge>
          <h2 className="text-4xl font-serif mt-4 text-forest-900">Dark Mode Cinematic</h2>
          <p className="text-text-secondary mt-2">Kontras tajam dengan latar belakang gelap, menonjolkan kesan mewah dan eksklusif.</p>
        </div>
        <div className="bg-forest-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl">
          <div className="text-center mb-16">
            <span className="text-gold-500 tracking-widest text-sm font-bold uppercase mb-4 block">Layanan Spesialis</span>
            <h2 className="text-5xl md:text-6xl font-serif">Keahlian Kami.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
            {services.map((s, i) => (
              <div key={s.id} className={`group ${i % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-8">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-forest-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gold-500 font-serif text-2xl italic">{s.id}</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                  <IconGlyph name={s.icon as any} className="w-6 h-6 text-white/50 group-hover:text-gold-300 transition-colors" weight="duotone" />
                </div>
                <h3 className="text-3xl font-serif mb-3 group-hover:text-gold-300 transition-colors">{s.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPSI 3: Magazine Table of Contents */}
      <div className="section-container mb-40">
        <div className="mb-12 border-b border-forest-900/10 pb-4">
          <Badge variant="gold">Opsi 3 (Baru)</Badge>
          <h2 className="text-4xl font-serif mt-4 text-forest-900">Magazine Table of Contents</h2>
          <p className="text-text-secondary mt-2">Fokus ekstrem pada tipografi layaknya daftar isi majalah arsitektur. Gambar melayang saat di-hover.</p>
        </div>
        
        <MagazineHoverDemo />
      </div>

      {/* OPSI 4: Interactive Dimming Grid */}
      <div className="section-container mb-40">
        <div className="mb-12 border-b border-forest-900/10 pb-4">
          <Badge variant="gold">Opsi 4 (Baru)</Badge>
          <h2 className="text-4xl font-serif mt-4 text-forest-900">Interactive Focus Grid</h2>
          <p className="text-text-secondary mt-2">Grid 2x2. Saat mengarahkan kursor ke satu layanan, yang lainnya meredup (dimmed) agar fokus ke satu poin.</p>
        </div>
        <FocusGridDemo />
      </div>

      {/* OPSI 5: Vertical Parallax Stack */}
      <div className="section-container">
        <div className="mb-12 border-b border-forest-900/10 pb-4">
          <Badge variant="gold">Opsi 5 (Baru)</Badge>
          <h2 className="text-4xl font-serif mt-4 text-forest-900">Vertical Parallax Stack</h2>
          <p className="text-text-secondary mt-2">Kartu-kartu bertumpuk seperti kartu remi saat pengguna melakukan scroll ke bawah.</p>
        </div>
        
        <div className="py-20 relative">
          {services.map((s, i) => (
            <div 
              key={s.id} 
              className="sticky" 
              style={{ top: `${150 + (i * 40)}px`, zIndex: i, marginBottom: i === services.length - 1 ? '0' : '40vh' }}
            >
              <div className="bg-surface border border-forest-900/10 p-8 md:p-12 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-8 items-center transform transition-transform duration-500 hover:-translate-y-2">
                <div className="w-full md:w-5/12 h-64 md:h-80 rounded-2xl overflow-hidden shrink-0">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-7/12">
                  <span className="w-16 h-16 rounded-full bg-forest-50 text-forest-900 flex items-center justify-center mb-6 border border-forest-900/10">
                    <IconGlyph name={s.icon as any} className="w-8 h-8" weight="duotone" />
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif text-forest-900 mb-6">{s.title}</h3>
                  <p className="text-xl text-text-secondary leading-relaxed mb-8">{s.desc}</p>
                  <button className="text-gold-700 font-bold tracking-widest uppercase text-sm flex items-center gap-2 hover:gap-4 transition-all">
                    Lihat Detail <i className="ph-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Extra spacer to allow scrolling past the last stacked card */}
          <div className="h-[40vh]"></div>
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS FOR DEMOS
// ----------------------------------------------------------------------

function InteractiveSplitDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
      <div className="sticky top-32 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card card-lift">
        {services.map((s, i) => (
          <img
            key={s.id}
            src={s.img}
            alt={s.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              activeIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      <div className="py-10">
        <p className="section-eyebrow">Layanan Spesialis</p>
        <h2 className="heading-section text-forest-900 mb-12">Rancangan yang berbicara.</h2>
        
        <div className="flex flex-col gap-6">
          {services.map((s, i) => {
            const isActive = activeIndex === i;
            return (
              <div 
                key={s.id}
                className={`group cursor-pointer border-b border-forest-900/10 pb-6 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-serif transition-all duration-300 ${isActive ? 'text-4xl text-forest-900' : 'text-2xl text-forest-900/70'}`}>
                    {s.title}
                  </h3>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-gold-500 text-white' : 'bg-transparent text-text-muted'}`}>
                    ↓
                  </div>
                </div>
                <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-lg text-text-secondary max-w-md pr-8">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MagazineHoverDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative py-12">
      <div className="border-t border-forest-900/20">
        {services.map((s, i) => (
          <div 
            key={s.id} 
            className="group flex flex-col md:flex-row md:items-center py-10 md:py-16 border-b border-forest-900/20 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-2xl font-serif italic text-gold-700 w-24 mb-4 md:mb-0 transition-transform group-hover:translate-x-4">
              {s.id}.
            </span>
            <div className="flex-1">
              <h3 className="text-5xl md:text-7xl font-serif text-forest-900 transition-colors group-hover:text-gold-700">
                {s.title}
              </h3>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-xl text-text-secondary pr-8">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Follower simulation (Static absolute for demo purposes) */}
      <div className="hidden md:block pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 w-80 aspect-[3/4] z-10 transition-opacity duration-500">
        {services.map((s, i) => (
          <img
            key={s.id}
            src={s.img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-500 ${
              hoveredIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FocusGridDemo() {
  return (
    <div className="group/grid grid md:grid-cols-2 gap-4">
      {services.map((s) => (
        <div 
          key={s.id} 
          className="bg-white rounded-3xl p-10 md:p-14 border border-forest-900/5 transition-all duration-500 hover:shadow-2xl hover:!opacity-100 group-hover/grid:opacity-30 relative overflow-hidden"
        >
          {/* Subtle background image on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none">
            <img src={s.img} alt="" className="w-full h-full object-cover mix-blend-luminosity" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-12">
              <IconGlyph name={s.icon as any} className="w-12 h-12 text-forest-900" weight="duotone" />
              <span className="text-forest-900/20 text-6xl font-serif font-bold leading-none">{s.id}</span>
            </div>
            <h3 className="text-4xl font-serif text-forest-900 mb-4">{s.title}</h3>
            <p className="text-xl text-text-secondary leading-relaxed max-w-sm">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
