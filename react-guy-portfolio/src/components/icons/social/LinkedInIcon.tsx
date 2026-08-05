import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/**
 * LinkedIn — the official mark (MIT), inlined verbatim from index.html:70.
 *
 * A `0 0 128 128` viewBox, passed explicitly: SvgIcon defaults to `0 0 24 24`
 * and would crop this to its top-left corner.
 *
 * FILL-based and colourless — it inherits `currentColor`, so SocialRow can move
 * the whole chip from `text.secondary` to the accent on hover with one rule.
 *
 * No accessible name here: the link that wraps it carries the label, so the mark
 * itself is decorative and SvgIcon's default `aria-hidden` is correct. See
 * MonitorIcon.tsx for why this renders SvgIcon directly rather than using
 * createSvgIcon.
 */
export const LinkedInIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 128 128" {...props}>
<path d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"/>
  </SvgIcon>
);
