import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/** The Cloud group's glyph — about.html:105. See MonitorIcon for the rationale. */
export const CloudIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M17.5 19H7a4.5 4.5 0 0 1-.7-8.95A6 6 0 0 1 17.8 11a4 4 0 0 1-.3 8z" />
  </SvgIcon>
);
