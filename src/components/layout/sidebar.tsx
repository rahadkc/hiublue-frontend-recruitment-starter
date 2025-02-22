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

import { ROUTES } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Iconify from '../iconify';

const StyledNextLink = styled(Link)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const commonLeftSpacing = { paddingLeft: open ? '28px' : '18px' };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ width: open ? 280 : 60, transition: 'width 0.3s' }}
      PaperProps={{ sx: { width: 'inherit' } }}
    >
      <Button
        onClick={() => setOpen(!open)}
        sx={{ justifyContent: 'left', paddingTop: 0, paddingBottom: 0 }}
      >
        <Image priority src="/assets/logo.svg" height={72} width={70} alt="Follow us on Twitter" />
      </Button>

      <div style={{ paddingBottom: '18px', ...commonLeftSpacing }}>
        {open ? (
          <Typography variant="overline" gutterBottom>
            Overview
          </Typography>
        ) : (
          <></>
        )}
      </div>

      <List>
        <StyledNextLink href="/" passHref>
          <ListItemButton sx={commonLeftSpacing} selected={pathname === ROUTES.dashboard}>
            <ListItemIcon>
              <Iconify icon={'vaadin:dashboard'} width={24} height={24} />
            </ListItemIcon>
            {open && <ListItemText secondary="Dashboard" />}
          </ListItemButton>
        </StyledNextLink>

        <StyledNextLink href={`${ROUTES.onboarding}`} passHref>
          <ListItemButton
            sx={{
              ...commonLeftSpacing,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            selected={pathname === ROUTES.onboarding}
          >
            <ListItemIcon>
              <Iconify icon={'solar:bag-bold-duotone'} width={24} height={24} />
            </ListItemIcon>
            {open && <ListItemText secondary="Onboarding" />}
          </ListItemButton>
        </StyledNextLink>
      </List>
    </Drawer>
  );
};

export default Sidebar;
