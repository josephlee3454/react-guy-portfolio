/**
 * Single source of truth for the design system.
 *
 * Every colour and geometry literal in the app originates here. The MUI palette
 * (theme/index.ts) and the CSS custom properties injected into :root
 * (theme/components.ts) are both derived from this file — neither derives from
 * the other, so a re-theme is a one-file edit.
 *
 * Derived from `design 2/DESIGN_SPEC.md` and `design 2/assets/styles.css`,
 * which are read-only reference. Where the two disagree the spec wins, per
 * `design 2/README-FOR-CLAUDE.md`. Those cases are marked SPEC-OVER-CSS below.
 */

export const tokens = {
  /** page background — warm-black shifted green, sits under the photo's teal */
  ink: '#0F1211',
  /** default tile fill */
  tile: '#181C1B',
  /** raised tile fill (marquee, post-row hover) */
  tile2: '#1F2422',
  /** 1px tile borders */
  line: '#2C3331',
  /**
   * Tile border on hover.
   * SPEC-OVER-CSS: spec §3 says #4A4438 (warm brown); styles.css:67 says
   * #46504C (green-grey, consistent with --line's hue). Using the spec value.
   */
  lineHover: '#4A4438',
  /** primary text */
  bone: '#F0EDE4',
  /**
   * Eyebrows, body copy, footer.
   * Tightest contrast pair in the system: #8E948E on --tile is 5.58:1.
   * Passes AA at the spec's 15px body floor. Do not darken.
   */
  muted: '#8E948E',
  /** amber — CTA fill, underlines, hover arrow */
  accent: '#FF7A18',
  /** accent hover */
  accentSoft: '#FF8C38',
} as const;

/**
 * The cobalt fallback documented in spec §1. To switch schemes, replace
 * `accent`/`accentSoft` above with these and flip `primary.contrastText`
 * in theme/index.ts from `tokens.ink` to '#fff'.
 */
export const cobaltFallback = { accent: '#1F3BFF', accentSoft: '#2A44FF' } as const;

export const geometry = {
  /** tile radius */
  radius: 26,
  /** grid gap AND page padding — the same value everywhere */
  gap: 14,
  /** tile inner padding — exactly 2 x gap */
  pad: 28,
  /** tile radius below 620px */
  radiusSm: 20,
  /** tile inner padding below 620px */
  padSm: 22,
  /** corner arrow diameter */
  arrow: 44,
  /** corner arrow on the CTA tile only */
  arrowLarge: 64,
  /** nav pill and chip radius */
  pill: 999,
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
 * spec's threshold plus one. `down('md')` -> max-width:1000.95px, which matches
 * the mockup's `@media (max-width:1000px)` for every real device width.
 *
 * `lg`/`xl` are parked above any real viewport so an accidental `up('lg')`
 * is a no-op rather than a silent third breakpoint.
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
 * The mockup's :root block, generated rather than hand-copied.
 * Injected by MuiCssBaseline so components can read `var(--r)` etc.
 */
export const rootCssVars: Record<string, string> = {
  '--ink': tokens.ink,
  '--tile': tokens.tile,
  '--tile-2': tokens.tile2,
  '--line': tokens.line,
  '--line-hover': tokens.lineHover,
  '--bone': tokens.bone,
  '--muted': tokens.muted,
  '--accent': tokens.accent,
  '--accent-soft': tokens.accentSoft,
  '--r': `${geometry.radius}px`,
  '--gap': `${geometry.gap}px`,
  '--pad': `${geometry.pad}px`,
};

/**
 * Redefined at <=620px only.
 *
 * Radius and padding shift responsively, which a scalar `theme.shape.borderRadius`
 * cannot express. Redefining the two vars at :root updates every surface at once
 * instead of forcing six components to each carry a duplicate media query.
 */
export const rootCssVarsCompact: Record<string, string> = {
  '--r': `${geometry.radiusSm}px`,
  '--pad': `${geometry.padSm}px`,
};
