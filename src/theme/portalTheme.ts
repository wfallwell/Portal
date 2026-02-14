import { createTheme, alpha } from '@mui/material/styles';
import { colors, radius } from './tokens';

export const portalTheme = createTheme({
  palette: {
    primary: { main: colors.primary, dark: '#12152A', light: '#2A2E52' },
    secondary: { main: colors.accent, dark: '#5DD9CF', light: '#B0F4EF' },
    background: { default: colors.bg, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.textMuted, disabled: alpha(colors.text, 0.38) },
    divider: colors.border,
    action: {
      active: alpha(colors.primary, 0.54),
      hover: alpha(colors.primary, 0.04),
      selected: alpha(colors.primary, 0.08),
      disabled: alpha(colors.primary, 0.26),
      disabledBackground: alpha(colors.primary, 0.12),
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.35 },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.45 },
    body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43 },
    button: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.75, textTransform: 'none' as const },
    caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.5 },
    overline: { fontWeight: 500, fontSize: '0.75rem', lineHeight: 1.6, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: radius.radiusMd },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: radius.radiusMd, textTransform: 'none', boxShadow: 'none', '&:hover': { boxShadow: 'none' }, '&.Mui-focusVisible': { outline: `2px solid ${colors.accent}`, outlineOffset: 2 } },
        contained: { '&:hover': { boxShadow: '0 2px 8px rgba(27, 31, 60, 0.12)' } },
      },
      defaultProps: { disableElevation: true },
    },
    MuiButtonBase: { styleOverrides: { root: { '&.Mui-focusVisible': { outline: `2px solid ${colors.accent}`, outlineOffset: 2 } } } },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: radius.radiusMd,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary, borderWidth: 1 },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderWidth: 1 },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: radius.radiusMd, backgroundColor: colors.surface },
        input: { fontSize: '0.875rem', '&.MuiInputBase-inputSizeSmall': { fontSize: '0.8125rem' } },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem', '&.MuiInputLabel-sizeSmall': { fontSize: '0.8125rem' } },
        outlined: { '&.MuiInputLabel-shrink': { fontSize: '0.75rem' } },
      },
    },
    MuiCard: { styleOverrides: { root: { borderRadius: radius.radiusLg, boxShadow: '0 2px 8px rgba(27, 31, 60, 0.08)', border: `1px solid ${colors.border}` } } },
    MuiCardHeader: { styleOverrides: { root: { padding: '20px 20px 12px' }, content: { overflow: 'hidden' } } },
    MuiCardContent: { styleOverrides: { root: { padding: 20, '&:last-child': { paddingBottom: 20 } } } },
    MuiChip: { styleOverrides: { root: { borderRadius: radius.radiusSm } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: radius.radiusLg, backgroundImage: 'none' } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottomColor: colors.border, fontSize: '0.875rem', lineHeight: 1.43 },
        head: {
          fontWeight: 600,
          fontSize: '0.8125rem',
          lineHeight: 1.4,
          color: colors.primary,
          backgroundColor: alpha(colors.primary, 0.06),
          paddingTop: 14,
          paddingBottom: 14,
          letterSpacing: '0.02em',
          borderBottom: `1px solid ${colors.border}`,
        },
        sizeSmall: { padding: '10px 16px' },
      },
    },
    MuiTablePagination: { styleOverrides: { root: { borderTop: `1px solid ${colors.border}`, paddingTop: 12, paddingBottom: 12 } } },
  },
});

export type PortalTheme = typeof portalTheme;
