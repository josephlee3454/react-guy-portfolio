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

// TODO(copy): real GitHub handle. Until then this renders the mockup's on-page
// marker verbatim and the GH chip stays deliberately dead (no href).
export const github = {
  label: '⚠ ADD HANDLE',
  href: undefined as string | undefined,
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
 * The mockup also has a Testimonials item; it is deliberately omitted here.
 * That page's content is entirely fabricated (DESIGN_SPEC §9), so shipping the
 * nav link would ship a route to invented endorsements.
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
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
 * Two chips, LI first.
 *
 * Deliberately href-less. The only place this renders is the home page's
 * profiles tile, which is itself a link — so these must be plain text or the
 * markup nests one anchor inside another. The tile links to /contact, where
 * `linkedin` and `github` above are rendered as real, clickable blocks.
 */
export const socials: SocialItem[] = [{ label: 'LI' }, { label: 'GH' }];
