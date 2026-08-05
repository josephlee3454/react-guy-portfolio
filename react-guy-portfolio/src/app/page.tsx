import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PageShell from '@/components/PageShell';
import Tile from '@/components/Tile';
import Hero from '@/components/Hero';
import Eyebrow from '@/components/Eyebrow';
import Marquee from '@/components/Marquee';
import Stat, { StatRow } from '@/components/Stat';
import SocialRow from '@/components/SocialRow';
import CtaTile from '@/components/CtaTile';

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
 *
 * Every sx below is a plain object. These are server components and MUI's Box
 * is a client component, so a `(theme) => ({...})` callback would throw
 * "Functions cannot be passed directly to Client Components" at prerender —
 * see the note in Bento.tsx.
 */
export default function Home() {
  return (
    <PageShell>
      {/* ---- rows 1-2: 6 + 3 + 3 = 12, and 6 + 3 + 3 = 12 ---- */}

      <Hero
        span={6}
        spanTablet={6}
        rowSpan={2}
        eyebrow={hero.eyebrow}
        name={hero.name}
        accent={hero.accent}
        bio={hero.bio}
        href={hero.href}
        portraitSrc={hero.portraitSrc}
        portraitAlt={hero.portraitAlt}
      />

      <Tile span={3} spanTablet={3} minHeight={210} align="end" href={credentials.href}>
        <Eyebrow>{credentials.eyebrow}</Eyebrow>
        <Typography variant="h2">{credentials.title}</Typography>
      </Tile>

      <Tile
        span={3}
        spanTablet={3}
        rowSpan={2}
        align="end"
        href={projects.href}
        // styles.css:113 / :189 — 440px on the 12-column grid, but the tile
        // loses its row span at tablet (Tile only sets grid-row at md), so it
        // no longer has two rows of height to fill and drops to 300px.
        sx={{ minHeight: { xs: 300, md: 440 } }}
      >
        {/*
          `.projects .thumb` (styles.css:114). Still the gradient placeholder:
          spec §4 lists the project shot as unshot, and inventing a path would
          render a broken image rather than an honest placeholder. When the real
          crop lands, swap the gradient for backgroundImage + backgroundSize:
          'cover' and delete the label.
        */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '58%',
            background: 'linear-gradient(150deg, #25302E, #151918)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="statLabel"
            component="span"
            // --dim (styles.css:122), carried by the palette as text.disabled.
            sx={{ position: 'absolute', top: 16, left: 18, color: 'text.disabled' }}
          >
            Project shot
          </Typography>
        </Box>

        <Eyebrow>{projects.eyebrow}</Eyebrow>
        <Typography variant="h2">{projects.title}</Typography>
      </Tile>

      <Tile span={3} spanTablet={3} minHeight={210} align="end" href={writing.href}>
        <Eyebrow>{writing.eyebrow}</Eyebrow>
        <Typography variant="h2">{writing.title}</Typography>
      </Tile>

      {/* ---- row 3: 4 + 3 + 5 = 12 ---- */}

      <Tile span={4} spanTablet={3} minHeight={190} align="end" href={services.href}>
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <Typography variant="h2">{services.title}</Typography>
      </Tile>

      <Tile span={3} spanTablet={3} minHeight={190} align="end" href={profiles.href}>
        {/*
          Items carry no href on purpose. This tile is itself an <a>, and an
          anchor inside an anchor is invalid HTML — the browser closes the outer
          one early, which would break the tile's click target. See SocialRow's
          docs. The chips render as spans here; contact.html links them.
        */}
        <SocialRow items={socials} />
        <Eyebrow>{profiles.eyebrow}</Eyebrow>
        <Typography variant="h2">{profiles.title}</Typography>
      </Tile>

      {/*
        Stats. Not a link, so `arrow={false}` — spec §3 notes this is the one
        tile in the set without a corner arrow.

        The figures are em-dashes, not numbers. Spec §4 flags the mockup's
        07 / +125 / +210 as fabricated and requires them replaced or the tile
        deleted; that decision is open. See the TODO on `stats` in content/home.ts
        for the deletion path — Services and Profiles go to span 6 each so the
        row still sums to 12.
      */}
      <Tile span={5} spanTablet={6} minHeight={190} align="center" arrow={false}>
        <StatRow>
          {stats.map((stat, index) => (
            <Stat
              // Placeholder figures with no identity of their own; the list is
              // static and never reorders, so an index key is correct here.
              key={`stat-${index}`}
              value={stat.value}
              label={
                <>
                  {stat.label[0]}
                  <br />
                  {stat.label[1]}
                </>
              }
            />
          ))}
        </StatRow>
      </Tile>

      {/* ---- row 4: 12 ---- */}

      {/*
        Marquee carries its own full-width spans. The phrase is built here
        rather than in content/home.ts because it is not plain text — the
        emphasis and the accent glyph are markup, and home.ts is a .ts data
        module. It supplies the parts; this composes them.
      */}
      <Marquee
        items={Array.from({ length: marquee.repeat }, () => (
          <>
            {marquee.lead} <b>{marquee.emphasis}</b> {marquee.trail} <i>{marquee.glyph}</i>
          </>
        ))}
      />

      {/* ---- row 5: 12 ---- */}

      <CtaTile headline={cta.headline} href={cta.href} />
    </PageShell>
  );
}
