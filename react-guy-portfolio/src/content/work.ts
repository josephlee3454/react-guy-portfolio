/**
 * Content for /work. Every string here is placeholder.
 *
 * The mockup's project titles and metrics ("Cut a $19k/mo cloud bill to $4k")
 * are invented — `design 2/README-FOR-CLAUDE.md` says so explicitly — so none
 * of them are carried over. What is kept from the mockup is structure: five
 * projects, the lead card first, and the filter taxonomy.
 *
 * The array is typed as ProjectCardProps[], so `span` is part of the content
 * rather than the page, and dropping a field is a compile error rather than a
 * ragged grid row.
 */

import type { ProjectCardProps } from '@/components/ProjectCard';

// TODO(copy): real headline and lede.
export const pageHead = {
  title: 'Selected work',
  /** The mockup's <em>: an amber full stop. */
  accent: '.',
  lede:
    'Placeholder lede. A line or two on what these projects have in common ' +
    'and what each entry tells the reader.',
} as const;

/**
 * TODO(copy): confirm the real categories — they must match the `category`
 * field of the project eyebrows below.
 *
 * Rendered as plain, non-interactive chips: filtering is not implemented, and
 * these pages are server components, so there is no click handler to give them.
 * "All" is deliberately not marked `active` — an active state the reader cannot
 * change would be a lie about a control that does nothing.
 */
export const filters: string[] = ['All', 'Platform', 'Product', 'Infrastructure', 'Rescue'];

/**
 * TODO(copy): real case studies.
 *
 * - `eyebrow` follows spec §7: `year · role · category`. The role is the part
 *   clients scan for, so it stays even while the rest is placeholder.
 * - `href` is "#" because no case-study routes exist yet. Point each at its own
 *   page when they do.
 * - `image` is omitted throughout: no screenshots exist, and ProjectCard renders
 *   the gradient placeholder in their absence (spec §7, "still placeholder").
 *
 * Order is load-bearing: the lead card is first and spans 8, the next spans 4,
 * and the remaining three span 4 each — 8+4 and 4+4+4.
 */
export const projects: ProjectCardProps[] = [
  {
    span: 8,
    lead: true,
    href: '#',
    eyebrow: '2026 · Placeholder role · Platform',
    title: 'Project one',
    description:
      'Placeholder description. Two lines on what the project was and, more ' +
      'usefully, what was actually hard about it.',
  },
  {
    span: 4,
    href: '#',
    eyebrow: '2026 · Placeholder role · Product',
    title: 'Project two',
    description: 'Placeholder description. What the project was and what was hard about it.',
  },
  {
    span: 4,
    href: '#',
    eyebrow: '2026 · Placeholder role · Infrastructure',
    title: 'Project three',
    description: 'Placeholder description. What the project was and what was hard about it.',
  },
  {
    span: 4,
    href: '#',
    eyebrow: '2026 · Placeholder role · Platform',
    title: 'Project four',
    description: 'Placeholder description. What the project was and what was hard about it.',
  },
  {
    span: 4,
    href: '#',
    eyebrow: '2026 · Placeholder role · Rescue',
    title: 'Project five',
    description: 'Placeholder description. What the project was and what was hard about it.',
  },
];
