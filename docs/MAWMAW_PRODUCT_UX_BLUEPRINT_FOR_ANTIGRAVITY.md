---
title: "Mawmaw Interior — Product UI/UX & CMS Implementation Blueprint"
version: "1.0 — Locked Direction"
status: "IMPLEMENTATION SOURCE OF TRUTH"
target_agent: "Google Antigravity — Gemini 3.1 Pro (High)"
recommended_agent_mode: "Planning for grounding, then implementation without repeated non-destructive approval"
language_of_public_ui: "Bahasa Indonesia"
project: "Mawmaw Interior"
owner_decision_date: "2026-06-03"
---

# Mawmaw Interior — Product UI/UX & CMS Implementation Blueprint

## Purpose of This Document

This document is the binding product, UI/UX, material-system, CMS-workflow, and implementation-quality reference for the **Mawmaw Interior** application.

The goal is to prevent incomplete or speculative implementations. The agent must not infer the product direction from vague phrases such as “premium”, “glass”, “Apple-like”, or “full CMS”. The direction is explicitly defined here.

This document governs:

1. The public Mawmaw Interior website experience.
2. The selective **Clear Liquid Glass** web approximation used on appropriate public media/control surfaces.
3. The full Admin CMS experience as an **Editorial Studio CMS**.
4. Dynamic global website content and Settings integration.
5. Article and project public reading/editing workflows.
6. Layout, accessibility, responsive behavior, performance, caching, validation, and anti-hallucination requirements.

This document is not permission to fabricate missing features, data, schema fields, routes, metrics, or successful test results.

---

# 1. Agent Operating Contract

## 1.1 Authority Order

When instructions conflict, use this order of precedence:

1. Actual repository code, actual schema, actual package scripts, and actual existing routes/components.
2. `.agents/skills/mawmaw-data-contract/SKILL.md` for data architecture, Prisma, content boundaries, seed, migration, and persistence decisions.
3. This document for locked product/design/UX/material decisions.
4. Relevant UI/UX, web-design, React, Vercel, optimization, or deployment skills after they are actually read.
5. Agent preferences or conventions only when they do not conflict with the above.

The agent must never override verified repository facts or data-contract constraints merely because an imagined redesign seems cleaner.

## 1.2 Required Evidence Labels

During planning and reporting, classify statements using these labels:

- **VERIFIED** — directly inspected in repository files, scripts, schema, rendered browser output, or command output.
- **LOCKED DECISION** — explicitly decided in this document.
- **PROPOSED IMPLEMENTATION** — a safe implementation approach that still depends on verified architecture.
- **BLOCKER** — a verified condition requiring user review under the stop rules below.
- **NOT PRESENT / NOT VERIFIED** — do not implement or claim coverage until found.

Do not state hypotheses as existing problems. For example, do not say “Services CMS is broken” unless actual Services CMS routes/components were found and inspected.

## 1.3 Antigravity Execution Behavior Required

This project is a complex multi-route implementation task. Use an agentic workflow with artifacts and validation rather than starting from visual guesses.

### Required flow

1. Read this entire document.
2. Read the mandatory applicable project skills.
3. Inspect repository and generate a grounded inventory artifact.
4. Produce a verified change map based on actual files.
5. If no blocker exists, proceed with implementation in the same mission without requesting repeated approval for ordinary non-destructive UI/UX work.
6. Validate through actual scripts and browser inspection available in the workspace.
7. Produce an honest implementation and validation artifact.

### Required artifacts

The agent must generate or maintain the following artifacts during the mission:

| Artifact | Purpose | Required Content |
|---|---|---|
| `00_REPOSITORY_GROUNDING` | Prevent assumptions before coding | Skills read, routes found, schema/settings facts, rendering/media/cache facts, CSS issues, scripts |
| `01_VERIFIED_CHANGE_MAP` | Define exactly what will change | Files to modify/create, verified reasons, implementation sequence, blocker check |
| `02_IMPLEMENTATION_PROGRESS` | Track code changes | Completed tasks, changed files, deliberate deviations, unresolved issues |
| `03_VALIDATION_REPORT` | Prove outcomes | Commands run, actual output status, browser/manual flows checked, failures/limitations |

Artifacts can exist as Antigravity artifacts rather than committed project documents unless the repository conventions explicitly require otherwise.

## 1.4 Approval and Stop Rules

### Already approved without additional review

The agent may directly implement:

- Non-destructive public UI/UX refinements.
- Non-destructive Admin CMS UI/UX refinements.
- Reusable presentational/layout components.
- Fixed desktop admin sidebar and mobile drawer navigation.
- Dashboard refinement using real data only.
- Project/article list and editor layout improvements.
- A one-route structured Settings editor.
- Correct dynamic wiring from verified existing Settings content to public consumers.
- Proper Markdown rendering and preview while preserving existing storage format.
- Cache/revalidation improvements required by safe Settings updates.
- Selective Clear Liquid Glass public components and regular/solid surface primitives.
- Fixes to verified design-token conflicts and styling inconsistencies.
- Removal of old hardcoded consumers only after safe replacement is implemented and verified.

### Stop and request user review only when verified

Stop only if at least one of these becomes necessary:

- A Prisma schema change is required because existing verified fields/models cannot satisfy the locked requirement.
- A destructive migration, reset, drop, or irreversible data transformation is required.
- Existing stored content must be converted destructively to another format.
- Authentication, authorization, or protected-route boundaries must be weakened or fundamentally changed.
- Existing content would be deleted or made unreachable.
- The Mawmaw data contract conflicts with a required change and no safe compliant implementation exists.

Do **not** stop merely because a new component, reusable shell, public material primitive, route-level UI restructuring, prop wiring, or non-destructive server/action refinement is needed.

---

# 2. Mandatory Repository Grounding Checklist

Before editing code, inspect all applicable items below and record verified findings in `00_REPOSITORY_GROUNDING`.

## 2.1 Mandatory Skills to Read

Read actual contents, not only folder names.

### Required when files exist

- `.agents/skills/mawmaw-data-contract/SKILL.md`
- `.agents/skills/ui-ux-pro-max/SKILL.md`
- `.agents/skills/web-design-guidelines/SKILL.md`

### Read only when relevant to actual work

- `.agents/skills/nuashu-design/SKILL.md`
- `.agents/skills/vercel-react-best-practices/SKILL.md`
- `.agents/skills/vercel-composition-patterns/SKILL.md`
- `.agents/skills/vercel-optimize/SKILL.md`
- `.agents/skills/vercel-react-view-transitions/SKILL.md`
- `.agents/skills/deploy-to-vercel/SKILL.md`
- `.agents/skills/vercel-cli-with-tokens/SKILL.md`

For every skill read, state one concrete instruction applied or state that it was inspected but not applicable.

## 2.2 Stack and Tooling Inspection

Verify:

