# Environment

`.env.example` is the authoritative variable list. Copy it to `.env.local`; never commit real values.

## Required for database-backed rendering

| Variable | Used by |
| --- | --- |
| `DATABASE_URL` | Application Prisma client and PostgreSQL pool |
| `DIRECT_URL` | Prisma CLI through `prisma.config.ts` |

Both values must target the same PostgreSQL schema. `DIRECT_URL` should use a direct connection suitable for schema commands. `DATABASE_URL` may use the provider's application connection or pooler.

## Required for admin authentication

| Variable | Visibility |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public project URL; safe for browser use |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key; safe for browser use |

Admin users are managed in Supabase Auth. No service-role key is read by this repository.

## Required for draft preview

| Variable | Rule |
| --- | --- |
| `PREVIEW_SECRET` | Server-only random value; never place in client markup or links |

## Optional email notification

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables notification send |
| `ADMIN_NOTIFICATION_EMAIL` | Notification recipient |
| `FROM_EMAIL` | Verified sender identity |

If email configuration is absent, a valid contact submission is still stored in PostgreSQL.

## Optional rate limiting

| Variable | Purpose |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST token |

The contact pipeline enables a three-request-per-minute sliding window only when both values exist.

## Runtime flag

`NODE_ENV` is normally set by Next.js or the hosting platform. Use `development`, `test`, or `production` according to the runtime.

## Setup validation

```bash
npx prisma validate
npx prisma generate
npx prisma db push
npm run db:seed
```

Do not paste connection strings or keys into issues, logs, screenshots, or documentation. When build output reports a database tenant/user failure, rotate or correct credentials in the environment provider rather than changing source to hide the error.
