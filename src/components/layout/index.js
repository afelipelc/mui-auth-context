import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { Link as RLink, Outlet} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Collapse from '@mui/material/Collapse';

import Notifications from './Notifications';
import User from './User';
import menuItems from './menuItems';
import Copyright from './Copyright';
import { useSessionState } from '../../sessionContext';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const DashboardContent = (props) => {
  const [open, setOpen] = React.useState(true);
  const [subOpen, setSubOpen] = React.useState(true);
  const { user } = useSessionState(); // read context value props as user

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmenu = (id) => {
    setSubOpen(subOpen === id ? null : id);
  };

  const renderSubmenu = (id, items) => (
    <Collapse in={subOpen === id} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {items.filter((option) => !option.denyFor.includes(user ? user.role || 'ninguno' : 'ninguno')).map((item) => (
          <ListItem
            button
            key={item.id}
            component={RLink}
            to={item.url}
            sx={{
              paddingLeft: 4,
            }}
          >
            {item.icon && <ListItemIcon>{<Icon>{item.icon}</Icon>}</ListItemIcon>}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );

  const expandOption = (id) => (
    subOpen === id ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              title="Menú del sistema"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              App Name
            </Typography>
            <Notifications/>
            <User />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography
              component="span"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize: 16 }}
            >
              Menú del sistema
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {menuItems.filter((option) => !option.denyFor.includes(user ? user.role || 'none' : 'none')).map((item) => (
              <div key={item.id}>
                <ListItem
                  button
                  component={item.childs ? null : RLink}
                  to={item.childs ? '' : item.url}
                  onClick={item.childs ? () => handleSubmenu(item.id) : null}
                  title={item.text}
                >
                  <ListItemIcon>{<Icon>{item.icon}</Icon>}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.childs ? expandOption(item.id) : null}
                </ListItem>
                {item.childs && renderSubmenu(item.id, item.childs) }
              </div>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardContent;
