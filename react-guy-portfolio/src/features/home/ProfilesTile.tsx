import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { SocialRow, type SocialItem } from '@/components/SocialRow';
import type { TileLink } from '@/content/home';

export interface ProfilesTileProps extends TileLink {
  /** The chips. From `socials` in content/site.ts — shared with the footer. */
  socials: SocialItem[];
}

/**
 * `.profiles` — row 3, cols 5-7. A link tile with the social chips above the
 * heading.
 *
 * A separate file rather than a shared parameterised one; see the note in
 * CredentialsTile.tsx. The nested-anchor rule below is the clearest reason of
 * the four — it is a constraint on this tile's children specifically.
 */
export const ProfilesTile = ({ eyebrow, title, href, socials }: ProfilesTileProps) => {
  return (
    <Tile span={3} spanTablet={3} minHeight={190} align="end" href={href}>
      {/*
        Items carry no href on purpose. This tile is itself an <a>, and an
        anchor inside an anchor is invalid HTML — the browser closes the outer
        one early, which would break the tile's click target. See SocialRow's
        docs. The chips render as spans here; contact.html links them.
      */}
      <SocialRow items={socials} />
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
