import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { GraphQlIcon } from '@/components/icons/brand/GraphQlIcon';
import { NestJsIcon } from '@/components/icons/brand/NestJsIcon';
import { NodeJsIcon } from '@/components/icons/brand/NodeJsIcon';
import { PostgreSqlIcon } from '@/components/icons/brand/PostgreSqlIcon';
import { ReactIcon } from '@/components/icons/brand/ReactIcon';
import { TypeScriptIcon } from '@/components/icons/brand/TypeScriptIcon';
import { geometry } from '@/theme/tokens';
import type { TileLink } from '@/content/home';

/**
 * A stable class name for the brand row, for the same reason CornerArrow has
 * one — see the note on `ARROW_CLASS`.
 *
 * The mockup colours the row with a DESCENDANT selector on the tile,
 * `a.tile:hover .logo-row{color:var(--accent-ink)}` (styles.css:410), so the
 * trigger is the parent's hover and not the row's own. Tile is generic and does
 * not know about brand marks, so the rule lives in this file's `sx` — the tile
 * instance is ServicesTile's, and this is the only place the pair is coupled.
 * Local rather than exported: nothing outside this file may target it.
 */
const LOGO_ROW_CLASS = 'tile-logo-row';

/**
 * The six marks, in the mockup's order (index.html:56-61).
 *
 * Each carries its own name because these are NOT decorative. The tile's
 * heading is the single word "Stack"; the marks are the only place the
 * technologies are actually named, so hiding them would leave a screen reader
 * with a tile that says what it is about and never what it contains.
 * `titleAccess` gives SvgIcon a <title> and `role="img"`, matching the mockup's
 * `role`/`aria-label`/`title` trio.
 */
const MARKS = [
  { label: 'React', Icon: ReactIcon },
  { label: 'TypeScript', Icon: TypeScriptIcon },
  { label: 'NestJS', Icon: NestJsIcon },
  { label: 'GraphQL', Icon: GraphQlIcon },
  { label: 'PostgreSQL', Icon: PostgreSqlIcon },
  { label: 'Node.js', Icon: NodeJsIcon },
] as const;

/**
 * `.services` — row 3, cols 1-4. Wider than the other link tiles (4, not 3) and
 * shorter (190), which is why it is not the same component; see the note in
 * CredentialsTile.tsx.
 *
 * If the stats tile is ever dropped (see the TODO on `stats` in content/home.ts)
 * this goes to span 6 so the row still sums to 12.
 *
 * The brand row (`.logo-row`, styles.css:404) sits above the eyebrow. Its marks
 * are fill-based and inherit `currentColor` from the row, which is what lets one
 * colour change on the row recolour all six. Do not put them through StackRow's
 * icon plate on the about page: that forces `fill:none; stroke:currentColor` on
 * `& svg` for the four outline glyphs and would erase these completely.
 */
export const ServicesTile = ({ eyebrow, title, href }: TileLink) => {
  return (
    <Tile
      span={4}
      spanTablet={3}
      minHeight={190}
      align="end"
      href={href}
      sx={{ [`&:hover .${LOGO_ROW_CLASS}`]: { color: 'accentInk' } }}
    >
      <Box
        className={LOGO_ROW_CLASS}
        sx={{
          display: 'flex',
          // `margin-bottom: auto` is layout, not spacing: the tile is a flex
          // column justified to flex-end, so the auto margin absorbs the free
          // space and pins the row to the top. Same trick as SocialRow.
          marginBottom: 'auto',
          gap: { xs: '13px', sm: '15px' },
          color: 'text.secondary',
          transition: `color ${geometry.duration} ease`,
        }}
      >
        {MARKS.map(({ label, Icon }) => (
          <Icon
            key={label}
            titleAccess={label}
            aria-label={label}
            // SvgIcon sizes off font-size (width and height are both 1em), so
            // one value covers the mockup's 23px square and its 20px drop at
            // the <=620px band.
            sx={{ display: 'block', fontSize: { xs: 20, sm: 23 } }}
          />
        ))}
      </Box>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
