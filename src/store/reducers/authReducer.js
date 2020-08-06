// Have initial state when state is not ready to be passed
const initState = {
  user: null,
  authenticated: false,
  error: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.data,
        authenticated: true,
        error: null,
      };
    case "LOGIN_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        user: null,
        authenticated: false,
        error: action.payload.error,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        authenticated: true,
        error: null,
      };
    case "AUTH_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        authenticated: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
