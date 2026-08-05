import type { Metadata } from 'next';

import PageShell from '@/components/PageShell';
import PageHead from '@/components/PageHead';
import PostList, { PostRow } from '@/components/PostList';
import CtaTile from '@/components/CtaTile';
import { ctaHref, fixedCopy } from '@/content/site';
import { posts, writingHead } from '@/content/writing';

// TODO(copy): title and description follow the placeholder page copy.
export const metadata: Metadata = {
  title: 'Writing',
  description: writingHead.lede,
};

/**
 * Spec §7: head → post list (12) as rows, not tiles → CTA.
 *
 * Grid rows, each summing to 12:
 *   PageHead 12
 *   PostList 12
 *   CtaTile  12
 *
 * The index is a list and not a grid of tiles because chronological content has
 * one axis — PostList/PostRow carry that decision, including the hover that
 * shifts the row 8px right rather than lifting it. Swapping in Tiles would
 * re-introduce the float this page is defined by not having.
 *
 * No 'use client': every component below is a server component, and every `sx`
 * they receive is a plain object.
 */
export default function Writing() {
  return (
    <PageShell>
      <PageHead {...writingHead} />

      <PostList>
        {posts.map((post) => (
          // Keyed on the title rather than href — every placeholder post points
          // at the same fragment, so href is not unique yet.
          <PostRow key={post.title} {...post} />
        ))}
      </PostList>

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
}
