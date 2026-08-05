/**
 * Content for /about. Every string is real, transcribed from `design 4/about.html`
 * and cross-checked against DESIGN_SPEC §4, which marks this page's copy final.
 *
 * PHRASING THAT MUST NOT DRIFT (spec §4, verbatim requirements):
 *   - The Alphaledger entry ends "Full lifecycle on an Agile team, including a
 *     React Native application from concept through launch." The words "on an
 *     Agile team" are load-bearing — never "solo", "on my own", "by myself".
 *   - Both software titles are "Software Developer". "Full stack engineer" is
 *     the site's positioning line (site.ts `fixedCopy.heroEyebrow`), not a
 *     claimed job title.
 *   - `stackGroups` LEADS WITH FRONTEND. The spec calls the ordering a specific
 *     instruction: the positioning is full stack, evenly weighted, so backend
 *     must not be promoted to first.
 *   - Timeline markers use en-dashes (–, U+2013) and titles use interpuncts
 *     (·, U+00B7). Neither is a hyphen.
 *
 * CHIP EMPHASIS IS SEMANTIC. `filled: true` means "what I'd lead with today";
 * outlined means "used regularly, not headline". That is not a ranking of years
 * served, so the apparent anomalies are all deliberate and must not be
 * normalised: Java is outlined despite three years at Amazon, AG Grid is
 * outlined while Material UI is filled, and DynamoDB is filled under Data but
 * outlined under Cloud.
 *
 * No JSX here: this is a .ts module, so the page title arrives as lines that
 * AboutHead joins with <br />, and each stack group names its icon rather than
 * holding one.
 */

import type { TimelineItemProps } from '@/components/Timeline';
import { fullName } from './site';

/**
 * One chip. `filled` is the mockup's `.chips b.on` — emphasis, not selection
 * state, which is why nothing here maps to Chip's `active` prop.
 */
export interface AboutChip {
  label: string;
  filled: boolean;
}

/** Keys into the icon map in `features/about/StackRow.tsx`. */
export type StackIconName = 'monitor' | 'server' | 'database' | 'cloud';

export interface StackGroup {
  icon: StackIconName;
  eyebrow: string;
  title: string;
  chips: readonly AboutChip[];
  note: string;
}

/** The two `s6` tiles at the foot of the page: education and military. */
export interface AboutNote {
  eyebrow: string;
  title: string;
  body: string;
  chips: readonly AboutChip[];
}

export interface PhotoContent {
  src: string;
  /** The tile is exposed as role="img", so this is its accessible name. */
  alt: string;
}

export const pageHead = {
  /** Rendered one per line — the mockup breaks after the comma. */
  titleLines: ['Both halves,', 'on purpose'],
  /** The mockup's <em>: an amber full stop. */
  accent: '.',
  lede:
    'Five years building production services and the interfaces they power. ' +
    'Three of them at Amazon on Alexa, two at Alphaledger writing the GraphQL ' +
    'layer in the morning and the React consuming it in the afternoon. ' +
    'Seattle-based, open to new roles.',
} as const;

/**
 * TODO(copy): spec §4 wants this served as WebP; `public/assets/portrait.jpg`
 * is what exists today, so the page points at the JPEG until the conversion.
 *
 * The name comes from site.ts rather than being repeated here.
 */
export const photo: PhotoContent = {
  src: '/assets/portrait.jpg',
  alt: `Portrait of ${fullName}`,
};

export const philosophy = {
  eyebrow: 'How I work',
  title: 'I stopped picking a side.',
  /** Two paragraphs in this revision, rendered in order. */
  body: [
    'Plenty of engineers describe themselves as full stack and mean they can ' +
      'read the other half. I ship on both. At Alphaledger that means designing ' +
      'the schema and the resolvers, then building the AG Grid views that hit ' +
      'them — and reviewing other engineers’ frontend changes along the way.',
    'It also changes the decisions. Knowing what the grid needs shapes the ' +
      'resolver; knowing what the query costs shapes the view. When I bring the ' +
      'team a tooling recommendation it comes with a prototype attached, not an ' +
      'opinion.',
  ],
} as const;

export const credentialsHeading = {
  eyebrow: 'Experience',
  title: 'Where I’ve been',
} as const;

/**
 * Three entries — the qualification that used to sit here now has its own tile
 * (`education`, below).
 *
 * `dateTime` carries the start year so each marker renders as a real <time>.
 * The mockup's `<time>2024 – NOW</time>` has no datetime attribute, and its
 * text is not a parseable date, so the attribute is added rather than copied.
 */
