---
name: feedback-css-hover-animations
description: Use pure CSS/Tailwind hover animations instead of JS-driven hover state (useHasHover hook is gone)
metadata:
  type: feedback
---

All hover animations should be Tailwind CSS `group-hover:` or `hover:` classes — no JS hover state, no `useHasHover` hook.

**Why:** The `useHasHover` hook and JS-driven hover state (`useState` + `onMouseEnter/Leave`) were removed in favour of pure CSS. Tailwind v4 `hover:` automatically scopes to `@media (hover: hover)`, so touch devices are handled without any JS.

**How to apply:**
- For dynamic rotation that needs to reset on hover: use a CSS custom property `style={{ '--r': `${deg}deg` } as CSSProperties}` with `className="rotate-[var(--r)] hover:rotate-0"`. The `rotate-[var(--r)]` class (specificity 0,1,0) is overridden by `hover:rotate-0` (specificity 0,2,0).
- For dynamic glow/shadow on hover: `style={{ '--glow': value } as CSSProperties}` + `className="hover:[box-shadow:var(--glow)]"`.
- For group-based hover: use `className="group ..."` on container and `group-hover:*` on children.
- The `lib/hooks.ts` file (which contained `useHasHover`) was deleted — do not recreate it.
