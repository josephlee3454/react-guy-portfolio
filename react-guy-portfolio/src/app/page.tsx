import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Bento from '@/components/Bento';
import Tile from '@/components/Tile';
import Eyebrow from '@/components/Eyebrow';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import CtaTile from '@/components/CtaTile';
import ProjectCard from '@/components/ProjectCard';
import PostList, { PostRow } from '@/components/PostList';
import Timeline, { TimelineItem } from '@/components/Timeline';
import Chip, { ChipRow } from '@/components/Chip';
import Stat, { StatRow } from '@/components/Stat';
import SocialRow from '@/components/SocialRow';
import Field from '@/components/Field';
import Marquee from '@/components/Marquee';

/**
 * TEMPORARY — component gallery, not a design page.
 *
 * Renders every component so the set can be checked in a browser and so the
 * server/client boundary is actually exercised. Delete when the real pages land.
 */

// TODO(copy): every string on this page is placeholder.
export default function Gallery() {
  return (
    <>
      <Nav />

      <Bento>
        <PageHead
          eyebrow="Component gallery"
          title="Everything"
          accent="."
          lede="Every reusable component rendered once, so the set can be checked against the mockups."
        />

        <Tile span={6} spanTablet={6} rowSpan={2} minHeight={440} align="end" href="/about">
          <Eyebrow>Tile · hero</Eyebrow>
          <Typography variant="h2">span 6, row span 2</Typography>
        </Tile>

        <Tile span={3} spanTablet={3} minHeight={210} align="end" href="/about">
          <Eyebrow>More about me</Eyebrow>
          <Typography variant="h2">Credentials</Typography>
        </Tile>

        <Tile span={3} spanTablet={3} rowSpan={2} minHeight={440} align="end" href="/work">
          <Eyebrow>Selected work</Eyebrow>
          <Typography variant="h2">Projects</Typography>
        </Tile>

        <Tile span={3} spanTablet={3} minHeight={210} align="end" href="/writing">
          <Eyebrow>Notes</Eyebrow>
          <Typography variant="h2">Writing</Typography>
        </Tile>

        <Tile span={4} spanTablet={3} minHeight={190} align="end" href="/contact">
          <Eyebrow>What I do</Eyebrow>
          <Typography variant="h2">Services</Typography>
        </Tile>

        <Tile span={3} spanTablet={3} minHeight={190} align="end" href="/contact">
          <SocialRow
            items={[{ label: 'GH' }, { label: 'LI' }, { label: 'X' }, { label: 'RS' }]}
          />
          <Eyebrow>Elsewhere</Eyebrow>
          <Typography variant="h2">Profiles</Typography>
        </Tile>

        {/* Not a link, so no arrow — the one tile without one. */}
        <Tile span={5} spanTablet={6} minHeight={190} align="center" arrow={false}>
          <StatRow>
            <Stat value="—" label={<>Placeholder<br />metric</>} />
            <Stat value="—" label={<>Placeholder<br />metric</>} />
            <Stat value="—" label={<>Placeholder<br />metric</>} />
          </StatRow>
        </Tile>

        <Marquee
          items={[
            <>
              <b>Available</b> for work · <i>2026</i>
            </>,
            <>
              <b>Available</b> for work · <i>2026</i>
            </>,
          ]}
        />

        <Tile span={12} spanTablet={6} variant="raised" arrow={false}>
          <Eyebrow>Chips</Eyebrow>
          <ChipRow>
            <Chip active href="/work">
              All
            </Chip>
            <Chip href="/work">Platform</Chip>
            <Chip href="/work">Frontend</Chip>
            <Chip>Static</Chip>
          </ChipRow>
        </Tile>

        <ProjectCard
          span={8}
          href="/work"
          eyebrow="2026 · Lead · Platform"
          title="Lead case study"
          description="Placeholder description for the lead project card."
          lead
        />
        <ProjectCard
          span={4}
          href="/work"
          eyebrow="2026 · Engineer · Web"
          title="Second project"
          description="Placeholder description."
        />

        <PostList>
          <PostRow
            href="/writing"
            date="May 2026"
            dateTime="2026-05"
            readTime="6 min"
            title="A placeholder post title"
            excerpt="Placeholder excerpt standing in for real writing."
          />
          <PostRow
            href="/writing"
            date="Apr 2026"
            dateTime="2026-04"
            readTime="4 min"
            title="Another placeholder post"
            excerpt="Placeholder excerpt standing in for real writing."
          />
        </PostList>

        <Tile span={7} spanTablet={6} arrow={false}>
          <Eyebrow>Timeline</Eyebrow>
          <Timeline>
            <TimelineItem
              marker="2024—NOW"
              title="Placeholder role"
              description="Placeholder description of the role."
            />
            <TimelineItem
              marker="2022—24"
              title="Placeholder role"
              description="Placeholder description of the role."
            />
          </Timeline>
        </Tile>

        <Tile span={5} spanTablet={6} arrow={false}>
          <Eyebrow>Form fields</Eyebrow>
          <Box component="form" sx={{ mt: 1 }}>
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Message" name="message" multiline />
          </Box>
        </Tile>

        <CtaTile headline="So what are we building?" href="/contact" />
      </Bento>

      {/* TODO(copy): real email. */}
      <Footer email="hello@yourname.com" />
    </>
  );
}
