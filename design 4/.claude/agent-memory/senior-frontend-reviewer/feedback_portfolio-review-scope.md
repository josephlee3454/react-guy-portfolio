---
name: portfolio-review-scope
description: Two deliberate house-style deviations in react-guy-portfolio that must not be re-flagged as violations on future reviews
metadata:
  type: feedback
---

When reviewing `react-guy-portfolio`, do not report these two as house-style violations. Both are considered decisions, not accidents.

**1. `src/components/` + `src/features/` + `src/content/` + `src/app/` instead of atoms/molecules/organisms/templates/pages.**

**Why:** explicit choice by the project owner. The schemes map cleanly anyway
(`components/` = atoms+molecules+organisms, `features/` = page-bound organisms,
`PageShell`/`Bento` = templates, `app/` = pages), and the strict atomic rules
would actually *fail* a component the owner is happy with (`PageShell` is a
template that imports the `Nav` and `Footer` organisms).

**How to apply:** review against the rule the atomic scheme exists to enforce —
dependencies point downward only, pages carry no layout — rather than against
folder names. Recommending an eslint `no-restricted-imports` zone is in scope;
recommending a 30-file rename is not.

**2. Every `sx` is a plain object, never a `(theme) => ({...})` callback.**

**Why:** the app is almost entirely React Server Components and MUI's `Box` is a
client component. A function prop cannot cross the RSC boundary — React throws
"Functions cannot be passed directly to Client Components" at prerender. So the
house style's "take the theme callback rather than a literal" advice is not
safely applicable here.

**How to apply:** a literal in a server component's `sx` is not automatically a
finding — check whether a plain-data token import (`@/theme/tokens`) or a
palette string path (`'text.secondary'`) could have expressed it, and recommend
that instead. Theme callbacks ARE safe and SHOULD be expected in two places:
files with `'use client'` (e.g. `MobileMenu.tsx`), and `theme/components.ts`
`styleOverrides`. Flag a literal in either of those normally.

See [[portfolio-design-spec-location]] for where the design tokens come from.
