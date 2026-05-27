# 08 — Motion and Animation Guideline

This is the source of truth for motion, animation, scroll interaction, microinteraction, creative coding, and WebGL usage.

Motion is allowed, but it must be purposeful, performant, accessible, and consistent with the product personality.

## Motion Philosophy

Motion should help the user understand:
- what changed,
- where they are,
- what can be interacted with,
- what is loading,
- what deserves attention.

Motion must not exist only because it looks cool.

## Motion Categories

### Macro Motion

Large motion affecting layout, page structure, or storytelling.

Examples:
- page transition,
- section reveal,
- scroll storytelling,
- hero parallax,
- pinned section,
- carousel transition,
- route transition,
- modal/drawer entrance,
- dashboard view switch.

### Micro Motion

Small motion that gives feedback and polish.

Examples:
- button press,
- hover affordance,
- focus feedback,
- input validation,
- toggle state,
- menu open,
- tooltip reveal,
- badge update,
- skeleton shimmer,
- toast entrance.

### Ambient Motion

Subtle visual life that does not block task completion.

Examples:
- gradient drift,
- floating decorative shape,
- subtle shader movement,
- background parallax,
- slow card glow.

Ambient motion must be low intensity and disabled/reduced when needed.

## When to Use Motion

Use motion when it:
- clarifies hierarchy,
- improves feedback,
- explains spatial relationship,
- makes state change understandable,
- supports brand personality,
- helps onboarding/storytelling.

Do not use motion when it:
- delays task completion,
- hides content,
- distracts from reading,
- causes motion sickness,
- harms performance,
- makes UI unpredictable,
- replaces clear information architecture.

## Motion Tokens

Projects should define tokens for:

| Token | Purpose |
|---|---|
| Duration XS | instant feedback |
| Duration SM | hover/focus/press |
| Duration MD | menu/modal/card transition |
| Duration LG | section/page transition |
| Easing Standard | default UI movement |
| Easing Entrance | appearing elements |
| Easing Exit | leaving elements |
| Easing Emphasis | hero/storytelling |
| Stagger | sequential reveal |
| Distance | translation scale for reveal |

Do not hardcode random durations/easings everywhere.

## Suggested Baseline

Use project-specific tokens when available. If none exist, use these as temporary defaults:

```txt
duration-xs: 80ms
duration-sm: 150ms
duration-md: 240ms
duration-lg: 420ms
duration-xl: 700ms

ease-standard: cubic-bezier(0.2, 0, 0, 1)
ease-out: cubic-bezier(0.16, 1, 0.3, 1)
ease-in: cubic-bezier(0.7, 0, 0.84, 0)
ease-emphasis: cubic-bezier(0.22, 1, 0.36, 1)
```

If the project already has tokens, use those instead.

## Macro Motion Rules

### Page Transitions

Use only when:
- route change benefits from continuity,
- transition does not delay content,
- reduced-motion fallback exists.

Avoid:
- long full-screen transitions for utility apps,
- content jumping after transition,
- transition that breaks browser navigation expectations.

### Scroll-Based Animation

Scroll animation must:
- preserve content readability,
- not trap users unnecessarily,
- work on mobile,
- degrade gracefully,
- not block accessibility,
- not depend on exact viewport height only.

Use scroll animation for:
- editorial storytelling,
- portfolio presentation,
- product explanation,
- timeline/progress narrative.

Avoid using scroll animation for:
- critical forms,
- dashboards requiring fast scanning,
- dense documentation pages,
- pages where users need quick access.

### Pinning and Scrubbing

Use pinning/scrubbing sparingly.

Before using:
- confirm content length justifies it,
- test mobile behavior,
- define escape/degrade behavior,
- ensure performance budget is acceptable.

### Parallax

Good parallax is subtle.

Rules:
- foreground/background speed differences should support depth,
- text readability must stay stable,
- reduce or disable on mobile if unstable,
- disable for reduced motion.

## Microinteraction Rules

### Buttons

Button motion should communicate:
- hover affordance,
- pressed state,
- loading state,
- disabled state.

Avoid exaggerated scale.

### Inputs

Input motion should support:
- focus,
- validation,
- error reveal,
- helper text reveal.

Error animation must not shake aggressively or repeatedly.

### Cards

Card motion may use:
- subtle lift,
- shadow transition,
- border/surface change,
- media zoom if lightweight.

Avoid card movement that causes layout shift.

### Menus, Modals, Drawers

Use consistent entrance/exit direction.

Rules:
- focus management is required,
- backdrop should not be more animated than content,
- exit should be shorter or equal to entrance,
- ESC/close behavior must remain reliable.

