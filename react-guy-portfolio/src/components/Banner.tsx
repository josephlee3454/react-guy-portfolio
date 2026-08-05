import Typography from '@mui/material/Typography';
import { Badge } from './Badge';
import { Tile } from './Tile';

export interface BannerProps {
  /** The pill's label. Per-page editorial copy — see the note below. */
  badge: string;
  title: string;
  body: string;
}

/**
 * The full-width coming-soon banner. Used on work, writing and references.
 *
 * NOT A SHARED STRING SOURCE. Every instance passes its own copy, and the three
 * deliberately say different things: work is "case studies in progress" because
 * the projects shipped and only the write-ups are missing, writing is
 * "nothing published yet" because it is straightforwardly empty. The spec calls
 * that distinction out by name — never word the work page as though the work
 * itself were pending. Two of the badges happen to read "Coming soon" today for
 * unrelated reasons; a shared constant would silently couple them.
 *
 * `alignItems: flex-start` is load-bearing, not spacing: Tile is a flex column,
 * so without it the badge stretches to the full width of the tile.
 */
export const Banner = ({ badge, title, body }: BannerProps) => {
  return (
    <Tile span={12} variant="dashed" align="start" sx={{ alignItems: 'flex-start' }}>
      <Badge>{badge}</Badge>

      <Typography variant="h2" sx={{ maxWidth: '24ch', marginTop: '14px' }}>
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: '56ch', margin: '14px 0 0', lineHeight: 1.7, color: 'text.secondary' }}
      >
        {body}
      </Typography>
    </Tile>
  );
};
