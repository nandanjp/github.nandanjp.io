---
name: feedback-shadcn-over-radix
description: Prefer shadcn component wrappers over raw Radix UI primitives
metadata:
  type: feedback
---

Always use the shadcn components in `@/components/ui/` rather than importing raw Radix primitives directly (e.g. `from 'radix-ui'`).

**Why:** User corrected use of `ScrollArea.*` Radix primitives when the shadcn `ScrollArea` + `ScrollBar` from `@/components/ui/scroll-area` should have been used instead. Diverging from shadcn wrappers is inconsistent with the project's component practices.

**How to apply:** Before reaching for `import { X } from 'radix-ui'`, check `components/ui/` for an existing shadcn wrapper. Use the shadcn export. For horizontal scroll specifically: pass `<ScrollBar orientation="horizontal" />` as a child of `<ScrollArea>` — shadcn's own pattern; Radix registers scrollbars via context, not DOM position.
