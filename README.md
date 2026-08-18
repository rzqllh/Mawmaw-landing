# Mawmaw Interior

Website portfolio dan CMS internal untuk Mawmaw Interior. Public site menampilkan layanan, proyek yang sudah dipublikasikan, artikel, profil studio, dan dua alur konsultasi. Admin mengelola project, article, service, site settings, dan inbox.

## Stack

| Layer | Implementasi |
| --- | --- |
| Web | Next.js 16 App Router, React 19, TypeScript 6 |
| Styling | Tailwind CSS 4, custom components, CSS design tokens |
| Database | PostgreSQL melalui Prisma 7 dan `@prisma/adapter-pg` |
| Authentication | Supabase Auth dengan cookie session server-side |
| Forms | React Hook Form, Zod, server actions |
| Email | Resend, opsional |
| Rate limit | Upstash Redis, opsional |
| Deployment target | Vercel |

Media saat ini disimpan sebagai URL pada record database. Repository belum memiliki upload/storage adapter khusus.

## Setup

```bash
npm install
Copy-Item .env.example .env.local
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Isi `.env.local` sebelum menjalankan perintah database. `DIRECT_URL` dipakai Prisma CLI; `DATABASE_URL` dipakai aplikasi.

Public site tersedia di `http://localhost:3000`. Admin login tersedia di `http://localhost:3000/admin/login` setelah user dibuat di Supabase Auth.

## Scripts

| Command | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Menjalankan ESLint |
| `npm run typecheck` | Menjalankan TypeScript tanpa emit |
| `npm test` | Menjalankan Node test runner untuk `src/lib/*.test.ts` |
| `npm run db:seed` | Membuat default settings/services/articles dan membersihkan enam project mock lama |

## Routes

### Public

| Route | Fungsi |
| --- | --- |
| `/` | Landing page dan contact forms |
| `/projects` | Project berstatus `PUBLISHED`, dengan category filter |
| `/projects/[slug]` | Detail project dan gallery |
| `/articles` | Article berstatus `PUBLISHED`, dengan category filter |
| `/articles/[slug]` | Detail article |
| `/sitemap.xml` | Sitemap statis dan published content |
| `/robots.txt` | Aturan crawler |

### Admin

| Route | Fungsi |
| --- | --- |
| `/admin/login` | Login Supabase |
| `/admin` | Dashboard |
| `/admin/projects` | CRUD, reorder, draft/publish, preview project |
| `/admin/articles` | CRUD, draft/publish, preview article |
| `/admin/services` | CRUD dan reorder service |
| `/admin/settings` | Site-wide content settings |
| `/admin/inbox` | Contact submissions |

## Content rules

- Prisma database adalah source of truth public project, article, service, dan site settings.
- Project/article baru default ke `DRAFT`.
- Seed tidak membuat portfolio contoh. Portfolio kosong sampai project nyata dibuat melalui admin dan dipublikasikan.
- Jangan menerbitkan angka pencapaian, testimonial, nama klien, atau project tanpa bukti owner.

## Documentation

- [Implementation status](docs/IMPLEMENTATION_STATUS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Stack](docs/STACK.md)
- [Schema](docs/SCHEMA.md)
- [Environment](docs/ENVIRONMENT.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Testing](docs/TESTING.md)

## Production verification

Local database seed dan production build berhasil pada 2026-08-19. Seed menghapus enam legacy mock projects, mengisi enam articles, enam services, dan site settings. Build menyelesaikan page-data collection dan menghasilkan 27/27 static pages.

Hasil lokal tersebut belum memverifikasi environment atau deployment Vercel. Sinkronkan database variables ke Vercel, deploy ulang, lalu smoke-test public dan admin routes. Lihat `docs/IMPLEMENTATION_STATUS.md` untuk evidence terbaru.

## License

Private project. All rights reserved.
