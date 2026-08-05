import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { PageHead } from '@/components/PageHead';
import { Banner } from '@/components/Banner';
import { CtaTile } from '@/components/CtaTile';

import { WritingAside } from '@/features/writing/WritingAside';

import { ctaHref, fixedCopy } from '@/content/site';
import { ask, banner, topics, writingHead } from '@/content/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description: writingHead.lede,
};

/**
 * /writing — a designed empty state, not an empty list.
 *
 * Grid rows, each summing to 12:
 *   PageHead     12
 *   Banner       12
 *   WritingAside  6 + 6
 *   CtaTile      12
 *
 * There is no post list here, and no `posts.length ? … : …` either. Nothing is
 * published; the page says so in the banner and then spends its remaining two
 * tiles on what is coming and how to get it early. A list component fed an
 * empty array would encode the opposite intent — that posts exist and today's
 * fetch came back short. components/PostList.tsx is deliberately dormant and is
 * what this page should be rebuilt around when the first piece ships.
 *
 * No 'use client': every component below is a server component, and every `sx`
 * they receive is a plain object.
 */
export const Writing = () => {
  return (
    <PageShell route="/writing">
      <PageHead {...writingHead} />

      <Banner {...banner} />

      <WritingAside topics={topics} ask={ask} />

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
};

export default Writing;
