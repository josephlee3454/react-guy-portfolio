/**
 * Contact page content.
 *
 * Every string here is placeholder. The mockup's location, availability window
 * and example names are invented (design 2/README-FOR-CLAUDE.md), so anything
 * that would read as a fact about the site's owner is left as an obvious blank
 * rather than carried over.
 *
 * The email is imported from site.ts rather than retyped — it also appears in
 * the footer, and two copies of an address drift.
 */

import type { FieldProps } from '@/components/Field';
import type { PageHeadProps } from '@/components/PageHead';
import type { TimelineItemProps } from '@/components/Timeline';
import { email, fixedCopy } from '@/content/site';

/**
 * The h1 is the CTA headline: this page is the CTA (spec §7), so it opens with
 * the same sentence the tile carries on the other four pages. Derived from
 * `fixedCopy` rather than retyped so the two cannot drift, and split at the
 * question mark so the closing punctuation renders in the accent colour — the
 * mockup's `<em>`.
 */
const CTA_QUESTION = fixedCopy.ctaHeadline; // 'So what are we building?'

// TODO(copy): real eyebrow and lede. The title is fixed copy — do not swap it.
export const contactHead = {
  title: CTA_QUESTION.replace(/\?$/, ''),
  accent: '?',
  lede: "Tell me what you're trying to make, or what's currently broken. Rough notes are fine — the messy version is more useful than a polished brief.",
} satisfies PageHeadProps;

/**
 * The four form controls, in order.
 *
 * Spec §7: the form is markup only — no action, no handler, no validation. So
 * no field sets `required`, which would introduce browser-side validation for a
 * form that cannot be submitted anyway.
 */
// TODO(copy): real labels, placeholders and work types.
export const formFields: FieldProps[] = [
  { label: 'Your name', name: 'name', type: 'text', placeholder: 'Your name' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'you@company.com' },
  {
    label: 'What kind of work',
    name: 'work-type',
    /*
     * Present, so Field renders a native <select> — contact.html's third
     * control. The options track spec §4's availability line ("full-time,
     * contract, or the thing you haven't named yet") rather than the mockup's
     * own list, which names service offerings nobody has confirmed.
     */
    options: [
      { value: 'full-time', label: 'Full-time role' },
      { value: 'contract', label: 'Contract or project work' },
      { value: 'unnamed', label: "Something you haven't named yet" },
    ],
  },
  {
    label: 'What are we building',
    name: 'message',
    multiline: true,
    placeholder: 'The shape of the problem, the deadline if there is one, and anything already tried.',
  },
];

/**
 * The button is `type="button"`, as in the mockup — there is nothing to submit
 * to. See the note on the page itself.
 */
// TODO(copy): real submit label.
export const submitLabel = 'Send it';

/**
 * The direct-details tile. Four blocks: availability, email, location, socials.
 *
 * `status` is mono uppercase at 11px, so spec §1's four-word cap on the mono
 * face applies — a long availability sentence cannot go here even once the real
 * copy exists.
 */
// TODO(copy): real availability status, location and location note.
export const directDetails = {
  availabilityLabel: 'Availability',
  status: 'Status placeholder',
  emailLabel: 'Email',
  /** Shared with the footer — see site.ts. */
  email,
  locationLabel: 'Based in',
  location: 'City · Timezone',
  locationNote: 'Placeholder note — working pattern and overlap hours go here once they are settled.',
  socialsLabel: 'Find me elsewhere',
};

/**
 * The "before you write" steps.
 *
 * The only numbered markers in the design (spec §7): this genuinely is a
 * sequence, where the about page's credentials are dated and use years. The
 * markers are sequence positions and not dates, so no `dateTime` is supplied —
 * Timeline renders them as plain spans rather than `<time>` elements.
 */
// TODO(copy): real steps.
export const beforeYouWrite = {
  eyebrow: 'Before you write',
  heading: 'Three things that make a first message easy to answer.',
  steps: [
    {
      marker: '01',
      title: 'What already exists',
      description:
        'A repo, a design file, a spreadsheet, or nothing at all. All fine — it just helps to know which.',
    },
    {
      marker: '02',
      title: 'What "done" looks like',
      description:
        "One sentence. If you can't write it yet, say that instead; it's useful information.",
    },
    {
      marker: '03',
      title: 'When it matters',
      description:
        'A real date beats "ASAP". If there is no deadline, that changes what I would recommend.',
    },
  ] satisfies TimelineItemProps[],
};
