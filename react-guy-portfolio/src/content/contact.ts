/**
 * Contact page content.
 *
 * Real content, verified final per DESIGN_SPEC §4. The one deliberate blank is
 * the GitHub handle; it comes from site.ts rather than being retyped here.
 *
 * Email, LinkedIn and GitHub are all imported from site.ts rather than retyped
 * — the address also appears in the footer, and two copies of a contact detail
 * drift.
 */

import type { FieldProps } from '@/components/Field';
import type { ContactHeadProps } from '@/features/contact/ContactHead';
import { email, fixedCopy, github, linkedin } from '@/content/site';

/**
 * The h1 is the CTA headline: this page IS the CTA, so it opens with
 * the same sentence the tile carries on the other four pages, broken across two
 * lines with the question mark in the accent colour — the mockup's `<em>`.
 *
 * WHY EXPLICIT LINES rather than deriving them from `fixedCopy.ctaHeadline`:
 * the previous version stripped the `?` with a regex, which produced one line.
 * Producing two means also encoding where the break falls, and every derivation
 * that does so (slice at the third word, split on a marker substring) hides a
 * typographic decision inside string surgery that silently mis-breaks — or
 * throws away a line — if the headline is ever reworded. So the lines are
 * literal, matching the `titleLines` precedent AboutHead already set, and the
 * check below keeps them from drifting away from the fixed copy they mirror.
 */
const titleLines = ['So what are', 'we building'] as const;
const accent = '?';

if (
  process.env.NODE_ENV !== 'production' &&
  `${titleLines.join(' ')}${accent}` !== fixedCopy.ctaHeadline
) {
  console.warn(
    `[contact] The page title "${titleLines.join(' ')}${accent}" no longer matches ` +
      `fixedCopy.ctaHeadline "${fixedCopy.ctaHeadline}". This page IS the CTA — the two ` +
      'have to read as the same sentence. Re-break the lines above.',
  );
}

export const contactHead = {
  titleLines,
  accent,
  lede:
    'Hiring, or just want to argue about GraphQL resolver design and whether AG Grid was the ' +
    'right call — either is welcome.',
} satisfies ContactHeadProps;

/**
 * The four form controls, in order.
 *
 * Spec §10: the form is live and POSTs to Formspree, so every control carries a
 * `name` — Formspree only saves named fields. `email` is named exactly that so
 * Formspree sets reply-to from it automatically; do not rename it.
 *
 * The placeholder name is an invented example (as in the mockup) and reads as
 * one: it sits in a placeholder, which no reader mistakes for a fact about the
 * site's owner.
 */
export const formFields: FieldProps[] = [
  {
    label: 'Your name',
    name: 'name',
    type: 'text',
    placeholder: 'Jane Okafor',
    required: true,
    autoComplete: 'name',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'jane@company.com',
    required: true,
    autoComplete: 'email',
  },
  {
    label: 'What’s this about',
    name: 'topic',
    /*
     * Present, so Field renders a native <select> — contact.html's third
     * control. Four options, ordered by how much of Joseph's attention each
     * would get: the page is aimed at hiring first (spec §4, "Open to new
     * roles") but does not pretend the other three do not happen.
     */
    options: [
      { value: 'full-time', label: 'A full-time role' },
      { value: 'contract', label: 'Contract work' },
      { value: 'technical', label: 'Technical question' },
      { value: 'other', label: 'Something else' },
    ],
  },
  {
    label: 'Message',
    name: 'message',
    multiline: true,
    placeholder: 'The role, the team, and what the first six months would look like.',
  },
];

/** The resting button label. See `formStatus` for the other two it takes on. */
export const submitLabel = 'Send it';

/**
 * Formspree form id. Not a secret — it ships in the client bundle whichever way
 * it is stored, and the endpoint is public by design.
 */
export const formspreeId = 'mbgrjkqd';

/**
 * Every string the form can say back, from the mockup's own handler
 * (contact.html:78-100). Reader-visible prose, so it lives here rather than in
 * the component — nothing a visitor reads should need a component opened to
 * find it.
 *
 * The button takes three labels: `submitLabel` at rest, `sendingLabel` while a
 * submission is in flight, `retryLabel` once one has failed. Spec §10: "button
 * re-enables as 'Try again'" — reverting to "Send it" after a failure would
 * read as though nothing had happened.
 *
 * `successBody` interpolates `email` rather than repeating the address, for the
 * reason in this file's header: two copies of a contact detail drift.
 */
export const formStatus = {
  successTitle: 'Message sent.',
  successBody:
    'Thanks — it lands in my inbox and I will reply from there. If you would rather ' +
    `not wait, ${email} reaches me directly.`,
  errorMessage: 'Could not send — email me directly instead.',
  sendingLabel: 'Sending…',
  retryLabel: 'Try again',
} as const;

/**
 * The direct-details tile. Five blocks: availability, email, LinkedIn, GitHub,
 * location.
 *
 * `status` is mono uppercase at 11px, so spec §1's four-word cap on the mono
 * face applies — "Open to new roles" is exactly four. It is `fixedCopy` because
 * the same line appears on the home page; one availability claim, one string.
 *
 * `linkedin` and `github` both carry a display label separate from their href —
 * the visible text drops the id suffix and the scheme respectively, while the
 * link still goes to the full URL.
 */
export const directDetails = {
  availabilityLabel: 'Availability',
  status: fixedCopy.availability,
  emailLabel: 'Email',
  /** Shared with the footer — see site.ts. */
  email,
  linkedinLabel: 'LinkedIn',
  /** `{ label, href }` — the display text drops the id suffix the href keeps. */
  linkedin,
  githubLabel: 'GitHub',
  github,
  locationLabel: 'Based in',
  location: 'Seattle, WA · Pacific Time',
};
