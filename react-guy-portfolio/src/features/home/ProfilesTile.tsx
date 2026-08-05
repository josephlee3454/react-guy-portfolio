import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { SocialRow, type SocialItem } from '@/components/SocialRow';
import type { TileLink } from '@/content/home';

export interface ProfilesTileProps extends Omit<TileLink, 'href'> {
  /** The marks. From `socials` in content/site.ts — shared with the footer. */
  socials: SocialItem[];
}

/**
 * `.profiles` — row 3, cols 5-7. The social marks above the heading.
 *
 * NOT A LINK, and that is the design (DESIGN_SPEC §4): "The Profiles tile is a
 * `<div>`, not an `<a>`: the icons are the links, and an anchor inside an
 * anchor is invalid HTML that silently destroys the tile's DOM. If you add more
 * profile links, keep the container a div."
 *
 * So no `href` reaches Tile — which renders a div and drops the corner arrow on
 * its own — and none is accepted as a prop, because accepting one would make
 * re-linking the tile a one-word change that breaks the row underneath it. The
 * tile has nowhere of its own to point anyway: every profile it names is a
 * different destination.
 *
 * A separate file rather than a shared parameterised one; see the note in
 * CredentialsTile.tsx. This rule is the clearest reason of the four — it is a
 * constraint on this tile's children specifically.
 */
export const ProfilesTile = ({ eyebrow, title, socials }: ProfilesTileProps) => {
  return (
    <Tile span={3} spanTablet={3} minHeight={190} align="end">
      <SocialRow items={socials} interactive />
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
