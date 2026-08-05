import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { Referee } from '@/content/references';

export interface RefereeRowProps {
  /** Exactly three. Row: 4 + 4 + 4 = 12. */
  referees: readonly Referee[];
}

/**
 * The three referee tiles — the middle row of /references.
 *
 * ONE FEATURE RENDERING THE ROW, not three renders of a single-tile feature, for
 * the same reason as AboutNotes: `span={4}` is only correct because there are
 * exactly three of them, so the row is the unit worth owning, and owning it here
 * keeps the arithmetic off the page.
 *
 * `spanTablet={6}` is Tile's default and is stated anyway. It looks wrong next
 * to `span={4}` — wider on the smaller screen — but styles.css:314 collapses
 * `.s4` to the full six-column width at <=1000px, because a 4-of-12 tile at
 * tablet size is too narrow for the paragraph inside it. Writing it out stops
 * the next reader from "fixing" it to 2.
 *
 * These tiles carry no href, so Tile adds no corner arrow and no h2 padding
 * reserve — which is what the mockup's `padding-right:0` on each h2 says.
 *
 * NO NAMES HERE BY DESIGN. See the header of content/references.ts.
 *
 * sx is a plain object throughout — see the note in Bento.tsx.
 */
export const RefereeRow = ({ referees }: RefereeRowProps) => {
  return (
    <>
      {referees.map((referee) => (
        // Keyed on the title: the first two share an eyebrow, so it is the
        // role that is unique across the row.
        <Tile key={referee.title} span={4} spanTablet={6}>
          <Eyebrow>{referee.eyebrow}</Eyebrow>
          <Typography variant="h2">{referee.title}</Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              lineHeight: 1.65,
              margin: '12px 0 0',
            }}
          >
            {referee.body}
          </Typography>
        </Tile>
      ))}
    </>
  );
};
