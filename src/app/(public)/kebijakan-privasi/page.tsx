import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/data/public-content";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Mawmaw Interior mengenai pengumpulan, penggunaan, dan perlindungan data konsultasi proyek Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Informasi Legal"
        title="Kebijakan Privasi"
        description="Komitmen kami untuk melindungi privasi dan data pribadi klien serta pengunjung Mawmaw Interior."
      />

      <section className="section-container section-y max-w-4xl">
        <div className="space-y-12 font-sans text-forest-900/80 leading-relaxed">
          <Reveal>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-900 font-semibold">
                1. Pengantar
              </h2>
              <p>
                Mawmaw Interior (&ldquo;kami&rdquo;) menghargai dan berkomitmen menjaga privasi setiap klien dan pengunjung website kami ({siteConfig.url}). Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi yang Anda berikan saat berinteraksi dengan layanan dan website kami.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-4 border-t border-forest-900/10 pt-8">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-900 font-semibold">
                2. Data yang Kami Kumpulkan
              </h2>
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara sukarela melalui formulir kontak langsung maupun panduan konsultasi interaktif (Mode Wizard), meliputi:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Data Identitas & Kontak:</strong> Nama lengkap dan alamat email.</li>
                <li><strong>Detail Proyek:</strong> Tipe proyek (misal: hunian, apartemen, kafe, kantor), lokasi atau kota pelaksanaan, ruang lingkup yang dibutuhkan, estimasi linimasa, preferensi gaya atau anggaran, dan pesan deskripsi proyek.</li>
                <li><strong>Data Teknis:</strong> Informasi browser standar, log akses server dasar, dan alamat IP yang digunakan semata-mata untuk keperluan keamanan sistem dan pencegahan spam (rate limiting).</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 border-t border-forest-900/10 pt-8">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-900 font-semibold">
                3. Tujuan Penggunaan Data
              </h2>
              <p>Informasi yang Anda sampaikan digunakan secara eksklusif untuk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menghubungi Anda kembali dalam kurun waktu 1x24 jam kerja terkait permohonan konsultasi desain interior.</li>
                <li>Mempersiapkan analisis awal kebutuhan, estimasi ruang lingkup, dan rekomendasi pendekatan desain yang relevan.</li>
                <li>Melakukan komunikasi koordinasi selama proyek berlangsung apabila Anda memutuskan untuk bekerjasama.</li>
                <li>Menjaga keamanan operasional website dari aktivitas mencurigakan atau pengiriman formulir otomatis (spam).</li>
              </ul>
              <p className="font-medium text-forest-900">
                Kami tidak pernah menjual, menyewakan, memperdagangkan, atau membagikan data pribadi Anda kepada pihak ketiga mana pun untuk tujuan pemasaran.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4 border-t border-forest-900/10 pt-8">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-900 font-semibold">
                4. Penyimpanan & Keamanan Informasi
              </h2>
              <p>
                Data konsultasi Anda disimpan di infrastruktur basis data cloud yang terenkripsi dan terlindungi dengan Row Level Security (RLS) serta kontrol akses ketat. Akses ke data inbox dibatasi hanya untuk tim manajemen dan perancang Mawmaw Interior yang berwenang.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-4 border-t border-forest-900/10 pt-8">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-900 font-semibold">
                5. Hak Anda
              </h2>
              <p>
                Sebagai pemilik data, Anda berhak untuk meminta salinan, pembaruan, koreksi, atau penghapusan permanen atas riwayat data kontak dan formulir Anda dari sistem kami sewaktu-waktu.
              </p>
              <p>
                Untuk mengajukan permohonan tersebut atau menanyakan perihal privasi, Anda dapat menghubungi kami langsung melalui email{" "}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold text-forest-900 underline hover:text-gold-700 transition-colors"
                >
                  {siteConfig.email}
                </Link>{" "}
                atau pesan WhatsApp resmi studio kami.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="border-t border-forest-900/10 pt-8 text-xs text-forest-900/50">
              <p>Terakhir diperbarui: Februari 2026</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
