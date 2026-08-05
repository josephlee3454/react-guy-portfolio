import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { BigLink } from '@/components/BigLink';
import { Eyebrow } from '@/components/Eyebrow';
import { Tile } from '@/components/Tile';
import { shared } from '@/theme/tokens';

export interface DirectDetailsProps {
  availabilityLabel: string;
  status: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  /** Display text and destination differ — the label drops the id suffix. */
  linkedin: { label: string; href: string };
  githubLabel: string;
  /** Display text and destination differ — the label drops the scheme. */
  github: { label: string; href: string };
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

/** The gap between blocks two through five. The first block sits flush. */
const blockSx = { marginTop: BLOCK_GAP };

/**
 * The direct-details tile — the right column of §2's grid, span 5.
 *
 * Five blocks: availability, email, LinkedIn, GitHub, location. `.status` still
 * lives here, since this is the only place it is drawn; `.big-link` moved out to
 * `components/BigLink` once /references needed the same ramp.
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
          `external` renders a plain <a>, not AppLink: `mailto:` is not a route,
          so next/link's prefetching and client navigation have nothing to do.
        */}
        <BigLink external href={`mailto:${email}`}>
          {email}
        </BigLink>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{linkedinLabel}</Eyebrow>
        {/*
          No `external`, so BigLink routes through AppLink — it handles external
          URLs fine and is the app's single link component. This tile is not
          itself a link, so an anchor here nests nothing.

          19px rather than the clamp: the profile URL is long enough that the
          clamp's upper end would wrap it.
        */}
        <BigLink href={linkedin.href} fontSize={19}>
          {linkedin.label}
        </BigLink>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{githubLabel}</Eyebrow>
        {/* Same 19px treatment as LinkedIn — the two profile URLs sit together
            and a size difference between them would read as a hierarchy. */}
        <BigLink href={github.href} fontSize={19}>
          {github.label}
        </BigLink>
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
