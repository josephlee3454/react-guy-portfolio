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
import { formStatus } from '@/content/contact';

export interface ContactFormProps {
  /** The form controls, in render order. */
  fields: FieldProps[];
  /** Resting button label. */
  submitLabel: string;
  /**
   * Button label while a submission is in flight.
   *
   * DEFAULTED FROM CONTENT rather than required. The prose belongs in
   * content/contact.ts — it is reader-visible — but the page passes the three
   * `formStatus` strings it already knew about one by one, and adding two
   * required props would make this component uncompilable from an unchanged
   * page. Defaulting keeps the single source of the copy in content and leaves
   * the seam open for a caller that wants to override it.
   */
  sendingLabel?: string;
  /** Button label once a submission has failed — spec §10. Defaulted as above. */
  retryLabel?: string;
  /**
   * Formspree form id. Public by design — it ships in the client bundle either
   * way and is not a credential.
   */
  formId: string;
  /** Shown in place of the form once a submission succeeds. */
  successTitle: string;
  successBody: string;
  /** Carried by the status line when the whole submission fails. */
  errorMessage: string;
}

/** `.btn` at the form's own size — larger than the theme's default button. */
const submitSx = { alignSelf: 'flex-start', padding: '15px 30px', fontSize: 15 };

/**
 * `.form-done` (styles.css:459) — a dashed panel, not a second tile.
 *
 * The tile around it keeps its solid fill and its own 26px radius; only this
 * inner panel is dashed, at the mockup's 16px. Tile's `variant="dashed"` is the
 * coming-soon banner treatment — transparent fill, dashed edge, no surface —
 * and using it here would strip the form tile's fill on success and borrow a
 * signal that means "nothing here yet".
 */
const donePanelSx = {
  border: '1px dashed',
  borderColor: 'divider',
  borderRadius: '16px',
  padding: '26px',
};

export const ContactForm = ({
  fields,
  submitLabel,
  sendingLabel = formStatus.sendingLabel,
  retryLabel = formStatus.retryLabel,
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
        <Box role="status" aria-live="polite" sx={donePanelSx}>
          {/*
            22px flat, not the h2 variant's clamp(24px, 2.4vw, 34px) — this is a
            confirmation inside a tile, not a tile heading, and `.form-done h3`
            is explicit about the size. h3 also keeps the heading order sane
            under the page's h1.
          */}
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {successTitle}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: 1.65 }}>
            {successBody}
          </Typography>
        </Box>
      </Tile>
    );
  }

  // Any failed submission, field-level or form-level. The button must not fall
  // back to "Send it" afterwards — spec §10 re-enables it as "Try again".
  const hasFailed = Boolean(state.errors);
  const showError = hasFailed && !state.submitting;

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

        <Button type="submit" disabled={state.submitting} sx={submitSx}>
          {state.submitting ? sendingLabel : hasFailed ? retryLabel : submitLabel}
        </Button>

        {/*
          `.form-status` (styles.css:454) — the one status line spec §10 asks
          for, `role="status" aria-live="polite"`.

          ALWAYS RENDERED, empty at rest. A live region has to be in the DOM
          before its text changes for the change to be announced; mounting it
          together with the message is the classic way to get silence. The 16px
          floor is the mockup's, and it also stops the button jumping when the
          line fills.

          It carries BOTH states. "Sending…" on a disabled button is announced
          to nobody — a label change is not a live update — and the failure
          needs saying because nothing else on screen moves when a submit fails.
          One region rather than two so the two states replace each other
          instead of stacking, and `polite` rather than `alert` so it waits for
          a pause instead of interrupting whatever the reader is on.

          The mono face stretches spec §1's four-word cap on the error string.
          `.form-status` is mono in the mockup and this line has to read as the
          form's own machinery rather than as prose, so the mockup wins — but it
          is the one place in the app the cap is knowingly exceeded, and any
          longer wording should move to the body face instead.
        */}
        <Typography
          component="p"
          variant="mono"
          role="status"
          aria-live="polite"
          sx={{
            display: 'block',
            marginTop: '16px',
            minHeight: 16,
            // `.form-status.err` — accent ink, which darkens in light mode.
            // Not `error.main`: the design has no red, and the message points
            // somewhere useful rather than reporting a fault.
            color: showError ? 'accentInk' : 'text.secondary',
          }}
        >
          {state.submitting ? sendingLabel : showError ? errorMessage : ''}
        </Typography>
      </Box>
    </Tile>
  );
};
