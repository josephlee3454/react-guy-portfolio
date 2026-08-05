import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import Tile from './Tile';
import Eyebrow from './Eyebrow';

export interface PageHeadProps {
  /** Mono label above the title. */
  eyebrow: ReactNode;
  /** Accepts nodes so a page can force a line break, as the mockup does. */
  title: ReactNode;
  /** Amber fragment appended to the title — the mockup's `<em>`. */
  accent?: ReactNode;
  lede?: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * The inner-page header: about, work, writing, contact. Spans 12 and carries
 * its own vertical rhythm (46/38) rather than the tile's uniform --pad.
 */
export default function PageHead({ eyebrow, title, accent, lede, sx }: PageHeadProps) {
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
      <Eyebrow>{eyebrow}</Eyebrow>

      <Typography variant="pageTitle">
        {title}
        {accent !== undefined && (
          <Box component="em" sx={{ fontStyle: 'normal', color: 'primary.main' }}>
            {accent}
          </Box>
        )}
      </Typography>

      {lede !== undefined && (
        <Typography variant="subtitle1" sx={{ maxWidth: '46ch', margin: '20px 0 0' }}>
          {lede}
        </Typography>
      )}
    </Tile>
  );
}
