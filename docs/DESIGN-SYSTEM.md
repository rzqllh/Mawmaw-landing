# Design System

Authoritative tokens and utilities live in `src/app/globals.css`.

## Brand direction

Warm editorial interiors: cream canvas, deep forest text/surfaces, restrained gold accents, serif display type, and quiet motion. UI should feel specific to an interior studio, not like a generic dashboard template.

## Typography

| Role | Font |
| --- | --- |
| Display and editorial headings | Cormorant Garamond |
| UI, body, forms, navigation | Plus Jakarta Sans |

Fonts load through `next/font/google` in `src/app/layout.tsx` and map to `--font-cormorant` and `--font-jakarta`.

## Color tokens

### Foundation

- Background: `#f7f6f2`
- Muted background: `#f1efe8`
- Surface: `#fffefa`
- Primary text/forest 900: `#112019`
- Secondary text: `#536357`
- Inverse text: `#faf8f1`

### Brand scales

- Forest scale: 50 through 900; primary accents around 700/900.
- Gold scale: 100 through 700; focus and restrained accent around 500.

Gold is not body text on light surfaces unless contrast is verified. Placeholder and muted text must remain readable at normal-text contrast.

## Spacing and layout

- `--layout-max: 1376px`.
- `.section-container` controls max width and responsive side padding.
- Sections use content-driven height; `min-h-dvh` may establish rhythm but must not clip overflow.
- Mobile starts at one column; grids expand at Tailwind breakpoints.

## Radius and shadows

Radius tokens range from 6px controls to 40px large surfaces plus pill. Shadows are limited to `shadow-card`, `shadow-soft`, and functional navigation depth. Avoid stacking glass, glow, gradient, and heavy shadow on the same surface.

## Motion

- Motion supports hierarchy and feedback, not decoration.
- `Reveal` handles entry transitions.
- Hero parallax respects `prefers-reduced-motion`.
- Global reduced-motion rules collapse animation and transition duration.
- Hover image scale remains restrained through `--scale-img-hover`.

## Interaction

- Minimum practical tap target: 44px.
- Global `focus-visible` outline uses gold focus token.
- Selected wizard choices expose `aria-pressed`.
- Modal navigation and lightbox use dialog semantics, focus management, and Escape.
- Loading, empty, error, validation, success, and disabled states are required where relevant.

## Antislop limits

- No fabricated metrics, testimonials, client names, awards, or project stories.
- No decorative status dots or badges without meaning.
- Use glass/transparency only for functional overlays or navigation depth.
- CTA text describes the next action.
- Avoid vague quality claims when a concrete service detail is available.
- Short marketing copy should not use em dashes as rhythm decoration.
