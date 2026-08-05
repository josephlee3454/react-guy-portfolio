import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { TileLink } from '@/content/home';

/**
 * `.writing` — row 2, cols 7-9. Same shape as the credentials tile.
 *
 * A separate file rather than a shared parameterised one; see the note in
 * CredentialsTile.tsx for why.
 */
export const WritingTile = ({ eyebrow, title, href }: TileLink) => {
  return (
    <Tile span={3} spanTablet={3} minHeight={210} align="end" href={href}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
