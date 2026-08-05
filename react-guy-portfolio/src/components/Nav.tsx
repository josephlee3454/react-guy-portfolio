import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts, geometry } from '@/theme/tokens';
import { brand as siteBrand, navItems } from '@/content/site';
import { AppLink } from './AppLink';
import { MobileMenu } from './MobileMenu';
import { StartHereButton } from './StartHereButton';

export interface NavProps {
  /**
   * The current route, for aria-current.
   *
   * Passed in rather than read from `usePathname()`. Every page is statically
   * prerendered and already knows its own route, so resolving it on the server
   * keeps this a server component — only MobileMenu's open/closed boolean
   * crosses the client boundary.
   */
  route: string;
  /**
   * Word before the accent period in the brand mark. The period is rendered by
   * the component so it is always amber.
   */
  brand?: string;
  sx?: SxProps<Theme>;
}

function isActive(href: string, route: string) {
  return href === '/' ? route === '/' : route === href || route.startsWith(`${href}/`);
}

const navLinkSx = (active: boolean) => ({
  display: 'inline-block',
  padding: '6px 2px',
  color: active ? 'text.primary' : 'text.secondary',
  fontSize: 14,
  textDecoration: 'none',
  borderBottom: '1px solid',
  borderColor: active ? 'primary.main' : 'transparent',
  transition: 'color .25s ease, border-color .25s ease',
  '&:hover': { color: 'text.primary', borderColor: 'primary.main' },
});

/**
 * The flex pill. Not a fixed header — it scrolls with the page and keeps the
 * --gap inset from the viewport edge. §2's map puts it full width above the grid.
 */
export const Nav = ({ route, brand = siteBrand, sx }: NavProps) => {
  const links = navItems.map((item) => ({ ...item, active: isActive(item.href, route) }));

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: `${geometry.pill}px`,
          padding: '12px 12px 12px 26px',
          marginBottom: 'var(--gap)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component={AppLink}
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
        <Box component="span" sx={{ color: 'accentInk' }}>
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
              component={AppLink}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              sx={navLinkSx(item.active)}
            >
              {item.label}
            </Box>
          </li>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <MobileMenu links={links} />
        <StartHereButton />
      </Box>
    </Box>
  );
};
