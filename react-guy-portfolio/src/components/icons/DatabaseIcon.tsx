import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/** The Data group's glyph — about.html:96. See MonitorIcon for the rationale. */
export const DatabaseIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </SvgIcon>
);
