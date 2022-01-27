import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import NotificationItem from './NotificationItem';

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {id: 'nt1', title: "Asignatura asignada", message: 'Te han asignado Desarrollo Web', visited: false},
  ]

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleMenu}
        aria-controls="menu-appbar"
        aria-haspopup="true">
        <Badge badgeContent={1} color="secondary">
          <NotificationsIcon />
        </Badge>
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
        <MenuItem disabled>Notificaciones</MenuItem>
        <Divider style={{margin: 0}} />
        {items.map((item) => (<NotificationItem key={item.id} {...item}/>))}
      </Menu>
    </div>
  );
};

export default Notifications;
