'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import type { Theme } from '@mui/material/styles';
import { AppLink } from './AppLink';

const DRAWER_ID = 'nav-menu-drawer';

export interface MobileMenuLink {
  label: string;
  href: string;
  active: boolean;
}

export interface MobileMenuProps {
  /** Active state is resolved on the server — this leaf only owns open/closed. */
  links: MobileMenuLink[];
}

function MenuIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
      <path
        d="M0 1h18M0 6h18M0 11h18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The hamburger and its drawer — the only interactive part of the nav.
 *
 * This exists so `Nav` can stay a server component. The whole nav used to cross
 * the client boundary for one boolean; isolating that boolean here means the
 * brand mark, the desktop links and the CTA all render on the server and ship
 * no JS.
 *
 * The mockup hides `.nav-links` below 1000px with nothing in its place, which
 * DESIGN_SPEC §2 covers with "Nav links collapse (add a hamburger)". This
 * closes it.
 */
export const MobileMenu = ({ links }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={DRAWER_ID}
        sx={{
          display: { xs: 'inline-flex', md: 'none' },
          width: 44,
          height: 44,
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          // aria-controls on the toggle has to resolve to a real element even
          // while the drawer is shut; a temporary Drawer unmounts by default.
          root: { keepMounted: true },
          paper: {
            sx: (theme: Theme) => ({
              // MUI paints a white-alpha elevation overlay on dark-mode paper.
              // The drawer is a tile surface, and --tile is a flat token.
              backgroundImage: 'none',
              backgroundColor: 'background.paper',
              borderLeft: '1px solid',
              borderColor: 'divider',
              width: 'min(320px, 82vw)',
              padding: theme.layout.padding,
            }),
          },
        }}
      >
        <Box
          id={DRAWER_ID}
          component="nav"
          aria-label="Site menu"
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            sx={{
              alignSelf: 'flex-end',
              width: 44,
              height: 44,
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="ul"
            sx={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: '4px' }}
          >
            {links.map((item) => (
              <li key={item.href}>
                <Box
                  component={AppLink}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.active ? 'page' : undefined}
                  sx={{
                    display: 'block',
                    fontSize: 18,
                    padding: '14px 0 14px 14px',
                    color: item.active ? 'text.primary' : 'text.secondary',
                    textDecoration: 'none',
                    borderLeft: '2px solid',
                    borderLeftColor: item.active ? 'primary.main' : 'transparent',
                    transition: 'color .25s ease, border-color .25s ease',
                    '&:hover': { color: 'text.primary', borderLeftColor: 'primary.main' },
                  }}
                >
                  {item.label}
                </Box>
              </li>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
