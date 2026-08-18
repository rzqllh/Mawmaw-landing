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

## Metadata routes

- `GET /sitemap.xml`: static public routes plus published project/article URLs.
- `GET /robots.txt`: allows public routes and disallows `/admin` and `/api`.

## Validation and errors

- Trust-boundary inputs use Zod or constrained enum parsing.
- Contact rate limit returns a user-safe Indonesian message.
- Database write failure does not prevent wizard WhatsApp handoff.
- Server logs may include operational errors but must not print request secrets or environment values.
