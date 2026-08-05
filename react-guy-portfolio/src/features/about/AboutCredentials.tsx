import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { Timeline, TimelineItem, type TimelineItemProps } from '@/components/Timeline';

export interface AboutCredentialsProps {
  heading: { eyebrow: string; title: string };
  entries: readonly TimelineItemProps[];
}

/**
 * The credentials block. Row: 12.
 *
 * `columns={2}` is this section's call, not Timeline's default — contact's
 * "before you write" steps use the same primitive at one column — so the
 * two-column layout is passed in from here.
 */
export const AboutCredentials = ({ heading, entries }: AboutCredentialsProps) => {
  return (
    <Tile span={12} arrow={false}>
      <Eyebrow>{heading.eyebrow}</Eyebrow>
      <Typography variant="h2">{heading.title}</Typography>
      <Timeline columns={2}>
        {/* Keyed by position: the placeholder entries repeat, so no field of
            the content is unique until real copy lands. The list is static. */}
        {entries.map((entry, i) => (
          <TimelineItem key={i} {...entry} />
        ))}
      </Timeline>
    </Tile>
  );
};
