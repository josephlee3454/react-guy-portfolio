'use client';

import type { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';
import { breakpointValues, columns, geometry, tokens } from './tokens';
import { typography } from './typography';
import { components } from './components';

/*
 * Module augmentation lives here rather than in a bare .d.ts. A declaration
 * file containing `declare module '@mui/material/styles'` with no imports is
 * treated as ambient and can silently fail to merge under
 * `moduleResolution: bundler`.
 */
declare module '@mui/material/styles' {
  interface SurfaceColors {
    /** --tile-2: marquee and post-row hover fill */
    raised: string;
    /** tile border on hover */
    lineHover: string;
  }
  interface Palette {
    surface: SurfaceColors;
  }
  interface PaletteOptions {
    surface?: SurfaceColors;
  }

  interface LayoutTokens {
    /** var(--r) — 26px, drops to 20px at <=620px */
    radius: string;
    /** var(--pad) — 28px, drops to 22px at <=620px */
    padding: string;
    /** var(--gap) — grid gap and page padding */
    gap: string;
    pillRadius: string;
    arrowSize: number;
    /** CTA tile only */
    arrowSizeLarge: number;
    columns: { desktop: number; tablet: number; mobile: number };
    marqueeDuration: string;
    /** tile hover lift */
    lift: string;
  }
  interface Theme {
    layout: LayoutTokens;
  }
  interface ThemeOptions {
    layout?: LayoutTokens;
  }

  interface TypographyVariants {
    pageTitle: CSSProperties;
    eyebrow: CSSProperties;
    mono: CSSProperties;
    statNumber: CSSProperties;
    statLabel: CSSProperties;
    marquee: CSSProperties;
  }
  interface TypographyVariantsOptions {
    pageTitle?: CSSProperties;
    eyebrow?: CSSProperties;
    mono?: CSSProperties;
    statNumber?: CSSProperties;
    statLabel?: CSSProperties;
    marquee?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    eyebrow: true;
    mono: true;
    statNumber: true;
    statLabel: true;
    marquee: true;
  }
}

/**
 * `cssVariables` is deliberately NOT enabled.
 *
 * It would emit a second parallel custom-property system (--mui-palette-* )
 * carrying the same values as the design's own --ink/--tile/--r, which is the
 * exact duplication this theme is structured to avoid. Its real benefit is
 * flicker-free colour-scheme switching, and this site has one scheme.
 */
export const theme = createTheme({
  breakpoints: { values: breakpointValues },
  // spacing(1) = 14px = --gap;  spacing(2) = 28px = --pad.
  // The spec's "--pad is exactly 2x gap" becomes a property of the scale.
  spacing: geometry.gap,
  // For MUI's own popovers and menus, which are not design surfaces and
  // never need the responsive shift that var(--r) provides.
  shape: { borderRadius: geometry.radius },
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.accent,
      light: tokens.accentSoft,
      dark: tokens.accent,
      // Spec §1: text on the amber is --ink, never white.
      // #0F1211 on #FF7A18 is 7.18:1; white on it is 2.63:1.
      // Pinning this makes every primary-coloured surface correct by default.
      contrastText: tokens.ink,
    },
    background: { default: tokens.ink, paper: tokens.tile },
    divider: tokens.line,
    text: { primary: tokens.bone, secondary: tokens.muted, disabled: tokens.dim },
    surface: { raised: tokens.tile2, lineHover: tokens.lineHover },
  },
  layout: {
    radius: 'var(--r)',
    padding: 'var(--pad)',
    gap: 'var(--gap)',
    pillRadius: `${geometry.pill}px`,
    arrowSize: geometry.arrow,
    arrowSizeLarge: geometry.arrowLarge,
    columns,
    marqueeDuration: '26s',
    lift: '-3px',
  },
  transitions: {
    // .25s ease / .2s ease in the mockup
    duration: { standard: 250, short: 200 },
    easing: { easeInOut: 'ease' },
  },
  typography,
  components,
});

export default theme;
