# Portfolio — Design Spec

Layout reference: a single-screen **bento grid** personal portfolio. Every section is a
rounded tile on one grid; there is no long vertical scroll of full-width bands.
Tiles are links to sub-pages, not content containers.

Visual reference file: `portfolio-mockup.html` (open it in a browser).

---

## 1. Design tokens

```css
/* dark (default) */
--bg:#0F1211;  --surface:#181C1B;  --surface-2:#1F2422;  --border:#2C3331;
--text:#F0EDE4;  --text-muted:#8E948E;
--accent:#FF7A18;      /* fill only  */
--accent-soft:#FF8C38;
--accent-ink:#FF7A18;  /* accent used as TEXT */
--on-accent:#14181A;   /* text on an accent fill */

/* the hero tile is dark in both themes */
--hero-bg:#141817;  --hero-text:#F0EDE4;  --hero-muted:#9AA09A;

/* light — overrides only */
[data-theme="light"]{
  --bg:#EFEBE1;  --surface:#FBF9F4;  --surface-2:#E6E1D4;  --border:#DAD3C2;
  --text:#171A18;  --text-muted:#6A6E67;
  --accent-ink:#B84E08;
}
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

## 4. Content status

All content on index / about / work / contact comes from Joseph's CV. Verified and
final unless he says otherwise.

**Positioning: full stack, evenly weighted.** Not "backend engineer who can do frontend."
The About headline is *Both halves, on purpose*, the stack section leads with Frontend,
and the work page is deliberately balanced — two frontend-led projects, three backend.
Do not reorder these to put backend first; it was a specific instruction.

**Facts**
- Joseph Lee, Seattle WA · joseph.lee3454@gmail.com · linkedin.com/in/joseph-lee-600599b9
- Alphaledger, Poulsbo WA, May 2024–present. Software Developer. Enterprise blockchain
  for municipal bond issuance and trading. NestJS GraphQL (schema, resolvers, mutations,
  DataLoaders), PostgreSQL design and tuning, React with AG Grid / AG Charts / Material UI,
  frontend review and pairing, React Native app concept→launch **on an Agile team**.
- Amazon (Alexa), Seattle WA, May 2021–Jan 2024. Software Developer. Java on Lambda behind
  API Gateway with S3, CloudWatch, IAM. DynamoDB design for secure storage of sensitive
  data behind voice auth, plus the fraud/integrity audit system. Alexa skills with LLM
  integration for Verizon and T-Mobile.
- U.S. Marine Corps, Camp Pendleton, Jul 2011–Jul 2015. Vehicle Commander / Team Leader.
- Code Fellows, Coding Dojo, Amazon Apprenticeship. No CS degree — stated plainly on the
  About page rather than hidden.
- Military awards: Meritorious Mast (Camp Pendleton, CA), Certificate of Commendation
  (Afghanistan), Certificate of Appreciation (Yemen). Amazon hackathon accolade
  (ML-powered Alexa skill) sits with education, not the military tile.

**Chip emphasis is a deliberate choice, not a ranking of experience.** Filled = what he'd
lead with today; outlined = used regularly, not headline. Java is outlined despite three
years at Amazon, because current work is Node/Nest. AG Grid is outlined and Material UI
filled. Do not "correct" these by weighting years of experience.

**Phrasing that must not drift**
- The React Native app was **concept to launch on an Agile team** — never "solo",
  "on my own", or "by myself".
- Alphaledger title is **Software Developer**. "Full stack engineer" is the site's
  positioning line, not a claimed job title.

**Still missing**
- GitHub handle. Marked `⚠ ADD HANDLE` on the contact page and the `GH` chip is dead.
  This is the highest-value remaining gap for an engineering role.
- Real project screenshots; all five are gradient placeholders.

**Deliberately omitted**
- Phone number — fine on a CV sent to named recipients, bad on an indexed page.

**Fabricated — must not ship**
- Every quote on `testimonials.html`, every post on `writing.html`.

