import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export interface AppButtonProps extends Omit<MuiButtonProps, 'classes'> {
  /** Show loading spinner and disable button */
  loading?: boolean;
}

/**
 * Design-system button. Use theme variants (primary, secondary, text).
 * Destructive: use color="error". Loading: use loading prop.
 */
export function AppButton({
  loading = false,
  disabled,
  children,
  ...rest
}: AppButtonProps) {
  return (
    <MuiButton disabled={disabled || loading} {...rest}>
      {loading ? (
        <>
          <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
          {children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
}
