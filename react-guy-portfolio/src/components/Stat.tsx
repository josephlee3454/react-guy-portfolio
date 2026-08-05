import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface StatRowProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export interface StatProps {
  /**
   * A string, not a number: the design's figures are typeset ("07", "+210"),
   * and a leading zero or sign is presentation the caller owns.
   *
   * DESIGN_SPEC §4 flags the mockup's 07 / +125 / +210 as inflated placeholders
   * to be replaced or deleted, so nothing here defaults to them.
   */
  value: string;
  /** Two lines in the mockup: pass `<>Years<br />experience</>`. */
  label: ReactNode;
  sx?: SxProps<Theme>;
}

/** `.stat-row` — styles.css:136. The home page's stats tile. */
export const StatRow = ({ children, sx }: StatRowProps) => {
  return (
    <Box
      sx={[
        { display: 'flex', gap: '30px', flexWrap: 'wrap' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

/**
 * One figure. `statNumber` maps to `<b>` and `statLabel` to `<small>` through
 * the theme's variantMapping, matching the mockup's markup; both are inline
 * elements there, hence the explicit `display: block`.
 */
export const Stat = ({ value, label, sx }: StatProps) => {
  return (
    <Box sx={sx}>
      <Typography variant="statNumber" sx={{ display: 'block' }}>
        {value}
      </Typography>
      <Typography variant="statLabel" sx={{ display: 'block', marginTop: '8px' }}>
        {label}
      </Typography>
    </Box>
  );
};
