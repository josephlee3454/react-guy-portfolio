import type { ComponentType } from 'react';
import { AppLink } from './AppLink';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { GitHubIcon } from './icons/social/GitHubIcon';
import { LinkedInIcon } from './icons/social/LinkedInIcon';
import type { SocialItem } from '@/content/types';

/**
 * Re-exported so callers can keep taking the row's item shape from the row.
 * The shape itself lives in content/types.ts with the rest of the content
 * shapes — `socials` in site.ts is typed by it too, and one definition is the
 * point.
 */
export type { SocialItem };

/**
 * The only marks this row can draw. A closed union rather than a component
 * prop: content files are plain data (no JSX, no imports of components), so
 * they name an icon and this module owns the drawing.
 */
const ICONS: Record<SocialItem['icon'], ComponentType<SvgIconProps>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export interface SocialRowProps {
  items: SocialItem[];
  /**
   * Render the chips as links. Defaults to FALSE, which is the safe case.
   *
   * The default is off rather than on because the failure it prevents is not
   * loud: an `<a>` inside an `<a>` produces valid-looking JSX, renders fine on
   * the server, and only breaks once the browser repairs the DOM and React
   * finds the tree it hydrated no longer matches. Opting in makes each usage
   * inside a linked surface a deliberate decision rather than a default.
   *
   * The home Profiles tile is now a plain div precisely so it can opt IN — see
   * DESIGN_SPEC §4. This guard is what makes that rule enforceable: it is the
   * thing that fails loudly in dev if the tile ever becomes an anchor again
   * while the chips still carry hrefs.
   */
  interactive?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Matches `theme.transitions.duration.short` (200ms), as a literal so this
 * stays a plain object.
 */
const HOVER_DURATION = '.2s';

/*
 * `.social-row a.soc` — styles.css:443. A plain object, not a
 * `(theme) => ({...})` callback: Box is a client component and a function prop
 * cannot cross the RSC boundary. Palette values are string paths MUI resolves
 * internally. See the note in Bento.tsx.
 */
const chipStyles = (interactive: boolean) => ({
  width: 38,
  height: 38,
  borderRadius: '50%',
  border: '1px solid',
  borderColor: 'divider',
  display: 'grid',
  placeItems: 'center',
  color: 'text.secondary',
  textDecoration: 'none',
  ...(interactive && {
    transition:
      `color ${HOVER_DURATION} ease, border-color ${HOVER_DURATION} ease, ` +
      `background-color ${HOVER_DURATION} ease`,
    '&:hover': {
      color: 'accentInk',
      borderColor: 'accentInk',
      backgroundColor: 'surface.raised',
    },
    // The global focus ring squares the pill off at border-radius:8px.
  }),
});

/** `.social-row a.soc svg` — 17px inside the 38px circle. */
const iconStyles = { display: 'block', fontSize: 17 };

/**
 * `.social-row` — styles.css:442. Circular 38px chips holding a brand mark
 * each, 1px border, no fill until hover.
 *
 * The marks are the links here, not decoration on a linked tile: the icon is
 * `aria-hidden` (SvgIcon's default) and the anchor carries `aria-label`, so the
 * accessible name is announced once. An item with no `href` renders as a span
 * rather than a dead `href="#"`, which would be focusable and go nowhere.
 *
 * `margin-bottom: auto` is load-bearing, not spacing: the tile is a flex column
 * with `justify-content: flex-end`, so without it the row would sink to the
 * bottom with the heading. The auto margin absorbs the free space and pins the
 * row to the top of the tile.
 */
export const SocialRow = ({ items, interactive = false, sx }: SocialRowProps) => {
  if (process.env.NODE_ENV !== 'production' && !interactive) {
    const linked = items.filter((item) => item.href).map((item) => item.label);
    if (linked.length) {
      console.warn(
        `[SocialRow] ${linked.join(', ')} supplied an href but the row is not interactive, ` +
          'so it renders as a plain chip. Pass interactive to make them links — but only ' +
          'where the row is NOT inside a linked Tile, since that nests one anchor in another.',
      );
    }
  }

  return (
    <Box
      component="ul"
      sx={[
        {
          display: 'flex',
          gap: '9px',
          listStyle: 'none',
          margin: 0,
          marginBottom: 'auto',
          padding: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item) => {
        const Icon = ICONS[item.icon];

        return (
          <Box component="li" key={item.label} sx={{ display: 'flex' }}>
            {interactive && item.href ? (
              <Box
                component={AppLink}
                href={item.href}
                aria-label={item.label}
                sx={chipStyles(true)}
              >
                <Icon sx={iconStyles} />
              </Box>
            ) : (
              /*
               * The name moves onto the mark itself here. `aria-label` on a
               * bare span is unreliable — it names nothing with a role — so the
               * icon takes `titleAccess`, which gives SvgIcon a <title> and
               * `role="img"`. The chip is still announced as "GitHub", just not
               * as something operable.
               */
              <Box component="span" sx={chipStyles(false)}>
                <Icon titleAccess={item.label} sx={iconStyles} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
