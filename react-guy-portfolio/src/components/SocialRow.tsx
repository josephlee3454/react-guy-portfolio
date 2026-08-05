import AppLink from './AppLink';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts, tokens } from '@/theme/tokens';

export interface SocialItem {
  /** Two or three characters — "GH", "LI", "X", "IG". Also the accessible name. */
  label: string;
  /**
   * Optional, and deliberately so.
   *
   * NESTING TRAP: on index.html this row sits inside the profiles tile, which
   * is itself a link. An `<a>` inside an `<a>` is invalid HTML — the browser
   * closes the outer anchor at the inner one, breaking the tile's click target
   * and its tab order. So inside a `<Tile href="...">`, pass items with no
   * `href` and they render as non-interactive `<span>`s (exactly what the
   * mockup does there). Only pass `href` where the row stands on its own, as
   * on contact.html.
   */
  href?: string;
}

export interface SocialRowProps {
  items: SocialItem[];
  sx?: SxProps<Theme>;
}

/**
 * Matches `theme.transitions.duration.short` (200ms), as a literal so this
 * stays a plain object.
 */
const HOVER_DURATION = '.2s';

/*
 * A plain object, not a `(theme) => ({...})` callback — Box is a client
 * component and a function prop cannot cross the RSC boundary. Palette values
 * are string paths MUI resolves internally; the outline shorthand needs a real
 * colour, so it takes the literal from tokens.ts. See the note in Bento.tsx.
 */
const chipStyles = (interactive: boolean) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1px solid',
  borderColor: 'divider',
  display: 'grid',
  placeItems: 'center',
  fontFamily: fonts.mono,
  fontSize: 11,
  color: 'text.secondary',
  textDecoration: 'none',
  ...(interactive && {
    transition: `color ${HOVER_DURATION} ease, border-color ${HOVER_DURATION} ease`,
    '&:hover': {
      color: 'text.primary',
      borderColor: 'surface.lineHover',
    },
    // The global focus ring squares the pill off at border-radius:8px.
    '&:focus-visible': {
      outline: `2px solid ${tokens.accent}`,
      outlineOffset: 2,
      borderRadius: '50%',
    },
  }),
});

/**
 * `.social-row` — styles.css:129. Four 36px circular chips: 1px border, no
 * fill, mono 11px.
 *
 * `margin-bottom: auto` is load-bearing, not spacing: the tile is a flex column
 * with `justify-content: flex-end`, so without it the row would sink to the
 * bottom with the heading. The auto margin absorbs the free space and pins the
 * row to the top of the tile.
 */
export default function SocialRow({ items, sx }: SocialRowProps) {
  return (
    <Box
      component="ul"
      sx={[
        {
          display: 'flex',
          gap: '8px',
          listStyle: 'none',
          margin: 0,
          marginBottom: 'auto',
          padding: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item) => (
        <Box component="li" key={item.label} sx={{ display: 'flex' }}>
          {item.href ? (
            <Box component={AppLink} href={item.href} sx={chipStyles(true)}>
              {item.label}
            </Box>
          ) : (
            <Box component="span" sx={chipStyles(false)}>
              {item.label}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
