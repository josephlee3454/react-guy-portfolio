import type { Metadata, Viewport } from 'next';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { dark, light } from '@/theme/tokens';
import { fontClassNames } from './fonts';

// TODO(copy): real title and description — placeholder until confirmed.
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Full stack engineer.',
};

// Per-scheme so the browser chrome matches the page it frames.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: light.bg },
    { media: '(prefers-color-scheme: dark)', color: dark.bg },
  ],
};

// No globals.css import — page styling comes from MuiCssBaseline, which also
// injects the design's :root custom properties.
export const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
