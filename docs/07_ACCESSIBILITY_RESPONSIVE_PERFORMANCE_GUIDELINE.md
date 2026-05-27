# 07 — Accessibility, Responsive, and Performance Guideline

This is the source of truth for baseline usability quality across devices and user needs.

## Quality Principle

A feature is not done if it only works for the happy path on one screen size with a mouse.

## Accessibility

### Semantic HTML

Use native elements where possible:
- button for actions,
- anchor for navigation,
- label for inputs,
- headings in logical order,
- lists for repeated content,
- landmarks for page regions.

### Keyboard Navigation

Interactive elements must be reachable and usable with keyboard.

Check:
- tab order,
- focus visibility,
- escape behavior for overlays,
- enter/space activation,
- trapped focus only inside modal dialogs.

### Focus State

Every interactive element needs visible focus.

Do not remove outline without replacing it with an accessible focus style.

### Color and Contrast

Do not rely on color alone.

Status must include:
- text,
- icon,
- label,
- shape, or other non-color cue.

### Forms

Every input needs:
- label,
- error association,
- helper text if needed,
- clear required/optional indicator.

### Images and Media

Use alt text when image conveys meaning.

Decorative images should be hidden from assistive tech when appropriate.

### Reduced Motion

Motion-specific implementation is owned by `08_MOTION_ANIMATION_GUIDELINE.md`, but accessibility requires honoring reduced-motion preferences.

## Responsive Design

### Mobile-First

Start from small screens, then enhance.

Do not design desktop first and squeeze later.

### Breakpoint Behavior

For each major layout:
- define stacking behavior,
- define spacing changes,
- define navigation behavior,
- define media aspect ratio,
- define table strategy.

### Container Rules

Use readable max-width.

Avoid text lines that are too long.

### Touch Targets

Interactive touch targets should be comfortably tappable.

Avoid tiny icon-only buttons without accessible label.

### Overflow

Avoid accidental horizontal scroll.

Tables, code blocks, and carousels need intentional overflow behavior.

## Performance

### Performance Principle

Optimize what users feel:
- fast first render,
- stable layout,
- responsive interaction,
- smooth scrolling/animation.

### Core Web Vitals Awareness

Consider:
- LCP for major visible content,
- CLS for layout shifts,
- INP for interaction responsiveness.

### Images

- Use appropriate dimensions.
- Use responsive sizes.
- Lazy-load non-critical images.
- Avoid layout shift by reserving space.
- Do not use massive unoptimized images.

### Fonts

- Limit font families and weights.
- Use font display strategy when applicable.
- Avoid blocking render unnecessarily.

### JavaScript

- Avoid unnecessary client-side code.
- Split heavy features when possible.
- Avoid importing large libraries for tiny tasks.
- Prefer server-rendered/static output where appropriate.

### Animation Performance

Detailed animation rules are in `08_MOTION_ANIMATION_GUIDELINE.md`.

Baseline:
- prefer transform and opacity,
- avoid layout-thrashing animation,
- clean up listeners/timers,
- avoid animating too many elements at once.

## Review Checklist

- Keyboard usable.
- Focus visible.
- Semantic HTML reasonable.
- Mobile layout works.
- No accidental horizontal scroll.
- Images have dimensions/alt strategy.
- Loading does not shift layout badly.
- Heavy client code is justified.
