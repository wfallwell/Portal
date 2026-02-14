import TextField, { TextFieldProps } from '@mui/material/TextField';

/**
 * Design-system text field. Outlined variant, theme spacing and radius.
 * Use helperText for hints; use error + helperText for validation.
 */
export function AppTextField(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}
