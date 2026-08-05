/**
 * Shapes for the content modules.
 *
 * Kept out of the content files themselves so those stay pure text — open one,
 * see strings, edit strings. Nothing here needs touching to change copy.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialItem {
  label: string;
  /** Omit inside a linked Tile — an anchor within an anchor is invalid. */
  href?: string;
}
