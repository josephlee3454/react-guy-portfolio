import Button from '@mui/material/Button';

import { Field, type FieldProps } from '@/components/Field';
import { Tile } from '@/components/Tile';

export interface ContactFormProps {
  /** The form controls, in render order. */
  fields: FieldProps[];
  submitLabel: string;
}

/** `.btn` at the form's own size — larger than the theme's default button. */
const submitSx = { alignSelf: 'flex-start', padding: '15px 30px', fontSize: 15 };

/**
 * The contact form tile — spec §7's left column, span 7.
 *
 * THE FORM IS MARKUP ONLY — no `action`, no `onSubmit`, no server action, no
 * validation, no API route (spec §7 and README-FOR-CLAUDE). The button is
 * `type="button"`, as in the mockup, so it cannot navigate either. A form that
 * silently discards input is the honest placeholder until there is somewhere
 * real to send it; wiring one up is a separate decision about where the mail
 * goes. That is also why neither this file nor the page needs 'use client'.
 *
 * WHEN IT DOES: this is the one section of the page that will eventually hold
 * state (field values, validation, submit), and it is arranged so that day is a
 * one-line change confined to this file. Every prop it takes is plain
 * serialisable data — arrays of strings, no `children`, no ReactNode, no
 * functions — so nothing here would have to cross the RSC boundary as an
 * unserialisable value. The page passes content in and renders nothing into it.
 * Everything it renders (Tile, Field, Button) is already client-safe. So adding
 * `'use client'` at the top of this file is the whole migration; no call site
 * changes and no other file becomes a client component.
 */
export const ContactForm = ({ fields, submitLabel }: ContactFormProps) => {
  return (
    <Tile span={7}>
      {fields.map((field) => (
        <Field key={field.name} {...field} />
      ))}

      <Button type="button" sx={submitSx}>
        {submitLabel}
      </Button>
    </Tile>
  );
};
