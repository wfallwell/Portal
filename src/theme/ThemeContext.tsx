import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  BRAND_TOKENS,
  getStoredBrandId,
  setStoredBrandId,
  type BrandId,
} from './brandTokens';
import { createPortalTheme } from './portalTheme';

interface ThemeContextValue {
  brandId: BrandId;
  setBrandId: (id: BrandId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeContextProvider');
  return ctx;
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandIdState] = useState<BrandId>(getStoredBrandId);

  const setBrandId = useCallback((id: BrandId) => {
    setStoredBrandId(id);
    setBrandIdState(id);
  }, []);

  const value = useMemo(() => ({ brandId, setBrandId }), [brandId, setBrandId]);
  const tokens = BRAND_TOKENS[brandId];
  const theme = useMemo(() => createPortalTheme(tokens), [tokens]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
