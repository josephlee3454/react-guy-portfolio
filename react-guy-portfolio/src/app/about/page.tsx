import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { CtaTile } from '@/components/CtaTile';

import { AboutHead } from '@/features/about/AboutHead';
import { AboutPortrait } from '@/features/about/AboutPortrait';
import { AboutPhilosophy } from '@/features/about/AboutPhilosophy';
import { AboutCredentials } from '@/features/about/AboutCredentials';
import { StackHead } from '@/features/about/StackHead';
import { StackRow } from '@/features/about/StackRow';
import { AboutNotes } from '@/features/about/AboutNotes';

import { ctaHref, fixedCopy } from '@/content/site';
import {
  credentials,
  credentialsHeading,
  education,
  military,
  pageHead,
  philosophy,
  photo,
  stackGroups,
  stackHead,
} from '@/content/about';

export const metadata: Metadata = { title: 'About' };

/**
 * /about — seven rows, each summing to 12:
 *
 *   page head                12
 *   portrait 5 + philosophy   7
 *   experience timeline      12
 *   stack sub-head           12
 *   stack row                12  (a nested 4-across grid, not four tiles)
 *   education 6 + military    6
 *   CTA                      12
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
      <AboutPhilosophy philosophy={philosophy} />

      <AboutCredentials heading={credentialsHeading} entries={credentials} />

      <StackHead
        id={stackHead.id}
        title={stackHead.title}
        accent={stackHead.accent}
        lede={stackHead.lede}
      />
      <StackRow groups={stackGroups} />

      <AboutNotes notes={[education, military]} />

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
};

export default About;
