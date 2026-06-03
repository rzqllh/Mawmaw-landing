# Mawmaw Interior

Website portofolio premium untuk **Mawmaw Interior** — studio desain interior yang menghadirkan layanan, proyek pilihan, artikel, dan alur konsultasi.

Dibangun dengan Next.js 16 App Router, TypeScript, Tailwind CSS v4, Prisma ORM, dan Supabase Auth. Website ini dilengkapi CMS admin lengkap untuk mengelola seluruh konten secara dinamis.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) — App Router, React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| UI Components | Custom components + `class-variance-authority`, `clsx`, `tailwind-merge` |
| Database | PostgreSQL via [Prisma ORM](https://www.prisma.io) |
| Auth | [Supabase Auth](https://supabase.com) (email/password) |
| Media | [Cloudinary](https://cloudinary.com) (upload & delivery) |
| Forms | `react-hook-form` + `zod` validation |
| Icons | `@phosphor-icons/react` |
| Animation | `motion` (Framer Motion) |
| Email | [Resend](https://resend.com) |
| Toast | `sonner` |

## Quick Start

### Prerequisites

- Node.js ≥ 20
- PostgreSQL database (or Supabase project)
- Cloudinary account (for media uploads)

### Setup

```bash
# 1. Clone & install
git clone https://github.com/rzqllh/Mawmaw-landing.git
cd Mawmaw-landing
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in your Supabase, Cloudinary, and Resend credentials

# 3. Setup database
npx prisma generate
npx prisma db push   # or npx prisma migrate deploy

# 4. Seed initial data (optional)
npx prisma db seed

# 5. Run dev server
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public routes (/, /articles, /projects)
│   ├── admin/
│   │   ├── login/          # Admin login page
│   │   └── (protected)/    # Auth-guarded admin routes
│   ├── actions/            # Server Actions
│   ├── globals.css         # Design tokens & global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── cards/              # Content cards (article, project)
│   ├── effects/            # Visual effects (hero shader)
│   ├── layout/             # Layout shells (admin, site header/footer)
│   ├── motion/             # Scroll reveal animation
│   ├── sections/           # Landing page sections
│   └── ui/                 # Reusable UI primitives
├── data/                   # Static content & navigation config
├── lib/                    # Utilities, queries, validation, icons
└── middleware.ts           # Supabase session + admin route guard
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, tentang, layanan, proyek, artikel, kontak |
| `/articles` | Daftar artikel |
| `/articles/[slug]` | Detail artikel |
| `/projects` | Daftar proyek |
| `/projects/[slug]` | Detail proyek + galeri |

### Admin (auth-guarded)

| Route | Description |
|-------|-------------|
| `/admin/login` | Login page |
| `/admin` | Dashboard |
| `/admin/articles` | Kelola artikel |
| `/admin/projects` | Kelola proyek |
| `/admin/services` | Kelola layanan |
| `/admin/settings` | Pengaturan global website |
| `/admin/inbox` | Pesan masuk dari form kontak |

## Environment Variables

Lihat [`.env.example`](.env.example) untuk referensi lengkap. Variabel dikelompokkan menjadi:

- **Site** — URL, nama, WhatsApp, Instagram
- **Supabase** — Auth & database connection
- **Cloudinary** — Media upload
- **Resend** — Transactional email
- **Bot Protection** — Turnstile/reCAPTCHA
- **Admin** — Registration toggle, owner email

> ⚠️ Jangan pernah commit file `.env.local` atau file yang berisi secret.

## Design System

Website ini menggunakan *design token system* yang terdefinisi di `globals.css`:

- **Palette**: Warm neutral canvas, forest green, muted gold
- **Typography**: Plus Jakarta Sans (UI) + Cormorant Garamond (editorial display)
- **Surfaces**: Solid editorial, regular glass, clear liquid glass (navbar)
- **Layout**: 8px spacing rhythm, responsive section utilities
- **Motion**: `prefers-reduced-motion` aware animations

## Deployment

Deploy ke [Vercel](https://vercel.com) (direkomendasikan):

1. Push repository ke GitHub
2. Import project di Vercel dashboard
3. Set environment variables di Vercel project settings
4. Deploy — Vercel akan otomatis detect Next.js

Atau gunakan CLI:

```bash
npx vercel
```

## License

Private — All rights reserved.
