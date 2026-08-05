import { Fragment } from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PageShell from '@/components/PageShell';
import PageHead from '@/components/PageHead';
import Tile from '@/components/Tile';
import Eyebrow from '@/components/Eyebrow';
import Chip, { ChipRow } from '@/components/Chip';
import Timeline, { TimelineItem } from '@/components/Timeline';
import CtaTile from '@/components/CtaTile';

import { ctaHref, fixedCopy } from '@/content/site';
import {
  coreStack,
  credentials,
  credentialsHeading,
  pageHead,
  philosophy,
  photo,
  services,
  stack,
} from '@/content/about';

export const metadata: Metadata = { title: 'About' };

/**
 * The amber chip in the mockup's stack row (`.chips b.on`).
 *
 * Not Chip's `active` prop: `active` means "this filter is selected", and Chip
 * warns in dev when it is set on a chip the reader cannot toggle. Here the
 * amber marks the core of the stack — emphasis, not state — so the fill is
 * applied directly and the chip stays honestly non-interactive.
 *
 * A plain object, like every sx in the app: Box is a client component and a
 * theme callback cannot cross the RSC boundary (see Bento.tsx).
 */
const CORE_CHIP_SX = {
  borderColor: 'primary.main',
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
} as const;

/**
 * /about — spec §7: head (12) → photo (5) + philosophy (7) → credentials (12)
 * → three services (4+4+4) → CTA (12). Every row sums to 12.
 */
export default function About() {
  return (
    <PageShell>
      <PageHead
        title={pageHead.titleLines.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
        accent={pageHead.accent}
        lede={pageHead.lede}
      />

      {/* Row: 5 + 7 = 12 */}
      <Tile
        span={5}
        arrow={false}
        sx={{
          padding: 0,
          // `.about-photo` is 460px on desktop and 340px at the tablet fold
          // (styles.css:293). minHeight is a scalar prop on Tile, so the
          // responsive pair is set here instead.
          minHeight: { xs: 340, md: 460 },
        }}
      >
        {/*
         * The image is the tile's content, not decoration, so it carries the
         * accessible name. A background rather than next/image: it is a
         * full-bleed crop with a fixed focal point, and the tile's own
         * overflow:hidden does the rounding.
         */}
        <Box
          role="img"
          aria-label={photo.alt}
          sx={{
            flex: 1,
            backgroundImage: `url("${photo.src}")`,
            backgroundSize: 'cover',
            backgroundPosition: '52% 16%',
          }}
        />
      </Tile>

      <Tile span={7} arrow={false}>
        <Eyebrow>{philosophy.eyebrow}</Eyebrow>
        <Typography variant="h2">{philosophy.title}</Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: '48ch', margin: '16px 0 0' }}
        >
          {philosophy.body}
        </Typography>

        <ChipRow sx={{ marginTop: '24px' }}>
          {coreStack.map((item) => (
            <Chip key={item} sx={CORE_CHIP_SX}>
              {item}
            </Chip>
          ))}
          {stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </ChipRow>
      </Tile>

      {/* Row: 12 */}
      <Tile span={12} arrow={false}>
        <Eyebrow>{credentialsHeading.eyebrow}</Eyebrow>
        <Typography variant="h2">{credentialsHeading.title}</Typography>
        <Timeline columns={2}>
          {/* Keyed by position: the placeholder entries repeat, so no field of
              the content is unique until real copy lands. The list is static. */}
          {credentials.map((entry, i) => (
            <TimelineItem key={i} {...entry} />
          ))}
        </Timeline>
      </Tile>

      {/* Row: 4 + 4 + 4 = 12 */}
      {services.map((service) => (
        <Tile key={service.title} span={4} arrow={false}>
          <Eyebrow>{service.eyebrow}</Eyebrow>
          <Typography variant="h2">{service.title}</Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.65, margin: '12px 0 0' }}>
            {service.description}
          </Typography>
        </Tile>
      ))}

      {/* Row: 12 */}
      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
}
