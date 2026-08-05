import type { Metadata } from 'next';

import PageShell from '@/components/PageShell';
import PageHead from '@/components/PageHead';
import Chip, { ChipRow } from '@/components/Chip';
import ProjectCard from '@/components/ProjectCard';
import CtaTile from '@/components/CtaTile';

import { ctaHref, fixedCopy } from '@/content/site';
import { filters, pageHead, projects } from '@/content/work';

export const metadata: Metadata = { title: 'Work' };

/**
 * /work — spec §7: head with filter chips (12) → lead case study (8) + one
 * project (4) → three projects (4+4+4) → CTA (12). Every row sums to 12.
 *
 * Filtering is not implemented. The chips render as plain spans (no `href`,
 * no `onClick`) so the page stays a server component; wiring them up means
 * lifting this file, or a small client island around the chip row, to
 * 'use client'.
 */
export default function Work() {
  return (
    <PageShell>
      {/*
       * Row: 12. The chips sit inside the header, as they do in the mockup
       * (work.html puts .chips within .page-head). PageHead renders children
       * below the lede, which also keeps them outside any linked tile — once
       * filtering is wired up these become buttons, and an interactive element
       * inside a linked tile would nest a control in an <a>.
       */}
      <PageHead
        title={pageHead.title}
        accent={pageHead.accent}
        lede={pageHead.lede}
      >
        <ChipRow>
          {filters.map((filter) => (
            <Chip key={filter}>{filter}</Chip>
          ))}
        </ChipRow>
      </PageHead>

      {/* Rows: 8 + 4 = 12, then 4 + 4 + 4 = 12. Spans live in content/work.ts. */}
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}

      {/* Row: 12 */}
      <CtaTile headline={fixedCopy.ctaHeadline} href={ctaHref} />
    </PageShell>
  );
}
