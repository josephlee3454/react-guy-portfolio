import type { Components, Theme } from '@mui/material/styles';
import { geometry, rootCssVars, rootCssVarsCompact } from './tokens';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      ':root': {
        ...rootCssVars,
        colorScheme: 'dark',
      },
      [theme.breakpoints.down('sm')]: {
        ':root': rootCssVarsCompact,
      },

      '*, *::before, *::after': { boxSizing: 'border-box' },
      'html, body': { margin: 0, padding: 0 },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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

      // Spec §5: a focus ring on every link. next/link renders a bare <a>,
      // so this targets elements rather than MUI classes.
      'a:focus-visible, button:focus-visible, [tabindex]:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 3,
        borderRadius: 8,
      },
      'a:focus:not(:focus-visible)': { outline: 'none' },

      '::selection': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },

      img: { maxWidth: '100%', display: 'block' },

      // Spec §5: kills the marquee and all transitions.
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
   * collapses --tile and --tile-2 toward each other.
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
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 3,
          borderRadius: 8,
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
        '&:hover': { backgroundColor: theme.palette.primary.light },
      }),
    },
  },

  // Contact page. The design puts a mono label above each field, so MUI's
  // floating label is not used.
  MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 12,
        fontSize: 15,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.surface.lineHover,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.Mui-focused': {
          outline: `2px solid ${theme.palette.primary.main}`,
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
