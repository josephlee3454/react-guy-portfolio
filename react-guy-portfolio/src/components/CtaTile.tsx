import Typography from '@mui/material/Typography';
import Tile from './Tile';

export interface CtaTileProps {
  /**
   * Fixed copy per spec §4: `So what are we building?`. It assumes the project
   * is already happening — do not swap it for a generic equivalent.
   */
  headline: string;
  href: string;
}

/**
 * The closing tile on every page except contact, which is itself the CTA.
 * Full width, amber fill, ink text, and the 64px corner arrow.
 */
export default function CtaTile({ headline, href }: CtaTileProps) {
  return (
    <Tile
      span={12}
      variant="accent"
      minHeight={240}
      align="center"
      href={href}
      sx={{
        // Tile reserves 52px on every h2 so a top-aligned heading clears the
        // corner arrow. This heading is vertically centred and already wraps at
        // 13ch, so it never reaches the arrow — the reserve would only push the
        // text off the tile's optical centre.
        '& h2': { paddingRight: 0 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(34px, 5vw, 62px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          maxWidth: '13ch',
          color: 'primary.contrastText',
        }}
      >
        {headline}
      </Typography>
    </Tile>
  );
}