- Next.js version and App Router conventions.
- React version.
- TypeScript settings.
- Tailwind configuration and version.
- Component library usage, including Radix/shadcn patterns if present.
- Icon package actually in use.
- Animation/motion/view-transition libraries actually in use.
- Form/validation libraries actually in use.
- Markdown/rendering/sanitization dependencies actually available.
- Prisma provider, schema, migrations, seed, generated client conventions.
- Authentication and protected admin routing pattern.
- Image/media/upload/storage strategy.
- Cache, server query, server action, revalidation, and notification patterns.
- Available commands in `package.json` for lint, typecheck, build, test, Prisma, and development.

## 2.3 Actual Route Inventory

### Public routes/components to find where present

- Public layout.
- Header/navigation.
- Landing page.
- Hero section.
- About/Studio section.
- Services section and service item source.
- Featured Projects section.
- Project listing route.
- Project detail route.
- Featured Articles section.
- Article listing route.
- Article detail route.
- Contact section/page.
- Footer.
- Metadata/SEO handling.
- Loading/error/not-found states.

### Admin routes/components to find where present

- Protected admin layout.
- Sidebar/navigation.
- Dashboard/home.
- Project list/create/edit.
- Article list/create/edit.
- Settings route and settings form.
- Services CMS only if actually present.
- Contact/submission admin only if actually present.
- Media/image picker/upload workflow.
- Shared admin fields, panels, table/list, tabs, badges, dialogs, toasts, and mutation feedback.

Never create navigation items for modules that are not verified to exist unless creating that module is separately approved by a real requirement.

## 2.4 Settings Architecture Verification

A previous plan suggested `SiteSettings` already exists and may already be seeded. This is **NOT verified until inspected in the repository**.

Verify:

- Exact model name and field names.
- Whether it is singleton/global.
- Whether initialization/seed exists and how it runs.
- Whether settings query exists.
- Whether settings update action exists.
- Whether server validation exists.
- Whether cache tags/path revalidation exists.
- Which public components already consume settings.
- Which global content consumers still use hardcoded/static data.
- Whether required fields for global content are missing.

If an existing sufficient Settings model is verified, do not create a second settings model and do not create a migration unnecessarily.

## 2.5 Content Format Verification

Verify independently for Articles and Projects:

- Main content field type and storage format: Markdown, plain string, HTML, structured blocks, arrays, or another actual representation.
- Current public rendering behavior.
- Current admin editor/preview behavior.
- Existing safe renderer dependencies.
- Existing fields for title, slug, excerpt, cover image, alt text, status, featured, category, publish date, updated time, gallery, or any other metadata.
- Public detail route existence.

Do not invent a field, state, preview route, or workflow.

## 2.6 Known Styling Lead to Verify

The user-provided `globals.css` snapshot indicates an existing direction with:

- Warm neutral canvas.
- Forest green and muted gold tokens.
- Plus Jakarta Sans and Cormorant-based typography.
- Public glass utilities.
- Admin surface/input tokens.
- Reduced-motion handling.
- A dark contact section.
- A likely duplicate/conflicting `--radius-sm` token declaration.

This is a **lead from supplied material**. Inspect the live repository file before changing it. If the conflict is present, consolidate intentionally and document all affected component impact.

---

# 3. Product Direction — Locked

## 3.1 Mawmaw Interior Identity

Mawmaw Interior is a premium interior studio website and content-managed product supporting:

- Interior portfolio and case-study presentation.
- Furniture presentation only where implemented in the real product.
- Consultation/service discovery.
- Editorial articles.
- Lead capture/contact.
- Contextual WhatsApp enquiry only when useful and aligned to real features.
- Owner/admin content management.

## 3.2 Target Impression

The product must feel:

- Premium.
- Warm.
- Editorial.
- Calm.
- Trustworthy.
- Japandi-inspired.
- Photography-led on public surfaces.
- Refined and modern.
- Apple-inspired in material discipline, never a literal native UI copy.

## 3.3 Explicit Anti-Direction

Do not turn Mawmaw into:

- Generic SaaS landing/dashboard UI.
- Neon or dark futuristic luxury.
- Noisy glassmorphism.
- A public website made entirely of translucent panels.
- An Admin CMS that copies the public landing experience.
- A visually pretty but inefficient CRUD editor.
- A dashboard with fabricated analytics.
- A design demo that breaks real dynamic CMS behavior.

---

# 4. Design System Foundation

## 4.1 Color Strategy

Preserve the verified existing token direction rather than introducing an unrelated palette.

### Intended roles

| Role | Direction | Use |
|---|---|---|
| Canvas | Warm near-white / neutral paper | Main public and admin background; never pure white or yellow-heavy |
| Surface | Slightly elevated warm solid | Forms, lists, content panels, reading body |
| Forest | Deep green grounding | Primary text, key action, selected state, structured brand anchors |
| Gold | Muted controlled accent | Eyebrow, focus ring, tiny selection marker, deliberate accent only |
| Dark Forest | Premium dark section surface | Contact conversion/footer areas when existing direction supports it |
| Red | Clearly destructive only | Delete/error; never replace with gold/green ambiguity |

## 4.2 Typography Strategy

- Interface/body typography: existing **Plus Jakarta Sans** direction.
- Editorial/display typography: existing elegant serif direction where appropriate for public headings and limited branded moments.
- Admin UI: prioritize readable sans typography; serif may appear only in restrained branding or content preview, never reduce management clarity.
- Public article/project prose: readable editorial hierarchy with comfortable measure.

## 4.3 Density and Radius Discipline

### Public
Public marketing/editorial pages may use generous whitespace and larger media radii where composition supports it.

### Admin
Admin must be denser and productive:

| Item | Direction |
|---|---|
| Page padding desktop | approximately 24–32px or existing equivalent token |
| Page padding mobile | approximately 16px |
| Form section gap | approximately 20–24px |
| Field gap | approximately 16–20px |
| Input/button minimum usable height | approximately 44–48px |
| Article writing area | large, comfortable; approximately 480–640px minimum desktop when practical |
| Admin panel radius | moderate, not oversized promotional cards |
| Input radius | smaller/medium and consistent |

Do not hardcode values blindly if existing tokens achieve the same goal. Consolidate verified token conflicts before expanding the system.

---

# 5. Material System — Three Distinct Layers

Mawmaw must use three material categories with strict usage boundaries. Do not refer to every translucent object as “Liquid Glass”.

## 5.1 Solid Editorial Surface

### Purpose
Maximum readability and calm, stable content work.

### Required usage
- Admin input/form/editor surfaces.
- Admin Settings panel.
- Admin article/project metadata panels.
- Admin lists/tables/content rows.
- Admin dialogs.
- Public article body.
- Public project long-form body.
- Dense public informational surfaces.
- Contact form fields where readability is primary.

### Visual characteristics
- Warm near-white or gently tinted solid fill.
- Stable contrast.
- Clean soft border.
- Minimal/subtle shadow only where separation is needed.
- No image distortion.
- No attention-seeking glass effect.

