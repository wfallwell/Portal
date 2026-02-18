/**
 * Brand color tokens. Each brand has the same structure; MUI theme is built from these.
 */
export type BrandId = 'brand1' | 'brand2' | 'brand3';

export interface BrandTokens {
  primary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primaryDark?: string;
  primaryLight?: string;
  accentDark?: string;
  accentLight?: string;
}

export const BRAND_IDS: BrandId[] = ['brand1', 'brand2', 'brand3'];

export const BRAND_LABELS: Record<BrandId, string> = {
  brand1: 'Brand 1',
  brand2: 'Brand 2',
  brand3: 'Brand 3',
};

export const BRAND_TOKENS: Record<BrandId, BrandTokens> = {
  brand1: {
    primary: '#1B1F3C',
    primaryDark: '#12152A',
    primaryLight: '#2A2E52',
    accent: '#88EDE4',
    accentDark: '#5DD9CF',
    accentLight: '#B0F4EF',
    bg: '#F1F1F1',
    surface: '#FFFFFF',
    text: '#1B1F3C',
    textMuted: '#5C5F6F',
    border: '#E0E0E0',
  },
  brand2: {
    primary: '#101820',
    primaryDark: '#0A0E12',
    primaryLight: '#2A3340',
    accent: '#ED8B00',
    accentDark: '#C97300',
    accentLight: '#F5A623',
    bg: '#F7F5F2',
    surface: '#FFFFFF',
    text: '#101820',
    textMuted: '#5C5F6F',
    border: '#E0E0E0',
  },
  brand3: {
    primary: '#000000',
    primaryDark: '#000000',
    primaryLight: '#333333',
    accent: '#B21F24',
    accentDark: '#8B191D',
    accentLight: '#D4282E',
    bg: '#F1F1F1',
    surface: '#FFFFFF',
    text: '#000000',
    textMuted: '#5C5F6F',
    border: '#E0E0E0',
  },
};

const STORAGE_KEY = 'portal-brand';

export function getStoredBrandId(): BrandId {
  if (typeof window === 'undefined') return 'brand1';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'brand2' || stored === 'brand3' || stored === 'brand1') return stored;
  return 'brand1';
}

export function setStoredBrandId(id: BrandId): void {
  localStorage.setItem(STORAGE_KEY, id);
}
