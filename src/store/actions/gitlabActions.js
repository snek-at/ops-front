// Get all GitLabs
export const getGitLabs = () => {
  return (dispatch, getState, { clientShopify }) => {
    // Dummy Data
    const result = [
      {
        domain: null,
        ip: "192.168.69.5",
        user: "snekman",
        mode: "idc",
        username: "schettk",
        token:
          "1170a4b5a80ca6753f294d2cf97703c0a6639ac60748ee9b3ba0578fe6b001a4",
      },
      {
        domain: "terminus.local",
        ip: null,
        user: "snekman",
        mode: "idc",
        username: "klebern",
        token:
          "3daa0f0707adaa806da8a7ed2b2c10b710c91b8fe0c36c1f2ec310d2c8736886",
      },
    ];

    if (result) {
      dispatch({
        type: "GET_GITLABS_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_GITLABS_FAIL",
        payload: {
          data: false,
          error: {
            code: 710,
            message: "Could not get gitlabs",
            origin: "gitlabs",
          },
        },
      });
    }
  };
};

// Get GitLab by handle
export const getGitLabByHandle = (handle) => {
  return (dispatch, getState, { clientShopify }) => {
    let gitlabs = getState().gitlabs;

    // Returns only matches
    gitlabs = gitlabs.filter(
      (obj) => obj.ip !== handle || obj.domain !== handle
    );

    // Check if GitLabs have been found
    if (gitlabs.length > 0) {
      if (true === true) {
        dispatch({
          type: "GET_GITLAB_SUCCESS",
          payload: {
            data: gitlabs,
          },
        });
      } else {
        dispatch({
          type: "GET_GITLAB_FAIL",
          payload: {
            data: false,
            error: {
              code: 711,
              message: "Could not get gitlab with handle " + handle,
              origin: "gitlabs",
            },
          },
        });
      }
    } else {
      dispatch({
        type: "GET_GITLAB_FAIL",
        payload: {
          data: false,
          error: {
            code: 712,
            message: "No gitlab found with handle " + handle,
            origin: "gitlabs",
          },
        },
      });
    }
  };
};

// Create GitLab
export const createGitlab = (gitlab) => {
  return (dispatch, getState, { clientShopify }) => {
    if (gitlab) {
      let gitlabs = getState().gitlabs;

      gitlabs = [...gitlabs, gitlab];

      if (true === true) {
        dispatch({
          type: "CREATE_GITLAB_SUCCESS",
          payload: {
            data: { gitlabs, selected: gitlab },
          },
        });
      } else {
        dispatch({
          type: "CREATE_GITLAB_FAIL",
          payload: {
            data: false,
            error: {
              code: 713,
              message: "Could not create gitlab",
              origin: "gitlabs",
            },
          },
        });
      }
    }
  };
};

// Alter gitlab by handle (ip or domain)
export const alterGitlab = (handle, newGitlab) => {
  return (dispatch, getState, { clientShopify }) => {
    // Take current gitlab by handle and alter its content
  };
};

// Remove gitlab by handle (ip or domain)
export const removeGitlab = (handle) => {
  return (dispatch, getState, { clientShopify }) => {
    if (handle) {
      let gitlabs = getState().gitlabs;
      const initialLength = gitlabs.length;

      console.log(gitlabs);

      // Remove GitLab object with handle
      gitlabs = gitlabs.filter(
        (obj) => obj.ip !== handle || obj.domain !== handle
      );

      console.log(gitlabs);

      // Check if a GitLab has been removed
      if (gitlabs.length !== initialLength) {
        if (true === true) {
          dispatch({
            type: "REMOVE_GITLAB_SUCCESS",
            payload: {
              data: gitlabs,
            },
          });
        } else {
          dispatch({
            type: "REMOVE_GITLAB_FAIL",
            payload: {
              data: false,
              error: {
                code: 715,
                message: "Could not remove gitlab with handle " + handle,
                origin: "gitlabs",
              },
            },
          });
        }
      } else {
        dispatch({
          type: "REMOVE_GITLAB_FAIL",
          payload: {
            data: false,
            error: {
              code: 716,
              message: "No gitlab found with handle " + handle,
              origin: "gitlabs",
            },
          },
        });
      }
    }
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