## 5.2 Regular Soft Glass

### Purpose
Supporting layers that benefit from softness while preserving readability.

### Acceptable usage
- Admin desktop sidebar shell if contrast is sufficient.
- Admin action bar only if restrained.
- Small navigation overlays/dropdowns where actual architecture uses them.
- Public supporting overlays that are not dense reading surfaces.
- Existing contact supporting panel where it does not harm form readability.

### Visual characteristics
- Restrained translucency.
- Controlled blur/tint.
- Thin border/rim.
- Soft shadow.
- Stable and readable.
- May be similar to existing frosted/translucent utilities.

### Explicit limitation
Regular Soft Glass is not the signature Clear Liquid material.

## 5.3 Clear Liquid Control — Public Signature

### Purpose
A selective, optical, floating-control material displayed above rich interior imagery.

### Valid default usage
- Floating navigation over hero photography.
- Compact hero media/action control above a rich image, only when useful.
- Gallery arrow controls over project media.
- Small media toolbar/action on real project imagery.
- Small image-overlay chip/action where contrast is safe.

### Forbidden default usage
- Public article body.
- Public project written content.
- Large public text cards.
- Contact form.
- General service/article/project content card bodies.
- Admin forms.
- Admin editor canvas.
- Admin Settings panels.
- Admin list/table surfaces.
- Admin metadata sidebars.
- Dense admin navigation.

### Narrow admin exception
A very small Clear Liquid media-overlay control may be used inside a real image preview if it does not affect workflow readability and remains isolated from the overall admin language.

---

# 6. Clear Liquid Glass Web Approximation Specification

## 6.1 Meaning of “Clear Liquid”

The required public signature is not a generic blurred white card.

### It must feel like

A transparent optical floating control through which the rich background remains recognisable, with a shaped glass boundary, delicate rim lighting, a controlled lensing/refraction impression, subtle ambient image colour pickup, and carefully protected label/icon readability.

### It must not feel like

- A milky frosted rectangle.
- A heavy `backdrop-blur` blob.
- A grey translucent card covering the photo.
- A neon/glowing sci-fi panel.
- A decorative layer applied without interactive purpose.

## 6.2 Visual Requirements

### A. High transparency
- Background interior photography remains identifiable through the control.
- The control should not erase the media texture.
- Fill/tint is minimal and purposeful.

### B. Optical edge
- The rounded shape must be legible through a delicate rim, inner highlight, controlled boundary reflection, or shaped shadow.
- The edge should feel like glass curvature rather than a normal border.

### C. Lensing/refraction impression
- Where performant and browser-safe, implement an optical distortion impression beyond blur.
- Progressive enhancement is mandatory: unsupported environments receive a clean readable glass fallback.
- Advanced displacement/refraction must be scoped only to a small number of controls, never large repeated card lists.

### D. Ambient colour integration
- The surface must not be flattened into generic white-grey.
- Rich underlying media should visually influence the material.
- Layered gradients may create subtle highlight/colour response without destroying the image.

### E. Readability control
- Every label/icon must be readable on bright, dark, and visually busy media.
- Apply restrained local dimming, inner tint, contrast layer, text/icon treatment, or alternate variant when required.
- A control that becomes illegible is not an acceptable Clear Liquid result.

### F. Interaction
Allowed:
- Subtle rim/highlight shift on hover.
- Controlled pressure/elevation response.
- Focus-visible ring that remains clear.
- Tiny transition refinements.

Forbidden:
- Jelly wobble.
- Large scale jump.
- Neon glow.
- Reflective animation distracting from content.
- Motion that violates reduced-motion preference.

## 6.3 Component Architecture Guidance

Inspect existing component patterns first. Create only useful reusable primitives, potentially equivalent to:

- `ClearLiquidSurface`
- `ClearLiquidNav`
- `ClearLiquidPillButton`
- `ClearLiquidIconButton`
- `ClearLiquidMediaControl`
- `RegularGlassSurface`
- `SolidEditorialSurface`

Do not create unused components just to satisfy naming.

## 6.4 Implementation Guardrails

Permitted when justified by actual stack/performance:
- CSS pseudo-elements.
- Transparent gradient/reflection layers.
- Controlled `backdrop-filter`.
- Thin rim and inner highlight layering.
- Scoped SVG filter/displacement for selected controls only if validated.
- Existing compatible animation utilities where already available.

Not permitted without strong justification:
- Installing a heavy visual-effect dependency merely for navigation.
- Applying expensive distortion to repeated grids or admin pages.
- Replacing real image readability with excessive effects.
- Describing simple blur as Clear Liquid Glass.
- Claiming native Apple parity.

## 6.5 Clear Liquid Validation Matrix

Before calling the effect complete, verify actual implemented control against:

| Context | Required Result |
|---|---|
| Bright interior hero image | Navigation/label remains readable; material boundary visible |
| Dark interior hero image | Control is still distinct without heavy milky fill |
| Busy/high-detail image | Local readability treatment prevents visual loss |
| Mobile header size | No overcrowding; menu control remains usable |
| Keyboard navigation | Focus-visible remains obvious |
| Reduced motion | No unnecessary interaction motion |
| Unsupported/low capability environment | Graceful readable fallback |
| Scroll/render performance | No obvious degradation caused by effect |

A dedicated internal showcase may be created only if it fits existing development conventions; otherwise validate in real hero/project-media contexts and document the evidence.

---

# 7. Public Website Experience Specification

## 7.1 Global Layout Flow

The intended public experience is:

```text
Floating Clear Liquid navigation above sharp hero photography
↓
Full first-viewport editorial hero with strong CTA hierarchy
↓
Studio/About narrative with meaningful imagery and values
↓
Services communicated through user value/outcome
↓
Featured Projects with dominant photography
↓
Featured Articles as editorial discovery
↓
Dark premium Contact conversion surface
↓
Structured calm Footer
```

Do not force every section to full viewport. Use whitespace intentionally based on content.

## 7.2 Navigation

### Goal
A light, premium, highly legible navigation layer that complements hero photography.

### Required behavior
- Use Clear Liquid treatment only while meaningfully floating over rich hero imagery and only if readability is safe.
- Provide a readable state outside hero context if sticky/scrolling implementation requires it.
- Navigation items must be actual supported routes/anchors.
- Include one primary action only if it has real purpose.
- Mobile navigation must prioritize readability; the opened menu may use solid/regular surface rather than Clear Liquid.
- Keyboard focus and active states must be visible.

### Do not
- Add a visually oversized glass pill that covers hero content.
- Invent a `Furnitur` navigation destination unless the route/content exists.
- Use glass effect as a substitute for navigation hierarchy.

## 7.3 Hero

### Goal
Communicate Mawmaw’s interior identity and the next meaningful user action within the first viewport.

### Desktop composition reference

