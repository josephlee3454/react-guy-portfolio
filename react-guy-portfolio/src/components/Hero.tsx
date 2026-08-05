import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tile from './Tile';
import Eyebrow from './Eyebrow';

export interface HeroProps {
  /** Mono label above the name — the role. */
  eyebrow: ReactNode;
  /** The h1. */
  name: ReactNode;
  /** Amber fragment appended to the name — the mockup's `<em>.</em>`. */
  accent?: ReactNode;
  /** One line of bio, ending in the availability sentence. */
  bio: ReactNode;
  href: string;
  /** Path under /public. 800x1100 in the shipped asset. */
  portraitSrc: string;
  /** The portrait carries role="img", so it needs a name of its own. */
  portraitAlt: string;
  /** Desktop columns. 6 on the home grid. */
  span?: number;
  /** Tablet columns at <=1000px. styles.css:188 puts the hero at full width. */
  spanTablet?: number;
  /** styles.css:90 — the hero is one of the two tiles that spans two rows. */
  rowSpan?: number;
}

/**
 * The home page's hero tile — the only genuinely bespoke tile in the set.
 *
 * Everything except the portrait is a Tile with an h1 in it. The portrait is
 * the reason this file exists: spec §3 requires that the photo not read as a
 * rectangle sitting inside the tile, and three effects do that work together.
 *
 *   1. `mask-image: linear-gradient(100deg, transparent 0%, #000 44%)`
 *      dissolves the photo's left edge into the tile fill at an angle, so there
 *      is no vertical seam beside the copy. The -webkit- prefix ships alongside
 *      it: Safari only unprefixed mask-image in 15.4, and without the prefix
 *      older WebKit renders no mask at all — i.e. a hard-edged rectangle,
 *      exactly the failure the spec is guarding against.
 *   2. An `::after` overlay of `linear-gradient(to top, var(--tile) 2%,
 *      transparent 42%)` sinks the bottom edge into the tile.
 *   3. `background-position: 52% 18%` keeps the face in frame as the tile
 *      changes width, since `cover` crops from the centre by default.
 *
 * At <=620px (the `xs` band — `sm` starts at 621) the tile is a single column
 * and there is no room beside the photo, so the mask rotates to a bottom-up
 * fade, the photo goes full-bleed, and opacity drops to .42 — the headline then
 * sits over the image rather than next to it and has to stay legible.
 *
 * A background image rather than next/image: this is a masked decorative
 * backdrop, not content, and next/image cannot express the crop-plus-mask
 * behaviour without a wrapper that would fight the absolute positioning.
 *
 * Every sx here is a plain object, never a `(theme) => ({...})` callback — see
 * the note in Bento.tsx for why a function prop cannot cross the RSC boundary.
 */
export default function Hero({
  eyebrow,
  name,
  accent,
  bio,
  href,
  portraitSrc,
  portraitAlt,
  span = 6,
  spanTablet = 6,
  rowSpan = 2,
}: HeroProps) {
  const portraitMask = {
    xs: 'linear-gradient(to top, transparent 6%, #000 60%)',
    sm: 'linear-gradient(100deg, transparent 0%, #000 44%)',
  };

  return (
    <Tile
      span={span}
      spanTablet={spanTablet}
      rowSpan={rowSpan}
      align="end"
      href={href}
      // styles.css:90 / :197 — 440px, tightening to 430px in the single-column band.
      sx={{ minHeight: { xs: 430, sm: 440 } }}
    >
      <Box
        role="img"
        aria-label={portraitAlt}
        sx={{
          position: 'absolute',
          inset: 0,
          // `inset` sets all four sides; clearing `left` on wider viewports is
          // what pins the photo to the right edge and lets `width` size it.
          left: { xs: 0, sm: 'auto' },
          width: { xs: '100%', sm: '52%' },
          // Legibility: at xs the headline sits on top of the photo.
          opacity: { xs: 0.42, sm: 1 },
          backgroundImage: `url("${portraitSrc}")`,
          backgroundSize: 'cover',
          backgroundPosition: '52% 18%',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: portraitMask,
          maskImage: portraitMask,
          // Bottom edge sinks into the tile fill instead of stopping at it.
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--tile) 2%, transparent 42%)',
          },
        }}
      />

      {/*
        `position: relative` is load-bearing, not cosmetic: the portrait is
        absolutely positioned inside the same tile, so without a stacking
        context of its own the copy would render underneath it.
      */}
      <Box sx={{ position: 'relative', maxWidth: { xs: '100%', sm: '52%' } }}>
        <Eyebrow>{eyebrow}</Eyebrow>

        <Typography variant="h1" sx={{ margin: '0 0 16px' }}>
          {name}
          {accent !== undefined && (
            <Box component="em" sx={{ fontStyle: 'normal', color: 'primary.main' }}>
              {accent}
            </Box>
          )}
        </Typography>

        {/* body1 is 15px — the spec's contrast floor for --muted on --tile. */}
        <Typography variant="body1" sx={{ margin: 0, maxWidth: '32ch', color: 'text.secondary' }}>
          {bio}
        </Typography>
      </Box>
    </Tile>
  );
}
