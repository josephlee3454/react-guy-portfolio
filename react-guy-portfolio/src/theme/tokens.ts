/**
 * Single source of truth for the design system.
 *
 * Tokens are SEMANTIC, not literal — `surface`, not `tile`; `text`, not `bone`
 * (DESIGN_SPEC §8). That is the whole reason a theme flip is one block of values
 * instead of a rewrite. Never reintroduce a colour-named token.
 *
 * Derived from `design 3/DESIGN_SPEC.md` and `design 3/assets/styles.css`, which
 * are read-only reference. Where the two disagree the spec wins, per
 * `design 3/README-FOR-CLAUDE.md`.
 *
 * NOTE ON THE MOCKUP: styles.css uses `var(--line)` in 13 places but never
 * defines it — the rename to `--border` was left half-finished, so those borders
 * are invalid there. The spec defines `--border`; that is what `border` below is.
 */

/** Values shared by both colour schemes. */
export const shared = {
  /** Fill only. Works on both schemes because text on it is always `onAccent`. */
  accent: '#FF7A18',
  accentSoft: '#FF8C38',
  /** Text sitting ON an accent fill. Near-black, never white. */
  onAccent: '#14181A',

  /*
   * The hero tile stays dark in BOTH schemes (spec §8). The portrait is a
   * cross-processed photo with teal shadows; on a pale tile it reads as a heavy
   * rectangle pasted onto paper and the bottom fade-to-surface stops working.
   * `.about-photo` gets the same treatment.
   */
  heroBg: '#141817',
  heroBorder: '#242A28',
  heroText: '#F0EDE4',
  heroMuted: '#9AA09A',
} as const;

export const dark = {
  bg: '#0F1211',
  surface: '#181C1B',
  surface2: '#1F2422',
  border: '#2C3331',
  text: '#F0EDE4',
  textMuted: '#8E948E',
  /**
   * The accent used AS TEXT — brand period, the `<em>` in headings, the marquee
   * star. Identical to the fill on dark; see `light.accentInk` for why it moves.
   */
  accentInk: '#FF7A18',
  /** Tile border on hover. */
  borderHover: '#46504C',
  /** Dimmed text: marquee inactive words, image-placeholder labels. */
  dim: '#5E6663',
} as const;

export const light = {
  bg: '#EFEBE1',
  surface: '#FBF9F4',
  surface2: '#E6E1D4',
  border: '#DAD3C2',
  text: '#171A18',
  textMuted: '#6A6E67',
  /**
   * Darkened from the fill colour. #FF7A18 as text on a pale background reaches
   * only ~2.3:1; #B84E08 clears 4.5:1. Using `accent` for text is the single
   * easiest way to fail contrast in this design (spec §8).
   */
  accentInk: '#B84E08',
  borderHover: '#B9B09A',
  /**
   * The mockup hardcodes #5E6663 for this in both schemes (styles.css:142, 176,
   * 256), which is a dark-scheme value — on `light.surface` it reads as ordinary
   * body text rather than a dimmed label, losing the distinction from
   * `textMuted`. Lightened here to sit between `textMuted` and `border`.
   */
  dim: '#A5A091',
} as const;

export const geometry = {
  /** Tile radius. */
  radius: 26,
  /** Grid gap AND page padding — the same value everywhere. */
  gap: 14,
  /** Tile inner padding — exactly 2 x gap. */
  pad: 28,
  /** Tile radius below 620px. */
  radiusSm: 20,
  /** Tile inner padding below 620px. */
  padSm: 22,
  /** Corner arrow diameter. */
  arrow: 44,
  /** Corner arrow on the CTA tile only. */
  arrowLarge: 64,
  /** Nav pill, chip, and theme-toggle radius. */
  pill: 999,
  /** Tile hover lift. */
  lift: '-3px',
  /** Standard transition, matching the mockup's .25s ease. */
  duration: '.25s',
} as const;

export const fonts = {
  display: 'var(--display), system-ui, sans-serif',
  body: 'var(--body), system-ui, sans-serif',
  mono: 'var(--mono), ui-monospace, monospace',
} as const;

/**
 * The design has exactly two breakpoints: <=1000px and <=620px.
 *
 * MUI's `down(key)` emits `max-width: (value - 0.05)px`, so each value is the
 * spec's threshold plus one. `lg`/`xl` are parked above any real viewport so an
 * accidental `up('lg')` is a no-op rather than a silent third breakpoint.
 */
export const breakpointValues = {
  xs: 0,
  sm: 621,
  md: 1001,
  lg: 1441,
  xl: 1921,
} as const;

/** Column count per breakpoint band. Tiles must never hardcode these. */
export const columns = { desktop: 12, tablet: 6, mobile: 1 } as const;

/**
 * Non-colour custom properties, injected once at :root.
 *
 * Colours are NOT here — they come from MUI's colour-scheme variables, which
 * switch automatically. Only geometry lives as raw CSS vars, because `--r` and
 * `--pad` shift responsively and a JS scalar cannot express that.
 */
export const rootCssVars: Record<string, string> = {
  '--r': `${geometry.radius}px`,
  '--gap': `${geometry.gap}px`,
  '--pad': `${geometry.pad}px`,
};

/** Redefined at <=620px only. */
export const rootCssVarsCompact: Record<string, string> = {
  '--r': `${geometry.radiusSm}px`,
  '--pad': `${geometry.padSm}px`,
};
