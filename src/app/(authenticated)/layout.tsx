'use client';
import AuthGuard from '@/components/auth-guard';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { SidebarProvider } from '@/contexts/sidebar-context';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ p: 3 }}>{children}</Box>
          </Box>
        </Box>
      </SidebarProvider>
    </AuthGuard>
  );
}
