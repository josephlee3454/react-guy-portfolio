import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { TileLink } from '@/content/home';

/**
 * `.services` — row 3, cols 1-4. Wider than the other link tiles (4, not 3) and
 * shorter (190), which is why it is not the same component; see the note in
 * CredentialsTile.tsx.
 *
 * If the stats tile is ever dropped (see the TODO on `stats` in content/home.ts)
 * this goes to span 6 so the row still sums to 12.
 */
export const ServicesTile = ({ eyebrow, title, href }: TileLink) => {
  return (
    <Tile span={4} spanTablet={3} minHeight={190} align="end" href={href}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
