'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';

export type AppLinkProps = ComponentProps<typeof NextLink>;

/**
 * The link element every clickable surface renders as.
 *
 * Why this file exists: MUI's `Box` takes the element to render via a
 * `component` prop, and passing `next/link` there directly fails at prerender
 * with "Functions cannot be passed directly to Client Components". Under the
 * `react-server` condition `next/link` resolves to a plain server function
 * rather than a client reference, so it is not serializable as a prop value.
 *
 * A `'use client'` module's exports ARE client references, which serialize
 * fine. So `component={AppLink}` works from a server component while
 * `component={NextLink}` does not — and callers keep prefetching and
 * client-side navigation, which `component="a"` would have silently dropped.
 *
 * Rendering `<NextLink>` as an element (rather than passing it as a value) is
 * unaffected; this only matters for the `component` prop.
 */
export default function AppLink(props: AppLinkProps) {
  return <NextLink {...props} />;
}
