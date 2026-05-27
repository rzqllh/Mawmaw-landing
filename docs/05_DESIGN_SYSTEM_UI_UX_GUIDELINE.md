# 05 — Design System, UI, UX, and Content Guideline

This is the source of truth for visual consistency, layout quality, user experience, and product copy.

## Design System Principle

Use tokens and reusable patterns. Do not create one-off colors, spacing, shadows, radii, typography, or button styles unless the project source of truth allows it.

## Token Ownership

Project-specific token values must live in project token files or `01_PROJECT_CONTEXT_TEMPLATE.md`.

This guideline defines categories, not exact brand values.

### Token Categories

| Token | Purpose |
|---|---|
| Color | brand, surface, text, border, status |
| Typography | font family, size, weight, line height, tracking |
| Spacing | layout rhythm and component padding |
| Radius | component shape consistency |
| Shadow/elevation | depth and hierarchy |
| Border | separation and affordance |
| Motion | timing/easing references; detailed rules in `08_MOTION_ANIMATION_GUIDELINE.md` |
| Z-index | layering order |

## Visual Rules

- Use existing tokens first.
- Do not introduce random hex values.
- Do not introduce random radius values.
- Keep icon style consistent.
- Keep surface treatment consistent.
- Do not mix unrelated visual styles.
- Make visual hierarchy obvious.

## UI Composition

A screen should answer:

1. Where am I?
2. What is important?
3. What can I do next?
4. What happens after I act?

## Layout Rhythm

Use consistent:
- section spacing,
- grid gaps,
- card padding,
- text width,
- alignment,
- vertical rhythm.

Avoid:
- cramped sections,
- inconsistent card heights without reason,
- too many competing CTAs,
- decorative elements that harm clarity.

## CTA Rules

Primary CTA:
- only one dominant primary action per section when possible,
- clear verb,
- user-benefit focused.

Secondary CTA:
- supportive, not competing.

Bad CTA patterns:
- many buttons with equal weight,
- vague labels like "Submit" when action can be specific,
- CTA that leads to missing route.

## Navigation UX

Navigation should be:
- predictable,
- scannable,
- keyboard accessible,
- responsive,
- visually clear for active state.

Do not invent routes that do not exist.

## States

Every interactive feature should consider:

- default,
- hover,
- focus,
- active,
- disabled,
- loading,
- empty,
- error,
- success.

## Content Rules

### Tone

Use project-specific tone from `01_PROJECT_CONTEXT_TEMPLATE.md`.

Default tone:
- clear,
- useful,
- not generic,
- not overhyped,
- not robotic.

### Avoid Generic AI Copy

Avoid phrases like:
- "seamless experience",
- "unlock your potential",
- "revolutionize your workflow",
- "empower your business",
- "cutting-edge solution" without proof.

Prefer concrete value:
- what the user gets,
- how it works,
- why it matters,
- what action to take.

## Form Copy

Labels:
- specific,
- human-readable,
- not placeholder-only.

Helper text:
- explain requirements,
- avoid repeating the label.

Errors:
- tell the user how to fix it.

## Empty State Copy

Good empty state includes:
- what is empty,
- why it may be empty,
- what the user can do next.

## Design Review Checklist

- Token usage is consistent.
- CTA hierarchy is clear.
- States are defined.
- Layout works on mobile and desktop.
- Copy is concrete.
- Visual hierarchy supports the user goal.
- Accessibility is not sacrificed for aesthetics.
