import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tile } from './Tile';
import { Chip, ChipRow } from './Chip';
import { Eyebrow } from './Eyebrow';

/**
 * The gradient that stands in for a screenshot.
 *
 * DESIGN_SPEC §4 "Still missing": no real project screenshots exist and all
 * five shots are gradient placeholders. Rendering a gradient is therefore the
 * correct output for a card without an `image`, not a gap to be filled with a
 * guessed path.
 *
 * This is the fallback only. work.html gives each card its own gradient inline
 * (five distinct ones), so the real angles and colours arrive through `shot`
 * from content — they are per-project copy in the same sense the label is.
 */
const SHOT_PLACEHOLDER = 'linear-gradient(150deg, #25302E, #151918)';

export interface ProjectCardProps {
  /** Desktop columns. The lead case study is 8; the rest are 4. */
  span: number;
  /** Tablet columns (1-6) at <=1000px. */
  spanTablet?: number;
  href: string;
  /**
   * `company · category[ · category]`, e.g. "Amazon · Backend · LLM".
   *
   * There is no year: the eyebrow answers "who was this for and which half of
   * the stack", which is what the reader scans a card grid for. Eyebrow caps
   * each `·`-delimited segment at three words.
   */
  eyebrow: string;
  title: string;
  description: string;
  /** The lead case study: a 330px shot instead of 210px. */
  lead?: boolean;
  /** A real screenshot. Absent renders `shot`. */
  image?: string;
  /**
   * The shot's gradient — `.shot`'s inline `background` in work.html.
   *
   * Any CSS background value; each project carries its own so the grid reads as
   * five different pieces of work rather than one repeated swatch. Ignored when
   * `image` is set.
   */
  shot?: string;
  /**
   * `.shot`'s `data-label`, drawn top-left over the gradient — "AMAZON — ALEXA".
   *
   * Visible copy, so it comes from content; `aria-hidden` stays here because
   * hiding a decorative placeholder label from assistive tech is a rendering
   * decision, not something a content file should have to know.
   */
  shotLabel?: string;
  /** The `.chips` row closing `.meta` — 3-5 technologies. */
  tags?: readonly string[];
}

/**
 * `.pj` (styles.css:252) — a whole-surface link to one case study.
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
  shot = SHOT_PLACEHOLDER,
  shotLabel = 'Project shot',
  tags,
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
          backgroundImage: image ? `url("${image}")` : shot,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Belt and braces for the gradient case, where `cover` is a no-op.
          backgroundColor: 'background.paper',
          /*
           * Spec §8: the placeholder gradients are mixed for a dark surface.
           * Left alone in light mode they stay dark slabs on pale paper. The
           * filter also applies to a real screenshot once one exists, which is
           * the intent — the whole tile set should read as one exposure.
           */
          '@media (prefers-color-scheme: light)': {
            filter: 'saturate(.5) brightness(1.62)',
          },
        }}
      >
        {!image && (
          <Typography
            variant="statLabel"
            component="span"
            aria-hidden="true"
            // --dim (styles.css:256), which the palette carries as text.disabled.
            sx={{ position: 'absolute', left: 18, top: 16, color: 'text.disabled' }}
          >
            {shotLabel}
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

        {/*
          NESTING TRAP: the card itself is a link, so these chips get neither
          `href` nor `onClick` — Chip then renders a plain <span>. An <a> or
          <button> inside an <a> is invalid HTML, and the browser recovers by
          closing the outer anchor early, silently breaking both the click
          target and tab order. work.html's `<b>` tags are decorative for the
          same reason. See Chip.tsx.
        */}
        {tags !== undefined && tags.length > 0 && (
          <ChipRow>
            {tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </ChipRow>
        )}
      </Box>
    </Tile>
  );
};
