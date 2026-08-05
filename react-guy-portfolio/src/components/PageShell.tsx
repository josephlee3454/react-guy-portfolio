import type { ReactNode } from 'react';
import Bento from './Bento';
import Nav from './Nav';
import Footer from './Footer';
import { email } from '@/content/site';

export interface PageShellProps {
  /** Tiles. They land directly on the bento grid, so each must carry a span. */
  children: ReactNode;
}

/**
 * The template every page renders into: nav pill, bento grid, footer bar.
 *
 * All five pages share this skeleton and differ only in the tiles they put on
 * the grid, so the chrome lives here once rather than being re-assembled per
 * page. Pages stay pure content.
 *
 * Note there is no CTA tile here. It appears on four of the five pages, and
 * spec §7 is explicit that contact omits it — that page is itself the CTA — so
 * pages opt in by rendering <CtaTile> as their last child rather than opting out.
 */
export default function PageShell({ children }: PageShellProps) {
  return (
    <>
      <Nav />
      <Bento>{children}</Bento>
      <Footer email={email} />
    </>
  );
}
