/**
 * Site-wide content. Everything here is placeholder pending real copy.
 *
 * This module has no 'use client' directive, so both server components and the
 * client-side Nav can import it — which is why the nav item list lives here
 * rather than inside Nav.tsx.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialItem {
  label: string;
  href?: string;
}

// TODO(copy): real brand mark. The trailing period is set in the component,
// and is rendered in the accent colour.
export const brand = 'yourname';

// TODO(copy): real email.
export const email = 'hello@yourname.com';

/**
 * Nav order is fixed by DESIGN_SPEC.md §7: Home · About · Work · Writing · Contact.
 * Every item points at a real page — the design has no dropdowns, no external
 * links, and no same-page anchors.
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Spec §4 fixed copy — do NOT swap these for generic equivalents.
 * Each was chosen for register and is documented in the spec.
 */
export const fixedCopy = {
  /** Assumes the project is already happening rather than asking permission. */
  ctaHeadline: 'So what are we building?',
  /** Matched to the CTA's register. Not "Let's talk". */
  navCta: 'Start here',
  heroEyebrow: 'FULL STACK ENGINEER',
  /** Naming the shapes reads as choosing; "open to anything" reads as needing anything. */
  availability: "Open to full-time, contract, or the thing you haven't named yet.",
} as const;

/** The CTA tile appears on every page except contact — that page IS the CTA. */
export const ctaHref = '/contact';

// TODO(copy): real profile links. Rendered as 36px circular chips.
// Items inside a linked Tile must omit href — see SocialRow's docs.
export const socials: SocialItem[] = [
  { label: 'GH' },
  { label: 'LI' },
  { label: 'X' },
  { label: 'RS' },
];
