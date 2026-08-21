# Mawmaw Interior — Post-Launch Roadmap & Backlog

Status per 2026-08-21: P1 through P-Final executed and verified. Interrupted session recovered. Working tree clean. Production live at `https://mawmaw-interior.vercel.app` on commit `e73aa4f`.

---

## ✅ Completed & Verified

- [x] **Core Architecture & DB**: Prisma PostgreSQL adapter, DB performance indexes, RLS policies, cold-start fallback.
- [x] **Admin CMS Hardening**: Standardized `DeleteConfirm` pattern with transitions & toast feedback, Zod input validation on all server actions, status tracking, clean sidebar navigation.
- [x] **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `poweredByHeader: false` — all verified in production response headers.
- [x] **SEO & Metadata**: JSON-LD Structured Data (`ProfessionalService`, XSS-safe), Open Graph & Twitter Cards on root and all detail pages, canonical tags on article/project detail pages, dynamic `sitemap.xml` (includes `/kebijakan-privasi`), `robots.txt`.
- [x] **Legal**: `/kebijakan-privasi` page with full Indonesian privacy policy, footer link, sitemap entry.
- [x] **Observability & Reliability**: Zero-leak `/api/health` endpoint, route and global error boundaries with Indonesian copy, structured server error logging.
- [x] **UI/UX & Anti-Slop**: Design tokens (Cormorant Garamond + Plus Jakarta Sans, 8px grid), WCAG-compliant contrast, accessible focus indicators, responsive layouts, no fake metrics or em dashes in UI copy.
- [x] **Contact Workflow**: Interactive wizard + direct form, Zod schema validation, transaction atomicity, WhatsApp integration.
- [x] **Accessibility Basics**: Skip-to-content anchor, keyboard focus rings, no `outline: none` suppression, 44px touch targets.
- [x] **CI/CD**: GitHub Actions workflow (typecheck → lint → test → audit:ci → build) on push/PR to `main`. Vercel auto-deploys from `main`.
- [x] **Regression & Quality Gates**: 30/30 unit tests pass, typecheck clean, ESLint clean, audit:ci clean (approved Prisma advisory only).

---

## 📋 Owner-Dependent & Backlog Items

**Content & Assets (Requires Studio Assets)**
- [ ] Replace placeholder stock photography with real studio project photos when available.
- [ ] Add real portfolio projects via admin dashboard (`/admin/projects/new`).
- [ ] Decide scope/timeline for optional furniture catalogue expansion.

**Security (Deferred — Technical Blockers)**
- [ ] **CSP Header**: Content-Security-Policy requires nonce integration for Next.js 16 App Router. RSC inline scripts are incompatible with strict CSP without nonces. Owner must decide: accept `unsafe-inline` CSP (less secure), implement nonce middleware, or defer.
- [ ] **Admin MFA/2FA**: Supabase supports TOTP MFA but no application-level AAL2 enforcement is configured. Owner-dependent Supabase dashboard configuration.

**External 3rd-Party Integrations (Requires Active Account Config)**
- [ ] Configure production Resend API key (`RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`) for email notification dispatch.
- [ ] Configure external uptime monitoring (e.g. UptimeRobot or Better Uptime) targeting `/api/health`.
- [ ] Configure Sentry DSN if third-party error alerting is desired.
- [ ] Verify SPF/DKIM/DMARC DNS records on domain registrar for custom email sending via Resend.