### Toasts

Toast motion must be quick and non-blocking.

Do not animate toasts in a way that steals focus.

## Library Guidance

### CSS Animation

Use CSS for:
- simple hover/focus,
- keyframe loops,
- transitions,
- reduced-motion media query,
- lightweight microinteractions.

Good properties:
- `transform`,
- `opacity`,
- `filter` only with caution.

Avoid animating:
- `width`,
- `height`,
- `top`,
- `left`,
- `margin`,
- `padding`,
- expensive shadows on many elements.

### Motion / Framer Motion

Use for React UI motion:
- layout animation,
- route/page transition,
- gesture interaction,
- presence enter/exit,
- variants,
- orchestration,
- drag/swipe.

Rules:
- keep variants readable,
- avoid nesting too many animated wrappers,
- use layout animation only when it helps,
- provide reduced-motion fallback.

### GSAP

Use GSAP for:
- advanced timelines,
- ScrollTrigger,
- pinning,
- scrubbing,
- staggered storytelling,
- complex orchestration,
- non-React animation sequences.

Rules:
- register plugins intentionally,
- scope selectors,
- clean up contexts on unmount,
- avoid global selectors that affect unrelated UI,
- keep timeline naming clear,
- do not use GSAP for basic hover when CSS is enough.

### Three.js / WebGL

Use Three.js/WebGL only when:
- 3D/visual effect is core to experience,
- performance budget allows it,
- fallback exists,
- asset size is controlled,
- mobile behavior is tested.

Rules:
- dispose geometry/material/texture,
- limit lights/shadows,
- lazy-load heavy scenes,
- pause or reduce rendering when offscreen,
- avoid WebGL for decorative effects that CSS can solve.

### Shaders

Use shaders for:
- premium hero effects,
- interactive background,
- procedural texture,
- product/creative visual identity.

Rules:
- keep subtle for business/product UIs,
- do not harm contrast/readability,
- provide static fallback,
- reduce intensity on low-power devices.

## Performance Rules

- Prefer transform and opacity.
- Avoid layout thrashing.
- Avoid animating many large elements at once.
- Avoid infinite animations unless low-cost.
- Pause offscreen animation where possible.
- Clean up event listeners, RAF loops, observers, and timelines.
- Use lazy initialization for heavy animation.
- Test low-end/mobile behavior if animation is prominent.

## Accessibility Rules

Motion must respect reduced-motion preference.

Reduced-motion behavior can:
- remove movement,
- reduce distance,
- shorten duration,
- replace movement with opacity,
- use static state.

Do not remove essential feedback entirely. Replace it with a calmer alternative.

## Responsive Motion

Desktop, tablet, and mobile can have different motion behavior.

Mobile often needs:
- shorter transitions,
- less parallax,
- less pinning,
- fewer simultaneous animations,
- gesture-friendly interactions.

## Motion Decision Matrix

| Need | Preferred Tool |
|---|---|
| Button hover | CSS |
| Input focus/error | CSS or small JS |
| Modal enter/exit | CSS or Motion |
| React layout transition | Motion / Framer Motion |
| ScrollTrigger pin/scrub | GSAP |
| Timeline storytelling | GSAP |
| Simple reveal on scroll | CSS + Intersection Observer, Motion, or GSAP depending on project |
| 3D object/scene | Three.js |
| Shader visual | WebGL/shader library |
| Dashboard utility UI | Minimal CSS/Motion only |
| Landing page hero | CSS/Motion/GSAP/Three depending on scope |

## Implementation Checklist

Before shipping animation:

- Purpose is clear.
- Duration/easing follows tokens.
- Reduced-motion fallback exists.
- Mobile behavior is tested.
- No content readability issue.
- No major layout shift.
- No memory leak.
- No scroll trap.
- No heavy dependency for tiny effect.
- Performance is acceptable.

## Agent Rules for Motion Tasks

The agent must:

- identify whether motion is macro, micro, or ambient,
- use existing motion tokens if available,
- avoid adding GSAP/Three.js for simple effects,
- explain why a motion library is needed,
- include reduced-motion behavior,
- clean up animation lifecycle,
- preserve accessibility and content readability,
- avoid changing visual identity unless requested.

## Do Not Do

- Do not animate everything.
- Do not use random easing/duration.
- Do not pin long content without reason.
- Do not create motion that blocks user action.
- Do not animate critical form completion unnecessarily.
- Do not rely only on animation to communicate state.
- Do not add WebGL for a basic gradient.
- Do not ignore reduced-motion.
