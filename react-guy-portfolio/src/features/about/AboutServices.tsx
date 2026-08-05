import Typography from '@mui/material/Typography';

import { Tile } from '@/components/Tile';
import { Eyebrow } from '@/components/Eyebrow';

export interface AboutServicesProps {
  services: readonly { eyebrow: string; title: string; description: string }[];
}

/**
 * The three service tiles. Row: 4 + 4 + 4 = 12.
 *
 * ONE FEATURE RENDERING A LIST, not three renders of a single-card feature.
 *
 * The thing worth protecting here is the row, not the card. A service tile's
 * span is only correct in the context of its two siblings: 4 is right for three
 * of them and wrong for two or four. If the feature were `<AboutService />` and
 * the page mapped over the content, the page would own that arithmetic — it
 * would be the file that has to be re-read when a fourth service is written —
 * and "the row sums to 12" would become a rule enforced nowhere. Owning the
 * whole list means this file is the single place that has to change, and the
 * page keeps saying nothing about layout.
 *
 * The cards are also uniform: nothing distinguishes them but their copy, so
 * there is no per-card variation for a prop-driven single-card component to
 * carry. A Fragment is transparent to the grid, so the three Tiles remain
 * direct children of Bento exactly as before.
 */
export const AboutServices = ({ services }: AboutServicesProps) => {
  return (
    <>
      {services.map((service) => (
        <Tile key={service.title} span={4} arrow={false}>
          <Eyebrow>{service.eyebrow}</Eyebrow>
          <Typography variant="h2">{service.title}</Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.65, margin: '12px 0 0' }}>
            {service.description}
          </Typography>
        </Tile>
      ))}
    </>
  );
};
