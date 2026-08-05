import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import PageShell from '@/components/PageShell';
import PageHead from '@/components/PageHead';
import Tile from '@/components/Tile';
import Eyebrow from '@/components/Eyebrow';
import Field from '@/components/Field';
import SocialRow from '@/components/SocialRow';
import Timeline, { TimelineItem } from '@/components/Timeline';
import { socials } from '@/content/site';
import { beforeYouWrite, contactHead, directDetails, formFields, submitLabel } from '@/content/contact';
import { tokens } from '@/theme/tokens';

// TODO(copy): title and description follow the placeholder page copy.
export const metadata: Metadata = {
  title: 'Contact',
  description: contactHead.lede,
};

/** Vertical rhythm between the four blocks of the direct-details tile. */
const BLOCK_GAP = '26px';

/**
 * `.status` — styles.css:281. Mono uppercase, but at .12em rather than the
 * `mono` variant's .14em, and in bone rather than muted.
 */
const statusSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  letterSpacing: '0.12em',
  color: 'text.primary',
};

/**
 * The dot. `alpha()` is a pure function evaluated here on the server, so the
 * value that reaches Box is an ordinary string — no function crosses the RSC
 * boundary.
 */
const statusDotSx = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'primary.main',
  boxShadow: `0 0 0 4px ${alpha(tokens.accent, 0.18)}`,
  flexShrink: 0,
};

/**
 * `.big-link` — styles.css:283. The `h3` variant is the closest typographic
 * match (display face, 600, -.02em); only the size ramp, the colour and the
 * hover differ, so those are the overrides.
 */
const bigLinkSx = {
  fontSize: 'clamp(20px, 2.2vw, 30px)',
  color: 'text.primary',
  textDecoration: 'none',
  wordBreak: 'break-word',
  transition: 'color .2s ease',
  '&:hover': { color: 'primary.main' },
};

/**
 * Spec §7: head → form (7) + direct details (5) → "before you write" (12).
 *
 * Grid rows, each summing to 12:
 *   PageHead                   12
 *   form 7 + direct details 5  12
 *   before you write           12
 *
 * NO CTA TILE, deliberately. Spec §7: this page is the CTA, and a tile asking
 * the reader to get in touch above a form they are already looking at is a
 * second ask that weakens the first. PageShell renders no CTA of its own, so
 * omitting it here is the whole mechanism.
 *
 * THE FORM IS MARKUP ONLY — no `action`, no `onSubmit`, no server action, no
 * validation, no API route (spec §7 and README-FOR-CLAUDE). The button is
 * `type="button"`, as in the mockup, so it cannot navigate either. A form that
 * silently discards input is the honest placeholder until there is somewhere
 * real to send it; wiring one up is a separate decision about where the mail
 * goes. That is also why this file needs no 'use client'.
 */
export default function Contact() {
  return (
    <PageShell>
      <PageHead {...contactHead} />

      <Tile span={7}>
        {formFields.map((field) => (
          <Field key={field.name} {...field} />
        ))}

        <Button type="button" sx={{ alignSelf: 'flex-start', padding: '15px 30px', fontSize: 15 }}>
          {submitLabel}
        </Button>
      </Tile>

      <Tile span={5}>
        <Box>
          <Eyebrow>{directDetails.availabilityLabel}</Eyebrow>
          <Typography variant="mono" sx={statusSx}>
            <Box component="span" aria-hidden="true" sx={statusDotSx} />
            {directDetails.status}
          </Typography>
        </Box>

        <Box sx={{ marginTop: BLOCK_GAP }}>
          <Eyebrow>{directDetails.emailLabel}</Eyebrow>
          {/*
            A plain <a>, not AppLink: `mailto:` is not a route, so next/link's
            prefetching and client navigation have nothing to do here.
          */}
          <Typography
            variant="h3"
            component="a"
            href={`mailto:${directDetails.email}`}
            sx={bigLinkSx}
          >
            {directDetails.email}
          </Typography>
        </Box>

        <Box sx={{ marginTop: BLOCK_GAP }}>
          <Eyebrow>{directDetails.locationLabel}</Eyebrow>
          <Typography variant="body1" sx={{ margin: 0 }}>
            {directDetails.location}
          </Typography>
          <Typography variant="body2" sx={{ margin: '6px 0 0' }}>
            {directDetails.locationNote}
          </Typography>
        </Box>

        <Box sx={{ marginTop: BLOCK_GAP }}>
          <Eyebrow>{directDetails.socialsLabel}</Eyebrow>
          {/*
            This tile is not itself a link, so the chips could carry hrefs — but
            site.ts has no real profile URLs yet, and inventing them would ship
            four dead links. They render as <span>s until the URLs are real.

            `marginBottom: 0` overrides SocialRow's default `auto`, which exists
            to pin the row to the top of a bottom-aligned tile on the home page.
            Here the row is the last block of a top-aligned tile, and the auto
            margin would eat the tile's remaining height.
          */}
          <SocialRow items={socials} sx={{ marginBottom: 0 }} />
        </Box>
      </Tile>

      <Tile span={12}>
        <Eyebrow>{beforeYouWrite.eyebrow}</Eyebrow>
        <Typography variant="h2" sx={{ maxWidth: '26ch' }}>
          {beforeYouWrite.heading}
        </Typography>

        {/*
          The design's only numbered markers (spec §7) — this is a sequence,
          where the about page's credentials are dated and use years instead.
        */}
        <Timeline>
          {beforeYouWrite.steps.map((step) => (
            <TimelineItem key={step.marker} {...step} />
          ))}
        </Timeline>
      </Tile>
    </PageShell>
  );
}
