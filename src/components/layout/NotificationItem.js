import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

function NotificationItem({ title, message, visited }) {
  /*
  const [isVisited, setIsVisited] = useState(visited);

  const handleClick = () => {
    setIsVisited(true);
  }
  */

  return(
  <MenuItem sx={{padding: '12px 8px'}}>
    <ListItemText primary={title} secondary={message} />
  </MenuItem>
  );

};

export default NotificationItem;
