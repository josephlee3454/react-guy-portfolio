import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { CtaTile } from '@/components/CtaTile';

import { AboutHead } from '@/features/about/AboutHead';
import { AboutPortrait } from '@/features/about/AboutPortrait';
import { AboutPhilosophy } from '@/features/about/AboutPhilosophy';
import { AboutCredentials } from '@/features/about/AboutCredentials';
import { AboutServices } from '@/features/about/AboutServices';

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
 * /about — spec §7: head (12) → photo (5) + philosophy (7) → credentials (12)
 * → three services (4+4+4) → CTA (12). Every row sums to 12.
 *
 * Assembly only: this file names the sections and hands each one its content.
 * The spans above are stated for the reader — each is owned and passed to Tile
 * by the feature that renders it, so no layout value appears in this file.
 */
export const About = () => {
  return (
    <PageShell route="/about">
      <AboutHead titleLines={pageHead.titleLines} accent={pageHead.accent} lede={pageHead.lede} />

      <AboutPortrait src={photo.src} alt={photo.alt} />
      <AboutPhilosophy philosophy={philosophy} coreStack={coreStack} stack={stack} />

      <AboutCredentials heading={credentialsHeading} entries={credentials} />

      <AboutServices services={services} />

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
};

export default About;
