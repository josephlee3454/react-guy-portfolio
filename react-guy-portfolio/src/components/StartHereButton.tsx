import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import { ctaHref, fixedCopy } from '@/content/site';
import { AppLink } from './AppLink';

export interface StartHereButtonProps {
  /** Defaults to the nav CTA target. */
  href?: string;
  /** Defaults to the spec's fixed label. */
  label?: string;
  sx?: SxProps<Theme>;
}

/**
 * The nav's amber pill.
 *
 * Reads its own label and target from content/site.ts rather than taking them
 * as props: this is chrome, identical on all five pages, so threading the same
 * two constants through every page would be ceremony. Props stay available as
 * overrides.
 *
 * DESIGN_SPEC §4 fixes the label as "Start here" — matched to the CTA tile's
 * register, deliberately not "Let's talk". The amber fill takes --ink text, set
 * by primary.contrastText in the theme, never white.
 */
export const StartHereButton = ({
  href = ctaHref,
  label = fixedCopy.navCta,
  sx,
}: StartHereButtonProps) => {
  return (
    <Button component={AppLink} href={href} sx={sx}>
      {label}
    </Button>
  );
};
