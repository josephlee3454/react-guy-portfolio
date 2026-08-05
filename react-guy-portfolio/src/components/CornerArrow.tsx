import Box from '@mui/material/Box';
import { geometry } from '@/theme/tokens';

/**
 * A stable class name, not an Emotion-generated one.
 *
 * Tile needs a `&:hover .<arrow>` descendant selector to drive the rotate-and-fill
 * on parent hover. Targeting a generated class would mean either the Emotion babel
 * plugin's component-selector support or a brittle string, so the coupling is made
 * explicit through this constant instead. Tile imports it; nothing else should.
 */
export const ARROW_CLASS = 'tile-corner-arrow';

export interface CornerArrowProps {
  /** 'large' is the CTA tile only — 64px instead of 44px. */
  size?: 'default' | 'large';
}

/**
 * Spec §3: the one recurring motion signature. On tile hover it rotates 45deg,
 * fills with the accent, and its glyph flips to --ink. Do not add other motions.
 *
 * `aria-hidden` because the tile's own <a> already carries the accessible name;
 * announcing a bare arrow glyph would just add noise.
 */
export const CornerArrow = ({ size = 'default' }: CornerArrowProps) => {
  const diameter = size === 'large' ? geometry.arrowLarge : geometry.arrow;

  return (
    <Box
      component="span"
      className={ARROW_CLASS}
      aria-hidden="true"
      sx={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        border: '1px solid',
        borderColor: 'divider',
        display: 'grid',
        placeItems: 'center',
        color: 'text.primary',
        transition: `transform ${geometry.duration} ease, background-color ${geometry.duration} ease, color ${geometry.duration} ease, border-color ${geometry.duration} ease`,
      }}
    >
      ↗
    </Box>
  );
};