```text
┌───────────────────────────────────────────────────────────────────────┐
│        Floating Clear Liquid Navigation                               │
│                                                                       │
│   [Small label]                                                       │
│   Strong editorial headline                  Sharp Interior Media     │
│   across controlled lines                                             │
│                                                                       │
│   Supporting description                                               │
│   [Primary CTA] [Secondary only if useful]                            │
│                                                                       │
│                             Optional compact media control            │
└───────────────────────────────────────────────────────────────────────┘
```

### Requirements
- Photography remains sharp and primary.
- Copy width and placement protect readability.
- One obvious primary CTA; secondary action only if distinct and useful.
- Avoid large frosted copy panels.
- Parallax or media motion only if already appropriate, performance-safe, and reduced-motion compatible.
- Hero title/description/media/alt and supported highlights consume verified dynamic Settings data.

## 7.4 Studio / About

### Composition reference

```text
┌──────────────────────────────┬────────────────────────────────────┐
│ Editorial interior image     │ Eyebrow / label                    │
│                              │ Strong story title                 │
│                              │ Readable studio description        │
│                              │ Meaningful values only if real     │
└──────────────────────────────┴────────────────────────────────────┘
```

### Requirements
- Calm narrative layout.
- Avoid fragmented decorative micro-cards.
- Use only configured/real values.
- Global About copy and media should come from verified Settings architecture.

## 7.5 Services

### Goal
State client value and outcome, not only service names.

### Requirements
- Preserve actual service content source.
- Settings may control section heading copy if supported.
- Service items remain in their proper verified CMS/data source.
- Card hierarchy: name → outcome/description → useful action only if real.
- No fake benefit metrics, packages, ratings, or categories.

## 7.6 Featured Projects and Project Cards

### Goal
Make interior photography and project identity the discovery driver.

### Card reference

```text
┌──────────────────────────────────────┐
│                                      │
│        Dominant project image        │
│                                      │
├──────────────────────────────────────┤
│ Real category/style only if present  │
│ Project title                        │
│ Minimal real metadata                │
│                          Lihat Karya │
└──────────────────────────────────────┘
```

### Requirements
- Use actual project data only.
- Image-first card with refined hover/focus.
- Avoid excessive chips/badges.
- Clear detail route/action only if real.
- Contextual inquiry only if supported and useful.
- Clear Liquid may apply to a small media overlay control, not the body of every card.

## 7.7 Featured Articles and Article Cards

### Card reference

```text
┌──────────────────────────────────────┐
│            Cover image               │
├──────────────────────────────────────┤
│ Real metadata only                   │
│ Strong article headline              │
│ Short actual excerpt if available    │
│ Baca Artikel →                       │
└──────────────────────────────────────┘
```

### Requirements
- Editorial reading discovery, not ecommerce cards.
- Do not invent author, date, category, status, or read time.
- Cover image only if real.
- Content hierarchy prioritizes headline readability.

## 7.8 Contact

### Goal
Make enquiry feel clear, trusted, and frictionless.

### Composition reference

```text
┌────────────────────────────────┬─────────────────────────────────┐
│ Invitation / contact narrative │ Readable form surface            │
│ Useful real trust/contact info │ Labeled fields                   │
│                                │ Validation + primary submit      │
└────────────────────────────────┴─────────────────────────────────┘
```

### Requirements
- Preserve/refine existing dark premium conversion direction where present.
- Contact form and inputs prioritize readability; they are not Clear Liquid controls.
- Use only actual form fields and actual feedback behavior.
- Dynamic global contact title/description/details use verified Settings data where supported.

## 7.9 Footer

### Requirements
- Calm, structured closing experience.
- Use actual links, social details, and contact details only.
- Global copy/details use verified dynamic Settings data where supported.
- Avoid clutter and meaningless CTA duplication.

---

# 8. Public Long-Form Content Quality

## 8.1 Article Detail

### Requirement trigger
First verify the actual content storage format.

If article content is Markdown:

- Keep Markdown as source of truth.
- Properly render it for public readers.
- Do not display raw Markdown syntax.
- Use safe rendering consistent with actual dependencies and project standards.
- Use the same/shared prose treatment for Admin Preview where practical.

### Reading layout reference

```text
┌───────────────────────────────────────────────────────────────┐
│ Real category/date only if present                             │
│ Large readable editorial title                                │
│ Real excerpt only if present                                   │
│                                                               │
│ Wide cover image only if present                              │
│                                                               │
│              Reading column approximately 65ch–75ch           │
│              Structured prose with generous rhythm            │
└───────────────────────────────────────────────────────────────┘
```

### Styled rendered elements where present
- Paragraphs.
- Heading levels.
- Ordered/unordered lists.
- Links.
- Emphasis/strong.
- Blockquotes.
- Horizontal rules.
- Images.
- Tables.
- Inline code.
- Code blocks.
- Captions only if actual content model supports them.

### Never invent
- Author.
- Published date.
- Category.
- Read time, unless deliberately derived from actual content and approved by existing product logic.
- Related articles.

## 8.2 Project Detail

### Goal
Present a premium project case study.

### Requirements
- Strong real project identity and imagery.
- Real metadata only.
- Comfortable readable long content.
- Render Markdown appropriately only if project content actually uses Markdown.
- Media/gallery controls only if media exists.
- Clear Liquid may appear on actual gallery/media controls above photos, not in long-form content.

---

# 9. Admin CMS — Locked Editorial Studio Workspace

## 9.1 Core Admin Principle

The Admin CMS is a work environment, not a marketing surface.

The admin must feel:

- Calm.
- Precise.
- Readable for long sessions.
- Efficient to scan.
- Safe for mutations.
- Brand-consistent without decoration overload.
- Suitable for curating interior imagery, case studies, global page copy, and articles.

## 9.2 Admin Material Rule

| Admin Area | Required Material |
|---|---|
| Main canvas | Warm neutral solid |
| Sidebar shell | Solid/tinted or restrained Regular Soft Glass |
| Dashboard cards | Solid editorial surfaces |
| List rows/tables | Solid editorial surfaces |
| Editor canvas | Solid editorial surface |
| Metadata sidebar | Solid or lightly tinted solid |
| Settings panels | Solid editorial surface |
| Dialogs | Solid readable surface |
| Sticky action area | Solid or restrained Regular Soft Glass only |
| Image preview overlay control | Optional tiny Clear Liquid only above actual image |

Clear Liquid Glass is **not** the Admin CMS visual language.

---

# 10. Admin Shell and Navigation

## 10.1 Desktop Layout — Locked

Use a fixed full-height desktop sidebar, not a detached floating showcase panel.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ FIXED SIDEBAR        │ PAGE HEADER / PRIMARY ACTIONS                       │
│ approx. 232–248px    │                                                      │
│                      ├──────────────────────────────────────────────────────┤
│ Mawmaw / Admin       │                                                      │
│                      │ MAIN WORKSPACE                                       │
│ Dashboard            │                                                      │
│                      │ List / Editor / Settings / Preview                  │
│ KONTEN               │                                                      │
│ - Proyek             │                                                      │
│ - Artikel            │                                                      │
│ - Layanan only real  │                                                      │
│                      │                                                      │
│ WEBSITE              │                                                      │
│ - Pengaturan         │                                                      │
│                      │                                                      │
│ DATA MASUK only real │                                                      │
│ - Pesan only real    │                                                      │
│                      │                                                      │
│ UTILITY              │                                                      │
│ - Lihat Website      │                                                      │
│ - Keluar             │                                                      │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

