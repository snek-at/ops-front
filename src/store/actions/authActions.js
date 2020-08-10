// Login user
export const loginUser = (username, password) => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();
    const session = intel.snekclient.session;

    return session
      .begin({ username, password })
      .then((whoami) => {
        if (whoami?.__typename !== "SNEKUser") {
          throw Error("Login Failed");
        }
        if (whoami?.anonymous === false) {
          console.log(whoami);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              data: {
                username: whoami.username,
              },
            },
          });
        } else {
          dispatch({
            type: "LOGIN_ANON_SUCCESS",
            payload: {},
          });
        }
      })
      .catch((ex) =>
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
        })
      );
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
