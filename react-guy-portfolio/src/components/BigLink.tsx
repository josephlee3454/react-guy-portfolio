import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { AppLink } from './AppLink';

export interface BigLinkProps {
  href: string;
  children: ReactNode;
  /**
   * Overrides the clamp. The contact page pins LinkedIn to 19 and references
   * to 18, because the profile URL is long enough that the clamp's upper end
   * would wrap it.
   */
  fontSize?: number | string;
  /** A mailto or other non-route target renders a plain anchor, not next/link. */
  external?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * `.big-link` — the large display-face link used for contact details and the
 * references page's LinkedIn pointer.
 *
 * Extracted from DirectDetails once the references page needed the same ramp.
 * `h3` is the closest variant (display face, 600, -.02em); only the size, the
 * colour and the hover differ, so those are the overrides.
 */
export const BigLink = ({ href, children, fontSize, external = false, sx }: BigLinkProps) => {
  return (
    <Typography
      variant="h3"
      // A mailto or an off-site URL is not a route, so next/link's prefetching
      // and client navigation have nothing to do — a plain anchor is correct.
      {...(external ? { component: 'a', href } : { component: AppLink, href })}
      sx={[
        {
          fontSize: fontSize ?? 'clamp(20px, 2.2vw, 30px)',
          color: 'text.primary',
          textDecoration: 'none',
          wordBreak: 'break-word',
          transition: 'color .2s ease',
          '&:hover': { color: 'accentInk' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Typography>
  );
};