### Sidebar requirements
- Use only verified routes.
- Group navigation clearly.
- Clear selected/active route.
- Use existing icon system.
- Forest is primary active treatment.
- Gold is only a restrained marker/accent.
- Do not use dense Clear Liquid visual effects.
- Do not waste content width with oversized margins or promotional spacing.

## 10.2 Mobile and Tablet

- Replace fixed sidebar with accessible drawer/sheet navigation at appropriate breakpoints.
- Maintain clear current-page context.
- Keep primary page action reachable.
- Stack editor + metadata logically.
- Never use cramped two-column edit layouts on mobile.
- Consider a restrained sticky bottom save action only for long forms and only if reliable.

---

# 11. Admin Dashboard — Minimal Content Home

## 11.1 Decision

A dashboard is desired. It must be a minimal **Content Home**, not an analytics dashboard.

## 11.2 Allowed Content

Only if backed by actual queries/data:

- Total project count.
- Total article count.
- Real status counts only if status fields exist.
- Recently updated project/article rows only if timestamps exist.
- Direct shortcuts to Projects, Articles, and Settings.

## 11.3 Forbidden Content

Never invent:

- Traffic.
- Revenue.
- Conversions.
- Leads analytics.
- Views.
- Engagement.
- Publication activity.
- Chart data.
- Performance scores.

## 11.4 Layout reference

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Dashboard                                                              │
│ Kelola konten dan tampilan Mawmaw Interior.                            │
├────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐ ┌────────────────┐ ┌───────────────────────────┐ │
│  │ Proyek         │ │ Artikel        │ │ Pengaturan Website         │ │
│  │ Real count*    │ │ Real count*    │ │ Edit konten global         │ │
│  │ Kelola →       │ │ Kelola →       │ │ Buka →                     │ │
│  └────────────────┘ └────────────────┘ └───────────────────────────┘ │
│                                                                        │
│  Konten terbaru only if real records/query exist                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Actual project/article rows only                                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

`*` Only if actual query/data is implemented.

---

# 12. Admin Page Header and Action Pattern

Each admin page needs predictable context and actions.

## 12.1 List page

```text
Artikel                                           [+ Artikel Baru]
Kelola konten editorial dan cerita studio.
```

## 12.2 Edit page

```text
← Kembali ke Artikel

Edit Artikel                               [Preview if real] [Simpan]
Actual title/context only
```

## 12.3 Settings page

```text
Pengaturan Website                    [Lihat Website] [Simpan Perubahan]
Kelola konten global halaman publik Mawmaw Interior.
```

## 12.4 Rules

- Primary action appears consistently and is easy to find.
- Preview appears only if a real meaningful public/preview target exists.
- Real status and timestamps only.
- Destructive actions are visibly separated.
- Pending state is visible.
- Action behavior must not be implied before success.

---

# 13. Admin Listing Pages — Content Library Pattern

Admin listings prioritize scan and management speed, not public-card aesthetics.

## 13.1 Projects List

### Desktop reference

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Proyek                                          [+ Tambah Proyek]       │
│ Kelola karya dan studi kasus interior.                                 │
│                                                                        │
│ [Search only functional] [Filter only real]                            │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Image │ Project Title      │ Real Metadata │ Updated* │ Actions    │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ img   │ Actual project     │ actual only   │ actual   │ Edit/View  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Mobile reference

```text
┌────────────────────────────────────────┐
│ [Thumbnail] Actual Project Title       │
│             Real metadata only         │
│                           [Edit] [...] │
└────────────────────────────────────────┘
```

## 13.2 Articles List

### Desktop reference

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Artikel                                         [+ Artikel Baru]        │
│ Kelola tulisan editorial studio.                                      │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Cover │ Article Title      │ Metadata only if real      Edit/View  │ │
│ │       │ Actual excerpt?    │                                       │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Required behavior
- Responsive management rows/cards on mobile.
- Actual thumbnails only.
- Edit action clear.
- View/preview only if route exists.
- Search/filter/sort only when functional and backed by actual fields/query.

## 13.3 States

Where applicable, implement:

- Loading state.
- Empty collection state with one useful real action.
- No-results state only for functioning query controls.
- Error state.
- Delete pending/confirmation.
- Mutation success feedback.

---

# 14. Project Editor — Case Study Builder

## 14.1 Goal

Project editing must feel like composing and managing a premium case study, not raw database fields.

## 14.2 Desktop reference

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ← Proyek   Edit Proyek                         [Preview] [Simpan]        │
├────────────────────────────────────────────┬─────────────────────────────┤
│ MAIN CASE STUDY CONTENT                    │ METADATA / MEDIA            │
│                                            │ sticky when useful          │
│ Informasi Dasar                            │                             │
│ [Judul...................................] │ Cover image                 │
│ [Slug only if real.......................] │ [Actual preview]           │
│                                            │ [Select/replace if real]    │
│ Cerita / Deskripsi                         │                             │
│ [Large content area......................] │ Actual metadata only       │
│ [........................................] │ Category/year/status*      │
│ [........................................] │ Featured only if real      │
│                                            │                             │
│ Gallery only if supported                  │ Danger Zone                 │
│ [Real media controls]                      │ [Delete confirmation]      │
└────────────────────────────────────────────┴─────────────────────────────┘
```

`*` Only if real fields exist.

## 14.3 Requirements

- Main content receives dominant width.
- Metadata/media panel does not interrupt writing.
- Cover preview and image workflow are obvious.
- Long text is comfortable to edit.
- Markdown preview/rendering only if actual project content format requires it.
- Save remains reachable.
- Delete is isolated and guarded.
- Mobile stacks content then metadata with accessible actions.

---

# 15. Article Editor — Writing Studio

## 15.1 Locked Editor Technology Decision

Do not introduce Tiptap or a new rich text content format in this phase.

If actual content is Markdown:

- Markdown remains the storage source of truth.
- Implement correct public Markdown rendering.
- Implement an admin Markdown writing and preview workflow.
- Reuse shared prose treatment between public article detail and admin preview where practical.

If actual content is not Markdown, preserve the verified format and report findings before any destructive conversion.

## 15.2 Desktop reference

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ← Artikel   Edit Artikel                        [Preview] [Simpan]       │
├────────────────────────────────────────────┬─────────────────────────────┤
│ WRITING CANVAS                             │ ARTICLE SETTINGS            │
│                                            │ sticky when useful          │
│ [Large title input.......................] │ Cover image                │
│ [Excerpt only if real....................] │ [Actual preview]           │
│                                            │                             │
│ [ Tulis ] [ Preview ] [ Split optional ]   │ Slug/category/status/date*  │
│                                            │ Actual fields only          │
│ ┌────────────────────────────────────────┐ │                             │
│ │ Large comfortable Markdown editor      │ │ Danger Zone                │
│ │ OR rendered editorial preview          │ │ [Delete confirmation]      │
│ └────────────────────────────────────────┘ │                             │
└────────────────────────────────────────────┴─────────────────────────────┘
```

