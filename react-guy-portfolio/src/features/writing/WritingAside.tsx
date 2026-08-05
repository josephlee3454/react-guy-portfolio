import Typography from '@mui/material/Typography';

import { Chip, ChipRow } from '@/components/Chip';
import { Eyebrow } from '@/components/Eyebrow';
import { Tile } from '@/components/Tile';
import type { WritingAsk, WritingTopics } from '@/content/writing';

export interface WritingAsideProps {
  topics: WritingTopics;
  ask: WritingAsk;
}

/**
 * Long chip labels have to wrap.
 *
 * Chip sets `whiteSpace: 'nowrap'`, which is right for the technology names it
 * was built for — "AG Grid" should never break across two lines. These are
 * sentences ("Postgres indexes for trading workloads"), and at the tablet band
 * this tile is three of six columns, on mobile one of one. A nowrap chip there
 * does not shrink: it runs past the tile's rounded edge and is clipped by
 * Tile's `overflow: hidden`, so the label silently loses its last word.
 *
 * Overridden here rather than in Chip because nowrap is the correct default for
 * every other chip row in the app; this is the one row whose content is prose.
 * `overflowWrap: 'anywhere'` is the floor for a 320px viewport, where even a
 * single long word would otherwise set the chip's minimum width.
 *
 * A plain object, like every sx in the app — Box is a client component and a
 * theme callback cannot cross the RSC boundary (see Bento.tsx).
 */
const WRAPPING_CHIP_SX = {
  whiteSpace: 'normal',
  overflowWrap: 'anywhere',
  maxWidth: '100%',
} as const;

/**
 * The pair under the writing banner: the subjects being drafted, and the offer
 * to just ask. Row: 6 + 6 = 12.
 *
 * ONE FEATURE OWNING THE ROW, not two single-tile features. The spans are only
 * correct because there are exactly two tiles, so the row is the unit worth
 * owning — and owning it here keeps the arithmetic out of the page file. The
 * two tiles differ in shape (chips vs. a paragraph), which is why this is a
 * literal pair rather than a map.
 *
 * `spanTablet={3}` is the whole reason neither tile can lean on Tile's default.
 * Tile assumes 6 of 6 at the tablet band — full width — but styles.css:315
 * gives `.s6` half of the six-column grid, so the pair stays side by side at
 * <=1000px and only stacks at <=620px, where Tile's xs rule takes over.
 *
 * `arrow={false}` on both: neither tile is a link, and the arrow is Tile's
 * affordance for a clickable surface. It also keeps the h2s off the 52px
 * right padding Tile reserves for the arrow, matching `padding-right:0` on the
 * headings in writing.html.
 */
export const WritingAside = ({ topics, ask }: WritingAsideProps) => {
  return (
    <>
      <Tile span={6} spanTablet={3} arrow={false}>
        <Eyebrow>{topics.eyebrow}</Eyebrow>
        <Typography variant="h2">{topics.title}</Typography>

        <ChipRow sx={{ marginTop: '18px' }}>
          {topics.subjects.map((subject) => (
            <Chip key={subject} sx={WRAPPING_CHIP_SX}>
              {subject}
            </Chip>
          ))}
        </ChipRow>
      </Tile>

      <Tile span={6} spanTablet={3} arrow={false}>
        <Eyebrow>{ask.eyebrow}</Eyebrow>
        <Typography variant="h2">{ask.title}</Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            maxWidth: '44ch',
            margin: '14px 0 0',
          }}
        >
          {ask.body}
        </Typography>
      </Tile>
    </>
  );
};
