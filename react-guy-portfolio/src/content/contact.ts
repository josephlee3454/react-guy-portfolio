/**
 * Contact page content.
 *
 * Real content, verified final per DESIGN_SPEC §4. The one deliberate blank is
 * the GitHub handle, which §4 lists as still missing and marks on this page as
 * `⚠ ADD HANDLE`; it comes from site.ts rather than being invented here.
 *
 * Email, LinkedIn and GitHub are all imported from site.ts rather than retyped
 * — the address also appears in the footer, and two copies of a contact detail
 * drift.
 */

import type { FieldProps } from '@/components/Field';
import type { ContactHeadProps } from '@/features/contact/ContactHead';
import { email, fixedCopy, github, linkedin } from '@/content/site';

/**
 * The h1 is the CTA headline: this page is the CTA (spec §7), so it opens with
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
 * Spec §7: the form is markup only — no action, no handler, no validation. So
 * no field sets `required`, which would introduce browser-side validation for a
 * form that cannot be submitted anyway.
 *
 * The placeholder name is an invented example (as in the mockup) and reads as
 * one: it sits in a placeholder, which no reader mistakes for a fact about the
 * site's owner.
 */
export const formFields: FieldProps[] = [
  { label: 'Your name', name: 'name', type: 'text', placeholder: 'Jane Okafor' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'jane@company.com' },
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

/**
 * The button is `type="button"`, as in the mockup — there is nothing to submit
 * to. See the note on the page itself.
 */
export const submitLabel = 'Send it';

/**
 * The direct-details tile. Five blocks: availability, email, LinkedIn, GitHub,
 * location.
 *
 * `status` is mono uppercase at 11px, so spec §1's four-word cap on the mono
 * face applies — "Open to new roles" is exactly four. It is `fixedCopy` because
 * the same line appears on the home page; one availability claim, one string.
 *
 * `github` renders as plain text, not a link: §4 lists the handle as the
 * highest-value remaining gap, and site.ts carries the mockup's `⚠ ADD HANDLE`
 * marker verbatim. A guessed URL would be worse than a visible blank.
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
