import type { ReactNode } from 'react';
import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { geometry } from '@/theme/tokens';
import { CornerArrow, ARROW_CLASS } from './CornerArrow';

export type TileVariant = 'default' | 'raised' | 'accent' | 'bare' | 'dashed';

export interface TileProps {
  children: ReactNode;
  /**
   * Desktop columns (1-12).
   *
   * The mockup carries two span systems — semantic classes on the home page
   * (.credentials{span 3}) and utilities on the inner pages (.s4) — which
   * disagree about tablet behaviour for the same desktop width. So tablet is
   * an explicit prop rather than something derived from this one.
   */
  span: number;
  /** Tablet columns (1-6) at <=1000px. Defaults to full width. */
  spanTablet?: number;
  /** Desktop row span. The hero and projects tiles are the only 2s. */
  rowSpan?: number;
  minHeight?: number | string;
  /** Maps to justify-content. 'center' is the stats tile only. */
  align?: 'start' | 'center' | 'end';
  /** 'bare' has no fill and no border — for layout-only tiles like PageHead. */
  variant?: TileVariant;
  /** Present renders an <a> and the whole surface becomes the click target. */
  href?: string;
  /** Defaults to true when href is set. The stats tile is the notable false. */
  arrow?: boolean;
  sx?: SxProps<Theme>;
}

const JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end' } as const;

const FILL: Record<TileVariant, string | undefined> = {
  default: 'background.paper',
  raised: 'surface.raised',
  accent: 'primary.main',
  bare: 'transparent',
  /*
   * The coming-soon banner. Transparent with a dashed rule — the dash is the
   * whole signal, reading as unfinished-on-purpose rather than broken, which a
   * solid empty tile does not.
   */
  dashed: 'transparent',
};

/**
 * The core surface. Every tile on every page is one of these.
 *
 * Each modifier class in the mockup (.hero, .credentials, .projects, .writing,
 * .services, .profiles, .stats, .cta) decomposes into span/rowSpan/minHeight/
 * align/variant, so no per-tile class survives into the app.
 *
 * sx is a plain object throughout — see the note in Bento.tsx for why a theme
 * callback would break the server/client boundary.
 */
export const Tile = ({
  children,
  span,
  spanTablet = 6,
  rowSpan = 1,
  minHeight,
  align = 'start',
  variant = 'default',
  href,
  arrow,
  sx,
}: TileProps) => {
  const isLink = Boolean(href);
  const showArrow = arrow ?? isLink;
  const isAccent = variant === 'accent';
  const isBare = variant === 'bare';

  return (
    <Box
      {...(isLink ? { component: AppLink, href } : { component: 'div' })}
      sx={[
        {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: JUSTIFY[align],
          overflow: 'hidden',
          minHeight,
          padding: isBare ? 0 : 'var(--pad)',
          borderRadius: isBare ? 0 : 'var(--r)',
          border: isBare ? 0 : '1px solid',
          ...(variant === 'dashed' && { borderStyle: 'dashed' }),
          borderColor: isAccent ? 'primary.main' : 'divider',
          backgroundColor: FILL[variant],
          color: isAccent ? 'primary.contrastText' : 'inherit',
          textDecoration: 'none',
          transition: `transform ${geometry.duration} ease, border-color ${geometry.duration} ease, background-color ${geometry.duration} ease`,

          // Mobile is always one column; the two breakpoints widen from there.
          gridColumn: {
            xs: 'span 1',
            sm: `span ${spanTablet}`,
            md: `span ${span}`,
          },
          gridRow: { md: `span ${rowSpan}` },

          // Spec §3: h2 must clear the corner arrow. Tile owns this rather than
          // the caller, so a heading can never collide with an arrow by omission.
          ...(showArrow && { '& h2': { paddingRight: '52px' } }),

          // The accent arrow sits on amber, so its resting border is a tint of
          // ink rather than the divider colour.
          ...(isAccent && {
            [`& .${ARROW_CLASS}`]: {
              // The accent tile sets its own ring — a tint of the ink colour
              // rather than CornerArrow's currentColor default, so full opacity.
              borderColor: 'rgba(20, 24, 26, .35)',
              color: 'primary.contrastText',
              opacity: 1,
            },
          }),

          ...(isLink && {
            '&:hover': {
              transform: `translateY(${geometry.lift})`,
              borderColor: isAccent ? 'primary.light' : 'surface.borderHover',
              ...(isAccent && { backgroundColor: 'primary.light' }),
              [`& .${ARROW_CLASS}`]: {
                transform: 'rotate(45deg)',
                backgroundColor: isAccent ? 'primary.contrastText' : 'primary.main',
                borderColor: isAccent ? 'primary.contrastText' : 'primary.main',
                color: isAccent ? 'primary.main' : 'primary.contrastText',
                // Clears CornerArrow's resting 0.55 so the fill reads at full
                // strength — this is the design's one motion signature.
                opacity: 1,
              },
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
      {showArrow && <CornerArrow size={isAccent ? 'large' : 'default'} />}
    </Box>
  );
};
