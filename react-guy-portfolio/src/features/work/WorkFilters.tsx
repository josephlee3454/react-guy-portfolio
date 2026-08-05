import { Chip, ChipRow } from '@/components/Chip';

export interface WorkFiltersProps {
  filters: readonly string[];
}

/**
 * The category filter row on /work.
 *
 * A module of its own, even though it is three lines today, because it is the
 * one part of this page with a future: filtering is not implemented, and the
 * chips render as plain spans (no `href`, no `onClick`) so the page stays a
 * server component. Wiring them up means a `'use client'` boundary, and having
 * the row already isolated means that boundary lands on this file alone instead
 * of dragging the page head — or the page — into the client bundle with it.
 * Extracting it now is that preparation; no state is added here yet.
 *
 * NESTING TRAP — why this must not move into a tile: once the chips become
 * buttons, an interactive element inside a `<Tile href="...">` would nest a
 * control inside that tile's `<a>`. That is invalid HTML, and the browser
 * recovers by closing the outer anchor early, silently breaking both the click
 * target and tab order. WorkHead renders this inside PageHead, which is a
 * `bare`, unlinked tile — see the note in Chip.tsx.
 */
export const WorkFilters = ({ filters }: WorkFiltersProps) => {
  return (
    <ChipRow>
      {filters.map((filter) => (
        <Chip key={filter}>{filter}</Chip>
      ))}
    </ChipRow>
  );
};
