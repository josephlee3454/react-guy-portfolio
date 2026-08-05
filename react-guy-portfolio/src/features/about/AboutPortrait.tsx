import Box from '@mui/material/Box';

import { Tile } from '@/components/Tile';

export interface AboutPortraitProps {
  src: string;
  /** The tile is exposed as role="img", so this is its accessible name. */
  alt: string;
}

/**
 * The portrait tile. Row: 5 + 7 = 12, paired with AboutPhilosophy.
 *
 * sx is a plain object, like every sx in the app: Box is a client component and
 * a theme callback cannot cross the RSC boundary (see Bento.tsx).
 */
export const AboutPortrait = ({ src, alt }: AboutPortraitProps) => {
  return (
    <Tile
      span={5}
      arrow={false}
      sx={{
        padding: 0,
        // `.about-photo` is 460px on desktop and 340px at the tablet fold
        // (styles.css:293). minHeight is a scalar prop on Tile, so the
        // responsive pair is set here instead.
        minHeight: { xs: 340, md: 460 },
      }}
    >
      {/*
       * The image is the tile's content, not decoration, so it carries the
       * accessible name. A background rather than next/image: it is a
       * full-bleed crop with a fixed focal point, and the tile's own
       * overflow:hidden does the rounding.
       *
       * role/aria-label sit on this inner Box rather than on Tile because Tile
       * does not forward ARIA props — it accepts span/minHeight/align/variant/
       * href/arrow/sx and nothing else, so anything passed to it would be
       * dropped rather than landing on the rendered element.
       */}
      <Box
        role="img"
        aria-label={alt}
        sx={{
          flex: 1,
          backgroundImage: `url("${src}")`,
          backgroundSize: 'cover',
          backgroundPosition: '52% 16%',
        }}
      />
    </Tile>
  );
};
