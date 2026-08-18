# Deployment

## Target topology

```text
GitHub repository
  → Vercel build/runtime
      → PostgreSQL
      → Supabase Auth
      → Resend (optional)
      → Upstash Redis (optional)
```

## Pre-deploy requirements

1. PostgreSQL database exists and accepts both application and direct connections.
2. Supabase project exists with at least one admin user.
3. All required variables from `.env.example` are configured in Vercel.
4. Prisma schema is applied.
5. Global settings row is seeded.

Repository currently has no checked-in migration directory. Until migrations are introduced, apply the schema deliberately from a trusted environment:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

`db push` changes database schema directly. Back up production data and review schema diff before running it against a populated database.

## Vercel configuration

Set these for Production and relevant Preview environments:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `PREVIEW_SECRET`

Add Resend and Upstash variables only when those integrations are enabled.

`npm install` runs `prisma generate` through `postinstall`. Vercel then runs `npm run build`.

## Build dependency

Build reads PostgreSQL through public layouts, `generateStaticParams()`, and sitemap generation. Valid credentials and a seeded `SiteSetting` row are required during build. A compile/typecheck pass followed by page-data failure is still a failed deployment.

## Release checklist

```bash
npm test
npm run lint
npm run typecheck
npx prisma validate
npm run build
```

After deployment:

- Load `/`, `/projects`, `/articles`, `/sitemap.xml`, and `/robots.txt`.
- Confirm `/admin` redirects unauthenticated users to `/admin/login`.
- Log in and test a draft preview without exposing `PREVIEW_SECRET`.
- Submit direct contact and wizard flows.
- Confirm a failed email notification does not remove the stored inbox entry.
- Verify only real, owner-approved projects are published.

## Rollback

Use Vercel deployment rollback for application code. Database changes are separate and require their own backup/restore process. Do not assume reverting Git restores database rows.

## Current blocker

Latest verified local environment does not provide valid database credentials inside the isolated worktree. Static checks can run; production build and seed execution remain unverified until credentials are supplied.
