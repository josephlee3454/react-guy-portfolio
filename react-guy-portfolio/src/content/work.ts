/**
 * Content for /work.
 *
 * Real content, from Joseph's CV and verified final per DESIGN_SPEC §4.
 *
 * ORDER IS SPEC-PROTECTED. §4: "the work page is deliberately balanced — two
 * frontend-led projects, three backend. Do not reorder these to put backend
 * first; it was a specific instruction." The array order below is the render
 * order; changing it changes the positioning claim the page makes.
 *
 * PHRASING THAT MUST NOT DRIFT (§4): the React Native app was concept to launch
 * **on an Agile team** — never "solo", "on my own", or "by myself".
 *
 * The array is typed as ProjectCardProps[], so `span` is part of the content
 * rather than the page, and dropping a field is a compile error rather than a
 * ragged grid row.
 */

import type { BannerProps } from '@/components/Banner';
import type { ProjectCardProps } from '@/components/ProjectCard';
import type { WorkFilter } from '@/features/work/WorkFilters';

export const pageHead = {
  title: 'Selected work',
  /** The mockup's <em>: an amber full stop. */
  accent: '.',
  lede:
    'Five projects across both halves of the stack — two frontend-led, three ' +
    'backend. Happy to go deeper on any of them in conversation.',
} as const;

/**
 * The coming-soon banner, between the header and the project grid. Row: 12.
 *
 * WHAT IS PENDING IS THE WRITING, NOT THE WORK. DESIGN_SPEC §4 is explicit:
 * "the projects are real and shipped; only the long-form write-ups are missing.
 * Never word this page as though the work itself is pending." The badge says
 * "Case studies in progress" for that reason, and it is deliberately NOT the
 * "Coming soon" the writing page and the home Writing tile use — every banner
 * carries its own copy, so none of these three strings may be merged into a
 * shared constant.
 */
export const banner = {
  badge: 'Case studies in progress',
  title: 'The write-ups are coming.',
  body:
    'Everything below shipped — these are the summaries. Full case studies with ' +
    'architecture decisions, what went wrong, and the screenshots are being written ' +
    'now. Ask me about any of them in the meantime.',
} satisfies BannerProps;

/**
 * The category row. Labels match the categories in the project eyebrows below.
 *
 * Rendered as plain, non-interactive chips: filtering is not implemented, and
 * this page is a server component, so there is no click handler to give them.
 * "All" is filled in the sense DESIGN_SPEC §4 gives a filled chip everywhere
 * else on the site — emphasis, not a control that is switched on. See the note
 * on `emphasis` in WorkFilters.
 */
export const filters: readonly WorkFilter[] = [
  { label: 'All', emphasis: true },
  { label: 'Frontend' },
  { label: 'Backend' },
  { label: 'Data' },
  { label: 'Mobile' },
];

/**
 * The five projects.
 *
 * - `eyebrow` is `company · category[ · category]`. There is no year: the
 *   reader scanning a card grid wants to know who the work was for and which
 *   half of the stack it sat in. Each `·`-delimited segment stays within
 *   Eyebrow's three-word cap.
 * - `href` is '#' throughout — no case-study routes exist. Point each at its
 *   own page when they do.
 * - `image` is omitted throughout: DESIGN_SPEC §4 lists real screenshots as
 *   still missing, so every shot is the gradient plus its `shotLabel`, which
 *   names the employer rather than pretending to be a caption.
 *
 * Spans: 8 + 4 on the first row, then 4 + 4 + 4.
 */
export const projects: ProjectCardProps[] = [
  {
    span: 8,
    lead: true,
    href: '#',
    shot: 'linear-gradient(145deg, #27332F, #151918)',
    shotLabel: 'AMAZON — ALEXA',
    eyebrow: 'Amazon · Backend · LLM',
    title: 'Conversational Alexa skills for Verizon and T-Mobile',
    description:
      'Built Alexa skills integrated with LLM models to power conversational chatbots for ' +
      'enterprise clients, each tailored to a different business’s support flows and voice ' +
      'constraints.',
    tags: ['Java', 'Lambda', 'LLM integration', 'Alexa Skills Kit'],
  },
  {
    span: 4,
    href: '#',
    shot: 'linear-gradient(200deg, #2E2A22, #171614)',
    shotLabel: 'AMAZON — ALEXA',
    eyebrow: 'Amazon · Data · Security',
    title: 'Secure store and audit layer for voice authentication',
    description:
      'DynamoDB design for large-scale processing and storage of customer-sensitive data, plus ' +
      'the audit system that watched it — anomaly detection and integrity checks. Met legal and ' +
      'compliance requirements for data protection.',
    tags: ['DynamoDB', 'Java', 'IAM', 'CloudWatch'],
  },
  {
    span: 4,
    href: '#',
    shot: 'linear-gradient(120deg, #22302F, #141817)',
    shotLabel: 'ALPHALEDGER',
    eyebrow: 'Alphaledger · Frontend',
    title: 'Trading views for municipal bond workflows',
    description:
      'React features built on AG Grid and AG Charts for dense, partner-facing trading data, ' +
      'with Material UI underneath. Reviewed and paired on the rest of the team’s frontend work.',
    tags: ['React', 'AG Grid', 'AG Charts', 'Material UI', 'TypeScript'],
  },
  {
    span: 4,
    href: '#',
    shot: 'linear-gradient(165deg, #2A2C34, #15161A)',
    shotLabel: 'ALPHALEDGER',
    eyebrow: 'Alphaledger · Backend · Data',
    title: 'GraphQL layer and PostgreSQL schema',
    description:
      'Schema, resolvers, mutations and DataLoaders in NestJS, and the relational design and ' +
      'query tuning behind them — keeping response times flat as trading volume grew.',
    tags: ['NestJS', 'GraphQL', 'PostgreSQL', 'TypeORM'],
  },
  {
    span: 4,
    href: '#',
    shot: 'linear-gradient(135deg, #31291F, #181513)',
    shotLabel: 'ALPHALEDGER',
    eyebrow: 'Alphaledger · Mobile',
    title: 'React Native app, concept to launch',
    // "on an Agile team" is spec-protected phrasing — see the note at the top.
    description:
      'Worked the full product lifecycle on an Agile team — ideation, prioritisation, ' +
      'implementation, testing — on a React Native application that went from concept through ' +
      'to launch.',
    tags: ['React Native', 'TypeScript', 'Agile'],
  },
];
