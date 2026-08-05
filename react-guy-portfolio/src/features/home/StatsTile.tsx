import { Tile } from '@/components/Tile';
import { Stat, StatRow } from '@/components/Stat';
import type { HomeStat } from '@/content/home';

export interface StatsTileProps {
  stats: readonly HomeStat[];
}

/**
 * `.stats` — row 3, cols 8-12.
 *
 * Not a link, so `arrow={false}` — spec §3 notes this is the one tile in the
 * set without a corner arrow.
 *
 * The figures are em-dashes, not numbers. Spec §4 flags the mockup's
 * 07 / +125 / +210 as fabricated and requires them replaced or the tile
 * deleted; that decision is open. See the TODO on `stats` in content/home.ts
 * for the deletion path — Services and Profiles go to span 6 each so the row
 * still sums to 12.
 */
export const StatsTile = ({ stats }: StatsTileProps) => {
  return (
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
  );
};
