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
 * NO CONTACT DETAILS APPEAR HERE. Two referees are now named, because each
 * published a recommendation under their own name on LinkedIn and the tile
 * quotes it and links to the source — that is pointing at what someone chose to
 * publish, not disclosing what was given in confidence, which is the line the
 * page's argument actually draws. All three are named on that basis.
 *
 * Still forbidden: an email, a phone number, or a name for a referee who has
 * not published one. Do not add placeholder names or "available on request"
 * stand-ins to `referees`.
 *
 * NOTE: `pageHead.lede` and `banner.body` still read as though nobody is named.
 * They need redrafting in Joseph's voice — flagged, not yet done.
 *
 * The LinkedIn destination is imported from ./site rather than retyped. It is
 * the same profile the contact page and the profiles row point at, and three
 * copies of a URL is three chances to drift.
 */

import { linkedin } from './site';

/** One of the three `s4` tiles. */
export interface Referee {
  /** `Current · Alphaledger` — tenure, then employer. */
  eyebrow: string;
  /** The referee's role. */
  title: string;
  /** What they are placed to speak to. */
  body: string;
  /**
   * A recommendation this person has already published under their own name.
   *
   * Optional, and only ever a quotation of something ALREADY PUBLIC — a
   * LinkedIn recommendation the author posted themselves. That is what makes it
   * consistent with the page's argument rather than an exception to it: the
   * page withholds contact details it was given in confidence, and points at
   * what its authors chose to publish. Never put a private reference here.
   */
  quote?: string;
  /** The public profile the quote came from. Required whenever `quote` is set. */
  profile?: { label: string; href: string };
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

/**
 * Three tiles, 4 + 4 + 4. Keyed on `title`, which is unique — the first two
 * share an eyebrow, so the role is what distinguishes them.
 *
 * All three carry a published recommendation and link to its source. Adding a
 * referee without one changes the row's shape; see the note in RefereeRow.
 */
export const referees: readonly Referee[] = [
  {
    eyebrow: 'Current · Alphaledger',
    title: 'Senior engineer',
    /*
     * Named, as all three now are. He published this recommendation under his
     * own name, so attributing it is quoting him accurately rather than
     * disclosing something — the page's rule is about details given in
     * confidence, not about what a referee chose to put on their own profile.
     */
    body: 'Bryant Davis · Senior Engineer, Alphaledger',
    quote:
      'Joseph is one of the most dedicated and hardworking engineers I have had ' +
      'the opportunity to work with. He consistently demonstrates a strong sense ' +
      'of ownership, delivers high-quality results, and approaches complex ' +
      'challenges with a positive, solutions-oriented mindset. Beyond his ' +
      'technical expertise, Joseph is an exceptional collaborator who builds ' +
      'strong working relationships across engineering, product, and design.',
    profile: {
      label: 'linkedin.com/in/bryantdavis-sd',
      href: 'https://www.linkedin.com/in/bryantdavis-sd',
    },
  },
  {
    eyebrow: 'Current · Alphaledger',
    title: 'Project manager',
    /* Named for the same reason as Bryant above — he published this himself. */
    body: 'Brian Berndtson · Project Manager, Alphaledger',
    /*
     * Quoted verbatim, including "Alpha Ledger Technologies" spelled as three
     * words — that is how the author wrote it, and correcting someone's own
     * recommendation to match the site's house spelling would be editing a
     * quotation.
     */
    quote:
      'Managing Joe across several products at Alpha Ledger Technologies gave me ' +
      'a front-row seat to his professionalism, adaptability, and technical ' +
      'ability. Regardless of the project or challenge, Joe quickly learned the ' +
      'business domain, became productive faster than expected, and consistently ' +
      'delivered high-quality work.',
    profile: {
      label: 'linkedin.com/in/bberndtson',
      href: 'https://www.linkedin.com/in/bberndtson',
    },
  },
  {
    /* Former, not current: he worked with Joseph at Alphaledger and is now at AWS. */
    eyebrow: 'Former · Alphaledger',
    title: 'Software engineer',
    /* The eyebrow says where they overlapped; the attribution says where he is now. */
    body: 'Zach Spriggs · Software Developer, AWS',
    quote:
      'I had the pleasure of working alongside Joseph at AlphaLedger, and I can ' +
      'confidently say he’s one of the hardest working engineers I’ve met. He’s ' +
      'constantly investing time into improving his skills, whether that’s ' +
      'learning new technologies, deepening his understanding of existing ones, ' +
      'or practicing outside of work to become a better developer. That ' +
      'dedication shows in the quality of his work and how quickly he’s able to ' +
      'contribute to new projects.',
    profile: {
      label: 'linkedin.com/in/zachspriggs',
      href: 'https://www.linkedin.com/in/zachspriggs',
    },
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
