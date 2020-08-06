// Login user
export const loginUser = (username, password) => {
  return (dispatch, getState, { getIntel }) => {
    if (username === "cisco" && password === "cisco") {
      const user = {
        username: "cisco",
      };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          data: user,
        },
      });
    } else {
      dispatch({
        type: "LOGIN_FAIL",
        payload: {
          data: false,
          error: {
            code: 750,
            message: "Login failed for user " + username,
            origin: "auth",
          },
        },
      });
    }
  };
};

// Authenticate user
export const authenticate = (password) => {
  return (dispatch, getState, { getIntel }) => {
    if (
      getState().auth.user &&
      getState().auth.user.username &&
      password === "cisco"
    ) {
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          data: true,
        },
      });
    } else {
      dispatch({
        type: "AUTH_FAIL",
        payload: {
          data: false,
          error: {
            code: 751,
            message: "Auth failed for user.",
            origin: "auth",
          },
        },
      });
    }
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
