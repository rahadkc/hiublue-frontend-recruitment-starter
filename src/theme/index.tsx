'use client';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles';

import { customShadows } from '@/theme/custom-shadows';
// options
import { componentsOverrides } from './overrides';
// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette,
      },
      customShadows: {
        ...customShadows(),
      },
      shadows: shadows(),
      shape: { borderRadius: 8 },
      typography,
    }),
    [],
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
