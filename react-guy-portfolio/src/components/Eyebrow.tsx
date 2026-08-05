import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface EyebrowProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Mono uppercase label above a heading. The most-used primitive in the design
 * (21 instances across the five pages).
 *
 * Spec §1: "Never use the mono face for anything longer than four words."
 * A theme cannot express that, so it is checked here — dev only, and only for
 * plain string children, since counting words inside arbitrary nodes would
 * produce false positives.
 */
export const Eyebrow = ({ children, sx }: EyebrowProps) => {
  if (process.env.NODE_ENV !== 'production' && typeof children === 'string') {
    // Interpuncts delimit independent fields rather than prose — project
    // eyebrows read `year · role · category`, which is six words but reads
    // as three labels. So each segment is checked on its own; only an undelimited
    // string is held to the four-word cap.
    const segments = children.split('·');
    const cap = segments.length > 1 ? 3 : 4;
    const offender = segments
      .map((s) => s.trim())
      .find((s) => s.length > 0 && s.split(/\s+/).length > cap);

    if (offender) {
      console.warn(
        `[Eyebrow] "${offender}" exceeds ${cap} words. Spec §1 caps the mono face — ` +
          'past that it stops reading as a label. Shorten it or use a different variant.',
      );
    }
  }

  return (
    <Typography variant="eyebrow" sx={[{ margin: '0 0 10px' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Typography>
  );
};
