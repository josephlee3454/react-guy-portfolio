import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';

export interface StackHeadProps {
  /** Anchor target for the home page's `/about#stack` link. */
  id: string;
  title: string;
  /** Amber fragment appended to the title — the mockup's `<em>`. */
  accent?: string;
  lede?: string;
}

/**
 * The sub-head above the stack row. Row: 12.
 *
 * The mockup reuses `.page-head` here, so this is the same bare, full-width,
 * self-spaced block as the page header — but it is NOT PageHead. PageHead
 * renders the page's <h1> at the <h1> size, and a page gets one of those; this
 * is an <h2> at a deliberately smaller clamp (28-44px against 40-84px). It also
 * needs an id, which PageHead does not take.
 *
 * The id sits on the heading rather than on the tile: a fragment link should
 * land on the words it names, and Tile forwards no DOM attributes anyway.
 *
 * sx is a plain object throughout — see the note in Bento.tsx.
 */
export const StackHead = ({ id, title, accent, lede }: StackHeadProps) => {
  return (
    <Tile
      span={12}
      variant="bare"
      arrow={false}
      sx={{
        // `.page-head`'s own rhythm, with the mockup's inline `padding-bottom:6px`
        // — the row below is the section's real content and sits tight to it.
        // styles.css:322 tightens the header at <=620px, which is the xs band.
        padding: { xs: '34px 4px 6px', sm: '46px var(--pad) 6px' },
      }}
    >
      <Typography id={id} variant="pageTitle" component="h2" sx={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
        {title}
        {accent !== undefined && (
          <Box component="em" sx={{ fontStyle: 'normal', color: 'accentInk' }}>
            {accent}
          </Box>
        )}
      </Typography>

      {lede !== undefined && (
        <Typography variant="subtitle1" sx={{ maxWidth: '46ch', margin: '14px 0 0' }}>
          {lede}
        </Typography>
      )}
    </Tile>
  );
};
