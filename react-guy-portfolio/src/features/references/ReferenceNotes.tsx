import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { BigLink } from '@/components/BigLink';
import type { ReferenceNote } from '@/content/references';

export interface ReferenceNotesProps {
  /** LinkedIn, then "What I’d ask instead". Row: 6 + 6 = 12. */
  notes: readonly ReferenceNote[];
}

/**
 * The closing pair of `s6` tiles.
 *
 * `spanTablet={3}` is the whole reason this cannot lean on Tile's default. Tile
 * assumes 6 of 6 at the tablet band — full width — but styles.css:315 gives
 * `.s6` half of the six-column grid, so the pair stays side by side at <=1000px
 * and only stacks at <=620px where Tile's xs rule takes over. Note this is the
 * exact inverse of the referee row above it: the wider desktop tile gets the
 * narrower tablet span.
 *
 * Only the first note carries a link, so `link` is optional rather than the pair
 * being split into two features — the row is the unit that owns the spans.
 *
 * sx is a plain object throughout — see the note in Bento.tsx.
 */
export const ReferenceNotes = ({ notes }: ReferenceNotesProps) => {
  return (
    <>
      {notes.map((note) => (
        <Tile key={note.title} span={6} spanTablet={3}>
          <Eyebrow>{note.eyebrow}</Eyebrow>
          <Typography variant="h2">{note.title}</Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: '44ch',
              margin: '14px 0 0',
            }}
          >
            {note.body}
          </Typography>

          {note.link !== undefined && (
            // `external`: an off-site profile URL is not a route, so next/link
            // has nothing to prefetch — BigLink drops to a plain anchor.
            // `inline-block` so the top margin applies at all: the link is the
            // flex column's own item, and a bare inline box would ignore it.
            <BigLink
              external
              href={note.link.href}
              fontSize={18}
              sx={{ marginTop: '18px', display: 'inline-block' }}
            >
              {note.link.label}{' '}
              {/*
                The arrow is decoration and is not part of the label, so it
                lives here rather than in content/references.ts — and it is
                hidden from assistive tech, which would otherwise read the URL
                followed by "north east arrow".
              */}
              <Box component="span" aria-hidden="true">
                ↗
              </Box>
            </BigLink>
          )}
        </Tile>
      ))}
    </>
  );
};
