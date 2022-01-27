import React from 'react';
import session from './utils/sessionStorage';

const SessionStateContext = React.createContext(undefined);
const SessionDispatchContext = React.createContext(undefined);

// actions

const USER_LOADED = 'session/USER_LOADED';
const SETTINGS_LOADED = 'session/SETTINGS_LOADED';

// initial state
const initialState = {
  user: null,
};

// reducer
function sessionReducer(state, action) {
  switch (action.type) {
    case USER_LOADED:
      return { ...state, user: action.payload };
    case SETTINGS_LOADED:
      return { ...state, settings: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// provider and context definition
function SessionProvider({ children }) {
  const [state, dispatch] = React.useReducer(sessionReducer, initialState);

  return (
    <SessionStateContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  );
}

function useSessionState() {
  const context = React.useContext(SessionStateContext);
  if (context === undefined) {
    throw new Error('useSessionState must be used within a SessionProvider');
  }

  return context;
}

function useSessionDispatch() {
  const context = React.useContext(SessionDispatchContext);
  if (context === undefined) {
    throw new Error('useSessionDispatch must be used within a SessionProvider');
  }
  return context;
}


// actions
async function loadSession(dispatch) {
  const user = session.user();

  if (user) {
    dispatch({ type: USER_LOADED, payload: user });
  } else {
    dispatch({ type: USER_LOADED, payload: null });
    // clean session storage
    session.logout();
  }
}

function logOut(dispatch) {
  dispatch({ type: USER_LOADED, payload: null });
  session.logout();
}


export {
  SessionProvider,
  useSessionState,
  useSessionDispatch,
  loadSession,
  logOut,
};
