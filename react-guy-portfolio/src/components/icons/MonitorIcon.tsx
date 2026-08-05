import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/**
 * The Frontend group's glyph — about.html:78.
 *
 * Path data is copied verbatim from the mockup on a `0 0 24 24` viewBox, which
 * is SvgIcon's own default, so nothing had to be rescaled. The stroke treatment
 * (`fill:none`, `stroke:currentColor`, 1.6 width, round caps and joins) is not
 * set here: it belongs to `.sk .ico svg`, a rule about that one 46px plate
 * rather than about the drawing, so StackRow applies it. That keeps these four
 * usable elsewhere at whatever weight a caller wants.
 *
 * SvgIcon rather than a hand-written `<svg>`: house style forbids raw SVG in
 * components, and @mui/icons-material is not a dependency (nor worth adding for
 * four glyphs the mockup drew itself).
 *
 * WHY NOT createSvgIcon. It is the obvious tool for this and it does not work
 * here. `@mui/material/SvgIcon/createSvgIcon` carries a 'use client' directive,
 * so a server module importing it receives a client *reference*, not a
 * function — calling it at module scope fails the build with "Attempted to call
 * the default export ... from the server, but it's on the client". The only
 * fixes are marking these files 'use client', which would pull four otherwise
 * static drawings into the client bundle, or doing what the generated component
 * does anyway: render SvgIcon with the paths as children. Rendering a client
 * component from a server one is always legal; calling into one is not.
 */
export const MonitorIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" />
  </SvgIcon>
);
