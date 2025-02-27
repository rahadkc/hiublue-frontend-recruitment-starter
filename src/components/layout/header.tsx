'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';
import { ROUTES } from '@/lib/constants';
import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Iconify from '../iconify';

const Header = () => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isSmallScreen, toggleSidebar } = useSidebar();
  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    redirect(ROUTES.login);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = 'profile';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isSmallScreen ? (
            <Button
              onClick={toggleSidebar}
              sx={{
                justifyContent: 'left',
                paddingTop: 0,
                paddingBottom: 0,
                paddingX: 0,
              }}
            >
              <Image priority src="/assets/logo.svg" height={72} width={70} alt="Logo" />
            </Button>
          ) : (
            <></>
          )}
          <IconButton color="inherit">
            <Iconify icon="notification" />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar src="https://avatar.iran.liara.run/public/job/farmer/male" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;
