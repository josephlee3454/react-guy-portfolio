import type { MouseEventHandler, ReactNode } from 'react';
import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts, geometry } from '@/theme/tokens';

/*
 * No 'use client' here on purpose.
 *
 * Chip holds no state and calls no hooks, so the module stays neutral: imported
 * from a server component it renders on the server, and imported from a client
 * component it is bundled as client code. That is what makes the `onClick`
 * variant legal — a function prop can only be handed to Chip by a component
 * that is already client-side, and marking this file 'use client' would not
 * change that rule, only move the boundary earlier for every static chip too.
 */

export interface ChipRowProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export interface ChipProps {
  children: ReactNode;
  /** `.chips b.on` — --ink text on an --accent fill. */
  active?: boolean;
  /**
   * Renders the chip as a link.
   *
   * NESTING TRAP: an interactive chip (href or onClick) must never be placed
   * inside a `<Tile href="...">`. That tile renders an `<a>` wrapping its whole
   * surface, and an `<a>` or `<button>` inside an `<a>` is invalid HTML — the
   * browser recovers by closing the outer anchor early, which silently breaks
   * both the click target and tab order. The mockup only ever puts chips inside
   * a link on work.html's project cards, where they are decorative `<b>` tags;
   * keep those as plain (non-interactive) chips.
   */
  href?: string;
  /** Same nesting trap as `href`. Filter chips on work.html are the use case. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

/**
 * `.chips` — styles.css:216. Filter chips on work.html, stack chips on
 * about.html, technology chips inside the project cards.
 */
export const ChipRow = ({ children, sx }: ChipRowProps) => {
  return (
    <Box
      sx={[
        { display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '16px' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

/** `theme.layout.pillRadius`, as a literal so no theme callback is needed. */
const PILL_RADIUS = `${geometry.pill}px`;

/**
 * Matches `theme.transitions.duration.short` (200ms) — the tighter of the two
 * durations, kept for the small hover surfaces.
 */
const HOVER_DURATION = '.2s';

/*
 * A plain object, not a `(theme) => ({...})` callback: Box is a client
 * component and a function prop cannot cross the RSC boundary. Palette values
 * are string paths that MUI resolves internally, and the two literals that a
 * path cannot express (the outline shorthand, the pill radius) come from
 * tokens.ts. See the note in Bento.tsx.
 */
const chipStyles = (active: boolean, interactive: boolean) => ({
  display: 'inline-flex',
  alignItems: 'center',
  // The mono variant is uppercase at .14em; chips are neither (they carry
  // cased product names like "Next.js"), so only the face is borrowed.
  fontFamily: fonts.mono,
  fontWeight: 400,
  fontSize: 11,
  letterSpacing: '0.06em',
  lineHeight: 1.4,
  padding: '6px 12px',
  whiteSpace: 'nowrap' as const,
  textDecoration: 'none',
  borderRadius: PILL_RADIUS,
  border: '1px solid',
  borderColor: active ? 'primary.main' : 'divider',
  backgroundColor: active ? 'primary.main' : 'transparent',
  color: active ? 'primary.contrastText' : 'text.secondary',

  ...(interactive && {
    // <button> resets. Everything else a UA button styles — family, size,
    // weight, tracking, leading, colour, border — is already set above, so
    // the three elements render identically.
    appearance: 'none',
    margin: 0,
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: `color ${HOVER_DURATION} ease, border-color ${HOVER_DURATION} ease, background-color ${HOVER_DURATION} ease`,
    '&:hover': {
      color: active ? 'primary.contrastText' : 'text.primary',
      borderColor: active ? 'primary.light' : 'surface.borderHover',
      ...(active && { backgroundColor: 'primary.light' }),
    },
    // The global ring in components.ts forces border-radius:8px, which reads
    // as a rounded rectangle around a pill. Restated here at the pill radius.
  }),
});

export const Chip = ({ children, active = false, href, onClick, sx }: ChipProps) => {
  const interactive = Boolean(href) || Boolean(onClick);

  if (process.env.NODE_ENV !== 'production' && active && !interactive) {
    console.warn(
      '[Chip] `active` was set on a chip with no `href` or `onClick`. An active ' +
        'state the user has no way to change is almost always a mistake — either ' +
        'wire the chip up, or drop `active` and let it render as plain text.',
    );
  }

  const styles = [chipStyles(active, interactive), ...(Array.isArray(sx) ? sx : [sx])];

  if (href) {
    return (
      <Box component={AppLink} href={href} sx={styles}>
        {children}
      </Box>
    );
  }

  if (onClick) {
    return (
      <Box component="button" type="button" aria-pressed={active} onClick={onClick} sx={styles}>
        {children}
      </Box>
    );
  }

  // The mockup's `<b>`. Non-interactive, so a <span> — <b> would carry an
  // unwanted "stylistically offset" semantic that screen readers may announce.
  return (
    <Box component="span" sx={styles}>
      {children}
    </Box>
  );
};
