/**
 * Writing page content.
 *
 * Every string here is placeholder. The mockup's post titles, dates and read
 * times are invented (design 2/README-FOR-CLAUDE.md is explicit about this), so
 * they are NOT copied across — inventing a back catalogue reads as fact once it
 * is rendered. What survives is the shape: five rows, newest first.
 *
 * Arrays are typed against the component prop interfaces rather than local
 * shapes, so a field the component needs and this file forgot is a compile
 * error instead of a blank cell on the page.
 */

import type { PageHeadProps } from '@/components/PageHead';
import type { PostRowProps } from '@/components/PostList';

// TODO(copy): real title and lede. No eyebrow — `.page-head` in the mockup is
// h1 + lede only, on this and every other inner page.
export const writingHead = {
  title: 'Writing',
  // The mockup's `<em>` — an amber period closing the title.
  accent: '.',
  lede: 'Placeholder lede. Write-ups will live here; the subjects are not settled yet, so this sentence says nothing about them on purpose.',
} satisfies PageHeadProps;

/**
 * Post rows, newest first.
 *
 * `date` is display text and `dateTime` is the machine-readable value behind
 * the `<time>` element. They are separate because the visible form is a human
 * month-and-year that is not itself a valid datetime — with real posts these
 * become e.g. `date: 'May 2026'` / `dateTime: '2026-05'`. Until the months are
 * real, the display text stays generic and `dateTime` carries just the year,
 * which is a valid value on its own.
 *
 * `href` is a bare fragment: no post routes exist yet, and pointing these at
 * `/writing/<slug>` would ship five links that 404.
 */
// TODO(copy): real posts — titles, dates, read times, excerpts, and hrefs.
export const posts: PostRowProps[] = [
  {
    href: '#',
    date: 'Month 2026',
    dateTime: '2026',
    readTime: '0 min',
    title: 'Placeholder post title one',
    excerpt: 'Placeholder excerpt. One or two lines on what the piece argues, capped at 56ch so the column keeps its measure.',
  },
  {
    href: '#',
    date: 'Month 2026',
    dateTime: '2026',
    readTime: '0 min',
    title: 'Placeholder post title two',
    excerpt: 'Placeholder excerpt. One or two lines on what the piece argues, capped at 56ch so the column keeps its measure.',
  },
  {
    href: '#',
    date: 'Month 2026',
    dateTime: '2026',
    readTime: '0 min',
    title: 'Placeholder post title three',
    excerpt: 'Placeholder excerpt. One or two lines on what the piece argues, capped at 56ch so the column keeps its measure.',
  },
  {
    href: '#',
    date: 'Month 2025',
    dateTime: '2025',
    readTime: '0 min',
    title: 'Placeholder post title four',
    excerpt: 'Placeholder excerpt. One or two lines on what the piece argues, capped at 56ch so the column keeps its measure.',
  },
  {
    href: '#',
    date: 'Month 2025',
    dateTime: '2025',
    readTime: '0 min',
    title: 'Placeholder post title five',
    excerpt: 'Placeholder excerpt. One or two lines on what the piece argues, capped at 56ch so the column keeps its measure.',
  },
];
