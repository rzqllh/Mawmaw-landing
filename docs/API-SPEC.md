# Application Interfaces

Application uses server actions for mutations. It does not expose a general-purpose public REST or GraphQL content API.

## Public reads

Server components call functions from `src/lib/queries.ts`:

| Function | Result |
| --- | --- |
| `getPublishedProjects()` | Published project DTOs ordered by `sortOrder` |
| `getProjects()` | Published projects, or all projects in draft mode |
| `getFeaturedProjects()` | Featured published projects, or all featured in draft mode |
| `getProjectBySlug(slug)` | One visible project or `null` |
| `getPublishedArticles()` | Published articles ordered by `publishedAt` |
| `getArticles()` | Published articles, or all articles in draft mode |
| `getArticleBySlug(slug)` | One visible article or `null` |
| `getServices()` | Services ordered by `sortOrder` |
| `getSiteSettings()` | Required singleton settings row |

These are server-only interfaces, not browser endpoints.

## Contact actions

### Direct form

`submitContactForm(formData: FormData)` in `src/app/actions/submit-contact.ts` validates the flat contact schema and returns:

```ts
{ success: true }
```

or:

```ts
{ success: false, error: string }
```

### Seven-step wizard

`submitWizardContactForm(data: ContactFormData)` validates all seven wizard steps, maps them to the shared submission shape, and calls the same persistence pipeline.

`src/actions/contact.ts` is a thin client-facing delegate for the wizard.

## Admin actions

All actions below require an authenticated Supabase user.

| Domain | Actions |
| --- | --- |
| Projects | create, update, delete, preview |
| Articles | create, update, delete, preview |
| Services | list, read, create, update, delete |
| Settings | update global settings |
| Inbox | list, read, update status, delete |
| Ordering | reorder projects or services |
| Auth | login, logout |

Project/article create and update actions normalize status to `PUBLISHED` only when the submitted field exactly matches; otherwise they save `DRAFT`.

## Draft routes

### `GET /api/draft`

Query parameters:

- `secret`: must match `PREVIEW_SECRET` through constant-time comparison.
- `type`: `project` or `article`.
- `slug`: content slug.

Valid requests enable Next.js draft mode and redirect to the matching internal detail route.

### `GET /api/disable-draft`

Disables draft mode. Optional `redirect` accepts internal paths only. Absolute, protocol-relative, and malformed values resolve to `/`.

## Observability and health routes

### `GET /api/health`

Performs a lightweight PostgreSQL database connectivity check (`SELECT 1`).

- Returns `200 OK` with `{ status: "ok", timestamp: "<ISO-8601 string>" }` when database connectivity succeeds.
- Returns `503 Service Unavailable` with `{ status: "unhealthy" }` when database connectivity fails, without leaking connection strings or internal database stack traces.
- Headers include `Cache-Control: no-store, no-cache, must-revalidate`.

## Metadata routes

- `GET /sitemap.xml`: static public routes plus published project/article URLs.
- `GET /robots.txt`: allows public routes and disallows `/admin` and `/api`.

## Validation and errors

- Trust-boundary inputs use Zod (`src/lib/validations/admin.ts`, `src/lib/validations/contact.ts`) or constrained enum parsing.
- Contact rate limit returns a user-safe Indonesian message.
- Database write failure does not prevent wizard WhatsApp handoff.
- Server logs (`src/lib/server-log.ts`) output structured JSON for operational events without printing request secrets, credentials, or environment values.

