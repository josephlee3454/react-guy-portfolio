# Reference mockup — read this before building

This folder is a **design reference, not the codebase.** Do not edit these files and do
not copy them into the app directory. Build the real site separately, using this as the
target to match.

## Read in this order

1. `DESIGN_SPEC.md` — tokens, grid map, tile inventory, copy decisions. **This is the
   source of truth.** If the spec and the HTML disagree, the spec wins.
2. `assets/styles.css` — the actual values. Copy the `:root` block verbatim.
3. Individual pages, only when implementing that page.

## Important

- These are static HTML mockups with no build step, no framework, and no interactivity
  beyond CSS hover. They show *what it should look like*, not how to structure the app.
- **You cannot see these render.** Reading the HTML tells you the DOM and the classes;
  it does not tell you whether the result looks right. Ask me to check the browser
  before assuming a layout works.
- Content on index / about / work / contact is **real** (Joseph Lee, Amazon Alexa,
  Alphaledger). Do not rewrite or embellish it. Employment dates are still missing and
  are marked on-page — do not invent them.
- `testimonials.html` and `writing.html` are **entirely fabricated placeholder content.**
- `assets/portrait.jpg` is the real photo, already colour-graded. Use it as-is; convert
  to WebP but do not re-filter it.

## Rules that break easily

- **Tokens are semantic.** Never write a literal colour in a rule; never reintroduce a
  name like `--tile` or `--ink`. Theme lives entirely in the `[data-theme="light"]` block.
- **`--accent` is for fills, `--accent-ink` is for text.** Accent-coloured text using
  `--accent` fails contrast in light mode.
- **Every bento row must sum to 12 columns.** A 5+4 row leaves a ragged right edge.
  If a new tile won't fit, change a span rather than letting it wrap.
- Text on the amber accent is `--ink`, never white. White on `#FF7A18` fails contrast.
- Tile `h2` needs `padding-right: 52px` to clear the corner arrow.
- Per-tile classes must come *after* `.tile` in the stylesheet or their overrides lose.

## Known gaps to fix in the real build

- Project thumbnails are CSS gradients. Real screenshots need the same cross-process
  grade or the tiles will look mismatched.
- The contact form is markup only — no action, no handler, no validation.
- The stats tile still reads `07 / +125 / +210`. Confirm real numbers or delete the tile.
- Nav has no mobile menu below 1000px; the links are simply hidden. Six items now — this
  needs a real menu, not just `display:none`.
- The theme toggle does not persist. Store the choice and apply it before first paint.
- **Every testimonial on `testimonials.html` is fabricated placeholder text.** Do not
  present it as real, do not reuse it elsewhere, and flag it if asked to publish.
