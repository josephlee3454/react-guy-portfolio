import type { ReactNode } from 'react';
import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tile } from './Tile';

/**
 * styles.css:248 — .2s, shorter than the .25s tile transition. A literal rather
 * than `theme.transitions.create`, which would need a theme callback in sx and
 * so a client component; see the note in Bento.tsx.
 */
const ROW_DURATION = '.2s';

export interface PostListProps {
  /** PostRow elements. */
  children: ReactNode;
}

/**
 * `.posts` (styles.css:244) — the writing index.
 *
 * Spec §7 keeps this a list rather than a grid of tiles: chronological content
 * has one axis, so rows with the date in the left gutter are the honest
 * structure. The container is a full-width Tile with its padding moved onto the
 * rows, so each row's hover fill reaches the card's edges.
 */
export const PostList = ({ children }: PostListProps) => {
  return (
    <Tile span={12} spanTablet={6} sx={{ padding: 0 }}>
      {children}
    </Tile>
  );
};

export interface PostRowProps {
  href: string;
  /** Display form, e.g. "May 2026". */
  date: string;
  /**
   * Machine-readable form for the <time> element, e.g. "2026-05-14".
   *
   * Separate from `date` because the visible text is a human month-and-year and
   * is not itself a valid datetime value. Omitting it drops the attribute
   * rather than emitting an invalid one.
   */
  dateTime?: string;
  /** e.g. "9 min". Hidden below 1000px, where the row loses its columns. */
  readTime: string;
  title: string;
  excerpt: string;
}

/**
 * One row of the writing index. A whole-surface link, so it holds no other
 * interactive elements.
 *
 * Deliberately not a Tile: spec §7 says lists don't float, so hover shifts the
 * row 8px right and fills it with --tile-2 instead of lifting it. Reusing
 * Tile would bring the translateY lift, the border, the radius and the corner
 * arrow — all of which are surface affordances this row is defined by not
 * having.
 */
export const PostRow = ({ href, date, dateTime, readTime, title, excerpt }: PostRowProps) => {
  return (
    <Box
      component={AppLink}
      href={href}
      sx={{
        display: 'grid',
        // <=1000px the row collapses to a single column (and the read time goes,
        // below) since there is no gutter left to hang it in. That band is xs+sm;
        // the three-column form starts at md.
        gridTemplateColumns: { xs: '1fr', md: '118px 1fr auto' },
        gap: { xs: '6px', md: '22px' },
        alignItems: 'baseline',
        padding: '26px var(--pad)',
        borderTop: '1px solid',
        borderColor: 'divider',
        textDecoration: 'none',
        color: 'inherit',
        transition: `background-color ${ROW_DURATION} ease, padding-left ${ROW_DURATION} ease`,
        '&:first-of-type': { borderTop: 0 },
        // Spec §7: lists don't float. The row shifts right and fills instead.
        '&:hover': {
          backgroundColor: 'surface.raised',
          paddingLeft: 'calc(var(--pad) + 8px)',
        },
      }}
    >
      <Typography variant="mono" component="time" dateTime={dateTime} sx={{ whiteSpace: 'nowrap' }}>
        {date}
      </Typography>

      <Box>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ margin: '7px 0 0', lineHeight: 1.55, maxWidth: '56ch' }}>
          {excerpt}
        </Typography>
      </Box>

      <Typography
        variant="mono"
        component="span"
        sx={{ whiteSpace: 'nowrap', display: { xs: 'none', md: 'block' } }}
      >
        {readTime}
      </Typography>
    </Box>
  );
};
