import { alpha } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles/createPalette';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }

  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#1C252E',
  900: '#161C24',
};

export const primary = {
  lighter: '#B9EBD9',
  light: '#66D1AC',
  main: '#00A76F',
  dark: '#007A57',
  darker: '#004E38',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#4A4F56',
  light: '#333A42',
  main: '#1C252E',
  dark: '#161C24',
  darker: '#0D1117',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00A76F',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: '#FFFFFF',
};

export const error = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#1C252E',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

// ----------------------------------------------------------------------

export const palette: PaletteOptions = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.12),
  mode: 'light',
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  },
  background: {
    paper: '#FFFFFF',
    default: '#F4F6F8',
    neutral: grey[200],
  },
  action: {
    ...action,
    active: grey[600],
  },
};
