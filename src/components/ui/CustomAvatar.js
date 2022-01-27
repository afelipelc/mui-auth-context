import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

const CustomAvatar = ({ name, avatar, size }) => {
  return(
    <Avatar alt={name} src={avatar || null} sx={{ width: size || 24, height: size || 24, backgroundColor: !avatar ? '#ff5722' : ''}}>
      {!avatar ? name.charAt(0) : null}
    </Avatar>
  );
};

CustomAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', "lg", "xl"]).isRequired
}

export default CustomAvatar;
