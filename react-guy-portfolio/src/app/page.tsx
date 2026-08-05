import { PageShell } from '@/components/PageShell';
import { CtaTile } from '@/components/CtaTile';

import { Hero } from '@/features/home/Hero';
import { CredentialsTile } from '@/features/home/CredentialsTile';
import { ProjectsTile } from '@/features/home/ProjectsTile';
import { WritingTile } from '@/features/home/WritingTile';
import { ServicesTile } from '@/features/home/ServicesTile';
import { ProfilesTile } from '@/features/home/ProfilesTile';
import { StatsTile } from '@/features/home/StatsTile';
import { MarqueeBand } from '@/features/home/MarqueeBand';

import { socials } from '@/content/site';
import {
  cta,
  credentials,
  hero,
  marquee,
  profiles,
  projects,
  services,
  stats,
  writing,
} from '@/content/home';

/**
 * The bento home — DESIGN_SPEC §2.
 *
 * Assembly only: content in, features out. Every span, minHeight, align and sx
 * on this page lives inside the feature that owns it, in src/features/home —
 * there is deliberately not a <Box> or an `sx` prop left in this file.
 *
 * Grid map, and the rule from §7 that every row sums to 12:
 *
 *   rows 1-2   HERO 6 (row-span 2) | CREDENTIALS 3 | PROJECTS 3 (row-span 2)  = 12
 *              hero continues      | WRITING     3 | projects continues       = 12
 *   row 3      SERVICES 4 | PROFILES 3 | STATS 5                              = 12
 *   row 4      MARQUEE 12                                                     = 12
 *   row 5      CTA 12                                                         = 12
 *
 * DOM ORDER IS LOAD-BEARING. The grid is auto-placed, so credentials must be
 * emitted before projects: hero claims cols 1-6 of rows 1-2, credentials then
 * takes cols 7-9 of row 1, projects takes cols 10-12 across both rows, and
 * writing drops into cols 7-9 of row 2. Emitting projects second — which spec
 * §6's reading-priority note would suggest — puts it at cols 7-9 and breaks the
 * map in §2. The map wins; §6's ordering is followed for the rest of the page.
 *
 * Tablet spans (<=1000px, a 6-column grid) come from styles.css:186-192:
 * hero/stats/marquee/cta go full width at 6, the other five sit at 3 in pairs.
 * Mobile is one column and stacks in this DOM order.
 */
export const Home = () => {
  return (
    <PageShell route="/">
      {/* ---- rows 1-2: 6 + 3 + 3 = 12, and 6 + 3 + 3 = 12 ---- */}

      <Hero
        eyebrow={hero.eyebrow}
        name={hero.name}
        accent={hero.accent}
        bio={hero.bio}
        href={hero.href}
        portraitSrc={hero.portraitSrc}
        portraitAlt={hero.portraitAlt}
      />

      {/* DOM ORDER IS LOAD-BEARING — credentials before projects. See above. */}
      <CredentialsTile {...credentials} />

      <ProjectsTile {...projects} />

      <WritingTile {...writing} />

      {/* ---- row 3: 4 + 3 + 5 = 12 ---- */}

      <ServicesTile {...services} />

      <ProfilesTile {...profiles} socials={socials} />

      <StatsTile stats={stats} />

      {/* ---- row 4: 12 ---- */}

      <MarqueeBand {...marquee} />

      {/* ---- row 5: 12 ---- */}

      <CtaTile headline={cta.headline} href={cta.href} />
    </PageShell>
  );
};

export default Home;
