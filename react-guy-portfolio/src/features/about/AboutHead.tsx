import { Fragment } from 'react';

import { PageHead } from '@/components/PageHead';

export interface AboutHeadProps {
  /** Rendered one per line — the mockup breaks after "the". */
  titleLines: readonly string[];
  /** Amber fragment appended to the last line — the mockup's `<em>`. */
  accent?: string;
  lede?: string;
}

/**
 * The /about header. Row: 12 (PageHead spans 12 itself).
 *
 * Exists so the page never has to build JSX out of content. `content/about.ts`
 * is a .ts module and cannot hold a `<br />`, so the title arrives as lines;
 * turning those lines into a broken heading is a presentation decision about
 * this section, which puts it here rather than in the page or in PageHead —
 * PageHead takes a ReactNode precisely so a caller can decide this.
 */
export const AboutHead = ({ titleLines, accent, lede }: AboutHeadProps) => {
  return (
    <PageHead
      title={titleLines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
      accent={accent}
      lede={lede}
    />
  );
};
