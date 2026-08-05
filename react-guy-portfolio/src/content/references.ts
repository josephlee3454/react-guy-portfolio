/**
 * Content for /references. Every string is transcribed character-for-character
 * from `design 4/references.html`, with HTML entities decoded (&rsquo; → ’,
 * &mdash; → —, &middot; → ·, &ldquo;/&rdquo; → “/”).
 *
 * THE PRIVACY ARGUMENT IS THE POINT OF THIS PAGE. Three strings carry it and
 * none of them may be paraphrased, tightened or "improved":
 *   - `pageHead.lede`   — "I don’t publish colleagues’ details on a page that
 *                          gets crawled"
 *   - `banner.body`     — "with their permission each time, not as a standing
 *                          list"
 *   - the LinkedIn note — the public, attributed version is the trustworthy one
 * The page is an argument for withholding, and each string states a different
 * half of it. Shortening any one of them turns a position into an excuse.
 *
 * NO NAMES AND NO CONTACT DETAILS APPEAR HERE, deliberately — the three referees
 * are described only by role and employer. That is the page keeping its own
 * promise, not an unfinished draft: do not add placeholder names, initials or
 * "available on request" stand-ins to `referees`.
 *
 * The LinkedIn destination is imported from ./site rather than retyped. It is
 * the same profile the contact page and the profiles row point at, and three
 * copies of a URL is three chances to drift.
 */

import { linkedin } from './site';

/** One of the three `s4` tiles. Role and employer only — see the note above. */
export interface Referee {
  /** `Current · Alphaledger` — tenure, then employer. */
  eyebrow: string;
  /** The referee's role, which is as specific as this page gets. */
  title: string;
  /** What they are placed to speak to. */
  body: string;
}

/** One of the two `s6` tiles at the foot of the page. */
export interface ReferenceNote {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Absent on the second note, which makes an argument rather than pointing
   * somewhere. Present only on the LinkedIn note.
   */
  link?: { label: string; href: string };
}

// ---------------------------------------------------------------- page head

export const pageHead = {
  title: 'References',
  accent: '.',
  lede:
    'Who can speak to what, and what to ask them. Names and contact details ' +
    'on request — I don’t publish colleagues’ details on a page that gets ' +
    'crawled.',
} as const;

// ------------------------------------------------------------------- banner

/**
 * The dashed banner. Its badge reads "Available on request" rather than the
 * "Coming soon" the work and writing banners use — nothing here is pending, the
 * details simply are not published. Banner takes per-page copy for exactly this
 * reason; see the note in `components/Banner.tsx`.
 */
export const banner = {
  badge: 'Available on request',
  title: 'Ask and I’ll make the introduction.',
  body:
    'I keep three current references and will share names, titles and contact ' +
    'details once a conversation is underway — with their permission each time, ' +
    'not as a standing list. If you need them earlier in your process than ' +
    'that, just say so.',
} as const;

// ------------------------------------------------------------------ referees

/** Three tiles, 4 + 4 + 4. Keyed on `title`, which is unique; the first two share an eyebrow. */
export const referees: readonly Referee[] = [
  {
    eyebrow: 'Current · Alphaledger',
    title: 'Engineering manager',
    body:
      'Day-to-day output, how I take feedback, and whether the GraphQL and ' +
      'PostgreSQL work held up as trading volume grew.',
  },
  {
    eyebrow: 'Current · Alphaledger',
    title: 'Frontend engineer',
    body:
      'What my code review is actually like to receive, and whether “full stack” ' +
      'holds up from the side that would notice if it didn’t.',
  },
  {
    eyebrow: 'Former · Amazon',
    title: 'Alexa team',
    body:
      'The voice-authentication data work and the audit system, including how ' +
      'the legal and compliance review went.',
  },
];

// --------------------------------------------------------------------- notes

/**
 * The closing pair, 6 + 6.
 *
 * `link.label` and `link.href` come from site.ts unchanged — the label already
 * drops the id suffix the href keeps, which is what the mockup renders. The
 * trailing ↗ is decoration and lives in the component, not in this string.
 */
export const notes: readonly ReferenceNote[] = [
  {
    eyebrow: 'Public version',
    title: 'LinkedIn recommendations',
    body:
      'Anything colleagues have written publicly lives on my LinkedIn, ' +
      'attributed to real people with real titles. That’s the version worth ' +
      'trusting.',
    link: linkedin,
  },
  {
    eyebrow: 'Worth knowing',
    title: 'What I’d ask instead',
    body:
      'References mostly confirm what you already suspect. If you want a faster ' +
      'read, give me a real problem from your codebase and let me talk through ' +
      'how I’d approach it. That tells you more in twenty minutes than three ' +
      'calls will.',
  },
];
