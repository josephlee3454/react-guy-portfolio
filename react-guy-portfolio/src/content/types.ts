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
  /** Accessible name — "LinkedIn", "GitHub". Rendered as aria-label, not text. */
  label: string;
  /** Which brand mark to draw. The component owns the path data. */
  icon: 'linkedin' | 'github';
  /**
   * Absent renders a non-interactive chip rather than a dead `href="#"`, which
   * would be focusable and navigate nowhere.
   */
  href?: string;
}
