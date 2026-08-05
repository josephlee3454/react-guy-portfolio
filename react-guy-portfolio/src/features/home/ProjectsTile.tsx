import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { TileLink } from '@/content/home';

/**
 * `.projects` — rows 1-2, cols 10-12. The tallest tile on the grid: a gradient
 * placeholder thumb across the top, eyebrow and heading pinned to the bottom.
 *
 * Its own file rather than one of the four plain link tiles, because it is the
 * only one with a child that is not text and the only one with a row span.
 *
 * Every sx here is a plain object, never a `(theme) => ({...})` callback — see
 * the note in Bento.tsx for why a function prop cannot cross the RSC boundary.
 */
export const ProjectsTile = ({ eyebrow, title, href }: TileLink) => {
  return (
    <Tile
      span={3}
      spanTablet={3}
      rowSpan={2}
      align="end"
      href={href}
      // styles.css:113 / :189 — 440px on the 12-column grid, but the tile
      // loses its row span at tablet (Tile only sets grid-row at md), so it
      // no longer has two rows of height to fill and drops to 300px.
      sx={{ minHeight: { xs: 300, md: 440 } }}
    >
      {/*
        `.projects .thumb` (styles.css:114). Still the gradient placeholder:
        spec §4 lists the project shot as unshot, and inventing a path would
        render a broken image rather than an honest placeholder. When the real
        crop lands, swap the gradient for backgroundImage + backgroundSize:
        'cover' and delete the label.
      */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '58%',
          background: 'linear-gradient(150deg, #25302E, #151918)',
          // styles.css:336 — the dark placeholder gradient is swapped
          // outright here rather than filtered, because this thumb sits directly
          // on a tile with no border to separate them.
          '@media (prefers-color-scheme: light)': {
            background: 'linear-gradient(150deg, #E4DFD2, #F4F1E9)',
          },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="statLabel"
          component="span"
          // --dim (styles.css:122), carried by the palette as text.disabled.
          sx={{ position: 'absolute', top: 16, left: 18, color: 'text.disabled' }}
        >
          Project shot
        </Typography>
      </Box>

      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2">{title}</Typography>
    </Tile>
  );
};