`*` Only if actual fields exist.

## 15.3 Mode behavior

### Default `Tulis`
- Large writing surface.
- Comfortable typography and line height.
- Not a small generic textarea in a cramped card.

### `Preview`
- Real rendered content.
- Visually aligned with public prose.

### `Split View`
- Optional only at large desktop widths.
- Not default.
- Do not implement if it reduces writing usability.

### Mobile
- Tulis/Preview toggle only.
- No side-by-side squeeze.
- Metadata stacks.
- Primary save remains accessible.

---

# 16. Settings CMS — One Structured Global Document

## 16.1 Locked Decision

Settings remains one logical editor route:

```text
/admin/settings
```

Do not split it into nested subroutes by default.

## 16.2 Rationale

Global website Settings represents one global presentation document. One-route structured editing avoids:

- Fragmented save states.
- Accidental loss while navigating between subroutes.
- Overcomplicated partial mutation.
- Unclear cache invalidation.
- A mental model that incorrectly treats global content as separate documents.

## 16.3 Desktop layout reference

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Pengaturan Website                    [Lihat Website] [Simpan Perubahan] │
│ Kelola konten global halaman publik Mawmaw Interior.                     │
├───────────────────────┬──────────────────────────────────────────────────┤
│ SETTINGS NAV          │ ACTIVE SETTINGS PANEL                            │
│                       │                                                  │
│ ● Umum                │ Hero                                             │
│   Hero                │ Teks dan visual utama halaman depan.             │
│   Studio / About      │                                                  │
│   Judul Section       │ [Judul Hero....................................] │
│   Kontak & Footer     │ [Deskripsi.....................................] │
│   SEO only if real    │                                                  │
│                       │ Hero Image                                       │
│                       │ [Actual image preview]                           │
│                       │ [Select/replace only if supported] [Alt text]    │
└───────────────────────┴──────────────────────────────────────────────────┘
```

## 16.4 Candidate categories — only include verified fields

| Category | Possible Data |
|---|---|
| Umum | Site name, description, contact data, real social links |
| Hero | Title, description, image, alt, real highlight/stat items |
| Studio / About | Label, title, story, image, alt, real values |
| Judul Section | Services/projects/articles heading copy |
| Kontak & Footer | Contact introduction, footer summary, copyright, actual contact details |
| SEO | Only if actual editable metadata implementation exists |

## 16.5 Save behavior

Preferred safe behavior:

- One form state across the route.
- Switching internal panels does not lose unsaved edits.
- One reliable Save action persists supported Settings content.
- Visible pending, success, and error feedback.
- Correct public cache/path/tag invalidation after a successful save.

A verified existing safe partial-save architecture may be reused only if it remains clear and is explained in the final report.

## 16.6 Structured data fields

Never expose raw JSON editing for typical admin use.

If verified fields contain JSON arrays or objects for social links, hero highlights, or About values:

- Use structured fields/repeater controls only where safely implementable.
- Validate shape on the server.
- Protect public rendering against malformed values.
- Do not invent structured items or icons.

---

# 17. Dynamic Global Content Integration

## 17.1 Source of Truth Rule

Global public presentation content belongs to verified Settings storage. It must not remain permanently hardcoded across section components after safe integration.

## 17.2 Consumers to Audit and Wire

Verify actual files and wiring for:

- Global site identity and metadata/SEO only if supported.
- Header identity/contact links where appropriate.
- Hero.
- About/Studio.
- Services section heading copy.
- Featured Projects section heading copy.
- Featured Articles section heading copy.
- Contact section.
- Footer.
- Social/contact information.

For every consumer, report:

- Existing content source before change.
- Whether it was already dynamic or hardcoded.
- Exact modified file if changed.
- Dynamic state after change.

## 17.3 Data boundaries

Settings may contain global page-level presentation content.

Do not improperly move into global Settings:

- Individual projects.
- Individual articles.
- Relational categories/tags.
- Project galleries if a proper content model exists.
- Contact submissions.
- User/admin accounts.
- A Services collection that already has or should maintain its own verified CMS model.

## 17.4 Query, Cache, and Revalidation

Follow verified project patterns.

Preferred server-side direction only when compatible with the actual app:

- Load Settings on the server at an appropriate shared parent.
- Pass settings props to sections when it avoids duplicate database reads.
- Cache safely with a meaningful tag/path strategy.
- Revalidate affected public surfaces after successful Settings update.
- Avoid unnecessary public client fetching.

Do not claim updates appear publicly until the mutation and invalidation flow is verified.

---

# 18. Media and Image Handling

## 18.1 Verify Existing Architecture

Before implementing media UX, inspect:

- Image field representations.
- Upload/image picker implementation.
- Storage strategy.
- `next/image` usage.
- Allowed remote patterns.
- Existing `alt` fields.
- Existing placeholder/blur data.
- Cover/gallery behavior.

## 18.2 Admin Image UX

Where real image fields exist, provide:

- Selected image preview.
- Clear choose/replace/remove behavior where supported.
- Alt text editing for public-facing media if data supports it.
- Clear missing-image state.
- No fake placeholder URLs/assets.

## 18.3 Performance

Where applicable and supported:

- Hero image priority configured intentionally.
- Correct responsive `sizes`.
- Below-the-fold images lazy/load efficiently.
- Cover/project/article media use appropriate sizing.
- Blur placeholders only when actual data or correctly implemented generation exists.
- Settings/media updates revalidate public output.

Never fabricate BlurDataURL behavior or image metadata.

---

# 19. Accessibility and Responsive Quality

## 19.1 Public Accessibility

Verify and improve actual implementation for:

- Semantic landmarks.
- Meaningful heading hierarchy.
- Accessible navigation.
- Focus-visible states.
- Contrast over hero/media/Clear Liquid controls.
- Actual meaningful alt text sourced from content where available.
- Correct button/link semantics.
- Contact labels and errors.
- Reduced-motion support.
- Controls not discoverable only on hover.

## 19.2 Admin Accessibility

Verify and improve:

- Active sidebar state clarity.
- Accessible mobile drawer navigation.
- Real labels for fields.
- Understandable validation error handling.
- Accessible Tulis/Preview tabs.
- Accessible Settings internal navigation.
- Dialog/delete confirmation keyboard handling where deletion exists.
- Touch-friendly actions.
- Visible focus on tinted/translucent surfaces.
- No low-contrast form UI.

Do not claim general WCAG compliance unless a full measured audit was actually performed. Report concrete changes only.

## 19.3 Required Responsive Review Widths

Inspect the implemented result at approximately:

- 375px.
- 430px.
- 768px.
- 1024px.
- 1440px.

### Public checks
- Hero crop/copy readability.
- Clear Liquid navigation/control legibility.
- Mobile menu.
- CTA alignment.
- About/services/projects/articles.
- Contact form.
- Footer.
- No horizontal overflow.

### Admin checks
- Sidebar/drawer.
- Dashboard.
- Page header actions.
- Project list/editor.
- Article list/Writing Studio.
- Settings navigation/editor.
- Metadata panel stacking.
- Image fields.
- Sticky actions if implemented.
- No cramped editor or off-screen controls.

---

# 20. States and Mutation Feedback

## 20.1 Admin States — when workflow exists

Implement or refine:

| State | Requirement |
|---|---|
| Loading | Useful route/component state, restrained skeleton only where true loading exists |
| Empty | Explain absence and offer one real next action |
| No-result | Only for functioning search/filter |
| Validation error | Visible field/form-level message aligned with real validation |
| Pending save/create/update | Visible pending action; prevent confusing duplicate submission |
| Success | Only after successful completed action; use real feedback/toast pattern |
| Delete/destructive | Clearly separated and confirmed where delete exists |
| Server failure | Honest user feedback; no silent failure |

## 20.2 Public States

Where applicable:

- Empty project/article lists.
- Not-found detail route.
- Contact submission pending/success/error.
- Missing image handling.
- Safe missing Settings handling.

---

# 21. Component Architecture Guidance

Follow verified existing file conventions and do not create parallel unused systems.

## 21.1 Public primitives that may be justified

- Solid editorial surface abstraction.
- Regular Soft Glass surface abstraction.
- Clear Liquid control surface abstraction.
- Clear Liquid navigation/control button for real hero/media use.
- Shared prose renderer/styles.

## 21.2 Admin primitives that may be justified

- Admin shell/sidebar/mobile nav.
- Admin page container/header.
- Admin section/panel.
- Admin content library row/list pattern.
- Admin empty/error state.
- Admin editor shell.
- Admin metadata panel.
- Admin action bar.
- Admin media field.
- Admin danger zone.
- Markdown editor preview tabs.
- Settings section navigation.

## 21.3 Abstraction rule

Create shared primitives only when:

- At least two real screens benefit, or
- Consistency, accessibility, or workflow safety is materially improved.

Do not over-abstract a one-off section or build unused primitives to look thorough.

---

# 22. Implementation Phases

## Phase 1 — Grounding

- Read this document.
- Read applicable skills.
- Inspect actual stack, routes, schema, data flow, media, renderer, CSS, cache, scripts.
- Produce `00_REPOSITORY_GROUNDING`.

## Phase 2 — Verified Change Map

- Produce `01_VERIFIED_CHANGE_MAP`.
- Identify exact files to create/modify and why.
- Confirm no stop-condition blocker.
- If no blocker exists, continue implementation immediately without requesting non-destructive UI approval.

## Phase 3 — Design Tokens and Material Foundation

- Fix verified token conflicts with minimal safe changes.
- Establish solid/regular/clear material distinction.
- Implement usable Clear Liquid public primitives with fallback.
- Establish prose style/rendering foundation.
- Validate Clear Liquid in actual rich-media context or a safe internal validation method.

## Phase 4 — Admin Shell and Core Workflow Architecture

- Fixed full-height desktop sidebar.
- Mobile drawer navigation.
- Shared page header/action hierarchy.
- Content Home dashboard with real data only.
- Listing/workspace/editor/settings layout foundations.
- Essential UI states.

## Phase 5 — Admin Content Workflows

- Project list and Case Study Builder edit/create where real.
- Article list and Writing Studio edit/create where real.
- Markdown Tulis/Preview if verified applicable.
- Actual image/media fields.
- Actions, pending, feedback, deletion safety.

## Phase 6 — Settings and Dynamic Public Wiring

- One-route structured Settings editor.
- Use verified Settings model/action/query architecture.
- Implement safe validation and save feedback.
- Connect all actual global public consumers.
- Correct revalidation/cache behavior.
- Remove obsolete hardcoded consumption only after safe replacement.

## Phase 7 — Public Experience and Clear Liquid Application

- Public navigation and hero.
- About/Studio.
- Services.
- Featured Projects.
- Featured Articles.
- Contact.
- Footer.
- Article and Project detail.
- Clear Liquid controls selectively above real imagery.

## Phase 8 — Quality Review and Validation

- Accessibility pass.
- Responsive visual/browser inspection.
- Performance/image/cache checks.
- Run relevant actual scripts.
- Produce `02_IMPLEMENTATION_PROGRESS` and `03_VALIDATION_REPORT`.

---

# 23. Validation Gates and Definition of Done

## 23.1 Required Script Validation

Run only commands that actually exist or are appropriate to the verified repository, for example:

- Lint command from `package.json`.
- Typecheck command from `package.json` or `tsc --noEmit` when configured.
- Production build command.
- Prisma validation/generate if Prisma usage/schema/generated client is touched.
- Migration status only if migration is involved.

Record actual command and actual result. Never declare a pass without running it.

## 23.2 Required Manual / Browser Verification Where Applicable

| Flow | Proof Needed |
|---|---|
| Public hero/navigation | Visual/interaction check, Clear Liquid readable over actual media |
| Clear Liquid fallback/readability | Bright/dark/busy media checks as practical |
| Settings save | Admin mutation succeeds and affected public content updates |
| Cache/revalidation | Public update reflects saved Settings change as designed |
| Article public detail | Stored content renders correctly; no raw Markdown when Markdown storage verified |
| Article admin editor | Tulis/Preview works and is comfortable |
| Project detail/edit | Real flow remains functional and layout improves |
| Admin dashboard | Real data only |
| Admin sidebar/mobile nav | Usable at desktop/mobile sizes |
| Lists/states | Empty/pending/error/delete behavior checked where it exists |
| Responsive | Relevant pages reviewed at specified widths |

## 23.3 Completion Criteria

The implementation is complete only when, for every applicable verified module:

### Public
- Editorial/photography-led identity is preserved and improved.
- Clear Liquid exists as selective optical public controls, not generic blur.
- Hero/navigation and public section hierarchy are materially improved.
- Global copy/media are dynamic through verified Settings.
- Article/project long-form presentation is readable and correctly rendered.

### Admin
- Full admin shell/navigation is coherent and responsive.
- Dashboard uses real data only.
- Projects and Articles management workflows are materially improved.
- Article Writing Studio follows verified content format and preview direction.
- Settings is one structured global editor route.
- Admin core surfaces remain solid/productive.
- Mutation states are clear and safe.

### Data and Trust
- No fake data, routes, fields, metadata, or features.
- No destructive architecture change without review.
- No unsupported completion claims.
- All validation status is reported truthfully.

---

# 24. Required Final Agent Report Format

After completing implementation, produce a final artifact/report using this structure.

## 1. Skills Read and Applied
For each actual skill file:
- Path.
- Guidance applied.

## 2. Verified Repository Findings Before Changes
- Stack/scripts.
- Public routes found.
- Admin routes found.
- Settings model/query/action/seed/cache situation.
- Article format/rendering situation.
- Project format/rendering situation.
- Services CMS status.
- Contact/submission admin status.
- Image/media architecture.
- CSS/token/material issues.

## 3. Locked Design Decisions Applied

### Public
- Photography-led layout.
- Selective Clear Liquid controls over real rich media.
- Public hierarchy/CTA improvements.

### Admin
- Editorial Studio CMS.
- Fixed desktop sidebar and mobile navigation.
- Minimal real-data Content Home.
- Content-library listing.
- Case Study Builder project workflow.
- Writing Studio article workflow.
- One-route Settings editor.
- Solid-first admin material strategy.

## 4. Material System Implementation

| Material Primitive | Purpose | Actual Files/Components Using It | Fallback / Accessibility / Performance Notes |
|---|---|---|---|

For Clear Liquid, state:
- Actual locations used.
- How it differs from generic frosted blur.
- Whether refraction/lensing approximation was implemented.
- Fallback behavior.
- Any limitation.

## 5. Dynamic Settings and Data Integration
- Verified settings model.
- Whether schema changed.
- Migration generated/applied status if relevant.
- Seed/initialization status.
- Query/action/cache/revalidation behavior.
- Public consumers migrated.
- Any fallback remaining.

## 6. Admin CMS Page-by-Page Result

| Admin Route | Purpose | Verified Problem Before | Implemented UX Improvement | Material Strategy | Remaining Limitation |
|---|---|---|---|---|---|

Only include real routes.

## 7. Public Page-by-Page Result

| Public Route / Section | Verified Problem Before | Implemented UX Improvement | Dynamic Status | Clear Liquid Use | Remaining Limitation |
|---|---|---|---|---|---|

Only include real routes/sections inspected.

## 8. Article and Project Content Quality
- Storage format found.
- Renderer implemented/refined.
- Admin preview behavior.
- Shared prose styling.
- Limitations.

## 9. Significant Files Changed
For each file:
- Path.
- Why changed.
- Resulting behavior.

## 10. Accessibility, Responsive, and Performance Work
- Concrete focus/keyboard changes.
- Label/error changes.
- Contrast/readability checks.
- Reduced motion.
- Image/performance/cache work.
- Widths/browser pages actually inspected.
- Clear Liquid validation.

## 11. Validation Run
- Commands actually run.
- Exact outcome.
- Manual flows actually inspected.
- Failures still present.

## 12. Remaining Limitations / Deferred Work
Only verified remaining limitations. No invented optional work.

---

# 25. Anti-Hallucination Checklist Before Every Claim of Completion

Before writing “done”, “fixed”, “implemented”, “connected”, “validated”, or “responsive”, ensure:

- [ ] The relevant file was actually inspected or changed.
- [ ] The route/component actually exists.
- [ ] The field/data model actually exists.
- [ ] The UI control is functional, not decorative.
- [ ] The mutation action is real.
- [ ] The visual behavior was actually reviewed when claiming appearance improvements.
- [ ] The validation command was actually executed when claiming it passed.
- [ ] No fake metadata, metric, item, route, or status was introduced.
- [ ] No existing dynamic behavior was replaced with static mock content.
- [ ] Clear Liquid is used only in approved media/control contexts.
- [ ] Admin remains readable and solid-first.
- [ ] Any blocker or limitation is reported honestly.

---

# 26. Execution Prompt to Send to Antigravity Agent

Use the prompt below after this file is added to the repository, preferably at:

```text
docs/MAWMAW_PRODUCT_UX_BLUEPRINT.md
```

Copy only the block below into the Antigravity agent conversation.

```md
# EXECUTE MAWMAW UI/UX & CMS REFINEMENT — STRICT GROUNDED MODE

