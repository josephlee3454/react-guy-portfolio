/**
 * Content for /about. Every string here is placeholder.
 *
 * `design 2/README-FOR-CLAUDE.md` is explicit that the mockup's company names,
 * dates and metrics are invented and must not be treated as fact, so none of
 * them are copied across. The rule applied throughout this file:
 *
 *   - kept from the mockup: design-authored labels that assert nothing about a
 *     person (page title, section headings, the three service names);
 *   - replaced with an obvious placeholder: anything that would read as a fact
 *     — biography, employers, years, the stack.
 *
 * No JSX here: this is a .ts module, so the page title arrives as lines that
 * about/page.tsx joins with <br />.
 */

import type { TimelineItemProps } from '@/components/Timeline';

export interface ServiceItem {
  eyebrow: string;
  title: string;
  description: string;
}

export interface PhotoContent {
  src: string;
  /** The tile is exposed as role="img", so this is its accessible name. */
  alt: string;
}

// TODO(copy): real headline and bio.
export const pageHead = {
  /** Rendered one per line — the mockup breaks after "the". */
  titleLines: ['I build the', 'whole thing'],
  /** The mockup's <em>: an amber full stop. */
  accent: '.',
  lede:
    'Placeholder lede. Two or three sentences on what you build, who you build ' +
    'it for, and which parts of the work you actually enjoy.',
} as const;

/**
 * TODO(copy): spec §4 wants this served as WebP; `public/assets/portrait.jpg`
 * is what exists today, so the page points at the JPEG until the conversion.
 */
export const photo: PhotoContent = {
  src: '/assets/portrait.jpg',
  alt: 'Portrait photograph',
};

// TODO(copy): real point of view.
export const philosophy = {
  eyebrow: 'How I work',
  title: 'Boring technology, on purpose.',
  body:
    'Placeholder paragraph. A short statement of how you approach a build — ' +
    'where you start, what you optimise for, and what you refuse to do. Keep ' +
    'it to about four lines so it sits level with the portrait beside it.',
} as const;

/**
 * TODO(copy): the real stack. Rendered as chips, `core` first.
 *
 * `core` are the mockup's amber chips. They are emphasis, not a selected
 * filter — see the note in about/page.tsx on why they do not use Chip's
 * `active` prop.
 */
export const coreStack: string[] = ['Language one', 'Language two', 'Language three'];

export const stack: string[] = [
  'Framework one',
  'Framework two',
  'Runtime',
  'Database',
  'Cache',
  'Containers',
  'Infrastructure',
  'Cloud',
  'CI/CD',
];

/**
 * TODO(copy): real roles, employers and dates.
 *
 * Markers read "YEAR" rather than a plausible-looking year so nothing here can
 * be mistaken for a real date; `dateTime` is therefore omitted, which renders
 * each marker as a plain span instead of a <time> with a bogus value.
 */
export const credentials: TimelineItemProps[] = [
  {
    marker: 'YEAR—NOW',
    title: 'Placeholder role',
    description: 'Company name. One line on what you owned and what changed because of it.',
  },
  {
    marker: 'YEAR—YEAR',
    title: 'Placeholder role',
    description: 'Company name. One line on what you owned and what changed because of it.',
  },
  {
    marker: 'YEAR—YEAR',
    title: 'Placeholder role',
    description: 'Company name. One line on what you owned and what changed because of it.',
  },
  {
    marker: 'YEAR',
    title: 'Placeholder qualification',
    description: 'Institution name.',
  },
];

export const credentialsHeading = {
  eyebrow: 'Credentials',
  title: "Where I've been",
} as const;

/**
 * The three service names are the mockup's own taxonomy and are kept; the
 * descriptions are placeholder.
 * TODO(copy): confirm these are the three things you actually sell.
 */
export const services: ServiceItem[] = [
  {
    eyebrow: 'What I do',
    title: 'Greenfield builds',
    description:
      'Placeholder description. What this engagement covers, who it suits, and ' +
      'what the client is left holding at the end of it.',
  },
  {
    eyebrow: 'What I do',
    title: 'Rescue work',
    description:
      'Placeholder description. What this engagement covers, who it suits, and ' +
      'what the client is left holding at the end of it.',
  },
  {
    eyebrow: 'What I do',
    title: 'Fractional lead',
    description:
      'Placeholder description. What this engagement covers, who it suits, and ' +
      'what the client is left holding at the end of it.',
  },
];
