/**
 * Site-wide text. Edit strings here — no component needs touching.
 *
 * Shapes live in ./types.ts. This module has no 'use client' directive, so both
 * server components and the client-side MobileMenu can read it.
 *
 * Content is real (from Joseph's CV) and verified final per DESIGN_SPEC §4.
 * Anything still unresolved is marked TODO(copy).
 */

import type { NavItem, SocialItem } from './types';

// ---------------------------------------------------------------- identity

/** Brand mark in the nav — lowercase, one word. The amber period is the component's. */
export const brand = 'josephlee';

/** Full name, for the footer copyright and portrait alt text. */
export const fullName = 'Joseph Lee';

export const email = 'joseph.lee3454@gmail.com';

export const linkedin = {
  /** Display text drops the id suffix; the href keeps it. */
  label: 'linkedin.com/in/joseph-lee',
  href: 'https://www.linkedin.com/in/joseph-lee-600599b9',
} as const;

/** Display text drops the scheme, matching the LinkedIn line above. */
export const github = {
  label: 'github.com/josephlee3454',
  href: 'https://github.com/josephlee3454',
} as const;

// ---------------------------------------------------------------- metadata

export const siteTitle = 'Joseph Lee — Full stack engineer';
// TODO(copy): no meta description exists in the mockup — this is authored.
export const siteDescription =
  'Full stack engineer in Seattle. GraphQL, NestJS, PostgreSQL and React.';

// ---------------------------------------------------------------- navigation

/**
 * Order is fixed by the design. Every item points at a real page.
 *
 * References replaced the old Testimonials page, which was omitted from this
 * list because its seven quotes were invented. The new page carries no quotes
 * and no names — three referees described only by role and employer, plus an
 * argument for why the details are not published — so nothing on it can be
 * false about a third party. The reason to hide it is gone.
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'References', href: '/references' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

/** Where the nav button and the CTA tile both point. */
export const ctaHref = '/contact';

// ---------------------------------------------------------------- fixed copy

/**
 * DESIGN_SPEC §4 chose each of these for register — swapping them for generic
 * equivalents is a downgrade the spec calls out by name.
 *
 * `heroEyebrow` is stored sentence-case; the uppercase is `text-transform` in
 * the `eyebrow` typography variant, so storing it shouted would apply the same
 * decision twice.
 */
export const fixedCopy = {
  ctaHeadline: 'So what are we building?',
  navCta: 'Start here',
  heroEyebrow: 'Full stack engineer',
  availability: 'Open to new roles',
} as const;

// ---------------------------------------------------------------- profiles

/**
 * The profiles row: brand marks, not two-letter text chips.
 *
 * These ARE the links now. The tile that holds them is a plain div rather than
 * an anchor precisely so they can be — an anchor inside an anchor is invalid
 * and the browser silently repairs it by closing the outer one early.
 *
 * Both are live links now.
 */
export const socials: SocialItem[] = [
  { label: 'LinkedIn', icon: 'linkedin', href: linkedin.href },
  { label: 'GitHub', icon: 'github', href: github.href },
];
