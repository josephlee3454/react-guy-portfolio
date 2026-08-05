/**
 * Site-wide text. Edit strings here — no component needs touching.
 *
 * Shapes live in ./types.ts. This module has no 'use client' directive, so both
 * server components and the client-side MobileMenu can read it.
 */

import type { NavItem, SocialItem } from './types';

// ---------------------------------------------------------------- identity

/** Brand mark in the nav. The trailing period is added by the component, in amber. */
export const brand = 'Joseph Lee';

// TODO(copy): real email.
export const email = 'hello@yourname.com';

// ---------------------------------------------------------------- navigation

/** Order is fixed by DESIGN_SPEC §7. Every item points at a real page. */
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
 * equivalents is a downgrade the spec calls out by name. Reasons are in the
 * spec, not repeated here.
 */
export const fixedCopy = {
  ctaHeadline: 'So what are we building?',
  navCta: 'Start here',
  heroEyebrow: 'FULL STACK ENGINEER',
  availability: "Open to full-time, contract, or the thing you haven't named yet.",
} as const;

// ---------------------------------------------------------------- profiles

// TODO(copy): real profile links. Rendered as 36px circular chips.
export const socials: SocialItem[] = [
  { label: 'GH' },
  { label: 'LI' },
  { label: 'X' },
  { label: 'RS' },
];
