# Mawmaw Interior — Post-Launch Roadmap & Backlog

Status per 2026-08-19: frontend design-system/a11y/copy audit done, backend security/DB audit done, RLS enabled, Upstash configured, merged to `main`.

---

## ✅ P0 — Already Done

- [x] P0 Prisma adapter crash — fixed & verified
- [x] Input validation (Zod) on admin actions
- [x] Error handling & information disclosure fixes
- [x] Cold-start fallback for site settings
- [x] Unbounded query fixes (inbox pagination)
- [x] DB performance indexes — migration created AND applied to production
- [x] Transaction atomicity audit (contact form, reorder)
- [x] Seed script auto-trigger risk — verified zero risk
- [x] Row Level Security enabled on all tables
- [x] Upstash rate limiting configured in production env
- [x] Frontend: container spacing unification
- [x] Frontend: component token unification (cards, badges, dividers, buttons)
- [x] Frontend: WCAG contrast/anchor/heading/focus-ring fixes
- [x] Frontend: typography scale (line-height, tracking)
- [x] Frontend: color semantic role fix (inverse text bug)
- [x] Frontend: mobile drawer rebuild
- [x] Frontend: copywriting anti-slop pass (2 lines)

---

## 🔴 P1 — Critical (do this week)

**Deployment & release safety**
- [ ] Verify production deployment reflects latest `main` merge (check Vercel deployment log/commit hash)
- [ ] Smoke test production: submit contact form live, confirm email lands in inbox
- [ ] Re-run `prisma migrate status` against production `DATABASE_URL` to confirm zero drift
- [ ] Confirm you know the rollback procedure (Vercel instant rollback to prior deployment) — test it once so it's not a surprise during an incident
- [ ] Health-check endpoint (`/api/health` or similar) that checks DB connectivity — useful for uptime monitoring later

**Observability (currently zero visibility into production errors)**
- [ ] Set up error monitoring (Sentry or equivalent) — server errors are currently only logged, nobody gets notified
- [ ] Set up uptime monitoring (UptimeRobot / Better Uptime / Vercel's own) with alert to your phone/email

**Data safety**
- [ ] Confirm Supabase automated backups are active on this project tier, and know the restore procedure
- [ ] Set up a periodic export of `ContactSubmission` (leads are the most business-critical data and currently live in one place only)

**Admin account security**
- [ ] Confirm admin login has reasonable session timeout
- [ ] Consider 2FA on the Supabase Auth admin account, since it controls all site content
- [ ] Confirm there's no default/shared admin password lying around from dev setup

---

## 🟠 P2 — High (do this month)

**Finish the frontend audit's unverified claims**
- [ ] Manual spot-check hierarchy/eye-flow per section in a real browser (agent self-graded this with zero findings — suspicious)
- [ ] Manual responsive check at 360 / 390 / 768 / 1024 / 1440px in DevTools (agent claimed this without tooling evidence)
- [ ] Manual CTA consistency sweep across all pages

**Content**
- [ ] Replace placeholder Unsplash stock photos (`images.unsplash.com`) in Article/Project records with real studio photography before treating the catalog as production content
- [ ] Decide scope/timeline for Furniture module, Testimonials, Service detail pages (currently deferred)

**Testing**
- [ ] Add E2E test for the critical path: full contact wizard submission → DB → email
- [ ] Add E2E test for admin login → create/edit → publish flow
- [ ] Add automated accessibility testing (axe-core or pa11y) to catch regressions lint/typecheck won't

**Security headers**
- [ ] Audit HTTP security headers (CSP, X-Frame-Options, Strict-Transport-Security, Referrer-Policy) — Next.js doesn't set strict ones by default
- [ ] Confirm HTTPS is enforced (no mixed content, no plain-HTTP fallback)

---

## 🟡 P3 — Medium (next quarter)

**Performance & SEO**
- [ ] Run Lighthouse/PageSpeed Insights against production, address LCP/CLS/INP issues
- [ ] Audit image handling: proper `next/image` sizing, WebP/AVIF, lazy loading below the fold
- [ ] Meta tags + Open Graph images per page (especially project/article detail pages)
- [ ] `sitemap.xml` (dynamic, including articles/projects) + `robots.txt`
- [ ] Structured data (schema.org LocalBusiness) for local SEO
- [ ] Submit sitemap to Google Search Console, monitor indexing
- [ ] Canonical URL check (avoid duplicate-content issues between trailing slash variants etc.)

**Analytics**
- [ ] Set up Vercel Analytics or Plausible — currently no visibility into traffic or conversion funnel
- [ ] If using cookie-based analytics, add a lightweight consent notice

**Content correctness**
- [ ] Broken link check across the whole site (internal + external)
- [ ] Alt text audit for real (non-placeholder) images once photos are swapped in

**Email deliverability**
- [ ] Verify SPF/DKIM setup for Resend so contact notification emails don't land in spam

**CI/CD**
- [ ] Add GitHub Actions (or equivalent) to run test/lint/typecheck/build automatically on every PR — currently these are run manually by whoever's doing the work

---

## 🟢 P4 — Low / Long-term

- [ ] Staging environment separate from production, for testing bigger changes safely
- [ ] Admin panel UX review as its own audit (internal tool usability, not public-site UX)
- [ ] Legal pages: privacy notice covering what contact-form data is collected and how it's used
- [ ] Dependency update automation (Dependabot/Renovate) so security patches don't pile up silently
- [ ] Cross-browser check (Safari in particular, since Chrome-only testing is common blind spot)
- [ ] Favicon/PWA manifest completeness check
- [ ] Cost/usage monitoring — Supabase and Vercel free-tier limits, so you're not surprised by an outage from hitting a quota
- [ ] Database connection pool sizing review once real traffic patterns are known

---

## Notes
- P1 items are what the copy-paste execution prompt below covers.
- P2–P4 are backlog — re-prioritize anytime based on what actually matters for launch/business needs, this ordering is a suggestion not a mandate.
