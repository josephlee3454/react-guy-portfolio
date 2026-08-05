import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { AppLink } from '@/components/AppLink';
import { Eyebrow } from '@/components/Eyebrow';
import { Tile } from '@/components/Tile';
import { fonts, shared } from '@/theme/tokens';

export interface DirectDetailsProps {
  availabilityLabel: string;
  status: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  /** Display text and destination differ — the label drops the id suffix. */
  linkedin: { label: string; href: string };
  githubLabel: string;
  /** Label only. There is no handle yet, so there is nothing to link to. */
  github: { label: string };
  locationLabel: string;
  location: string;
}

/** Vertical rhythm between the five blocks of the direct-details tile. */
const BLOCK_GAP = '26px';

/**
 * `.status` — styles.css:296. Mono uppercase, but at .12em rather than the
 * `mono` variant's .14em, and in bone rather than muted.
 */
const statusSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  letterSpacing: '0.12em',
  color: 'text.primary',
};

/**
 * The dot. `alpha()` is a pure function evaluated here on the server, so the
 * value that reaches Box is an ordinary string — no function crosses the RSC
 * boundary.
 */
const statusDotSx = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'primary.main',
  boxShadow: `0 0 0 4px ${alpha(shared.accent, 0.18)}`,
  flexShrink: 0,
};

/**
 * `.big-link` — styles.css:298. The `h3` variant is the closest typographic
 * match (display face, 600, -.02em); only the size ramp, the colour and the
 * hover differ, so those are the overrides.
 */
const bigLinkSx = {
  fontSize: 'clamp(20px, 2.2vw, 30px)',
  color: 'text.primary',
  textDecoration: 'none',
  wordBreak: 'break-word',
  transition: 'color .2s ease',
  '&:hover': { color: 'accentInk' },
};

/**
 * The LinkedIn link is the same `.big-link`, pinned to 19px in the mockup —
 * the profile URL is long enough that the clamp's upper end would wrap it.
 */
const linkedinSx = { ...bigLinkSx, fontSize: 19 };

/**
 * The GitHub marker — mono, muted, and deliberately not a link.
 *
 * DESIGN_SPEC §4 lists the handle as still missing and the highest-value
 * remaining gap for an engineering role, so the mockup's `⚠ ADD HANDLE` shows
 * on the page rather than being hidden. Rendering it as a dead link, or as a
 * guessed github.com URL, would both be worse than a visible blank.
 */
const githubMarkerSx = {
  margin: 0,
  fontFamily: fonts.mono,
  fontSize: 14,
  letterSpacing: '0.06em',
  color: 'text.secondary',
};

/** The gap between blocks two through five. The first block sits flush. */
const blockSx = { marginTop: BLOCK_GAP };

/**
 * The direct-details tile — spec §7's right column, span 5.
 *
 * Five blocks: availability, email, LinkedIn, GitHub, location. `.status` and
 * `.big-link` have no component of their own and live here, since this is the
 * only place either is drawn.
 *
 * No social chip row: this revision of contact.html spells the profiles out as
 * their own blocks with full URLs, which is more useful than two initials and
 * removes the tile's only piece of duplicated information.
 */
export const DirectDetails = ({
  availabilityLabel,
  status,
  emailLabel,
  email,
  linkedinLabel,
  linkedin,
  githubLabel,
  github,
  locationLabel,
  location,
}: DirectDetailsProps) => {
  return (
    <Tile span={5}>
      <Box>
        <Eyebrow>{availabilityLabel}</Eyebrow>
        <Typography variant="mono" sx={statusSx}>
          <Box component="span" aria-hidden="true" sx={statusDotSx} />
          {status}
        </Typography>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{emailLabel}</Eyebrow>
        {/*
          A plain <a>, not AppLink: `mailto:` is not a route, so next/link's
          prefetching and client navigation have nothing to do here.
        */}
        <Typography variant="h3" component="a" href={`mailto:${email}`} sx={bigLinkSx}>
          {email}
        </Typography>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{linkedinLabel}</Eyebrow>
        {/*
          AppLink, which resolves to next/link — it handles external URLs fine
          and is the app's single link component. This tile is not itself a
          link, so an anchor here nests nothing.
        */}
        <Typography variant="h3" component={AppLink} href={linkedin.href} sx={linkedinSx}>
          {linkedin.label}
        </Typography>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{githubLabel}</Eyebrow>
        <Typography variant="body2" sx={githubMarkerSx}>
          {github.label}
        </Typography>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{locationLabel}</Eyebrow>
        <Typography variant="body1" sx={{ margin: 0 }}>
          {location}
        </Typography>
      </Box>
    </Tile>
  );
};
