# Stack

Dokumen ini mencatat dependency dan platform yang benar-benar dipakai source saat ini.

## Runtime

| Concern | Technology | Evidence |
| --- | --- | --- |
| Framework | Next.js 16 App Router | `next` dependency, `src/app/` |
| UI runtime | React 19 | `react`, `react-dom` |
| Language | TypeScript 6 | `typescript`, `tsconfig.json` |
| Styling | Tailwind CSS 4 | `@tailwindcss/postcss`, `src/app/globals.css` |
| Motion | Motion 12 | `motion/react` imports |
| Icons | Phosphor Icons | `@phosphor-icons/react` |

## Data and backend

| Concern | Technology | Evidence |
| --- | --- | --- |
| Database | PostgreSQL | `provider = "postgresql"` |
| ORM | Prisma 7 | `prisma/schema.prisma`, `src/lib/db.ts` |
| Driver | `pg` + Prisma PostgreSQL adapter | `@prisma/adapter-pg` |
| Authentication | Supabase Auth | `src/lib/supabase/` |
| Server mutations | Next.js server actions | `src/app/actions/` |
| Validation | Zod 4 | contact and admin action schemas |
| Email | Resend | contact notification pipeline |
| Rate limiting | Upstash Redis | optional contact-form guard |

## UI dependencies

- React Hook Form and `@hookform/resolvers` for admin and wizard forms.
- Zustand for seven-step wizard state.
- `dnd-kit` for admin ordering.
- Radix Select for accessible select behavior.
- `react-markdown` and `remark-gfm` for stored article/project text.
- Sonner for client feedback.

## Hosting assumptions

- Vercel is the configured deployment target (`vercel.json`).
- PostgreSQL and Supabase are external services.
- Resend and Upstash are optional; contact submissions still require PostgreSQL.
- Images are remote URLs consumed through `next/image`. No upload/storage adapter exists in source.

## Version policy

`package.json` and `package-lock.json` are authoritative. Do not update framework or database packages as part of unrelated feature work. Run test, lint, typecheck, Prisma validation, and build after version changes.

## Source-of-truth decision

Current implementation is retained. Architecture work must extend Prisma/PostgreSQL, Supabase Auth, and the custom admin instead of introducing a parallel CMS or database path.
