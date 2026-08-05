/**
 * Home page content.
 *
 * Every string on the home page lives here so the page file stays structure.
 * Fixed copy (spec §4 — the phrases chosen for register) is imported from
 * site.ts rather than retyped, so there is one copy of each.
 *
 * Everything below is real copy, transcribed from the design 4 mockup. There
 * are no placeholders left except the project thumbnail, which is an unshot
 * image rather than unwritten text and is handled in ProjectsTile.
 */

import { ctaHref, fixedCopy, fullName } from './site';

/** A tile that is nothing but a labelled link: eyebrow, heading, whole-surface href. */
export interface TileLink {
  eyebrow: string;
  title: string;
  href: string;
}

export const hero = {
  /** Fixed copy — spec §4. */
  eyebrow: fixedCopy.heroEyebrow,
  name: fullName,
  /** The amber period after the name. Decoration, not copy. */
  accent: '.',
  /**
   * ONE authored paragraph, stored whole.
   *
   * Do not rebuild it by appending `fixedCopy.availability`: the tail here is
   * "Seattle, open to new roles." — lowercase and comma-joined to the city —
   * which is a different string from the fixed "Open to new roles" that closes
   * the Currently tile. Interpolating would silently change the sentence.
   */
  bio:
    'I write the GraphQL API and the React that consumes it. Five years across the ' +
    'stack — Java services at Amazon, now NestJS, PostgreSQL and React at ' +
    'Alphaledger. Seattle, open to new roles.',
  /** The whole tile is the click target; the mockup points it at about. */
  href: '/about',
  /** Shipped at 800x1100 (spec §4 "Images"). */
  portraitSrc: '/assets/portrait.jpg',
  portraitAlt: `Portrait of ${fullName}`,
} as const;

export const credentials: TileLink = {
  eyebrow: 'Amazon · Alphaledger',
  title: 'Experience',
  href: '/about',
};

export const projects: TileLink = {
  eyebrow: 'What I’ve shipped',
  title: 'Selected work',
  href: '/work',
};

/**
 * A TileLink that also carries a corner badge.
 *
 * A separate interface rather than an optional field on `TileLink`: the badge
 * belongs to exactly one tile, and widening the shared shape would offer it to
 * the other four — including Selected work, which must never have one.
 */
export interface BadgedTileLink extends TileLink {
  /** Rendered as a `Badge size="tile"` pinned inside the tile's top-left. */
  badge?: string;
}

/**
 * The Writing tile — the one tile on this page that is badged.
 *
 * `badge` reads "Coming soon", the same two words as `banner.badge` in
 * content/writing.ts. DO NOT EXTRACT A SHARED CONSTANT. They are the same word
 * for unrelated reasons: this one warns that a nav destination has nothing
 * behind it yet, that one labels an index with nothing in it. The work page's
 * banner says "Case studies in progress" instead, which is the proof that these
 * are per-context editorial strings — merge them and rewording one silently
 * rewords the other.
 */
export const writing: BadgedTileLink = {
  eyebrow: 'Notes',
  title: 'Writing',
  href: '/writing',
  badge: 'Coming soon',
};

/**
 * Anchors at the about page's stack section — `#stack`, not `#services`. The
 * tile is about the tools, not an offer of services.
 */
export const services: TileLink = {
  eyebrow: 'What I work in',
  title: 'Stack',
  href: '/about#stack',
};

/**
 * The marks themselves come from `socials` in site.ts.
 *
 * No `href`, and the type says so. The tile is a div rather than a link because
 * the marks inside it are the links (DESIGN_SPEC §4) — an href here would have
 * to become an anchor wrapping them, which is invalid HTML.
 */
export const profiles: Omit<TileLink, 'href'> = {
  eyebrow: 'Find me elsewhere',
  title: 'Profiles',
};

/**
 * Row 3, cols 8-12 — the tile that used to hold fabricated figures.
 *
 * It is now the current role stated plainly: eyebrow, heading, one paragraph.
 * No metrics, so nothing here has to be invented to fill it.
 */
export const currently = {
  eyebrow: 'Currently',
  title: 'Software Developer at Alphaledger',
  /**
   * The closing sentence IS `fixedCopy.availability` verbatim, so it is
   * interpolated rather than retyped — spec §4 keeps one copy of that phrase.
   * (The hero's bio only looks similar; see the note on `hero.bio`.)
   */
  body:
    'Enterprise blockchain for municipal bond issuance and trading. GraphQL, ' +
    `PostgreSQL and React, in roughly equal measure. ${fixedCopy.availability}.`,
} as const;

/**
 * The scrolling band — a list of technologies, each closed by the accent glyph.
 *
 * No emphasised word any more: the mockup's `<b>` is gone, so this is seven
 * plain names and one repeated separator. MarqueeBand composes the markup;
 * this module only supplies the words.
 */
export const marquee = {
  items: [
    'React',
    'GraphQL',
    'NestJS',
    'PostgreSQL',
    'Java',
    'AWS Lambda',
    'TypeScript',
  ],
  /** Accent glyph after every name. Decoration, not copy. */
  glyph: '✦',
  /**
   * Repetitions of the whole list. The loop is only seamless while the track
   * overflows the widest viewport; the mockup uses four, and Marquee duplicates
   * whatever it is given.
   */
  repeat: 4,
} as const;

/** Fixed copy — spec §4. Do not swap for a generic equivalent. */
export const cta = {
  headline: fixedCopy.ctaHeadline,
  href: ctaHref,
} as const;
