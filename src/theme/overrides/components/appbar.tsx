import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function appBar(theme: Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.drop,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  };
}
