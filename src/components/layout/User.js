import React from 'react';
import { Link as RLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import CustomAvatar from '../ui/CustomAvatar';
import { useSessionState, logOut, useSessionDispatch } from '../../sessionContext';

const User = () => {
  const { user } = useSessionState();

  const dispatch = useSessionDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    setAnchorEl(null);

    logOut(dispatch);
  };

  if (!user) {
    return (
      <Link component={RLink} to="/login" onClick={handleClose} color="inherit">
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <div>
      <IconButton
        aria-label="user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <CustomAvatar
          name={user.name}
          avatar={user.avatar ? `${process.env.REACT_APP_API_URL}/${user.avatar}` : null}
          size="sm"
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>{user.name}</MenuItem>
        <MenuItem onClick={handleLogout}>Salir</MenuItem>
      </Menu>
    </div>
  );
};

export default User;
