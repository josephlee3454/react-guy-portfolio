import type { Metadata, Viewport } from 'next';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { tokens } from '@/theme/tokens';
import { fontClassNames } from './fonts';

// TODO(copy): real title and description — placeholder until confirmed.
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Full stack engineer.',
};

export const viewport: Viewport = { themeColor: tokens.ink };

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
