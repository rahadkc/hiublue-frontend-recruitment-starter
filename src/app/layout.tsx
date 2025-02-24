import { Providers } from '@/providers';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers>
          <CssBaseline />
          {props.children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
