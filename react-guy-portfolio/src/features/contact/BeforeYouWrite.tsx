import Typography from '@mui/material/Typography';

import { Eyebrow } from '@/components/Eyebrow';
import { Tile } from '@/components/Tile';
import { Timeline, TimelineItem, type TimelineItemProps } from '@/components/Timeline';

export interface BeforeYouWriteProps {
  eyebrow: string;
  heading: string;
  steps: TimelineItemProps[];
}

/** The heading holds to roughly one line and a half at desktop widths. */
const headingSx = { maxWidth: '26ch' };

/**
 * The "before you write" steps — spec §7's full-width third row, span 12.
 */
export const BeforeYouWrite = ({ eyebrow, heading, steps }: BeforeYouWriteProps) => {
  return (
    <Tile span={12}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2" sx={headingSx}>
        {heading}
      </Typography>

      {/*
        The design's only numbered markers (spec §7) — this is a sequence,
        where the about page's credentials are dated and use years instead.
      */}
      <Timeline>
        {steps.map((step) => (
          <TimelineItem key={step.marker} {...step} />
        ))}
      </Timeline>
    </Tile>
  );
};
