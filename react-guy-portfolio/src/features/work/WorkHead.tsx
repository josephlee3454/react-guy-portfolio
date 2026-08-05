import { PageHead } from '@/components/PageHead';
import { WorkFilters, type WorkFilter } from './WorkFilters';

export interface WorkHeadProps {
  title: string;
  /** Amber fragment appended to the title — the mockup's `<em>`. */
  accent?: string;
  lede?: string;
  filters: readonly WorkFilter[];
}

/**
 * The /work header: title, lede, and the category filter row. Row: 12.
 *
 * The chips sit inside the header, as they do in the mockup (work.html puts
 * .chips within .page-head). PageHead renders children below the lede, which
 * also keeps them outside any linked tile — once filtering is wired up these
 * become buttons, and an interactive element inside a linked tile would nest a
 * control in an `<a>`. That placement is the reason this composition is a
 * feature and not two siblings in the page: the chips' position relative to the
 * header is load-bearing, so the two cannot be assembled independently.
 */
export const WorkHead = ({ title, accent, lede, filters }: WorkHeadProps) => {
  return (
    <PageHead title={title} accent={accent} lede={lede}>
      <WorkFilters filters={filters} />
    </PageHead>
  );
};
