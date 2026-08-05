import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { PageHead } from '@/components/PageHead';
import { BeforeYouWrite } from '@/features/contact/BeforeYouWrite';
import { ContactForm } from '@/features/contact/ContactForm';
import { DirectDetails } from '@/features/contact/DirectDetails';
import { socials } from '@/content/site';
import { beforeYouWrite, contactHead, directDetails, formFields, submitLabel } from '@/content/contact';

// TODO(copy): title and description follow the placeholder page copy.
export const metadata: Metadata = {
  title: 'Contact',
  description: contactHead.lede,
};

/**
 * Spec §7: head → form (7) + direct details (5) → "before you write" (12).
 *
 * Grid rows, each summing to 12:
 *   PageHead                   12
 *   form 7 + direct details 5  12
 *   before you write           12
 *
 * Assembly only — content in, features out. Each feature owns its own span and
 * everything inside it, so there is no styling at this level.
 *
 * NO CTA TILE, deliberately. Spec §7: this page is the CTA, and a tile asking
 * the reader to get in touch above a form they are already looking at is a
 * second ask that weakens the first. PageShell renders no CTA of its own, so
 * omitting it here is the whole mechanism.
 *
 * THE FORM IS MARKUP ONLY — no `action`, no `onSubmit`, no server action, no
 * validation, no API route (spec §7 and README-FOR-CLAUDE). See ContactForm,
 * which also explains why nothing here needs 'use client'.
 *
 * The h1 is `fixedCopy.ctaHeadline` split at the `?` (see contact.ts) so the
 * question mark renders as PageHead's amber accent.
 */
export const Contact = () => {
  return (
    <PageShell route="/contact">
      <PageHead {...contactHead} />

      <ContactForm fields={formFields} submitLabel={submitLabel} />

      <DirectDetails {...directDetails} socials={socials} />

      <BeforeYouWrite {...beforeYouWrite} />
    </PageShell>
  );
};

export default Contact;
