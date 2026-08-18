# Product Requirements

## Product

Mawmaw Interior website combines a public studio presence with a small custom CMS. It must help prospective clients understand services and start a consultation while letting the owner control published content without editing source.

## V1 audience and operating scope

- Homeowners and apartment residents seeking interior design.
- Small businesses and offices seeking interior work or custom furniture.
- Consultation wizard currently accepts Jakarta, Bogor, Depok, Tangerang, and Bekasi.
- Public copy must not imply work, coverage, client names, or achievements that the owner has not verified.

## V1 outcomes

1. Visitor understands studio positioning and services.
2. Visitor can inspect owner-approved portfolio and articles.
3. Visitor can submit a short contact form or complete the seven-step consultation wizard.
4. WhatsApp handoff remains available even when database persistence fails.
5. Owner can manage content, publication state, ordering, settings, and inbox through authenticated admin UI.

## Public features

### Landing page

- Hero driven by `SiteSetting`.
- About section and value statements.
- Database-backed service list.
- Featured published projects and articles with honest empty states.
- Direct contact form and seven-step wizard.
- Responsive header/footer and mobile navigation dialog.

### Projects

- Published-only listing with URL category filter.
- Detail page with cover, metadata, narrative, scope, gallery, and related projects.
- Empty state when no real project is published.

### Articles

- Published-only listing with URL category filter.
- Detail page with cover, Markdown content, reading progress, sharing, and related articles.

### Consultation wizard

1. Service selection.
2. Space type and approximate area.
3. Style preference.
4. Budget range.
5. Timeline.
6. Jabodetabek location.
7. Recap, per-step edit actions, contact details, and submission.

## Admin features

- Supabase email/password login.
- Protected dashboard.
- Project and article CRUD with draft/publish control and secure preview.
- Service CRUD and ordering.
- Global site settings editor.
- Contact inbox status management.
- Responsive admin shell and command palette.

## Content integrity

- Project and article records default to `DRAFT`.
- Seed must not publish example portfolio.
- Metrics, testimonials, awards, customer names, locations, and project images require owner approval before publication.
- Empty content is preferable to realistic-looking placeholder content.

## Non-functional requirements

- Keyboard access, visible focus, reduced-motion support, labels, announced errors, and dialog focus containment.
- Responsive content flow without viewport clipping.
- Server-side validation at trust boundaries.
- Auth checks on every admin mutation.
- Public metadata, sitemap, robots, and JSON-LD.
- Test, lint, typecheck, Prisma validation, and production build evidence before release.

## Not in current V1

- Furniture catalog or checkout.
- Testimonials module.
- Client portal or project tracker.
- Service detail routes.
- Built-in media upload/storage workflow.
- Multi-region or multilingual content.
- Automated analytics dashboard.

Adding any item above requires a product decision, data model review, and implementation plan.
