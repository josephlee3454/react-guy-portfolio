'use client';

/*
 * The only client component in the shared chrome.
 *
 * Two things force the boundary: `usePathname` for aria-current, and the open
 * state of the mobile drawer. Both are per-render browser concerns that cannot
 * be resolved on the server. Footer, PageHead and CtaTile stay server-rendered.
 */

import { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts } from '@/theme/tokens';
import { brand as siteBrand, ctaHref, navItems } from '@/content/site';

const NAV_ITEMS = navItems;
const CTA_HREF = ctaHref;
const DRAWER_ID = 'nav-menu-drawer';

export interface NavProps {
  /**
   * Word before the accent period in the brand mark. The period is rendered by
   * the component so it is always amber.
   */
  brand?: string;
  sx?: SxProps<Theme>;
}

function navLinkSx(active: boolean) {
  return {
    color: active ? 'text.primary' : 'text.secondary',
    fontSize: 14,
    textDecoration: 'none',
    borderBottom: '1px solid',
    borderColor: active ? 'primary.main' : 'transparent',
    transition: 'color .25s ease, border-color .25s ease',
    '&:hover': { color: 'text.primary', borderColor: 'primary.main' },
  };
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
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The flex pill. Not a fixed header — it scrolls with the page and keeps the
 * --gap inset from the viewport edge (spec §6).
 *
 * The mockup hides `.nav-links` below 1000px with nothing in its place, which
 * DESIGN_SPEC §7 lists as a known gap. The hamburger and drawer below close it.
 */
export default function Nav({ brand = siteBrand, sx }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const links = NAV_ITEMS.map((item) => ({ ...item, active: isActive(item.href) }));

  return (
    <>
      <Box
        component="nav"
        aria-label="Primary"
        sx={[
          (theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: theme.layout.pillRadius,
            padding: '12px 12px 12px 26px',
            marginBottom: theme.layout.gap,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          component={NextLink}
          href="/"
          sx={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            textDecoration: 'none',
          }}
        >
          {brand}
          <Box component="span" sx={{ color: 'primary.main' }}>
            .
          </Box>
        </Box>

        <Box
          component="ul"
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: '26px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((item) => (
            <li key={item.href}>
              <Box
                component={NextLink}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                sx={{ ...navLinkSx(item.active), display: 'inline-block', padding: '6px 2px' }}
              >
                {item.label}
              </Box>
            </li>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

          <Button component={NextLink} href={CTA_HREF}>
            Start here
          </Button>
        </Box>
      </Box>

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
                  component={NextLink}
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
}
