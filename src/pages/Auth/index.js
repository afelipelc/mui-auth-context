import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, Navigate } from 'react-router-dom';

import Copyright from '../../components/layout/Copyright';
import Alert from '../../components/ui/Alert';
import { loadSession, useSessionDispatch } from '../../sessionContext';

import {
  LoginProvider, useLoginState, useLoginpatch, setUser, loginUser,
} from './login-context';

const theme = createTheme();

const Login = () => {
  const {
    loading,
    user,
    error,
    success,
    redirect,
    // business,
  } = useLoginState();
  const loginDispatch = useLoginpatch();

  const sessionDispatch = useSessionDispatch();

  const nameInput = React.useRef();
  const location = useLocation();

  const handleChange = (e) => {
    setUser(loginDispatch, {
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(loginDispatch, user).then(() => {
      loadSession(sessionDispatch); // load stored user data
    });
  };

  if (success) {
    
    let redirectTo = redirect || '/';
    if (redirect && redirect === '/') {
      if (location.state && location.state.from) {
        redirectTo = location.state.from.pathname;
      } else if (window.history.state && window.history.state.prevUrl) {
        redirectTo = window.history.state.prevUrl;
      }
    }
    return (
      <Navigate to={redirectTo} />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                inputRef={nameInput}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={user.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {!loading && 'Ingresar' }
                {loading && (
                  <CircularProgress size={24} />
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        {error && (
          <Alert type="error" message={error} />
        )}
      </Grid>
    </ThemeProvider>
  );
};

const WrapLogin = () => (
  <LoginProvider>
    <Login />
  </LoginProvider>
);

export default WrapLogin;
