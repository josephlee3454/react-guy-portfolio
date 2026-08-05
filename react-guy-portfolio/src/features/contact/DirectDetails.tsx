import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { Eyebrow } from '@/components/Eyebrow';
import { SocialRow, type SocialItem } from '@/components/SocialRow';
import { Tile } from '@/components/Tile';
import { tokens } from '@/theme/tokens';

export interface DirectDetailsProps {
  availabilityLabel: string;
  status: string;
  emailLabel: string;
  email: string;
  locationLabel: string;
  location: string;
  locationNote: string;
  socialsLabel: string;
  socials: SocialItem[];
}

/** Vertical rhythm between the four blocks of the direct-details tile. */
const BLOCK_GAP = '26px';

/**
 * `.status` — styles.css:281. Mono uppercase, but at .12em rather than the
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
  boxShadow: `0 0 0 4px ${alpha(tokens.accent, 0.18)}`,
  flexShrink: 0,
};

/**
 * `.big-link` — styles.css:283. The `h3` variant is the closest typographic
 * match (display face, 600, -.02em); only the size ramp, the colour and the
 * hover differ, so those are the overrides.
 */
const bigLinkSx = {
  fontSize: 'clamp(20px, 2.2vw, 30px)',
  color: 'text.primary',
  textDecoration: 'none',
  wordBreak: 'break-word',
  transition: 'color .2s ease',
  '&:hover': { color: 'primary.main' },
};

/** The gap between blocks two through four. The first block sits flush. */
const blockSx = { marginTop: BLOCK_GAP };

/**
 * The direct-details tile — spec §7's right column, span 5.
 *
 * Four blocks: availability, email, location, socials. `.status` and
 * `.big-link` have no component of their own and live here, since this is the
 * only place either is drawn.
 */
export const DirectDetails = ({
  availabilityLabel,
  status,
  emailLabel,
  email,
  locationLabel,
  location,
  locationNote,
  socialsLabel,
  socials,
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
        <Eyebrow>{locationLabel}</Eyebrow>
        <Typography variant="body1" sx={{ margin: 0 }}>
          {location}
        </Typography>
        <Typography variant="body2" sx={{ margin: '6px 0 0' }}>
          {locationNote}
        </Typography>
      </Box>

      <Box sx={blockSx}>
        <Eyebrow>{socialsLabel}</Eyebrow>
        {/*
          This tile is not itself a link, so the chips could carry hrefs — but
          site.ts has no real profile URLs yet, and inventing them would ship
          four dead links. They render as <span>s until the URLs are real.

          `marginBottom: 0` overrides SocialRow's default `auto`, which exists
          to pin the row to the top of a bottom-aligned tile on the home page.
          Here the row is the last block of a top-aligned tile, and the auto
          margin would eat the tile's remaining height.
        */}
        <SocialRow items={socials} sx={{ marginBottom: 0 }} />
      </Box>
    </Tile>
  );
};
