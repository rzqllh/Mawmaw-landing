# 01 - Project Context

This is the project-specific source of truth for Mawmaw Interior.

Do not scatter project facts across generic guideline files. If a fact is not verified in the repository, mark it as `Unknown - owner to confirm`.

## Project Identity

- Project name: Mawmaw Interior
- Short description: Premium public portfolio website for a studio desain interior that presents services, projects, articles, and a consultation contact flow.
- Repository: Unknown - owner to confirm
- Owner: Unknown - owner to confirm
- Current status: Unknown - owner to confirm
- Deployment target: Unknown - owner to confirm

## Product Goal

```txt
This project helps prospective interior design clients learn about Mawmaw Interior, review services and portfolio work, read design articles, and start a consultation through the website.
```

## Target Users

| User Type | Need | Pain Point | Success Criteria |
|---|---|---|---|
| Primary user | Explore interior design services, projects, articles, and contact options. | Unknown - owner to confirm | User can understand Mawmaw Interior's offer and start consultation. |
| Admin/internal user | Unknown - owner to confirm | Unknown - owner to confirm | Unknown - owner to confirm |
| Guest/public user | Browse public marketing content without authentication. | Unknown - owner to confirm | User can navigate the public pages and view content. |

## Product Scope

### In Scope

- Public homepage sections for hero, about, services, featured projects, featured articles, and contact.
- Public project listing and project detail pages.
- Public article listing and article detail pages.
- Static public content managed in `src/data/public-content.ts`.
- Contact form UI with client-side validation and toast feedback.
- Responsive, accessible public website behavior consistent with existing components and tokens.

### Out of Scope

- Unknown - owner to confirm.

### Not Yet

Features that may be valid later but must not be built now without explicit scope:

- Backend persistence for contact requests.
- Email delivery for contact requests.
- CMS or database-backed content editing.
- Admin dashboard or authentication flows.
- Cloudinary asset management workflow.
- Supabase schema or API integration.
- Sentry logging behavior.
- Bot protection behavior.

## Tech Stack

| Layer | Choice | Source of Truth |
|---|---|---|
| Framework | Next.js 16 App Router | `package.json`, `src/app` |
| Language | TypeScript, React 19 | `package.json`, `tsconfig.json` |
| Styling | Tailwind CSS v4 with global tokens | `package.json`, `postcss.config.mjs`, `src/app/globals.css` |
| UI library | Local UI primitives; Phosphor Icons; CVA for variants | `src/components/ui`, `src/lib/icons.tsx`, `package.json` |
| State management | Local React state and form state; no global store verified | `src/components`, `src/components/sections/contact-section.tsx` |
| Database | No active database usage verified | Source inspection; `.env.example` lists Supabase placeholders |
| Auth | No active auth flow verified | Source inspection; `.env.example` lists auth/admin placeholders |
| Storage | Static assets in `public/brand`; remote Unsplash images allowed | `public/brand`, `next.config.mjs`, `src/data/public-content.ts` |
| AI provider | None verified | Source inspection |
| Deployment | Unknown - owner to confirm | Owner decision required |

## Existing Source of Truth Files

List files that the AI agent must respect.

