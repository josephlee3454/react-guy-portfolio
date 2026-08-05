import type { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { geometry, rootCssVars, rootCssVarsCompact } from './tokens';

/*
 * Read colours through `theme.vars.palette.*`, never `theme.palette.*`.
 *
 * With colorSchemes configured, `theme.palette.X` returns the DEFAULT scheme's
 * literal value — a hex that is baked in and never changes. `theme.vars.palette.X`
 * returns `var(--mui-palette-X)`, which is what actually follows the active
 * scheme. Getting this wrong pins the styled element to dark while every
 * `sx={{ color: 'text.primary' }}` elsewhere flips, which shows up as light text
 * on light tiles.
 */

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      /*
       * Geometry only. `colorScheme` is emitted by MUI's colour-scheme machinery
       * (cssVariables + colorSchemes), so setting it here would pin the whole
       * document to dark and defeat the media query.
       */
      ':root': rootCssVars,
      [theme.breakpoints.down('sm')]: {
        ':root': rootCssVarsCompact,
      },

      '*, *::before, *::after': { boxSizing: 'border-box' },
      'html, body': { margin: 0, padding: 0 },

      body: {
        backgroundColor: theme.vars.palette.background.default,
        color: theme.vars.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        // --gap is the page padding as well as the grid gap
        padding: theme.spacing(1),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },

      // Declared globally so the reduced-motion block below can neutralise the
      // marquee without the marquee component knowing about it.
      '@keyframes marquee-slide': { to: { transform: 'translateX(-50%)' } },

      // A focus ring on every link. next/link renders a bare <a>,
      // so this targets elements rather than MUI classes.
      'a:focus-visible, button:focus-visible, [tabindex]:focus-visible': {
        /*
         * No `borderRadius` here. It would apply to the focused ELEMENT, not to
         * the outline — every tile would snap from var(--r) to 8px on focus, and
         * the nav pill from 999px. Browsers already draw `outline` following the
         * element's own radius, so a ring on a pill, a circle and a 26px tile
         * are all correct with nothing per-component.
         */
        outline: `2px solid ${theme.vars.palette.accentInk}`,
        outlineOffset: 3,
      },
      'a:focus:not(:focus-visible)': { outline: 'none' },

      '::selection': {
        background: theme.vars.palette.primary.main,
        color: theme.vars.palette.primary.contrastText,
      },

      img: { maxWidth: '100%', display: 'block' },

      // Honours prefers-reduced-motion: kills the marquee and all transitions.
      // Clamping durations rather than setting `animation:none` avoids
      // cancelling animationend listeners; the 26s marquee still stops dead.
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
          scrollBehavior: 'auto !important',
        },
      },
    }),
  },

  /**
   * MUI paints a white-alpha gradient over dark-mode surfaces, one step per
   * elevation. Left on, it lightens every tile above its token value and
   * collapses `surface` and `surface.raised` toward each other.
   */
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: { root: { backgroundImage: 'none' } },
  },

  MuiLink: {
    defaultProps: { underline: 'none', color: 'inherit' },
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['color', 'border-color']),
        '&:focus-visible': {
          outline: `2px solid ${theme.vars.palette.accentInk}`,
          outlineOffset: 3,
        },
      }),
    },
  },

  // Spec §3: the rotating corner arrow is the one recurring motion signature.
  // Ripples would be a second one.
  MuiButtonBase: { defaultProps: { disableRipple: true } },

  MuiButton: {
    defaultProps: { disableElevation: true, variant: 'contained' },
    styleOverrides: {
      root: { borderRadius: geometry.pill, padding: '12px 22px' },
      contained: ({ theme }) => ({
        '&:hover': { backgroundColor: theme.vars.palette.primary.light },
        /*
         * `.submit[disabled]{opacity:.55;cursor:not-allowed}` (styles.css:464)
         * — the contact form's in-flight state.
         *
         * MUI's default swaps the fill for `action.disabledBackground` and the
         * label for `action.disabled`, which greys the amber out entirely. The
         * design just fades it, so the resting colours are restated here; the
         * button stays recognisably the same control while it is sending.
         *
         * `pointerEvents: 'auto'` is what lets `cursor` render at all — MUI
         * sets `pointer-events: none` on a disabled button, and a cursor cannot
         * show on an element that ignores the pointer. It cannot resurrect the
         * hover fill: this block sits after `&:hover`, both selectors weigh the
         * same, so source order settles it in favour of the disabled colours.
         */
        '&.Mui-disabled': {
          opacity: 0.55,
          cursor: 'not-allowed',
          pointerEvents: 'auto',
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
        },
      }),
    },
  },

  // Contact page. The design puts a mono label above each field, so MUI's
  // floating label is not used.
  MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.vars.palette.background.default,
        // Spec §1's light overrides put --bg and --surface close enough
        // together that a field filled with the page background disappears
        // into the tile. surface-2 keeps the input readable as an input.
        ...theme.applyStyles('light', {
          backgroundColor: theme.vars.palette.surface.raised,
        }),
        borderRadius: 12,
        fontSize: 15,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.vars.palette.divider },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.surface.borderHover,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.Mui-focused': {
          outline: `2px solid ${theme.vars.palette.accentInk}`,
          outlineOffset: 2,
        },
      }),
      input: { padding: '14px 16px' },
    },
  },

  // Without this the custom variants would all render as <span>.
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        pageTitle: 'h1',
        eyebrow: 'p',
        mono: 'span',
        statNumber: 'b',
        statLabel: 'small',
        marquee: 'p',
      },
    },
  },
};
