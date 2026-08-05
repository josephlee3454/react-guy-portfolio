import type { Metadata } from 'next';

import { PageShell } from '@/components/PageShell';
import { ContactForm } from '@/features/contact/ContactForm';
import { ContactHead } from '@/features/contact/ContactHead';
import { DirectDetails } from '@/features/contact/DirectDetails';
import { contactHead, directDetails, formFields, submitLabel } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: contactHead.lede,
};

/**
 * Spec §7: head → form (7) + direct details (5).
 *
 * Grid rows, each summing to 12:
 *   ContactHead                12
 *   form 7 + direct details 5  12
 *
 * TWO TILES, deliberately. The earlier "before you write" row is gone: this
 * revision of contact.html ends the page after the details tile. A list of
 * instructions between the reader and the form asks them to do homework before
 * writing, which is a cost paid by exactly the people most likely to bounce.
 *
 * Assembly only — content in, features out. Each feature owns its own span and
 * everything inside it, so there is no styling at this level.
 *
 * NO CTA TILE, also deliberate. Spec §7: this page is the CTA, and a tile
 * asking the reader to get in touch above a form they are already looking at is
 * a second ask that weakens the first. PageShell renders no CTA of its own, so
 * omitting it here is the whole mechanism.
 *
 * THE FORM IS MARKUP ONLY — no `action`, no `onSubmit`, no server action, no
 * validation, no API route (spec §7 and README-FOR-CLAUDE). See ContactForm,
 * which also explains why nothing here needs 'use client'.
 *
 * The h1 is `fixedCopy.ctaHeadline` broken across two lines with the question
 * mark as PageHead's amber accent — see contact.ts.
 */
export const Contact = () => {
  return (
    <PageShell route="/contact">
      <ContactHead {...contactHead} />

      <ContactForm fields={formFields} submitLabel={submitLabel} />

      <DirectDetails {...directDetails} />
    </PageShell>
  );
};

export default Contact;
