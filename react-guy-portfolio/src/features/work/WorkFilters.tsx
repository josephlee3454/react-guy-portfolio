import { Chip, ChipRow } from '@/components/Chip';

export interface WorkFilter {
  label: string;
  /**
   * `.chips b.on` — the amber fill.
   *
   * NOT a selected state. Filtering is not implemented, and DESIGN_SPEC §4 is
   * explicit that a filled chip means "what he'd lead with", i.e. emphasis, in
   * every other chip row on the site. It means the same thing here: "All" is
   * filled because it describes what the page is showing, not because a control
   * is switched on.
   */
  emphasis?: boolean;
}

export interface WorkFiltersProps {
  filters: readonly WorkFilter[];
}

/**
 * `.chips b.on` — the amber pill, applied directly rather than through Chip's
 * `active` prop.
 *
 * `active` is for a chip the reader can toggle: Chip warns in development when
 * it is set without an `href` or `onClick`, and sets `aria-pressed` on the
 * button it would otherwise render. Neither applies here. Painting the fill
 * through `sx` says "emphasis" and keeps the chip a plain, unannounced <span>.
 *
 * A plain object, not a `(theme) => ({...})` callback — Box is a client
 * component and a function prop cannot cross the RSC boundary. The palette
 * paths resolve inside MUI.
 */
const emphasisSx = {
  color: 'primary.contrastText',
  backgroundColor: 'primary.main',
  borderColor: 'primary.main',
};

/**
 * The category filter row on /work.
 *
 * A module of its own, even though it is a handful of lines today, because it
 * is the one part of this page with a future: filtering is not implemented, and
 * the chips render as plain spans (no `href`, no `onClick`) so the page stays a
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
        <Chip key={filter.label} sx={filter.emphasis ? emphasisSx : undefined}>
          {filter.label}
        </Chip>
      ))}
    </ChipRow>
  );
};
