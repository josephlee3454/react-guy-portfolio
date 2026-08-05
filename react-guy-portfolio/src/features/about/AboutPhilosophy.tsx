import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';

export interface AboutPhilosophyProps {
  philosophy: {
    eyebrow: string;
    title: string;
    /** Rendered in order, one <p> each. */
    body: readonly string[];
  };
}

/**
 * The "how I work" tile. Row: 5 + 7 = 12, paired with AboutPortrait.
 *
 * The stack chips used to live here. In this revision they are a section of
 * their own (StackHead + StackRow), so this tile is prose only and the body
 * arrives as paragraphs rather than one string — the mockup sets a smaller top
 * margin on the second (14px against 16px), which is the only reason the index
 * is looked at.
 *
 * sx is a plain object throughout: Box is a client component and a theme
 * callback cannot cross the RSC boundary (see Bento.tsx).
 */
export const AboutPhilosophy = ({ philosophy }: AboutPhilosophyProps) => {
  return (
    <Tile span={7} arrow={false}>
      <Eyebrow>{philosophy.eyebrow}</Eyebrow>
      <Typography variant="h2">{philosophy.title}</Typography>

      {philosophy.body.map((paragraph, i) => (
        <Typography
          // Keyed by position: these are paragraphs of one static essay, and
          // the text itself is long enough that using it as a key would be
          // worse than the index it would replace.
          key={i}
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            maxWidth: '50ch',
            margin: i === 0 ? '16px 0 0' : '14px 0 0',
          }}
        >
          {paragraph}
        </Typography>
      ))}
    </Tile>
  );
};
