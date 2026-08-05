import { Fragment } from 'react';
import { Marquee } from '@/components/Marquee';

export interface MarqueeBandProps {
  /** The technology names, in order. Each is followed by the glyph. */
  items: readonly string[];
  /** Accent glyph after every name. Decoration, not copy. */
  glyph: string;
  /** Repetitions of the whole list. Enough to overflow the widest viewport. */
  repeat: number;
}

/**
 * Row 4 — the full-width scrolling band. Marquee carries its own full-width
 * spans, so there is no span prop here.
 *
 * The line is built here rather than in content/home.ts because it is not plain
 * text: the separator is an `<i>` the marquee styles in the accent colour, and
 * home.ts is a .ts data module. It supplies the words; this composes them. That
 * composition is the whole reason this feature exists rather than page.tsx
 * rendering <Marquee> directly.
 *
 * Each entry passed to Marquee is one full pass of the list, so `repeat`
 * controls how many passes the track holds — Marquee then duplicates the whole
 * set once more for the seamless loop.
 *
 * There is no emphasised word: design 4 dropped the mockup's `<b>`, so nothing
 * here is bolded and Marquee's `& b` rule simply goes unused.
 */
export const MarqueeBand = ({ items, glyph, repeat }: MarqueeBandProps) => {
  return (
    <Marquee
      items={Array.from({ length: repeat }, () =>
        items.map((item) => (
          // The names are unique within a pass, so the word is a stable key.
          <Fragment key={item}>
            {item} <i>{glyph}</i>{' '}
          </Fragment>
        )),
      )}
    />
  );
};
