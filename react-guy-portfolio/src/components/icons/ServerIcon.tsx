import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/** The Backend group's glyph — about.html:87. See MonitorIcon for the rationale. */
export const ServerIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M3 5h18v5H3zM3 14h18v5H3z" />
    <path d="M6.5 7.5h.01M6.5 16.5h.01" />
  </SvgIcon>
);
