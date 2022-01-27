import React from 'react';
import loginClient from './login-client';

const LoginStateContext = React.createContext();
const LoginDispatchContext = React.createContext();

// actions
const LOGIN = 'login/LOGIN';
const SET_USER = 'login/SET_USER';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_ERROR = 'login/LOGIN_ERROR';

// initial state
const initialState = {
  loading: false,
  user: {
    email: '',
    password: '',
  },
  error: null,
  success: false,
  redirect: null,
};

// reducer
function loginReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, error: null };
    case LOGIN:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        ...action.payload,
      };
    case LOGIN_ERROR:
      return { ...state, loading: false, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// provider and context definition
function LoginProvider({ children }) {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

function useLoginState() {
  const context = React.useContext(LoginStateContext);
  if (context === undefined) {
    throw new Error('useLoginState must be used within a LoginProvider');
  }

  return context;
}

function useLoginpatch() {
  const context = React.useContext(LoginDispatchContext);
  if (context === undefined) {
    throw new Error('useLoginpatch must be used within a LoginProvider');
  }
  return context;
}

// actions
function setUser(dispatch, user) {
  dispatch({ type: SET_USER, payload: user });
}

async function loginUser(dispatch, user) {
  dispatch({ type: LOGIN });
  try {
    const loginResult = await loginClient.login(user);
    if (loginResult.error) {
      dispatch({ type: LOGIN_ERROR, payload: loginResult });
    } else {
      dispatch({ type: LOGIN_SUCCESS, payload: loginResult });
    }
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: { ...error } });
  }
}

export {
  LoginProvider, useLoginState, useLoginpatch, setUser, loginUser,
};
