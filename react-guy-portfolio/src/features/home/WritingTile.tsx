import Typography from '@mui/material/Typography';
import { Badge } from '@/components/Badge';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { BadgedTileLink } from '@/content/home';

/**
 * `.writing` — row 2, cols 7-9. Same shape as the credentials tile, plus the
 * corner badge.
 *
 * A separate file rather than a shared parameterised one; see the note in
 * CredentialsTile.tsx for why. The badge is a second reason: it is this tile's
 * alone. DESIGN_SPEC §4 is explicit that Selected work does not get one — "a
 * coming-soon badge there would imply he has no work to show, which is false
 * and undersells five shipped projects" — so ProjectsTile must not grow one for
 * symmetry.
 *
 * The badge is absolutely positioned (styles.css:432) so it sits in the corner
 * without joining the flex column, which is aligned to the bottom. Tile is
 * already `position: relative`, so this anchors to the tile itself. `left` uses
 * `--pad` so it lines up with the eyebrow below it at both padding values.
 *
 * sx is a plain object — see the note in Bento.tsx.
 */
export const WritingTile = ({ eyebrow, title, href, badge }: BadgedTileLink) => {
  return (
    <Tile span={3} spanTablet={3} minHeight={210} align="end" href={href}>
      {badge !== undefined && (
        <Badge size="tile" sx={{ position: 'absolute', top: '20px', left: 'var(--pad)' }}>
          {badge}
        </Badge>
      )}

      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
