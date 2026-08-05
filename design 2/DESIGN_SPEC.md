# Portfolio — Design Spec

Layout reference: a single-screen **bento grid** personal portfolio. Every section is a
rounded tile on one grid; there is no long vertical scroll of full-width bands.
Tiles are links to sub-pages, not content containers.

Visual reference file: `portfolio-mockup.html` (open it in a browser).

---

## 1. Design tokens

```css
--ink:        #0F1211;  /* page bg — warm-black shifted green, sits under the film's teal */
--tile:       #181C1B;  /* default tile fill */
--tile-2:     #1F2422;  /* raised tile (marquee) */
--line:       #2C3331;  /* 1px tile borders */
--bone:       #F0EDE4;  /* primary text */
--muted:      #8E948E;  /* eyebrows, body copy, footer */
--accent:     #FF7A18;  /* amber — CTA tile, underlines, hover arrow */
--accent-soft:#FF8C38;  /* accent hover */

--r:   26px;  /* tile radius (20px under 620px) */
--gap: 14px;  /* grid gap AND page padding — same value everywhere */
--pad: 28px;  /* tile inner padding (22px under 620px) */
```

**Type**
| Role | Face | Usage |
|---|---|---|
| Display | Bricolage Grotesque (600 / 800) | h1, tile h2, stat numbers, marquee |
| Body | IBM Plex Sans (400 / 500) | paragraphs, nav links |
| Utility | IBM Plex Mono (400 / 500) | eyebrows, stat labels, footer — always uppercase, `letter-spacing: .14em`, 10–11px |

Display type is tight: `letter-spacing: -.03em`, `line-height: .94` on the h1.
Never use the mono face for anything longer than four words.

**On the accent.** The amber is sampled from the cap logo in the hero photograph, and
it is the complement of the cross-processed teal in that photo's shadows — so the two
reinforce each other instead of competing. Text on the amber CTA is `--ink`, never
white; white on amber fails contrast. To go back to the earlier cobalt scheme, set
`--accent: #1F3BFF` / `--accent-soft: #2A44FF` and flip CTA text back to `#fff`.

---

## 2. Grid map (desktop, 12 columns)

```
┌──────────────────── nav pill (full width, rounded 999px) ────────────────────┐

┌─────────────────────────┬──────────────┬──────────────┐
│                         │ CREDENTIALS  │              │
│  HERO                   │  cols 7-9    │  PROJECTS    │
│  cols 1-6, rows 1-2     ├──────────────┤  cols 10-12  │
│                         │ WRITING      │  rows 1-2    │
│                         │  cols 7-9    │              │
├──────────────┬──────────┴───┬──────────┴──────────────┤
│  SERVICES    │  PROFILES    │  STATS                  │
│  cols 1-4    │  cols 5-7    │  cols 8-12              │
├──────────────┴──────────────┴─────────────────────────┤
│  MARQUEE  (full width, horizontal scroll)             │
├───────────────────────────────────────────────────────┤
│  CTA  (full width, accent fill)                       │
└───────────────────────────────────────────────────────┘

┌──────────────── footer bar (full width) ────────────────┐
```

**Breakpoints**
- `≤1000px` → 6-column grid. Hero / marquee / CTA span 6. Projects loses its row-span. Nav links collapse (add a hamburger).
- `≤620px` → single column, everything stacks in DOM order. Hero portrait becomes a full-bleed background at `opacity: .35`.

---

## 3. Tile inventory

| Tile | Contents | Notes |
|---|---|---|
| **Hero** | eyebrow (role), h1 (name + accent period), one-line bio, portrait | Portrait is absolutely positioned, 52% width, right edge. Copy is capped at 52% width so they never collide. See the masking note below. |
| **Credentials** | eyebrow + h2 only | Content bottom-aligned |
| **Projects** | image thumb (top 58%), eyebrow + h2 | Thumb has a bottom border, not a shadow |
| **Writing** | eyebrow + h2 only | |
| **Services** | eyebrow + h2 only | |
| **Profiles** | row of 4 circular social chips (top), eyebrow + h2 | Chips are 36px, 1px border, no fill |
| **Stats** | 3 figures: number (display 800) + 2-line mono label | Not a link — this tile has no arrow |
| **Marquee** | repeated phrase, infinite horizontal scroll | Duplicate the content set, animate `translateX(-50%)`, 26s linear infinite |
| **CTA** | h2 only, accent background | Arrow is 64px here instead of 44px. Text is `--ink` on amber, never white. |

**Hero portrait masking** — the photo must not read as a rectangle inside the tile.
Two gradients do the work:

```css
mask-image: linear-gradient(100deg, transparent 0%, #000 44%);  /* left edge dissolves */
```
plus an `::after` overlay of `linear-gradient(to top, var(--tile) 2%, transparent 42%)`
so the bottom sinks into the tile fill. `background-position: 52% 18%` keeps the face
in frame as the tile changes width. On mobile the mask rotates to a bottom-up fade and
the photo drops to `opacity: .42` so the headline stays legible over it.