Read `docs/MAWMAW_PRODUCT_UX_BLUEPRINT.md` completely before making any code changes. Treat it as the locked product/UI/UX/material/workflow direction for this task.

Use Google Antigravity Planning workflow for initial grounding because this is a complex multi-route implementation task, but do not stop for repeated approval on ordinary non-destructive UI/UX work.

## Mandatory first actions
1. Read the full blueprint document.
2. Read applicable project skills, especially:
   - `.agents/skills/mawmaw-data-contract/SKILL.md`
   - `.agents/skills/ui-ux-pro-max/SKILL.md`
   - `.agents/skills/web-design-guidelines/SKILL.md`
3. Inspect the real repository: routes, components, schema, settings, actions, content formats, rendering, images, CSS/tokens, cache/revalidation, and package scripts.
4. Produce artifact `00_REPOSITORY_GROUNDING` containing VERIFIED facts only.
5. Produce artifact `01_VERIFIED_CHANGE_MAP` with exact files to change/create, actual reasons, and blocker assessment.

## Proceed rule
After producing the verified change map, proceed directly with implementation in this same mission if no stop-condition blocker is verified. Do not ask me again for approval merely to create/refactor components, layouts, admin shells, public material primitives, Settings UI, prop wiring, cache invalidation, Markdown preview/rendering, or non-destructive UX changes already approved by the blueprint.

