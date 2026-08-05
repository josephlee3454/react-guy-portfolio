import { Fragment } from 'react';

import { PageHead } from '@/components/PageHead';

export interface ContactHeadProps {
  /** Rendered one per line — the mockup breaks after "are". */
  titleLines: readonly string[];
  /** Amber fragment appended to the last line — the mockup's `<em>`. */
  accent?: string;
  lede?: string;
}

/**
 * The /contact header. Row: 12 (PageHead spans 12 itself).
 *
 * Same shape as AboutHead, and for the same reason: `content/contact.ts` is a
 * .ts module and cannot hold a `<br />`, so the title arrives as lines and the
 * decision to break them lives here. PageHead takes a ReactNode title precisely
 * so a caller can make that call.
 */
export const ContactHead = ({ titleLines, accent, lede }: ContactHeadProps) => {
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
