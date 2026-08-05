import type { ComponentType } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';
import { MonitorIcon } from '@/components/icons/MonitorIcon';
import { ServerIcon } from '@/components/icons/ServerIcon';
import { DatabaseIcon } from '@/components/icons/DatabaseIcon';
import { CloudIcon } from '@/components/icons/CloudIcon';
import type { StackGroup, StackIconName } from '@/content/about';

import { AboutChips } from './AboutChips';

export interface StackRowProps {
  /** Frontend first — DESIGN_SPEC §4 makes the order a content decision. */
  groups: readonly StackGroup[];
}

/**
 * Content names an icon; this is where the name becomes a component. A .ts
 * content module cannot hold JSX, and the alternative — passing components in
 * from the page — would put a layout-adjacent import back in the page file.
 */
const ICONS: Record<StackIconName, ComponentType<SvgIconProps>> = {
  monitor: MonitorIcon,
  server: ServerIcon,
  database: DatabaseIcon,
  cloud: CloudIcon,
};

/**
 * `.sk .ico` — the 46px rounded plate behind each glyph. The stroke treatment
 * for the SVG inside it lives here rather than on the icons themselves: it is a
 * property of this plate (23px, hairline, amber), not of the four drawings.
 */
const ICON_PLATE_SX = {
  width: 46,
  height: 46,
  borderRadius: '13px',
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'surface.raised',
  color: 'accentInk',
  display: 'grid',
  placeItems: 'center',
  marginBottom: '18px',
  '& svg': {
    width: 23,
    height: 23,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
} as const;

/**
 * The four stack tiles. Row: 12.
 *
 * A NESTED GRID, not four bento tiles. `.stack-row` (styles.css:382) is itself
 * one grid item spanning the full width, and it lays its four children out on a
 * grid of its own: 4 across on desktop, 2 at <=1000px, 1 at <=620px. Tile's
 * span props cannot express that — they name columns of the *page* grid, where
 * "a quarter" is span 3 on desktop but there is no span 1.5 for the tablet
 * band, which is exactly where a 4-across row has to become 2-across. So this
 * wrapper owns a grid, and the tiles inside it take one of ITS columns each
 * (span 1 at every breakpoint).
 *
 * The wrapper's own span mirrors what the page grid expects at each band —
 * 12 / 6 / 1 — which is the same sequence Tile would have produced for a
 * full-width tile.
 *
 * ONE FEATURE RENDERING THE LIST, not four renders of a single-tile feature:
 * the column arithmetic is only correct for four groups, so the file that owns
 * the row is the file that has to change if a fifth is ever written.
 *
 * sx is a plain object throughout — see the note in Bento.tsx.
 */
export const StackRow = ({ groups }: StackRowProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 'var(--gap)',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gridColumn: { xs: 'span 1', sm: 'span 6', md: 'span 12' },
      }}
    >
      {groups.map((group) => {
        const Icon = ICONS[group.icon];

        return (
          // span/spanTablet are 1 because these are columns of the grid above,
          // not of the page's 12.
          <Tile key={group.title} span={1} spanTablet={1} arrow={false}>
            <Box sx={ICON_PLATE_SX}>
              {/* Decorative: the eyebrow beneath it already names the group. */}
              <Icon aria-hidden />
            </Box>

            <Eyebrow>{group.eyebrow}</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: 'clamp(19px, 1.7vw, 23px)' }}>
              {group.title}
            </Typography>

            <AboutChips chips={group.chips} sx={{ marginTop: '14px' }} />

            <Typography
              variant="body2"
              sx={{ fontSize: 13, lineHeight: 1.6, margin: '12px 0 0' }}
            >
              {group.note}
            </Typography>
          </Tile>
        );
      })}
    </Box>
  );
};
