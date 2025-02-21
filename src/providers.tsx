'use client';

import ThemeProvider from '@/theme/index';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
}
