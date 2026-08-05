import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { Timeline, TimelineItem, type TimelineItemProps } from '@/components/Timeline';

export interface AboutCredentialsProps {
  heading: { eyebrow: string; title: string };
  entries: readonly TimelineItemProps[];
}

/**
 * The experience block. Row: 12.
 *
 * ONE column now, not two. This revision has three long entries rather than four
 * short ones, and `.tl tl-1` in the mockup drops the multi-column flow — so
 * Timeline's default of 1 is simply left alone.
 *
 * The marker gutter widens from Timeline's 96px to the `/* v5 *\/` block's 132px
 * (styles.css:401), because "2024 – NOW" does not fit in 96. Timeline and
 * TimelineItem take no sx, so the override is applied from the tile as a
 * descendant selector: `.tile ol > li` is one class plus two type selectors,
 * which outranks TimelineItem's own single-class rule regardless of the order
 * emotion happens to insert them in. Only the `sm` band is set — below 620px
 * TimelineItem collapses the gutter to `1fr` and there is nothing to widen.
 */
export const AboutCredentials = ({ heading, entries }: AboutCredentialsProps) => {
  return (
    <Tile span={12} arrow={false} sx={{ '& ol > li': { gridTemplateColumns: { sm: '132px 1fr' } } }}>
      <Eyebrow>{heading.eyebrow}</Eyebrow>
      <Typography variant="h2">{heading.title}</Typography>
      <Timeline>
        {entries.map((entry) => (
          <TimelineItem key={entry.title} {...entry} />
        ))}
      </Timeline>
    </Tile>
  );
};