## Stop rule
Stop and request review only if you verify:
- a Prisma schema change beyond existing sufficient Settings structure is required,
- a destructive migration/data conversion is required,
- auth/security boundaries must change,
- existing content risks deletion/corruption,
- or a binding data-contract conflict has no safe compliant implementation.

## Locked implementation direction
- Public: premium photography-led Mawmaw experience with selective Clear Liquid Glass web approximation only for floating controls over rich media.
- Admin: Editorial Studio CMS, fixed full-height desktop sidebar, mobile drawer, minimal real-data dashboard, solid-first working surfaces, content-library list pages, Project Case Study Builder, Article Writing Studio, and one-route structured `/admin/settings`.
- Article: do not add Tiptap. Preserve verified existing format; when Markdown is verified, implement Markdown Tulis/Preview and correct public rendering.
- Settings: verify existing model/seed/action/query/cache first; do not create duplicate models or migrations without a verified blocker.
- Data: never fabricate projects, articles, metadata, statistics, fields, routes, services/contact modules, or validation results.
- Material: do not rename generic blur as Clear Liquid Glass; do not apply Clear Liquid to dense Admin workflow surfaces.

## Required evidence
Create/update:
- `02_IMPLEMENTATION_PROGRESS`
- `03_VALIDATION_REPORT`

Run actual relevant lint/typecheck/build/Prisma checks available in the repository and report real outcomes. Validate real public/admin flows and responsive behavior according to the blueprint.

Start now by reading the blueprint and skills, then inspect the repository and continue through implementation unless a valid stop-condition blocker is found.
```
