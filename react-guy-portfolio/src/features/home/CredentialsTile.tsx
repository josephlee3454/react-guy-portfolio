import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { TileLink } from '@/content/home';

/**
 * `.credentials` — rows 1-2, cols 7-9. Eyebrow + heading, whole surface linked.
 *
 * WHY FOUR SEPARATE FILES (this, WritingTile, ServicesTile, ProfilesTile)
 * -----------------------------------------------------------------------
 * These four look near-identical in the mockup, and collapsing them into one
 * `<HomeLinkTile>` was the obvious move. It does not pay for itself:
 *
 *   credentials  span 3  tablet 3  minHeight 210
 *   writing      span 3  tablet 3  minHeight 210
 *   services     span 4  tablet 3  minHeight 190
 *   profiles     span 3  tablet 3  minHeight 190  + a SocialRow child
 *
 * Three distinct geometries and one extra child across four call sites. A
 * shared feature would need span, spanTablet, minHeight, the content record and
 * `children` — five props — and every one of them would then have to be
 * restated at the call site in page.tsx, which is exactly the styling this
 * refactor is pulling out of the page. The parameterised version moves the
 * numbers rather than removing them.
 *
 * Kept apart, each tile is a five-line component that owns its own numbers, the
 * page carries none, and Profiles' nested-anchor rule lives next to the markup
 * it constrains. The shared part they actually have in common — the surface,
 * the arrow, the hover lift — is already `Tile`; that is the reuse, and it is
 * one level down where it belongs.
 *
 * If a fifth variant ever lands on the same 3/3/210 geometry, revisit.
 */
export const CredentialsTile = ({ eyebrow, title, href }: TileLink) => {
  return (
    <Tile span={3} spanTablet={3} minHeight={210} align="end" href={href}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
