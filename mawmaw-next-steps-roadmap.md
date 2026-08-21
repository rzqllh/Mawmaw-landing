# Mawmaw Interior — Post-Launch Roadmap & Backlog

Status per 2026-08-21: Full sequential execution of P1 through P-Final completed. Production quality gates, admin CMS hardening, security headers, metadata, observability endpoints, and UI/UX design tokens verified and committed to `main`.

---

## ✅ Completed & Verified

- [x] **Core Architecture & DB**: Prisma PostgreSQL adapter crash fix, DB performance indexes, RLS policies, cold-start fallback.
- [x] **Admin CMS Hardening**: Standardized `DeleteConfirm` destructive action pattern with transitions & toast feedback, input validation (Zod) on all server actions, status tracking, clean sidebar navigation, and removed dead components.
- [x] **Security & Headers**: Strict HTTP security headers (CSP, X-Frame-Options, Referrer-Policy, Strict-Transport-Security, X-Content-Type-Options) in Next.js config.
- [x] **SEO & Metadata**: JSON-LD Structured Data, Open Graph & Twitter Cards, canonical tags, dynamic `sitemap.xml`, and `robots.txt`.
- [x] **Observability & Reliability**: Zero-leak `/api/health` endpoint for database & server connectivity health-checks, structured error logging via `formatServerErrorLog`.
- [x] **UI/UX & Anti-Slop**: Design tokens (Cormorant Garamond + Josefin Sans, 8px grid), WCAG 2.2 AA compliant contrast, accessible focus indicators, responsive layouts across breakpoints, elimination of generic AI slop, em dashes (`—`) in UI copy, and fake metrics.
- [x] **Contact Workflow**: Interactive wizard + direct form submission, Zod schema validation, transaction atomicity, and WhatsApp integration.
- [x] **Regression & CI/CD Verification**: 30/30 unit tests pass, typecheck clean (`tsc --noEmit`), ESLint clean, and Next.js production build (`next build`) generating all 27 static and dynamic routes.

---

## 📋 Owner-Dependent & Backlog Items

**Content & Assets (Requires Studio Assets)**
- [ ] Replace placeholder stock photography with real studio project photos when available.
- [ ] Decide scope/timeline for optional Furniture catalogue expansion.

**External 3rd-Party Integrations (Requires Active Account Config)**
- [ ] Configure external uptime monitoring (e.g. UptimeRobot or Better Uptime) targeting `/api/health`.
- [ ] Configure Sentry DSN if third-party error alerting is desired.
- [ ] Verify SPF/DKIM DNS records on domain registrar for custom email sending via Resend.