export const credentials: TimelineItemProps[] = [
  {
    marker: '2024 – NOW',
    dateTime: '2024',
    title: 'Software Developer · Alphaledger',
    description:
      'Enterprise blockchain platform for municipal bond issuance and trading, ' +
      'Poulsbo WA. Built and optimised the NestJS GraphQL layer — schema, ' +
      'resolvers, mutations, DataLoaders. Designed and tuned PostgreSQL schemas ' +
      'for high-volume trading workflows. Delivered React features with AG Grid, ' +
      'AG Charts and Material UI, and supported other frontend engineers through ' +
      'review and pairing. Full lifecycle on an Agile team, including a React ' +
      'Native application from concept through launch.',
  },
  {
    marker: '2021 – 2024',
    dateTime: '2021',
    title: 'Software Developer · Amazon (Alexa)',
    description:
      'Java services on AWS Lambda behind API Gateway, with S3, CloudWatch and ' +
      'least-privilege IAM. Designed the DynamoDB solution for large-scale ' +
      'processing and secure storage of customer-sensitive data behind voice ' +
      'authentication, and the audit system that detected fraud and integrity ' +
      'drift around it. Built Alexa skills integrated with LLMs for enterprise ' +
      'clients including Verizon and T-Mobile.',
  },
  {
    marker: '2011 – 2015',
    dateTime: '2011',
    title: 'Vehicle Commander · U.S. Marine Corps',
    description:
      'Led a unified anti-armor team at Camp Pendleton, running operations and ' +
      'training under pressure, and instructed units outside my own on ' +
      'job-specific tactics. Meritorious Mast at Camp Pendleton; Certificate of ' +
      'Commendation, Afghanistan; Certificate of Appreciation, Yemen.',
  },
];

/** The sub-head above the stack row. `id` is the home page's `/about#stack`. */
export const stackHead = {
  id: 'stack',
  title: 'Stack',
  accent: '.',
  lede:
    'Filled chips are what I’d lead with. Outlined ones I use regularly and ' +
    'can hold my own in.',
} as const;

/**
 * Four groups across one nested row. FRONTEND FIRST — see the header note.
 * Chip states are transcribed one for one from the mockup; do not "correct" them.
 */
export const stackGroups: StackGroup[] = [
  {
    icon: 'monitor',
    eyebrow: 'Frontend',
    title: 'Interfaces',
    chips: [
      { label: 'React', filled: true },
      { label: 'TypeScript', filled: true },
      { label: 'Material UI', filled: true },
      { label: 'AG Grid', filled: false },
      { label: 'AG Charts', filled: false },
      { label: 'React Native', filled: false },
    ],
    note: 'Data-dense trading views, and code review for the rest of the frontend team.',
  },
  {
    icon: 'server',
    eyebrow: 'Backend',
    title: 'Services & APIs',
    chips: [
      { label: 'NestJS', filled: true },
      { label: 'GraphQL', filled: true },
      { label: 'Node.js', filled: true },
      { label: 'Java', filled: false },
      { label: 'REST', filled: false },
      { label: 'Auth0 / SSO', filled: false },
      { label: 'Microservices', filled: false },
    ],
    note:
      'Schema, resolvers, mutations and DataLoaders at Alphaledger; three years ' +
      'of Java services before that.',
  },
  {
    icon: 'database',
    eyebrow: 'Data',
    title: 'Schemas & queries',
    chips: [
      { label: 'PostgreSQL', filled: true },
      { label: 'SQL', filled: true },
      { label: 'DynamoDB', filled: true },
      { label: 'TypeORM', filled: false },
      { label: 'Query tuning', filled: false },
      { label: 'DBeaver', filled: false },
    ],
    note:
      'Relational modelling for high-volume trading workflows; DynamoDB for ' +
      'sensitive data at Amazon scale.',
  },
  {
    icon: 'cloud',
    eyebrow: 'Cloud',
    title: 'AWS',
    chips: [
      { label: 'Lambda', filled: true },
      { label: 'API Gateway', filled: true },
      { label: 'S3', filled: false },
      { label: 'CloudWatch', filled: false },
      { label: 'IAM', filled: false },
      { label: 'DynamoDB', filled: false },
    ],
    note:
      'Serverless by default. Least-privilege IAM and CloudWatch monitoring as ' +
      'part of the build, not after it.',
  },
];

/** Left half of the closing pair. Spec §4: stated plainly, not hidden. */
export const education: AboutNote = {
  eyebrow: 'How I got here',
  title: 'No CS degree.',
  body:
    'Code Fellows, then Coding Dojo, then the Amazon Apprenticeship in full ' +
    'stack web development — which is also how I got to Alexa. Five years of ' +
    'production work since. I mention it because it explains the shape of my ' +
    'experience, not because I think it needs defending.',
  chips: [
    { label: 'Amazon Apprenticeship', filled: false },
    { label: 'Coding Dojo', filled: false },
    { label: 'Code Fellows', filled: false },
    // Spec §4 puts the Amazon hackathon accolade with education, not with the
    // military tile.
    { label: 'Hackathon accolade, Amazon', filled: false },
  ],
};

/** Right half of the closing pair. */
export const military: AboutNote = {
  eyebrow: 'Before software',
  title: 'Four years in the Marine Corps.',
  body:
    'I led an anti-armor team and taught tactics to units outside my own. The ' +
    'transferable part isn’t discipline — it’s being calm when something is ' +
    'genuinely on fire, and knowing that the person who can explain the thing ' +
    'is worth more than the person who merely knows it.',
  chips: [
    { label: 'Meritorious Mast, Camp Pendleton CA', filled: false },
    { label: 'Certificate of Commendation, Afghanistan', filled: false },
    { label: 'Certificate of Appreciation, Yemen', filled: false },
  ],
};
