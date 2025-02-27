'use client';

import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { useSidebar } from '@/hooks/useSidebar';
import { ROUTES, SIDEBAR } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import Iconify from '../iconify';

const StyledNextLink = styled(Link)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const navigation = [
  {
    segment: ROUTES.dashboard,
    title: 'Dashboard',
    icon: 'vaadin:dashboard',
  },
  {
    segment: ROUTES.onboarding,
    title: 'Onboarding',
    icon: 'solar:bag-bold-duotone',
  },
] as const;

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, isSmallScreen, toggleSidebar } = useSidebar();
  const commonLeftSpacing = { paddingLeft: isSidebarOpen ? '28px' : '18px' };

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={isSidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: isSidebarOpen ? SIDEBAR.EXPAND : isSmallScreen ? 0 : SIDEBAR.SMALL,
        transition: 'width 0.3s',
      }}
      PaperProps={{ sx: { width: 'inherit' } }}
    >
      <Button
        onClick={toggleSidebar}
        sx={{ justifyContent: 'left', paddingTop: 0, paddingBottom: 0 }}
      >
        <Image priority src="/assets/logo.svg" height={72} width={70} alt="Follow us on Twitter" />
      </Button>

      <div
        style={{
          paddingBottom: '18px',
          paddingTop: isSmallScreen ? '18px' : '0px',
          ...commonLeftSpacing,
        }}
      >
        {isSidebarOpen ? (
          <Typography variant="overline" gutterBottom>
            Overview
          </Typography>
        ) : (
          <></>
        )}
      </div>

      <List>
        {navigation.map((item) => (
          <StyledNextLink key={item.segment} href={`${item.segment}`} passHref>
            <ListItemButton sx={{ ...commonLeftSpacing }} selected={pathname === item.segment}>
              <ListItemIcon>
                <Iconify icon={`${item.icon}`} width={24} height={24} />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText secondary={item.title} />}
            </ListItemButton>
          </StyledNextLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
