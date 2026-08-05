import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@/theme/tokens';

export interface TimelineProps {
  /** TimelineItem elements. */
  children: ReactNode;
  /**
   * 2 is the about page's credentials block (`.tl-2`); contact's "before you
   * write" steps stay at 1.
   */
  columns?: 1 | 2;
}

/**
 * `.tl` (styles.css:224) — an ordered list of dated or numbered entries.
 *
 * The two-column form is CSS multi-column (`columns: 2`), not a grid: entries
 * flow down the first column and continue in the second, so a short list stays
 * balanced without the caller having to split it. That is also why every item
 * keeps its top border there — with multi-column flow, the item that starts the
 * second column is not `:first-child`, so a borderless first item would leave
 * one column visibly missing its rule.
 */
export const Timeline = ({ children, columns = 1 }: TimelineProps) => {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        margin: '18px 0 0',
        padding: 0,

        ...(columns === 2
          ? {
              // The 820px fold: the mockup collapses .tl-2 to one column at
              // max-width:820px (styles.css:284), which is a third breakpoint
              // the spec does not have. Folded up into the 1000px breakpoint so
              // the design keeps exactly the two it declares — which is what
              // the single-column xs/sm band below expresses.
              columns: { xs: 1, md: 2 },
              columnGap: '44px',
              // Entries are multi-line, so without this an item would split
              // across the column break.
              '& > li': {
                breakInside: 'avoid',
                // The shorthand would reset border-top-color to currentColor,
                // and this selector outranks the item's own rule. tokens.line
                // is the literal behind palette.divider.
                borderTop: `1px solid ${tokens.line}`,
                paddingTop: '16px',
              },
            }
          : {
              '& > li:first-of-type': { borderTop: 0, paddingTop: '4px' },
            }),
      }}
    >
      {children}
    </Box>
  );
};

export interface TimelineItemProps {
  /**
   * The left-gutter label: a year or range on about ("2022-NOW"), a step
   * number on contact ("01").
   */
  marker: string;
  /**
   * Machine-readable date for `marker`, e.g. "2022". Supplying it renders the
   * marker as <time>; without it the marker is a plain span, since the contact
   * page's step numbers are sequence positions and not dates.
   */
  dateTime?: string;
  title: string;
  description: string;
}

/** One `.tl li` — a 96px marker gutter beside the entry. */
export const TimelineItem = ({ marker, dateTime, title, description }: TimelineItemProps) => {
  return (
    <Box
      component="li"
      sx={{
        display: 'grid',
        // The marker gutter collapses below 620px — the xs band.
        gridTemplateColumns: { xs: '1fr', sm: '96px 1fr' },
        gap: { xs: '4px', sm: '18px' },
        padding: '16px 0',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="mono"
        component={dateTime ? 'time' : 'span'}
        {...(dateTime ? { dateTime } : {})}
        sx={{ paddingTop: '4px' }}
      >
        {marker}
      </Typography>

      <Box>
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ margin: '6px 0 0' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
