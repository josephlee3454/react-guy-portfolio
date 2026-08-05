---
name: portfolio-design-spec-location
description: Where the authoritative design spec and HTML mockup for react-guy-portfolio actually live, and why the code comments point at a dead path
metadata:
  type: reference
---

The authoritative design source for `react-guy-portfolio` is:

- `/Users/josephlee/workspace/claude-workspace/react-guy-portfolio/design 4/DESIGN_SPEC.md`
- `/Users/josephlee/workspace/claude-workspace/react-guy-portfolio/design 4/assets/styles.css` (the mockup CSS)
- `.../design 4/*.html` (index, about, work, writing, contact, **testimonials**)

Read-only reference. `README-FOR-CLAUDE.md` in that folder says the spec wins
where it and `styles.css` disagree.

Two things worth knowing before trusting a code comment:

- Source comments throughout `src/theme/` and `src/components/` cite
  `design 3/DESIGN_SPEC.md` and `design 3/assets/styles.css`. **That folder no
  longer exists** — only `design 4` and the app remain. The token values are
  identical between them, so the comments are not misleading about content, only
  about path. Verify against `design 4` before quoting a line number.
- `design 4` includes a `testimonials.html` page the app does not implement.
  Check whether that is an intentional cut before treating it as missing work.

Verify these paths still exist before acting on them — the design folders have
been renumbered at least once.
