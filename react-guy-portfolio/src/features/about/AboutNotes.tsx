import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import type { AboutNote } from '@/content/about';

import { AboutChips } from './AboutChips';

export interface AboutNotesProps {
  /** Education, then military. Row: 6 + 6 = 12. */
  notes: readonly AboutNote[];
}

/**
 * The closing pair: "No CS degree." and "Four years in the Marine Corps."
 *
 * ONE FEATURE RENDERING THE PAIR, not two renders of a single-tile feature. The
 * span is only correct because there are exactly two of them, so the row is the
 * thing worth owning — and owning it here keeps the arithmetic out of the page.
 *
 * `spanTablet={3}` is the whole reason this cannot lean on Tile's default. Tile
 * assumes 6 of 6 at the tablet band — full width — but styles.css:319 gives
 * `.s6` half of the six-column grid, so the pair stays side by side at <=1000px
 * and only stacks at <=620px, where Tile's xs rule takes over.
 *
 * sx is a plain object throughout — see the note in Bento.tsx.
 */
export const AboutNotes = ({ notes }: AboutNotesProps) => {
  return (
    <>
      {notes.map((note) => (
        <Tile key={note.title} span={6} spanTablet={3} arrow={false}>
          <Eyebrow>{note.eyebrow}</Eyebrow>
          <Typography variant="h2">{note.title}</Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: '46ch',
              margin: '14px 0 0',
            }}
          >
            {note.body}
          </Typography>

          <AboutChips chips={note.chips} sx={{ marginTop: '18px' }} />
        </Tile>
      ))}
    </>
  );
};
