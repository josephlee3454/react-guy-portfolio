import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { Chip, ChipRow } from '@/components/Chip';

/**
 * The amber chip in the mockup's stack row (`.chips b.on`).
 *
 * Not Chip's `active` prop: `active` means "this filter is selected", and Chip
 * warns in dev when it is set on a chip the reader cannot toggle. Here the
 * amber marks the core of the stack — emphasis, not state — so the fill is
 * applied directly and the chip stays honestly non-interactive.
 *
 * A plain object, like every sx in the app: Box is a client component and a
 * theme callback cannot cross the RSC boundary (see Bento.tsx). It lives in
 * this feature rather than inside Chip because it is one section's emphasis,
 * not a variant the primitive owes every caller.
 */
const CORE_CHIP_SX = {
  borderColor: 'primary.main',
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
} as const;

export interface AboutPhilosophyProps {
  philosophy: { eyebrow: string; title: string; body: string };
  /** The mockup's amber chips, rendered first. */
  coreStack: readonly string[];
  stack: readonly string[];
}

/** The "how I work" tile. Row: 5 + 7 = 12, paired with AboutPortrait. */
export const AboutPhilosophy = ({ philosophy, coreStack, stack }: AboutPhilosophyProps) => {
  return (
    <Tile span={7} arrow={false}>
      <Eyebrow>{philosophy.eyebrow}</Eyebrow>
      <Typography variant="h2">{philosophy.title}</Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: '48ch', margin: '16px 0 0' }}
      >
        {philosophy.body}
      </Typography>

      <ChipRow sx={{ marginTop: '24px' }}>
        {coreStack.map((item) => (
          <Chip key={item} sx={CORE_CHIP_SX}>
            {item}
          </Chip>
        ))}
        {stack.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </ChipRow>
    </Tile>
  );
};
