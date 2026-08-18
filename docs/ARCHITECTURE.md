# Architecture

## System boundary

```text
Browser
  ├─ Public App Router pages
  ├─ Admin App Router pages
  └─ Server actions / metadata routes
          │
          ├─ Supabase Auth (identity and session)
          ├─ Prisma + PostgreSQL (content and inbox)
          ├─ Resend (optional notification)
          └─ Upstash Redis (optional rate limit)
```

Next.js hosts public UI, protected admin UI, server actions, draft preview routes, sitemap, robots, and JSON-LD. There is no separate application server.

## Route groups

- `src/app/(public)/`: landing, project, and article pages.
- `src/app/admin/login/`: public login page.
- `src/app/admin/(protected)/`: authenticated admin pages.
- `src/app/actions/`: authenticated content mutations and contact submission pipeline.
- `src/app/api/draft/`: secret-checked draft-mode entry.
- `src/app/api/disable-draft/`: safe internal draft-mode exit.
- `src/app/sitemap.ts` and `src/app/robots.ts`: native metadata routes.

## Public data flow

1. Server component calls a query in `src/lib/queries.ts`.
2. Query uses the singleton `db` client from `src/lib/db.ts`.
3. Prisma reads PostgreSQL.
4. Row is mapped to the public `Project`, `Article`, or `Service` DTO.
5. `unstable_cache` stores query results with content-specific tags.

Published public queries filter `ContentStatus.PUBLISHED`. Draft mode widens project/article queries for authenticated preview flows.

`getSiteSettings()` performs a read only. Missing `global` settings throws with a seed instruction; public rendering does not create database rows.

## Admin data flow

1. Middleware refreshes Supabase cookies and redirects unauthenticated `/admin` requests.
2. Protected layout calls `supabase.auth.getUser()` again before rendering.
3. Every admin server action verifies the current user before mutation.
4. Zod or explicit field parsing validates input.
5. Prisma writes data and Next.js revalidates affected public/admin paths.

Projects and articles expose explicit `DRAFT`/`PUBLISHED` controls. Draft preview is enabled through a server action; raw preview secrets are not rendered into admin markup.

## Contact pipeline

Direct form and seven-step wizard keep separate Zod schemas. Both feed `persistContactSubmission()` in `src/app/actions/submit-contact.ts`:

1. Validate request shape.
2. Apply optional Upstash sliding-window rate limit.
3. Save `ContactSubmission` through shared Prisma client.
4. Send optional Resend notification with escaped user HTML.

Wizard opens WhatsApp from the direct click before awaiting persistence. WhatsApp handoff and database result remain independent outcomes.

## Content initialization

`prisma/seed.ts` creates initial articles, services, and global settings. It does not create example portfolio records. It deletes only six approved legacy mock slugs and updates only the global `heroStatCards` field needed to remove the old metric.

## Rendering and build behavior

Public layout and dynamic content routes read PostgreSQL. `generateStaticParams()` also queries published projects/articles. A production build therefore needs valid database credentials and a seeded settings row.

## Security boundaries

- Supabase user checks protect admin routes and actions.
- Draft secret comparison uses constant-time comparison.
- Draft-exit redirects accept internal paths only.
- User-provided email HTML is escaped.
- JSON-LD serialization escapes `<` before insertion into a script element.
- `/admin` and `/api` are excluded from crawler access in `robots.txt`.
