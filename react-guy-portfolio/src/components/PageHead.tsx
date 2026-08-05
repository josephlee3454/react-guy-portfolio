import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { Tile } from './Tile';
import { Eyebrow } from './Eyebrow';

export interface PageHeadProps {
  /**
   * Mono label above the title.
   *
   * Optional, and none of the four mockup pages use one — `.page-head` is h1 +
   * lede only. Kept available for a page that needs it rather than removed.
   */
  eyebrow?: ReactNode;
  /** Accepts nodes so a page can force a line break, as the mockup does. */
  title: ReactNode;
  /** Amber fragment appended to the title — the mockup's `<em>`. */
  accent?: ReactNode;
  lede?: ReactNode;
  /**
   * Rendered below the lede, inside the header.
   *
   * The work page's filter chips sit inside `.page-head` in the mockup, not in
   * a tile of their own. Putting them here also keeps them outside any linked
   * tile, which matters — a chip with an href inside a linked Tile would nest
   * one anchor in another.
   */
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * The inner-page header: about, work, writing, contact. Spans 12 and carries
 * its own vertical rhythm (46/38) rather than the tile's uniform --pad.
 */
export const PageHead = ({
  eyebrow,
  title,
  accent,
  lede,
  children,
  sx,
}: PageHeadProps) => {
  return (
    <Tile
      span={12}
      variant="bare"
      sx={[
        {
          // `bare` clears the fill, border and padding in Tile, so only the
          // header's own vertical rhythm is set here. styles.css:302 tightens it
          // at <=620px, which is the `xs` band (sm starts at 621).
          padding: { xs: '34px 4px 26px', sm: '46px var(--pad) 38px' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* TODO(copy): every string passed in from a page is placeholder. */}
      {eyebrow !== undefined && <Eyebrow>{eyebrow}</Eyebrow>}

      <Typography variant="pageTitle">
        {title}
        {accent !== undefined && (
          <Box component="em" sx={{ fontStyle: 'normal', color: 'accentInk' }}>
            {accent}
          </Box>
        )}
      </Typography>

      {lede !== undefined && (
        <Typography variant="subtitle1" sx={{ maxWidth: '46ch', margin: '20px 0 0' }}>
          {lede}
        </Typography>
      )}

      {children}
    </Tile>
  );
};
