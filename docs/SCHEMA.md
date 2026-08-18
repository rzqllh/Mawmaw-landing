# Data Schema

Authoritative schema: `prisma/schema.prisma`.

## Project

Portfolio item managed through admin and shown publicly only when published.

| Field | Type | Rule |
| --- | --- | --- |
| `id` | `String` | CUID primary key |
| `slug` | `String` | Unique public identifier |
| `title` | `String` | Required |
| `category` | `String` | Filter label |
| `location` | `String` | Required project location |
| `excerpt` | `String` | Card and metadata summary |
| `description` | `Text` | Long project copy |
| `coverSrc` / `coverAlt` | `String` | Remote image URL and alt text |
| `coverBlur` | `String?` | Optional blur data URL |
| `gallery` | `Json` | Array of image assets |
| `featured` | `Boolean` | Defaults `false` |
| `year` | `String` | Display year |
| `scope` | `String[]` | PostgreSQL array |
| `sortOrder` | `Int` | Defaults `0` |
| `status` | `ContentStatus` | Defaults `DRAFT` |
| timestamps | `DateTime` | Created and updated automatically |

## Article

Editorial entry managed through admin.

| Field | Type | Rule |
| --- | --- | --- |
| `id`, `slug`, `title` | `String` | CUID id, unique slug, required title |
| `excerpt` | `String` | Listing and metadata copy |
| cover fields | `String` / `String?` | Remote URL, alt, optional blur |
| `category` | `String` | Filter label |
| `featured` | `Boolean` | Defaults `false` |
| `publishedAt` | `DateTime` | Editorial display date |
| `content` | `Json` | Current mapper expects `string[]` |
| `status` | `ContentStatus` | Defaults `DRAFT` |
| timestamps | `DateTime` | Created and updated automatically |

## Service

Service card content: unique slug, title, text description, icon name, optional remote image fields, and integer ordering. Service currently has no publish status.

## SiteSetting

Singleton row with id `global`. Holds:

- Site identity, email, phone, address, and social JSON.
- Hero title, description, image fields, and stat-card JSON.
- About copy, image fields, badge fields, and value-card JSON.
- Section headers for services, projects, and articles.
- Contact and footer copy.

Public code expects this row to exist. Run `npm run db:seed` after schema setup.

## ContactSubmission

Stores normalized output from direct form or wizard:

- `name`, `email`, `projectType`, `location`, and `message`.
- Optional `style` and `estimatedArea`.
- `status`, default `NEW`.
- Creation timestamp.

## Enums

```text
ContentStatus: DRAFT | PUBLISHED
ContactStatus: NEW | READ | RESPONDED
```

## Ownership rules

- `db.project` is the only project source for admin and public UI.
- Do not add a second persistence client; import `db` from `src/lib/db.ts`.
- Schema changes require a migration strategy. No migration directory is currently tracked.
- Do not publish sample portfolio, customer names, testimonials, or metrics through seed.
