import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import Iconify from '../iconify';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Iconify icon="notification" />
        </IconButton>
        <Avatar src="/profile.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
