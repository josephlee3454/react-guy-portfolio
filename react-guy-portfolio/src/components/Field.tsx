import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldProps {
  /** Mono uppercase, sits above the control — not a floating MUI label. */
  label: string;
  /** The form control's name. Also seeds the id that ties label to input. */
  name: string;
  /** Ignored when `multiline` or `options` is set. */
  type?: string;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  /**
   * Present renders a native `<select>` instead of an input.
   *
   * Not in the original prop list, but contact.html's third field is a select
   * and none of the other props can express one. Native (rather than MUI's
   * Select) because a native select is a labelable element, so the `htmlFor`
   * association below actually resolves; MUI's renders a div that a `<label>`
   * cannot point at, and it would need JS for a control the design draws as a
   * plain box.
   */
  options?: FieldOption[];
  sx?: SxProps<Theme>;
}

/**
 * `.field` — styles.css:257. Four uses on contact.html.
 *
 * The input chrome itself (fill, 12px radius, 15px text, borders, focus ring)
 * comes from the theme's MuiOutlinedInput override; this component only adds
 * the label, the spacing, and the two things the override does not cover
 * (multiline padding and the textarea's height floor).
 *
 * DESIGN_SPEC §7: the form has no action, handler, or validation. This is
 * markup only — no submit handler and no API route are implied.
 */
export const Field = ({
  label,
  name,
  type,
  multiline = false,
  required = false,
  placeholder,
  options,
  sx,
}: FieldProps) => {
  // Derived from `name` rather than React's useId so the component stays a
  // server component (useId is a hook) and the id stays stable and readable.
  // One consequence: two fields sharing a name on one page would collide.
  const id = `field-${name}`;
  const isSelect = Boolean(options);

  return (
    <Box sx={[{ display: 'block', marginBottom: '18px' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {/*
        A real <label for> — the mockup wraps the input in a <label>, which is
        also valid, but the explicit association survives the input being moved
        or wrapped by MUI's FormControl.
      */}
      <Typography
        variant="statLabel"
        component="label"
        htmlFor={id}
        sx={{ display: 'block', marginBottom: '8px' }}
      >
        {label}
      </Typography>

      <TextField
        id={id}
        name={name}
        type={multiline || isSelect ? undefined : (type ?? 'text')}
        multiline={multiline}
        // ~5 rows at 15px lands on the mockup's 132px; minHeight below pins it
        // exactly. MUI renders multiline through TextareaAutosize, so the box
        // grows with the content instead of offering the mockup's manual
        // `resize: vertical` handle — the two mechanisms fight each other, and
        // autosizing is the better half of the trade.
        minRows={multiline ? 5 : undefined}
        required={required}
        placeholder={placeholder}
        select={isSelect}
        slotProps={isSelect ? { select: { native: true } } : undefined}
        sx={
          multiline
            ? {
                // The theme sets `MuiOutlinedInput.input { padding: 14px 16px }`,
                // and theme styleOverrides are applied after MUI's own variants —
                // so it also overrides the `padding: 0` MUI gives a multiline
                // input, stacking that padding on top of the root's. Undone here
                // rather than in the theme, which is out of scope for this
                // component set.
                '& .MuiOutlinedInput-root': {
                  padding: '14px 16px',
                  minHeight: 132,
                  alignItems: 'flex-start',
                },
                '& .MuiOutlinedInput-input': { padding: 0 },
              }
            : undefined
        }
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
};
