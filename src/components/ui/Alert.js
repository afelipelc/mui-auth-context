import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';


const Alert = ({ type, message, autoclose }) => {
  const [open, setOpen] = useState(!!message);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getColor = (alertType) => {
    switch (alertType) {
      case 'success':
        return { backgroundColor: 'green'};
      case 'error':
        return { backgroundColor: 'red' };
      
      case 'info':
        return { backgroundColor: 'blue' };
      
      case 'warning':
        return { backgroundColor: 'orange' };
      
      default: case 'none':
        return { opacity: 0 };
    }
  }

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={autoclose || null}
      onClose={handleClose}
    >
      <SnackbarContent
        sx={ getColor(type)}
        message={(
          <span id="client-snackbar" sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon sx={{ fontSize: 20, opacity: 0.9, marginRight: 16 }}>
              {type === 'success' ? 'check_circle' : type}
            </Icon>
            {message}
          </span>
        )}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <Icon sx={{ fontSize: 20 }}>close</Icon>
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default Alert;
