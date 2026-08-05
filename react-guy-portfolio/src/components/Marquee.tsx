import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { columns } from '@/theme/tokens';

/**
 * styles.css:152. Read as a literal rather than from `theme.layout` — see the
 * note in Bento.tsx: a theme callback in sx cannot cross the RSC boundary, and
 * this component has to stay server-rendered.
 */
const MARQUEE_DURATION = '26s';

export interface MarqueeProps {
  /**
   * The content set, rendered once and then duplicated.
   *
   * `items: ReactNode[]` rather than a `phrase: string`, for two reasons.
   * The mockup's phrase is not plain text — it carries an emphasised word and
   * an accent glyph ("Latest work and <b>featured</b> <i>✦</i>") — and a string
   * prop could only reproduce that by inventing markup inside this component,
   * which would bake placeholder styling into a primitive. Second, the loop is
   * only seamless while the track is at least twice the viewport wide, so the
   * caller has to control how many entries there are; an array says that
   * plainly, where a single phrase would hide a repeat count.
   *
   * Supply enough entries to overflow the widest viewport (the mockup uses six).
   * `<b>` and `<i>` inside an entry are styled to match styles.css:158-159.
   */
  items: ReactNode[];
  sx?: SxProps<Theme>;
}

/**
 * `.marquee` — styles.css:147. Full-width raised band, infinite horizontal
 * scroll.
 *
 * Not a Tile: it has no inner padding, no arrow, and no hover lift, so it
 * carries its own grid spans in the same shape Tile uses.
 */
export default function Marquee({ items, sx }: MarqueeProps) {
  return (
    <Box
      sx={[
        {
          gridColumn: {
            xs: 'span 1',
            sm: `span ${columns.tablet}`,
            md: `span ${columns.desktop}`,
          },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'var(--r)',
          backgroundColor: 'surface.raised',
          padding: '20px 0',
          overflow: 'hidden',
          // See the track's reduced-motion note: with the animation off, the
          // track no longer moves, so scrolling is the only way to reach the
          // rest of the line. Clipping it would hide content outright.
          '@media (prefers-reduced-motion: reduce)': { overflowX: 'auto' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '34px',
          width: 'max-content',
          // Declared globally in theme/components.ts — do not redeclare it here,
          // or Emotion will emit a second, differently-named copy.
          animation: `marquee-slide ${MARQUEE_DURATION} linear infinite`,

          /*
           * The theme's global reduced-motion block clamps animation-duration to
           * 0.01ms and iteration-count to 1. That does not stop this animation —
           * it runs it to completion instantly, and a finished single iteration
           * holds its end state, which here is translateX(-50%): the marquee
           * would render permanently scrolled half a track to the left, showing
           * the duplicate copy and cutting the first entry off. `animation: none`
           * removes the animation-name entirely, so the !important duration in
           * the global rule has nothing left to apply to and the track sits at
           * its natural origin.
           */
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            transform: 'none',
          },

          '& b': { color: 'text.primary', fontWeight: 800 },
          '& i': { fontStyle: 'normal', color: 'primary.main' },
        }}
      >
        {items.map((item, index) => (
          <Typography
            // The items are caller-authored nodes with no stable identity, and
            // the list is static — index keys are correct here.
            key={`marquee-${index}`}
            variant="marquee"
            // styles.css:156 — the dim grey, not --muted. text.disabled is #5E6663.
            sx={{ margin: 0, color: 'text.disabled' }}
          >
            {item}
          </Typography>
        ))}

        {/*
          The duplicate. translateX(-50%) only loops seamlessly if the track is
          exactly two identical halves: at -50% the second copy sits precisely
          where the first started, so the reset is invisible. aria-hidden keeps
          the copy out of the accessibility tree — the text is already announced
          once — and it is removed outright under reduced motion, where there is
          no loop for it to serve.
        */}
        {items.map((item, index) => (
          <Typography
            key={`marquee-duplicate-${index}`}
            variant="marquee"
            aria-hidden="true"
            sx={{
              margin: 0,
              color: 'text.disabled',
              '@media (prefers-reduced-motion: reduce)': { display: 'none' },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
