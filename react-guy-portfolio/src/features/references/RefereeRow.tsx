import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { AppLink } from '@/components/AppLink';
import { LinkedInIcon } from '@/components/icons/social/LinkedInIcon';
import type { Referee } from '@/content/references';

export interface RefereeRowProps {
  /** Four, laid out 6 + 6 over two rows. See the note below on why not 4+4+4. */
  referees: readonly Referee[];
}

/**
 * The three referee tiles — the middle row of /references.
 *
 * ONE FEATURE RENDERING THE ROW, not four renders of a single-tile feature, for
 * the same reason as AboutNotes: the span is only correct given how many tiles
 * there are, so the row is the unit worth owning, and owning it here keeps the
 * arithmetic off the page.
 *
 * `span={4}` is the mockup's 4+4+4 and only correct because there are exactly
 * three. It briefly went to 6+6 while a fourth referee existed; it is back
 * because a fourth would have made the row 16 and wrapped it.
 *
 * The three tiles now hold quotations of 57, 43 and 72 words — close enough
 * that a 4-of-12 column reads evenly. That was NOT true when one tile had a
 * one-line body and its neighbour a full quote: grid stretches the row to the
 * tallest, so the short one carried the difference as dead space. If a referee
 * without a quote is ever added back, revisit this before assuming 4 still fits.
 *
 * `spanTablet={6}` is full width at <=1000px. styles.css:314 collapses `.s4`
 * there because a 4-of-12 tile at tablet size is too narrow for the paragraph
 * inside it — stops the next reader "fixing" it to 2.
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

          {/*
            A published recommendation, quoted. Rendered as a real <blockquote>
            with `cite` pointing at the profile it came from, so the markup says
            what it is rather than relying on the quotation marks to carry it.

            The tile is a <div> — these carry no href — so the link inside nests
            nothing. That is only true while the referee tiles stay unlinked.
          */}
          {referee.quote !== undefined && (
            <Typography
              component="blockquote"
              variant="body2"
              cite={referee.profile?.href}
              sx={{
                margin: '16px 0 0',
                paddingLeft: '14px',
                borderLeft: '2px solid',
                borderColor: 'accentInk',
                fontSize: 14,
                lineHeight: 1.65,
                color: 'text.primary',
              }}
            >
              {referee.quote}
            </Typography>
          )}

          {referee.profile !== undefined && (
            <Box
              component={AppLink}
              href={referee.profile.href}
              // The label names the destination; the mark is decoration beside
              // it, so the icon stays out of the accessibility tree rather than
              // announcing "LinkedIn" twice.
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                margin: '14px 0 0',
                color: 'text.secondary',
                textDecoration: 'none',
                transition: 'color .2s ease',
                '&:hover': { color: 'accentInk' },
              }}
            >
              <LinkedInIcon aria-hidden sx={{ fontSize: 16 }} />
              <Typography variant="mono" sx={{ textTransform: 'none', color: 'inherit' }}>
                {referee.profile.label}
              </Typography>
            </Box>
          )}
        </Tile>
      ))}
    </>
  );
};
