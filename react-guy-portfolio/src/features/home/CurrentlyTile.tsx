import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';

export interface CurrentlyTileProps {
  /** Mono label. One word in the design. */
  eyebrow: string;
  /** The h2 — the role, not a page name. */
  title: string;
  /** One paragraph under the heading. */
  body: string;
}

/**
 * `.stats` — row 3, cols 8-12. Despite the class name this is no longer a
 * stats tile: index.html replaced the three figures with the current role
 * stated in prose, so there is no `.stat-row` and no `<Stat>` here.
 *
 * Two things carry over from the tile it replaced. It is not a link, so
 * `arrow={false}` — spec §3's one tile in the set without a corner arrow — and
 * it keeps the same 5 / 6 / 190 geometry so row 3 still sums to 12.
 *
 * What changed is the alignment: the mockup's inline `justify-content:flex-end`
 * (index.html:66) overrides `.stats`' centring, so `align` is 'end' like every
 * other tile on the grid rather than 'center'.
 *
 * `padding-right:0` on the mockup's h2 needs no counterpart: Tile only adds the
 * 52px arrow gutter when it is actually drawing an arrow, and here it is not.
 *
 * Every sx is a plain object, never a `(theme) => ({...})` callback — see the
 * note in Bento.tsx for why a function prop cannot cross the RSC boundary.
 */
export const CurrentlyTile = ({ eyebrow, title, body }: CurrentlyTileProps) => {
  return (
    <Tile span={5} spanTablet={6} minHeight={190} align="end" arrow={false}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
      {/*
        body2 is 14px in the muted text colour, which is the mockup's inline
        style already; only the 1.65 leading, the top margin and the measure
        are local to this paragraph.
      */}
      <Typography variant="body2" sx={{ margin: '12px 0 0', lineHeight: 1.65, maxWidth: '48ch' }}>
        {body}
      </Typography>
    </Tile>
  );
};
