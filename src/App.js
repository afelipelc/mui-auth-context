import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import {
  SessionProvider, useSessionDispatch, loadSession,
} from './sessionContext';


function App() {
  const dispatch = useSessionDispatch();
  
  useEffect(() => {
    if (dispatch) {
      loadSession(dispatch);
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

const WrapApp = () => (
  <SessionProvider>
    <App />
  </SessionProvider>
);

export default WrapApp;
