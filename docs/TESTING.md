# Testing

## Current runner

`npm test` uses Node's built-in test runner with TypeScript type stripping:

```text
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
  --experimental-strip-types \
  --test src/lib/*.test.ts
```

No browser E2E or visual-regression runner is installed.

## Current regression coverage

### Contact behavior

- Direct WhatsApp and email link formatting.
- User-controlled email HTML escaping.
- Full seven-step wizard schema acceptance.
- Rejection when an earlier wizard step is missing.
- Wizard-to-persistence mapping.
- Complete WhatsApp recap.

### Navigation security

- Internal redirect paths remain valid.
- Absolute and protocol-relative redirects are rejected.

### Content integrity

- Public defaults contain no old unverified project-count value.
- Seed cleanup slug tuple equals the six owner-approved mock slugs.
- Static project seed array is empty.

### SEO safety

- JSON-LD serialization cannot terminate its script element.

## Static verification

```bash
npm run lint
npm run typecheck
npx prisma validate
git diff --check
```

## Build verification

`npm run build` is required before release. Build accesses PostgreSQL while collecting public data and dynamic paths, so credentials and seeded settings must exist. Record the actual exit code and failing stage.

## Manual smoke checks

1. Public home renders settings, services, and honest empty content states.
2. Project/article category query parameters filter visible cards.
3. Mobile navigation traps focus, closes on Escape, and restores focus.
4. Wizard choices expose selected state; errors are announced.
5. Step 7 shows steps 1 through 6 and edit controls.
6. WhatsApp opens from the submit click even when persistence fails.
7. Admin requires login and draft previews do not expose a secret.
8. `/sitemap.xml` and `/robots.txt` return expected metadata.

## Missing coverage

- Database integration tests against an isolated PostgreSQL schema.
- Authenticated admin action tests.
- Browser tests for focus management and wizard flow.
- Production deployment smoke tests.

Add a runner only after approval and only when existing Node tests cannot cover the required seam.
