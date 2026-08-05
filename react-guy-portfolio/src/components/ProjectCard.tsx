import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tile } from './Tile';
import { Eyebrow } from './Eyebrow';

/**
 * The gradient that stands in for a screenshot (styles.css:116).
 *
 * DESIGN_SPEC "Still placeholder": every project shot is a CSS gradient and no
 * real screenshots exist. Rendering the placeholder is therefore the correct
 * output for a card without an `image`, not a gap to be filled with a guessed
 * path.
 */
const SHOT_PLACEHOLDER = 'linear-gradient(150deg, #25302E, #151918)';

export interface ProjectCardProps {
  /** Desktop columns. The lead case study is 8; the rest are 4. */
  span: number;
  /** Tablet columns (1-6) at <=1000px. */
  spanTablet?: number;
  href: string;
  /**
   * Spec §7: `year · role · category`, e.g. "2025 · Lead engineer · Platform".
   * The role is the part clients scan for, so it is not decorative.
   */
  eyebrow: string;
  title: string;
  description: string;
  /** The lead case study: a 330px shot instead of 210px. */
  lead?: boolean;
  /** A real screenshot. Absent renders the gradient placeholder. */
  image?: string;
}

/**
 * `.pj` (styles.css:232) — a whole-surface link to one case study.
 *
 * A Tile with its padding moved inside, so the shot can bleed to the card's
 * edges while the copy keeps the standard --pad inset.
 */
export const ProjectCard = ({
  span,
  spanTablet,
  href,
  eyebrow,
  title,
  description,
  lead = false,
  image,
}: ProjectCardProps) => {
  return (
    <Tile span={span} spanTablet={spanTablet} href={href} sx={{ padding: 0 }}>
      <Box
        sx={{
          position: 'relative',
          height: lead ? 330 : 210,
          flexShrink: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          // A background image rather than next/image: the shot is decorative
          // cropped chrome, and the same element has to be able to render a
          // bare gradient when no screenshot exists.
          backgroundImage: image ? `url("${image}")` : SHOT_PLACEHOLDER,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Belt and braces for the gradient case, where `cover` is a no-op.
          backgroundColor: 'background.paper',
        }}
      >
        {!image && (
          <Typography
            variant="statLabel"
            component="span"
            aria-hidden="true"
            // --dim (styles.css:122), which the palette carries as text.disabled.
            sx={{ position: 'absolute', left: 18, top: 16, color: 'text.disabled' }}
          >
            Project shot
          </Typography>
        )}
      </Box>

      <Box sx={{ padding: '22px var(--pad) 26px' }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ margin: '9px 0 0', maxWidth: '44ch' }}>
          {description}
        </Typography>
      </Box>
    </Tile>
  );
};
