# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di file ini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-06-03

Rilis awal website portofolio Mawmaw Interior.

### Added

#### Public Website
- Landing page dengan 6 section: Hero, Tentang, Layanan, Proyek Unggulan, Artikel Unggulan, Kontak
- Halaman daftar dan detail artikel (`/articles`, `/articles/[slug]`)
- Halaman daftar dan detail proyek (`/projects`, `/projects/[slug]`)
- Galeri foto proyek dengan grid responsif
- Floating navbar dengan Clear Liquid Glass effect
- Interactive tabbed layout pada section Layanan
- Dark premium Contact section dengan form validasi
- Reading progress bar pada halaman artikel
- Social share untuk artikel
- Artikel dan proyek terkait di halaman detail
- SEO metadata dinamis (title, description, OpenGraph) per halaman
- Responsive design (360px–1440px+)
- Motion animations dengan `prefers-reduced-motion` support
- Footer dengan navigasi dan info kontak

#### Admin CMS
- Dashboard admin dengan overview konten
- CRUD artikel dengan Markdown editor
- CRUD proyek dengan galeri multi-foto
- CRUD layanan
- Pengaturan global website (hero, tentang, kontak, dll.)
- Inbox pesan dari form kontak publik
- Cloudinary media upload integration
- Admin sidebar navigation dengan mobile drawer
- Supabase Auth (email/password) dengan middleware guard

#### Design System
- Custom design token system di `globals.css`
- Warm neutral + forest green + muted gold palette
- Plus Jakarta Sans + Cormorant Garamond typography
- Glass surface utilities (solid, regular, clear liquid)
- Responsive section layout utilities (`section-y`, `section-container`)
- Reusable UI primitives (Button, Input, Select, Badge, Textarea, dll.)
- Card components (ArticleCard, ProjectCard) dengan variants

#### Infrastructure
- Next.js 16 App Router dengan Turbopack
- Prisma ORM dengan PostgreSQL
- Supabase Auth middleware untuk route protection
- Server Actions untuk form submissions
- Static generation (SSG) untuk halaman publik
- Zod validation pada form kontak dan CMS
- Email notification via Resend
- Rate limiting via Upstash Redis

### Security
- Admin routes dilindungi middleware Supabase Auth
- Redirect otomatis ke `/admin/login` untuk user tanpa sesi
- Redirect otomatis ke `/admin` untuk user yang sudah login
- Input validation server-side dengan Zod
- Environment variables terpisah (public vs secret)

---

_Versi sebelum 1.0.0 adalah fase development internal dan tidak didokumentasikan._
