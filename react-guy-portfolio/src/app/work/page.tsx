import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { Banner } from '@/components/Banner';
import { ProjectCard } from '@/components/ProjectCard';
import { CtaTile } from '@/components/CtaTile';

import { WorkHead } from '@/features/work/WorkHead';

import { ctaHref, fixedCopy } from '@/content/site';
import { banner, filters, pageHead, projects } from '@/content/work';

export const metadata: Metadata = { title: 'Work' };

/**
 * /work — on §2's 12-column grid: head with filter chips (12) → coming-soon banner (12) →
 * lead case study (8) + one project (4) → three projects (4+4+4) → CTA (12).
 * Every row sums to 12.
 *
 * The banner sits above the cards, not below them: it frames the summaries the
 * reader is about to scan as summaries. Underneath the grid it would read as a
 * footnote to work already skimmed.
 *
 * Assembly only. The header earned a feature — the filter chips have to sit
 * inside it, and they are where client state will land — but the project grid
 * did not: `projects.map(<ProjectCard {...p} />)` adds no layout, no state and
 * no styling of its own, and every span already lives in content/work.ts, typed
 * as ProjectCardProps. Wrapping that line in a feature for symmetry would add a
 * file that only forwards props.
 */
export const Work = () => {
  return (
    <PageShell route="/work">
      <WorkHead
        title={pageHead.title}
        accent={pageHead.accent}
        lede={pageHead.lede}
        filters={filters}
      />

      <Banner {...banner} />

      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}

      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
};

export default Work;
