import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { PageHead } from '@/components/PageHead';
import { Banner } from '@/components/Banner';
import { CtaTile } from '@/components/CtaTile';

import { RefereeRow } from '@/features/references/RefereeRow';
import { ReferenceNotes } from '@/features/references/ReferenceNotes';

import { ctaHref, fixedCopy } from '@/content/site';
import { banner, notes, pageHead, referees } from '@/content/references';

export const metadata: Metadata = {
  title: 'References — Joseph Lee',
  description: pageHead.lede,
};

/**
 * /references — five rows, each summing to 12:
 *
 *   page head            12
 *   banner               12
 *   referees   4 + 4 + 4 12
 *   notes      6 +     6 12
 *   CTA                  12
 *
 * Assembly only: this file names the sections and hands each one its content.
 * The spans above are stated for the reader — each is owned and passed to Tile
 * by the feature that renders it, so no layout value appears in this file.
 *
 * THE PAGE'S ARGUMENT LIVES IN content/references.ts, in three strings that must
 * not be paraphrased. See the header of that file before editing any copy.
 *
 * The CTA takes `fixedCopy.ctaHeadline`, not a fourth copy of the sentence.
 *
 * No 'use client': every component below is a server component, and every `sx`
 * they receive is a plain object.
 */
export const References = () => {
  return (
    <PageShell route="/references">
      <PageHead {...pageHead} />

      <Banner {...banner} />

      <RefereeRow referees={referees} />

      <ReferenceNotes notes={notes} />

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
};

export default References;
