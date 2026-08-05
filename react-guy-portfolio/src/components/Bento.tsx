import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { columns } from '@/theme/tokens';

/**
 * The grid every page is laid out on.
 *
 * A raw CSS grid rather than MUI's Grid, because the hero and projects tiles
 * need `grid-row: span 2` and MUI Grid cannot express row spans.
 *
 * Column counts come from tokens rather than `theme.layout` so this stays a
 * server component — see the note on sx below.
 */
export interface BentoProps {
  children: ReactNode;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

/*
 * Every sx in this file (and in the other primitives) is a PLAIN OBJECT, never
 * a `(theme) => ({...})` callback.
 *
 * MUI's Box is a client component. A function prop cannot cross the RSC
 * boundary — React throws "Functions cannot be passed directly to Client
 * Components" at prerender. Plain objects serialize, so responsive values use
 * the { xs, sm, md } shorthand, palette values use string paths that MUI
 * resolves internally, and geometry comes from tokens.ts (a plain data module).
 * That keeps these components server-rendered with no client JS.
 */
const root = {
  display: 'grid',
  gap: 'var(--gap)',
  gridTemplateColumns: {
    xs: `repeat(${columns.mobile}, 1fr)`,
    sm: `repeat(${columns.tablet}, 1fr)`,
    md: `repeat(${columns.desktop}, 1fr)`,
  },
} as const;

export default function Bento({ children, component = 'main', sx }: BentoProps) {
  return (
    <Box component={component} sx={[root, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Box>
  );
}
