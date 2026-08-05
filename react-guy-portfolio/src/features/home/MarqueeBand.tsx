import { Marquee } from '@/components/Marquee';

export interface MarqueeBandProps {
  /** Text before the emphasised word. */
  lead: string;
  /** Emphasised: --bone at weight 800. */
  emphasis: string;
  /** Text after the emphasised word. */
  trail: string;
  /** Accent glyph closing each repetition. Decoration, not copy. */
  glyph: string;
  /** Repetitions. Enough to overflow the widest viewport; the mockup uses six. */
  repeat: number;
}

/**
 * Row 4 — the full-width scrolling band. Marquee carries its own full-width
 * spans, so there is no span prop here.
 *
 * The phrase is built here rather than in content/home.ts because it is not
 * plain text — the emphasis and the accent glyph are markup, and home.ts is a
 * .ts data module. It supplies the parts; this composes them. That composition
 * is the whole reason this feature exists rather than page.tsx rendering
 * <Marquee> directly.
 */
export const MarqueeBand = ({ lead, emphasis, trail, glyph, repeat }: MarqueeBandProps) => {
  return (
    <Marquee
      items={Array.from({ length: repeat }, () => (
        <>
          {lead} <b>{emphasis}</b> {trail} <i>{glyph}</i>
        </>
      ))}
    />
  );
};