**Corner arrow** — every clickable tile gets a 44px circular arrow pinned
`bottom: 20px; right: 20px`. On tile hover it rotates 45°, fills with `--accent`,
and text turns white. This is the one recurring motion signature — don't add others.

**Tile hover** — `translateY(-3px)` plus border lightens to `#4A4438`. 250ms ease.

---

## 4. Copy to replace

Everything below is placeholder. Swap before shipping:

- Brand mark: `yourname.`
- Hero h1: `Your Name.`
- Hero bio: swap the "I build the whole thing" sentence for your own; keep the
  availability line as-is (see below)

**Fixed copy — do not swap these for generic equivalents:**
- Hero eyebrow: `FULL STACK ENGINEER`
- CTA headline: `So what are we building?` — assumes the project is already happening
  instead of asking for permission to start one. Breaks to two lines at `max-width: 13ch`.
- Nav button: `Start here` — matched to the CTA's register. Not "Let's talk".
- Availability: `Open to full-time, contract, or the thing you haven't named yet.`
  Naming the shapes reads as choosing; "open to anything" reads as needing anything.
  No call to action here — the nav button and CTA tile already carry that, and a third
  ask on one screen dilutes all three.
- Stats: `07 / +125 / +210` — **replace or delete this tile**. Inflated numbers on a
  new portfolio read as untrue. If the real numbers are small, use different metrics
  (repos shipped, talks given) or drop the tile and let Stats merge into Services.
- Marquee phrase: `Latest work and featured` — **still template filler.** It isn't a
  sentence and it tells the reader nothing. Replace with something that does a job,
  e.g. availability, location, and year.
- Footer email and year

**Images**
1. Hero portrait — **done**, shipped as `portrait.jpg` (800×1100). Cross-processed
   grade: teal shadows, acid highlights, hard contrast, film grain, vignette.
   In the mockup it is base64-embedded so the file opens standalone; in the real build
   replace that data URI with a normal `url("/assets/portrait.webp")`.
2. Project thumbnail — still a CSS-gradient placeholder. Wide crop, roughly 1200×700.
   Run it through the same cross-process grade or the tile set will look mismatched.

Serve as WebP with explicit `width`/`height` to avoid layout shift.

---

## 5. Quality floor

- Keyboard focus: `outline: 2px solid var(--accent); outline-offset: 3px` on every link
- `@media (prefers-reduced-motion: reduce)` kills the marquee and all transitions
- Arrows are `aria-hidden` — the tile's `<a>` carries the accessible name
- Each tile is a single `<a>`, so the whole surface is the click target
- Contrast: `--muted` on `--tile` is the tightest pair; keep body copy at 15px minimum

---

## 6. Notes for the build

- Semantic order in the DOM should match reading priority, since mobile stacks in DOM
  order: hero → projects → credentials → writing → services → profiles → stats → CTA.
- Watch CSS specificity between `.tile` and the per-tile classes (`.hero`, `.cta`).
  The per-tile rule must come *after* `.tile` in the sheet or padding and background
  overrides silently lose.
- The nav is a flex pill, not a fixed header. If you make it sticky, keep the
  `--gap` inset so it never touches the viewport edge.


---

## 7. Page inventory

Five pages, one shared grid. Nav order: Home · About · Work · Writing · Contact.

| Page | Structure |
|---|---|
| `index.html` | The bento home. Every tile now links to a real page. |
| `about.html` | Head → photo (5) + philosophy with stack chips (7) → credentials timeline (12, two columns) → three service tiles (4+4+4) → CTA. |
| `work.html` | Head with filter chips → lead case study (8) + one project (4) → three projects (4+4+4) → CTA. |
| `writing.html` | Head → post list (12) as rows, not tiles → CTA. |
| `contact.html` | Head → form (7) + direct details (5) → "before you write" (12). **No CTA tile** — this page is the CTA. |

**Every row must sum to 12.** This is the rule that breaks most often when tiles get
added later: a 5 + 4 row leaves a ragged right edge that reads as a bug. If a row can't
reach 12, change a span rather than letting it wrap.

**Structural choices worth keeping**
- The writing index is a *list*, not a grid of tiles. Chronological content has one
  axis, so rows with the date in the left gutter are the honest structure. Hover shifts
  the row 8px right instead of lifting it — lists don't float.
- Numbered markers (`01/02/03`) appear only on the contact page's "before you write"
  steps, because that genuinely is a sequence. The credentials timeline uses years
  instead, since the dates carry the information.
- Project eyebrows are `year · role · category`, not decorative labels. The role is the
  part clients actually scan for.

**Still placeholder**
- All project shots are CSS gradients. Apply the same cross-process grade to real
  screenshots or the tiles will look mismatched.
- Company names, dates, metrics, and post titles are invented. Replace all of them.
- The contact form has no action or handler — it is markup only.
- Stats tile on the home page still reads `07 / +125 / +210`.

**Build note:** each page currently inlines the full stylesheet so it opens standalone.
First refactor should be extracting it to `assets/styles.css` and replacing the
base64 portrait with `url("/assets/portrait.webp")`.
