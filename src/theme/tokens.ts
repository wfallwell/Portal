/**
 * Design system tokens. Use these in theme and shared components only.
 * Pages should consume the theme, not import tokens directly for styling.
 */

export const colors = {
  primary: '#1B1F3C',
  accent: '#88EDE4',
  bg: '#F1F1F1',
  surface: '#FFFFFF',
  text: '#1B1F3C',
  textMuted: '#5C5F6F',
  border: '#E0E0E0',
} as const;

export const radius = {
  radiusSm: 4,
  radiusMd: 6,
  radiusLg: 8,
} as const;

export const spacing = {
  space1: 8,
  space2: 16,
  space3: 24,
  space4: 32,
  space5: 40,
} as const;

/** Elevation 0–2 for most UI; 3+ for overlays. Values are MUI shadow array indices. */
export const elevation = {
  elevation0: 0,
  elevation1: 1,
  elevation2: 2,
  elevationOverlay: 3,
} as const;

export const typography = {
  fontFamily: '"Poppins", sans-serif',
} as const;