| Area | File/Folder | Notes |
|---|---|---|
| Routes | `src/app` | App Router routes for `/`, `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, and not-found. |
| Schema | `src/lib/validation.ts` | Zod schema for the contact form. |
| Design tokens | `src/app/globals.css` | Colors, fonts, radii, shadows, focus styles, reduced-motion baseline, and layout utility classes. |
| Components | `src/components` | UI primitives, layout, sections, cards, motion, and effects. |
| API | None verified | No route handlers or backend API behavior found during inspection. |
| Content | `src/data/public-content.ts` | Site config, navigation, hero, about, services, projects, articles, contact, and footer content. |
| Tests | None verified | Validation currently depends on lint, typecheck, and build scripts. |
| Env | `.env.example` | Reference for env names; `.env.local` must not be read or committed. |
| Images | `public/brand`, `Logo`, remote Unsplash URLs | `next.config.mjs` allows `images.unsplash.com`. |
| Agent guidelines | `AGENTS.md`, `docs/00_INDEX_SSOT.md`, `docs/02_AGENT_OPERATING_RULES.md` | Required agent guardrails and source-of-truth ownership. |

## Design Direction

Do not invent visual style outside this section or existing design tokens.

- Visual keywords: warm, elegant, personal, functional, natural, premium.
- Brand tone: clear, warm, calm, design-aware.
- Color direction: verified palette uses warm off-white surfaces, forest greens, gold accents, and muted text colors.
- Typography direction: Plus Jakarta Sans for sans text and Cormorant Garamond for serif display text.
- Density: balanced.
- Motion personality: subtle reveal motion, restrained microinteractions, and ambient hero shader with reduced-motion fallback.
- Accessibility requirements: semantic HTML, visible focus states, reduced-motion support, responsive behavior, and meaningful image alt text.

## Content Direction

- Language: Indonesian for public-facing app copy.
- Tone: warm, clear, polished, and concrete.
- Words to use: ruang, hangat, elegan, fungsional, personal, konsultasi, portfolio.
- Words to avoid: Unknown - owner to confirm.
- CTA style: clear action labels such as "Konsultasi via WhatsApp", "Lihat Portfolio", "Kirim Permintaan".
- Error message style: Indonesian, specific, and actionable; examples live in `src/lib/validation.ts` and `src/data/public-content.ts`.

## Data Rules

- Source of truth for data: `src/data/public-content.ts`.
- Mock data allowed: Unknown - owner to confirm.
- Mock data location: Unknown - owner to confirm.
- Persistence rules: No persistence verified for current public content or contact submissions.
- Privacy constraints: Do not expose secrets or read/commit `.env.local`; contact form privacy behavior requires owner confirmation before backend work.
- Retention rules: Unknown - owner to confirm.

## Business Rules

Business rules must be explicit.

| Rule | Reason | Source |
|---|---|---|
| Contact form requires name, valid email, project type, location, and message. | Client-side validation uses these fields before submit feedback. | `src/lib/validation.ts`, `src/components/sections/contact-section.tsx` |
| Project and article detail pages are generated from slugs in static content. | Static params map over arrays in public content. | `src/app/projects/[slug]/page.tsx`, `src/app/articles/[slug]/page.tsx`, `src/data/public-content.ts` |
| Public content is Indonesian. | Current UI and content strings are Indonesian. | `src/data/public-content.ts`, `src/app/layout.tsx` |

## Integration Rules

| Integration | Purpose | Boundary | Notes |
|---|---|---|---|
| Unsplash images | Remote public imagery for portfolio/articles/sections. | Next image remote pattern. | Allowed by `next.config.mjs`; image data lives in `src/data/public-content.ts`. |
| WhatsApp | Consultation CTA link. | Public outbound link generated from phone/message. | `src/lib/whatsapp.ts`, `src/data/public-content.ts`. |
| Supabase | Unknown - owner to confirm. | Not active unless verified in source. | Env placeholders exist in `.env.example`. |
| Cloudinary | Unknown - owner to confirm. | Not active unless verified in source. | Env placeholders exist in `.env.example`. |
| Resend | Unknown - owner to confirm. | Not active unless verified in source. | Env placeholders exist in `.env.example`. |
| Cloudflare Turnstile / reCAPTCHA | Unknown - owner to confirm. | Not active unless verified in source. | Env placeholders exist in `.env.example`. |
| Sentry | Unknown - owner to confirm. | Not active unless verified in source. | Env placeholders exist in `.env.example`. |

## Known Constraints

- Time: Unknown - owner to confirm.
- Budget: Unknown - owner to confirm.
- Device/browser: Unknown - owner to confirm.
- Accessibility: Preserve semantic HTML, visible focus, reduced motion, responsive behavior, and alt text strategy.
- Performance: Preserve Next image handling, font display strategy, reduced-motion fallback, and avoid unnecessary client-side code.
- Legal/privacy: Unknown - owner to confirm; do not expose secrets or sensitive contact data.
- Team/skill: Unknown - owner to confirm.

## Agent Notes

- Follow `AGENTS.md` and `docs/00_INDEX_SSOT.md` before making changes.
- Inspect existing files before creating new files or patterns.
- Keep universal guideline docs generic; put project facts here or in verified project source files.
- Do not assume `.env.example` integrations are implemented until source code proves it.
- Do not read, copy, summarize, or commit `.env.local`.
