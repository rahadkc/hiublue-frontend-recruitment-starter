import { Theme, useMediaQuery } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLargeScreen: boolean;
  isExtraLargeScreen: boolean;
  isSmallScreen: boolean;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isExtraLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (isLargeScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isLargeScreen]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isExtraLargeScreen,
        isLargeScreen,
        isSmallScreen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
