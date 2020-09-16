//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";

// Login user
export const loginUser = (user) => {
  return async (dispatch, getState, { CLIENT_SNEK }) => {
    try {
      const whoami = await CLIENT_SNEK.session.begin(user);

      if (!whoami?.anonymous && whoami?.__typename === "SNEKUser") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            data: {
              username: whoami.username,
            },
          },
        });
      } else if (whoami?.anonymous) {
        dispatch({
          type: "LOGIN_ANON_SUCCESS",
          payload: {},
        });
      } else {
        throw Error("Login Failed");
      }
    } catch {
      dispatch({
        type: "LOGIN_FAIL",
        payload: {
          data: false,
          error: {
            code: 750,
            message: "Login failed for user " + user,
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
      password === "ciscocisco"
    ) {
      return true;
    } else {
      return false;
    }
  };
};

// Logout
export const logout = () => {
  return (dispatch, getState, { CLIENT_SNEK }) => {
    CLIENT_SNEK.session.end().then(() => {
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: {
          data: null,
        },
      });
    });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
