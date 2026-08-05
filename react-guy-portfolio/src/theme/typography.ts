// v9 does not expose the `styles/createTypography` subpath in its exports map.
// `TypographyVariantsOptions` is the public equivalent, re-exported from the root.
import type { TypographyVariantsOptions } from '@mui/material/styles';
import { fonts } from './tokens';

/** Bricolage Grotesque — h1, tile h2, stat numbers, marquee. */
const display = { fontFamily: fonts.display } as const;

/**
 * IBM Plex Mono — eyebrows, stat labels, footer.
 * Spec §1: always uppercase, never used for more than four words.
 * That last rule can't be expressed in a theme; enforce it in the Eyebrow
 * component with a dev-only length guard.
 */
const mono = {
  fontFamily: fonts.mono,
  fontWeight: 400,
  textTransform: 'uppercase' as const,
  color: 'var(--mui-palette-text-secondary)',
};

export const typography: TypographyVariantsOptions = {
  fontFamily: fonts.body,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  // Bricolage 800 is the heaviest face in the system.
  fontWeightBold: 800,

  // ---------- display ----------
  /**
   * Hero tile only.
   * SPEC-OVER-CSS: spec §1 says letter-spacing -.03em; styles.css:106 says
   * -.035em. Using the spec value.
   */
  h1: {
    ...display,
    fontWeight: 800,
    fontSize: 'clamp(38px, 5vw, 66px)',
    lineHeight: 0.94,
    letterSpacing: '-0.03em',
  },
  /** Inner-page <h1>: about / work / writing / contact. */
  pageTitle: {
    ...display,
    fontWeight: 800,
    fontSize: 'clamp(40px, 6vw, 84px)',
    lineHeight: 0.92,
    letterSpacing: '-0.03em',
  },
  /** Every tile heading. Needs padding-right:52px to clear the corner arrow. */
  h2: {
    ...display,
    fontWeight: 600,
    fontSize: 'clamp(24px, 2.4vw, 34px)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
  },
  /** Project cards, post rows. */
  h3: {
    ...display,
    fontWeight: 600,
    fontSize: 'clamp(19px, 1.9vw, 27px)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  /** Credentials timeline entries. */
  h4: {
    ...display,
    fontWeight: 600,
    fontSize: 19,
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
  },
  statNumber: {
    ...display,
    fontWeight: 800,
    fontSize: 'clamp(30px, 3.4vw, 46px)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
  },
  marquee: {
    ...display,
    fontWeight: 600,
    fontSize: 'clamp(20px, 2.4vw, 32px)',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
  },

  // ---------- body ----------
  /** Page lede. */
  subtitle1: { fontSize: 16, lineHeight: 1.65, color: 'var(--mui-palette-text-secondary)' },
  /** Hero bio, form inputs. 15px is the spec's accessibility floor. */
  body1: { fontSize: 15, lineHeight: 1.6 },
  /** Card, post, and timeline copy. */
  body2: { fontSize: 14, lineHeight: 1.6, color: 'var(--mui-palette-text-secondary)' },
  button: { fontSize: 14, fontWeight: 500, textTransform: 'none', letterSpacing: 0 },

  // ---------- utility ----------
  /**
   * SPEC-OVER-CSS: spec §1 gives the whole mono role .14em; styles.css:70
   * sets .eyebrow to .16em. Using the spec value so all three mono variants
   * share one tracking.
   */
  eyebrow: { ...mono, fontSize: 11, letterSpacing: '0.14em', lineHeight: 1.2 },
  /** Stat labels and contact-form field labels. */
  statLabel: { ...mono, fontSize: 10, letterSpacing: '0.14em', lineHeight: 1.7 },
  /** Footer, dates, status text. */
  mono: { ...mono, fontSize: 11, letterSpacing: '0.14em', lineHeight: 1.4 },
};
