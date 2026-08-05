'use client';

import type { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { breakpointValues, columns, dark, geometry, light, shared } from './tokens';
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
    /** --surface-2: marquee, post-row hover, light-mode form fields */
    raised: string;
    /** Tile border on hover */
    borderHover: string;
  }
  interface HeroColors {
    bg: string;
    border: string;
    text: string;
    muted: string;
  }
  interface Palette {
    surface: SurfaceColors;
    hero: HeroColors;
    /** The accent used AS TEXT. Never use primary.main for text — see tokens.ts. */
    accentInk: string;
  }
  interface PaletteOptions {
    surface?: SurfaceColors;
    hero?: HeroColors;
    accentInk?: string;
  }

  interface LayoutTokens {
    radius: string;
    padding: string;
    gap: string;
    pillRadius: string;
    arrowSize: number;
    arrowSizeLarge: number;
    columns: { desktop: number; tablet: number; mobile: number };
    marqueeDuration: string;
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

const heroPalette = {
  bg: shared.heroBg,
  border: shared.heroBorder,
  text: shared.heroText,
  muted: shared.heroMuted,
};

const accentPalette = {
  main: shared.accent,
  light: shared.accentSoft,
  dark: shared.accent,
  /*
   * Spec §1 and §3: text on the amber is near-black, never white.
   * #14181A on #FF7A18 is 6.9:1; white on it is 2.6:1. Pinning this makes every
   * primary-coloured surface correct by default instead of by discipline.
   */
  contrastText: shared.onAccent,
};

/**
 * `cssVariables` IS enabled here, and that is a reversal.
 *
 * With one colour scheme it only bought a second parallel var system carrying
 * duplicate values, so it was off. With two schemes it is the mechanism: MUI
 * emits both palettes as custom properties and swaps them at the selector, so
 * every `sx={{ color: 'text.secondary' }}` in the app follows the active scheme
 * with no component change and no re-render.
 *
 * `colorSchemeSelector: 'media'` makes that swap a pure `@media
 * (prefers-color-scheme: light)` block. Consequences, all of them wanted here:
 *
 *   - Detection is the browser's, so there is no flash and no blocking script.
 *   - `defaultColorScheme: 'dark'` is what `:root` gets, so a browser that
 *     reports no preference — or does not support the query at all — lands on
 *     dark, which is the requested fallback.
 *   - There is no in-session toggle. The mockup has one; adding it
 *     means switching this to 'class' and storing the choice. See the note in
 *     ThemeRegistry.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: {
      palette: {
        primary: accentPalette,
        background: { default: dark.bg, paper: dark.surface },
        divider: dark.border,
        text: { primary: dark.text, secondary: dark.textMuted, disabled: dark.dim },
        surface: { raised: dark.surface2, borderHover: dark.borderHover },
        hero: heroPalette,
        accentInk: dark.accentInk,
      },
    },
    light: {
      palette: {
        primary: accentPalette,
        background: { default: light.bg, paper: light.surface },
        divider: light.border,
        text: { primary: light.text, secondary: light.textMuted, disabled: light.dim },
        surface: { raised: light.surface2, borderHover: light.borderHover },
        hero: heroPalette,
        accentInk: light.accentInk,
      },
    },
  },
  breakpoints: { values: breakpointValues },
  // spacing(1) = 14px = the grid gap;  spacing(2) = 28px = tile padding.
  // The spec's "pad is exactly 2x gap" becomes a property of the scale.
  spacing: geometry.gap,
  // For MUI's own popovers and menus, which are not design surfaces and never
  // need the responsive shift that var(--r) provides.
  shape: { borderRadius: geometry.radius },
  layout: {
    radius: 'var(--r)',
    padding: 'var(--pad)',
    gap: 'var(--gap)',
    pillRadius: `${geometry.pill}px`,
    arrowSize: geometry.arrow,
    arrowSizeLarge: geometry.arrowLarge,
    columns,
    marqueeDuration: '26s',
    lift: geometry.lift,
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
