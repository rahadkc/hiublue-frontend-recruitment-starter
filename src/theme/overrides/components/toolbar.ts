import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function toolBar(_theme: Theme) {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 72,
          minHeight: 72,
        },
      },
    },
  };
}
