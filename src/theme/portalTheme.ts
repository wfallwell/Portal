import { createTheme, alpha } from '@mui/material/styles';
import { radius } from './tokens';
import { BRAND_TOKENS } from './brandTokens';
import type { BrandTokens } from './brandTokens';

export function createPortalTheme(tokens: BrandTokens) {
  return createTheme({
    palette: {
      primary: {
        main: tokens.primary,
        dark: tokens.primaryDark ?? tokens.primary,
        light: tokens.primaryLight ?? tokens.primary,
      },
      secondary: {
        main: tokens.accent,
        dark: tokens.accentDark ?? tokens.accent,
        light: tokens.accentLight ?? tokens.accent,
      },
      background: { default: tokens.bg, paper: tokens.surface },
      text: {
        primary: tokens.text,
        secondary: tokens.textMuted,
        disabled: alpha(tokens.text, 0.38),
      },
      divider: tokens.border,
      action: {
        active: alpha(tokens.primary, 0.54),
        hover: alpha(tokens.primary, 0.04),
        selected: alpha(tokens.primary, 0.08),
        disabled: alpha(tokens.primary, 0.26),
        disabledBackground: alpha(tokens.primary, 0.12),
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
          root: {
            borderRadius: radius.radiusMd,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
            '&.Mui-focusVisible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
          },
          contained: { '&:hover': { boxShadow: `0 2px 8px ${alpha(tokens.primary, 0.12)}` } },
        },
        defaultProps: { disableElevation: true },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: { '&.Mui-focusVisible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 } },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium', fullWidth: true },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: radius.radiusMd,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.primary,
                borderWidth: 1,
              },
              '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderWidth: 1 },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: radius.radiusMd, backgroundColor: tokens.surface },
          input: { fontSize: '0.875rem', '&.MuiInputBase-inputSizeSmall': { fontSize: '0.8125rem' } },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { fontSize: '0.875rem', '&.MuiInputLabel-sizeSmall': { fontSize: '0.8125rem' } },
          outlined: { '&.MuiInputLabel-shrink': { fontSize: '0.75rem' } },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radius.radiusLg,
            boxShadow: `0 2px 8px ${alpha(tokens.primary, 0.08)}`,
            border: `1px solid ${tokens.border}`,
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: { root: { padding: '20px 20px 12px' }, content: { overflow: 'hidden' } },
      },
      MuiCardContent: { styleOverrides: { root: { padding: 20, '&:last-child': { paddingBottom: 20 } } } },
      MuiChip: { styleOverrides: { root: { borderRadius: radius.radiusSm } } },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': { color: '#2e7d32' },
            '&.Mui-checked + .MuiSwitch-track': { backgroundColor: '#2e7d32' },
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { borderRadius: radius.radiusLg, backgroundImage: 'none' } } },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottomColor: tokens.border, fontSize: '0.875rem', lineHeight: 1.43 },
          head: {
            fontWeight: 600,
            fontSize: '0.8125rem',
            lineHeight: 1.4,
            color: tokens.primary,
            backgroundColor: alpha(tokens.primary, 0.06),
            paddingTop: 14,
            paddingBottom: 14,
            letterSpacing: '0.02em',
            borderBottom: `1px solid ${tokens.border}`,
          },
          sizeSmall: { padding: '10px 16px' },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: { borderTop: `1px solid ${tokens.border}`, paddingTop: 12, paddingBottom: 12 },
        },
      },
    },
  });
}

export type PortalTheme = ReturnType<typeof createPortalTheme>;

/** Default theme (Brand 1) for static use when theme context is not available. */
export const portalTheme = createPortalTheme(BRAND_TOKENS.brand1);
