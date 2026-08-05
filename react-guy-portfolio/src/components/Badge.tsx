import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { geometry } from '@/theme/tokens';

export interface BadgeProps {
  children: string;
  /**
   * 'tile' is the smaller variant pinned inside a tile's top-left corner —
   * 9px and no dot, so it reads as a corner marker rather than a heading.
   */
  size?: 'default' | 'tile';
  sx?: SxProps<Theme>;
}

/**
 * The coming-soon pill: mono uppercase in `accentInk`, outlined, with an amber dot.
 *
 * Its tracking is .16em, not the .14em every other mono variant uses. That is
 * the design's value at this size, and it is set here rather than added to the
 * type ramp because two components use it and a third variant for one tracking
 * step would be ramp inflation.
 */
export const Badge = ({ children, size = 'default', sx }: BadgeProps) => {
  const isTile = size === 'tile';

  return (
    <Box
      component="span"
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--mono), ui-monospace, monospace',
          fontSize: isTile ? 9 : 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'accentInk',
          border: '1px solid',
          borderColor: 'accentInk',
          borderRadius: `${geometry.pill}px`,
          padding: isTile ? '4px 10px' : '6px 12px',
          whiteSpace: 'nowrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/*
        The dot is decoration, so it is aria-hidden and lives here rather than
        in content. Only the larger variant carries one — at 9px it would crowd
        the corner marker.
      */}
      {!isTile && (
        <Box
          component="i"
          aria-hidden="true"
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            flex: '0 0 auto',
          }}
        />
      )}
      {children}
    </Box>
  );
};
