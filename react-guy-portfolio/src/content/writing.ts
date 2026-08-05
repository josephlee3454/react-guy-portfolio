/**
 * Content for /writing.
 *
 * THERE IS NO BACK CATALOGUE, AND THIS FILE MUST NOT INVENT ONE. The five post
 * rows that used to live here were placeholders standing in for the mockup's
 * fabricated titles; design 4 deletes them outright and replaces the index with
 * a designed empty state — a coming-soon banner, the subjects actually being
 * drafted, and an invitation to ask directly. Every string below is real copy
 * from `design 4/writing.html`.
 *
 * Do not reintroduce `posts` as an empty array with a fallback render. An empty
 * array says "a list that happens to have nothing in it today"; this page says
 * "nothing is published, on purpose, and here is what is coming instead". The
 * component for real posts (components/PostList.tsx) is still there and is the
 * right thing to reach for when the first piece lands.
 *
 * APOSTROPHES: U+2019 (’) throughout, as in every other content module.
 * writing.html happens to use ASCII apostrophes in the banner body — the only
 * strings in the whole mockup that do, against `&rsquo;` everywhere else. That
 * is a typo in the mockup, not a style, so it is not carried across.
 */

import type { BannerProps } from '@/components/Banner';
import type { PageHeadProps } from '@/components/PageHead';

export const writingHead = {
  title: 'Writing',
  /** The mockup's `<em>` — an amber period closing the title. */
  accent: '.',
  lede:
    'Notes on the things that actually took time — schema decisions, resolver ' +
    'design, and the long middle of a migration.',
} satisfies PageHeadProps;

/**
 * The coming-soon banner. Row: 12.
 *
 * `badge` reads "Coming soon", which is the same two words as the home page's
 * Writing tile badge in content/home.ts. DO NOT EXTRACT A SHARED CONSTANT.
 * They are the same word for unrelated reasons: this one labels an index with
 * nothing in it, that one labels a nav destination whose contents are pending.
 * The work page's banner — "Case studies in progress" — is proof this is
 * per-context editorial copy rather than one system-wide label; a shared
 * constant would mean rewording one of them silently reworded the other.
 */
export const banner = {
  badge: 'Coming soon',
  title: 'Nothing published yet.',
  body:
    'I’d rather leave this empty than fill it with filler. First few pieces are ' +
    'drafted; they’ll appear here when they’re worth reading.',
} satisfies BannerProps;

/** The left `s6` tile: the subjects, as chips. */
export interface WritingTopics {
  eyebrow: string;
  title: string;
  /**
   * Subjects, not tags. These are full phrases rather than the one- and
   * two-word technology names every other chip row holds, which is why the
   * writing feature has to let them wrap — see the note in WritingAside.
   */
  subjects: readonly string[];
}

/** The right `s6` tile: eyebrow, heading, one paragraph. */
export interface WritingAsk {
  eyebrow: string;
  title: string;
  body: string;
}

export const topics: WritingTopics = {
  eyebrow: 'On the list',
  title: 'What I’m writing about',
  subjects: [
    'DataLoaders and the N+1 problem',
    'Postgres indexes for trading workloads',
    'Single-table DynamoDB, in hindsight',
    'Testing GraphQL resolvers',
  ],
};

export const ask: WritingAsk = {
  eyebrow: 'In the meantime',
  title: 'Ask me directly',
  body:
    'Most of what I’d write about I’m happy to talk through. If you want the ' +
    'long version of any of the above, email is faster than waiting for the post.',
};
