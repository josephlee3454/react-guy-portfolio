import { Fragment } from 'react';
import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

import { fullName, navItems } from '@/content/site';

/** Same set and order as the nav, from the shared content module. */
const FOOTER_LINKS = navItems;

export interface FooterProps {
  email: string;
  /** Copyright year. Defaults to the current year. */
  year?: number;
  sx?: SxProps<Theme>;
}

const footLinkSx = {
  color: 'inherit',
  textDecoration: 'none',
  transition: 'color .2s ease',
  '&:hover': { color: 'text.primary' },
};

export const Footer = ({ email, year, sx }: FooterProps) => {
  /*
   * Resolved per render rather than at module scope. A module-level
   * `new Date()` is evaluated once when the bundle loads — separately on the
   * server and in the browser — so a page rendered either side of midnight
   * (or of a New Year) hydrates with a different number than it shipped with.
   * Inside a server component the value is computed once and travels as HTML.
   */
  const displayYear = year ?? new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={[
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginTop: 'var(--gap)',
          padding: '22px 26px',
          border: '1px solid',
          borderColor: 'divider',
          // var(--r) rather than a scalar: the radius drops to 20px at <=620px.
          borderRadius: 'var(--r)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="mono">&copy; {displayYear} {fullName}</Typography>

      <Typography
        variant="mono"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}
      >
        {FOOTER_LINKS.map((item, index) => (
          <Fragment key={item.href}>
            {index > 0 && (
              <Box component="span" aria-hidden="true">
                &middot;
              </Box>
            )}
            <Box component={AppLink} href={item.href} sx={footLinkSx}>
              {item.label}
            </Box>
          </Fragment>
        ))}
      </Typography>

      <Typography variant="mono" component="a" href={`mailto:${email}`} sx={footLinkSx}>
        {email}
      </Typography>
    </Box>
  );
};
