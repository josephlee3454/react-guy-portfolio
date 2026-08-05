/**
 * Home page content.
 *
 * Every string on the home page lives here so the page file stays structure.
 * Fixed copy (spec §4 — the phrases chosen for register) is imported from
 * site.ts rather than retyped, so there is one copy of each.
 *
 * Nothing here asserts a fact about the site's owner. Names, metrics and the
 * marquee line are obvious placeholders, each marked TODO(copy).
 */

import { ctaHref, fixedCopy } from './site';

/** A tile that is nothing but a labelled link: eyebrow, heading, whole-surface href. */
export interface TileLink {
  eyebrow: string;
  title: string;
  href: string;
}

/** One figure in the stats tile. The label is two mono lines in the design. */
export interface HomeStat {
  value: string;
  label: readonly [string, string];
}

// TODO(copy): placeholder bio. One sentence about what you build and who you
// build it for. The availability line that follows it is fixed copy — spec §4
// says keep it as-is, and it is imported rather than repeated here.
const heroBioLead = 'One line about what you build and who you build it for goes here.';

export const hero = {
  /** Fixed copy — spec §4. */
  eyebrow: fixedCopy.heroEyebrow,
  // TODO(copy): real name. The mockup's "Your Name." — placeholder, not a person.
  name: 'Your Name',
  /** The amber period after the name. Decoration, not copy. */
  accent: '.',
  bio: `${heroBioLead} ${fixedCopy.availability}`,
  /** The whole tile is the click target; the mockup points it at about. */
  href: '/about',
  /** Shipped at 800x1100 (spec §4 "Images"). */
  portraitSrc: '/assets/portrait.jpg',
  // TODO(copy): describe the actual photograph once the real portrait ships.
  portraitAlt: 'Portrait photograph',
} as const;

// TODO(copy): tile labels are the mockup's. They describe the destination
// pages, so they hold until the sub-pages are written.
export const credentials: TileLink = {
  eyebrow: 'More about me',
  title: 'Credentials',
  href: '/about',
};

// TODO(copy): as above.
export const projects: TileLink = {
  eyebrow: 'Showcase',
  title: 'Selected work',
  href: '/work',
};

// TODO(copy): as above.
export const writing: TileLink = {
  eyebrow: 'Notes',
  title: 'Writing',
  href: '/writing',
};

// TODO(copy): as above. Anchors at the about page's services section, per the mockup.
export const services: TileLink = {
  eyebrow: 'What I do',
  title: 'Services',
  href: '/about#services',
};

// TODO(copy): as above. The chips themselves come from `socials` in site.ts.
export const profiles: TileLink = {
  eyebrow: 'Find me elsewhere',
  title: 'Profiles',
  href: '/contact',
};

/**
 * TODO(copy): THIS TILE MAY BE DELETED ENTIRELY.
 *
 * Spec §4: the mockup's `07 / +125 / +210` are fabricated and read as untrue on
 * a new portfolio — they must be replaced or the tile dropped. The owner has not
 * decided, so the tile renders em-dashes: real structure, no invented numbers.
 *
 * If it goes, the row it sits on loses 5 columns. Spec §7 requires every row to
 * sum to 12, so Services becomes span 6 and Profiles span 6 (6 + 6 = 12) and
 * this export plus its tile in page.tsx are deleted together.
 *
 * If it stays, use metrics that are true at this scale — repos shipped, talks
 * given — rather than client counts.
 */
export const stats: readonly HomeStat[] = [
  { value: '—', label: ['Metric', 'to decide'] },
  { value: '—', label: ['Metric', 'to decide'] },
  { value: '—', label: ['Metric', 'to decide'] },
];

/**
 * TODO(copy): PLACEHOLDER PHRASE — needs a real one before launch.
 *
 * Spec §4 rejects the mockup's "Latest work and featured" as template filler
 * that "isn't a sentence and tells the reader nothing", and asks for a line that
 * does a job: availability, location, year. The three below are the slots for
 * exactly that; the current text names the slots instead of filling them,
 * because filling them would mean inventing a location.
 */
export const marquee = {
  /** Text before the emphasised word. */
  lead: 'Placeholder line — set availability,',
  /** Emphasised: --bone at weight 800. */
  emphasis: 'location',
  /** Text after the emphasised word. */
  trail: 'and year',
  /** Accent glyph closing each repetition. Decoration, not copy. */
  glyph: '✦',
  /**
   * Repetitions. The loop is only seamless while the track overflows the widest
   * viewport — styles.css:73-79 uses six, and Marquee duplicates whatever it is given.
   */
  repeat: 6,
} as const;

/** Fixed copy — spec §4. Do not swap for a generic equivalent. */
export const cta = {
  headline: fixedCopy.ctaHeadline,
  href: ctaHref,
} as const;
