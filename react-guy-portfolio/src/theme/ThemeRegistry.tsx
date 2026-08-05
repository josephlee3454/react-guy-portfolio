'use client';

import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './index';

/**
 * `enableCssLayer` wraps Emotion's output in `@layer mui`, so any plain CSS
 * written later wins without a specificity fight. This is the App-Router-safe
 * answer to the spec's warning that per-tile classes must come after `.tile`
 * in the stylesheet — layer order settles it instead of source order.
 */
export const ThemeRegistry = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ key: 'mui', enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
