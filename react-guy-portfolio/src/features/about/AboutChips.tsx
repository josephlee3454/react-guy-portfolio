import type { SxProps, Theme } from '@mui/material/styles';

import { Chip, ChipRow } from '@/components/Chip';
import type { AboutChip } from '@/content/about';

/**
 * The amber chip in the mockup (`.chips b.on`).
 *
 * NOT Chip's `active` prop. `active` means "this filter is selected", and Chip
 * warns in dev when it is set on a chip the reader cannot toggle. Here the fill
 * means "this is a top skill" — emphasis, not state — so the look is applied
 * directly and the chip stays honestly non-interactive.
 *
 * A plain object, like every sx in the app: Box is a client component and a
 * theme callback cannot cross the RSC boundary (see Bento.tsx).
 */
const FILLED_CHIP_SX = {
  borderColor: 'primary.main',
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
} as const;

export interface AboutChipsProps {
  chips: readonly AboutChip[];
  sx?: SxProps<Theme>;
}

/**
 * A row of about-page chips, filled or outlined per the content.
 *
 * A component rather than an exported style constant because three sections now
 * render chips — the stack tiles, education and military — and the filled look
 * is the same decision in all of them. Sharing the component means the mapping
 * from `filled: true` to "amber" exists once; sharing only the sx object would
 * have left three copies of the map-and-key loop that applies it.
 */
export const AboutChips = ({ chips, sx }: AboutChipsProps) => {
  return (
    <ChipRow sx={sx}>
      {chips.map((chip) => (
        <Chip key={chip.label} sx={chip.filled ? FILLED_CHIP_SX : undefined}>
          {chip.label}
        </Chip>
      ))}
    </ChipRow>
  );
};
