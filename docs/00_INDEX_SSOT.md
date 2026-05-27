# 00 — Single Source of Truth Index

This file prevents redundancy. Before editing or adding a guideline, check this index.

## Core Principle

One concept = one owner file.

Other files may link to the owner file but must not restate the same rule in detail.

## Rule Ownership Matrix

| Area | Owner File | What Belongs Here | What Must Not Be Duplicated Elsewhere |
|---|---|---|---|
| Project facts | `01_PROJECT_CONTEXT_TEMPLATE.md` | project name, stack, goals, audience, features, constraints, routes, env, design direction | product facts inside generic guidelines |
| Agent behavior | `02_AGENT_OPERATING_RULES.md` | inspect-before-edit, no hallucination, reporting format, dependency rules | repeated anti-halu paragraphs in every file |
| Scope | `03_SCOPE_CHANGE_CONTROL.md` | in/out scope, change size, confirmation rules, refactor boundaries | architecture or UI docs redefining scope |
| Architecture/code | `04_ARCHITECTURE_CODE_GUIDELINE.md` | folder structure, naming, boundaries, API, env, code quality | component UI variants or product features |
| Design/UI/UX/content | `05_DESIGN_SYSTEM_UI_UX_GUIDELINE.md` | tokens, layout, navigation, CTA, visual hierarchy, copy tone | animation rules, state rules, testing rules |
| Component/state/data | `06_COMPONENTS_STATE_DATA_GUIDELINE.md` | reusable components, props, state ownership, data fetching, schemas, forms/tables | visual token definitions or API security rules |
| Accessibility/responsive/performance | `07_ACCESSIBILITY_RESPONSIVE_PERFORMANCE_GUIDELINE.md` | WCAG-minded checks, breakpoints, Core Web Vitals-minded performance | motion-specific easing/timing systems |
| Motion/animation | `08_MOTION_ANIMATION_GUIDELINE.md` | macro/micro motion, GSAP, Motion/Framer, CSS, Three.js/WebGL, reduced motion for animation | generic performance rules not related to motion |
| Error/security/AI | `09_ERROR_SECURITY_AI_GUIDELINE.md` | error UX, auth, secrets, privacy, AI hallucination prevention inside product features | generic agent behavior |
| Testing/release/docs | `10_TESTING_RELEASE_DOCS_GUIDELINE.md` | test levels, QA checklist, changelog, release notes, docs standards | implementation rules or design system tokens |

## Naming Convention

Use numbered files only for stable core docs.

Use templates for repeatable work artifacts:

```txt
docs/templates/TASK_BRIEF_TEMPLATE.md
docs/templates/FEATURE_SPEC_TEMPLATE.md
docs/templates/DECISION_LOG_TEMPLATE.md
docs/templates/REVIEW_CHECKLIST.md
```

## Project-Specific Overrides

Do not edit universal rules just to fit one project.

Put project-specific decisions in:
- `docs/01_PROJECT_CONTEXT_TEMPLATE.md` after customization,
- a decision log,
- existing project config files,
- design token source files,
- schema files,
- route files.

## Conflict Resolution

When two docs disagree:

1. Prefer project-specific source if it is explicit and current.
2. Prefer code/config over outdated prose.
3. Prefer the owner file from the matrix above.
4. Stop and ask when the decision changes public behavior, database shape, design identity, or security posture.

## Deletion Rule

If a guideline duplicates another owner file, delete or merge it.

Do not keep duplicate docs "just in case." Duplicate docs make AI agents hallucinate.
