import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import session from '../utils/sessionStorage';

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  return session.loggedIn() ? children : <Navigate to="/login" state={{ from: rest.location || location }} replace/>;
}

export default PrivateRoute;
