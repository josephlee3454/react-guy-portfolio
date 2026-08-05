import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts } from '@/theme/tokens';

export interface SocialItem {
  /** Two or three characters — "GH", "LI", "X", "IG". Also the accessible name. */
  label: string;
  /**
   * Only honoured when the row is `interactive`. Ignored otherwise, so an href
   * can never turn into an anchor nested inside a linked tile by accident.
   */
  href?: string;
}

export interface SocialRowProps {
  items: SocialItem[];
  /**
   * Render the chips as links. Defaults to FALSE, which is the safe case.
   *
   * The default is off rather than on because the failure it prevents is not
   * loud: an `<a>` inside an `<a>` produces valid-looking JSX, renders fine on
   * the server, and only breaks once the browser repairs the DOM and React
   * finds the tree it hydrated no longer matches. Opting in makes the one
   * standalone usage explicit and keeps every nested one correct by default.
   */
  interactive?: boolean;
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
      borderColor: 'surface.borderHover',
    },
    // The global focus ring squares the pill off at border-radius:8px.
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
export const SocialRow = ({ items, interactive = false, sx }: SocialRowProps) => {
  if (process.env.NODE_ENV !== 'production' && !interactive) {
    const linked = items.filter((item) => item.href).map((item) => item.label);
    if (linked.length) {
      console.warn(
        `[SocialRow] ${linked.join(', ')} supplied an href but the row is not interactive, ` +
          'so it renders as plain text. Pass interactive to make them links — but only ' +
          'where the row is NOT inside a linked Tile, since that nests one anchor in another.',
      );
    }
  }

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
          {interactive && item.href ? (
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
};
