'use client';

/*
 * The only client component on this page, and the only one in the app besides
 * the nav drawer and the link wrapper.
 *
 * `useForm` is a hook, so the boundary has to land somewhere. It lands here
 * rather than on the page because this file was arranged for it: every prop is
 * plain serialisable data, the page renders nothing into it, and everything it
 * renders (Tile, Field, Button) was already client-safe. So the page, the
 * details tile and the page head all stay on the server.
 */

import { useForm, ValidationError } from '@formspree/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Field, type FieldProps } from '@/components/Field';
import { Tile } from '@/components/Tile';

export interface ContactFormProps {
  /** The form controls, in render order. */
  fields: FieldProps[];
  submitLabel: string;
  /**
   * Formspree form id. Public by design — it ships in the client bundle either
   * way and is not a credential.
   */
  formId: string;
  /** Shown in place of the form once a submission succeeds. */
  successTitle: string;
  successBody: string;
  /** Shown above the button when the whole submission fails. */
  errorMessage: string;
}

/** `.btn` at the form's own size — larger than the theme's default button. */
const submitSx = { alignSelf: 'flex-start', padding: '15px 30px', fontSize: 15 };

export const ContactForm = ({
  fields,
  submitLabel,
  formId,
  successTitle,
  successBody,
  errorMessage,
}: ContactFormProps) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <Tile span={7} align="center">
        {/*
          `role="status"` rather than a bare heading: the form is replaced in
          place, so a screen reader gets no navigation event to announce. The
          live region is what tells a non-sighted user the send worked.
        */}
        <Box role="status" aria-live="polite">
          <Typography variant="h2">{successTitle}</Typography>
          <Typography variant="body1" sx={{ marginTop: '12px', color: 'text.secondary' }}>
            {successBody}
          </Typography>
        </Box>
      </Tile>
    );
  }

  return (
    <Tile span={7}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/*
          Honeypot. Real people never fill this in because they never see it;
          bots that parse the DOM and complete every input do. Formspree drops
          submissions where `_gotcha` has a value.

          Hidden with an off-screen position rather than `display: none` —
          some bots skip inputs that are display:none, which defeats the point.
          `tabIndex={-1}` and `aria-hidden` keep it out of the keyboard path and
          the accessibility tree, and `autoComplete="off"` stops a browser
          helpfully filling it in and getting the sender silently dropped.
        */}
        <Box
          component="input"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          sx={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        {fields.map((field) => (
          <Box key={field.name}>
            <Field {...field} />
            {/*
              Field-level errors from Formspree — a rejected email address, a
              field the form config requires. `ValidationError` renders nothing
              when there is nothing wrong with that field.
            */}
            <ValidationError
              prefix={field.label}
              field={field.name}
              errors={state.errors}
              style={{
                display: 'block',
                margin: '-10px 0 18px',
                fontSize: 13,
                color: 'var(--mui-palette-error-main)',
              }}
            />
          </Box>
        ))}

        {/*
          Form-level failure — network down, Formspree rejecting the whole
          submission. Distinct from the per-field errors above, and it has to be
          announced because nothing else on screen changes when a submit fails.
        */}
        {state.errors && (
          <Typography
            role="alert"
            variant="body2"
            sx={{ marginBottom: '18px', color: 'error.main' }}
          >
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" disabled={state.submitting} sx={submitSx}>
          {state.submitting ? 'Sending…' : submitLabel}
        </Button>
      </Box>
    </Tile>
  );
};
