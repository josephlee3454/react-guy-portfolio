import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

/**
 * Bricolage Grotesque is a variable family, so `weight` is deliberately
 * omitted — the full 200-800 range loads, covering the 600 and 800 the spec
 * calls for. Passing a weight array to a variable family is the failure mode
 * to avoid here.
 */
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--display',
});

export const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--body',
});

/** No variable axis on Plex Mono, so the weights are listed explicitly. */
export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--mono',
});

export const fontClassNames = `${display.variable} ${body.variable} ${mono.variable}`;
