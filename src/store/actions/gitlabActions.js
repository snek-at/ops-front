// Get all GitLabs
export const getGitLabs = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        domain: null,
        useIP: true,
        id: "9bf1ebaecbc2a3d86b39b09ec3587f5da0be6f9c47820ece4709e0cf72a75eb3",
        ip: "192.168.69.5",
        user: "snekman",
        isIDC: true,
        username: "schettk",
        isActive: true,
        token:
          "1170a4b5a80ca6753f294d2cf97703c0a6639ac60748ee9b3ba0578fe6b001a4",
      },
      {
        domain: "terminus.local",
        useIP: false,
        id: "b4254fccdec0c00f87c66dc4292e84b90999e3cc66387e84d77fb4211ff0481b",
        ip: null,
        user: "snekman",
        isIDC: false,
        username: "klebern",
        isActive: false,
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
  return (dispatch, getState, { getIntel }) => {
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
  return (dispatch, getState, { getIntel }) => {
    if (gitlab) {
      // Get current gitlabs
      let gitlabs = getState().gitlabs.gitlabs;

      // Do authy thingies
      const username = gitlab.user;
      const password = gitlab.password;

      // Create gitlab object
      const newGitLab = {
        domain: gitlab.domain ? gitlab.domain : null,
        useIP: gitlab.useIP ? true : false,
        id: "xxxxxx", // Auto generate unique ID in wagtail
        ip: gitlab.ip ? gitlab.ip : null,
        username,
        token: "xxxxx", // Use receiving token from authy thingies
        user: "snekman", // Get type of user from authy thingies
      };

      // Append new gitlab
      gitlabs = [...gitlabs, newGitLab];

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
export const alterGitlab = (handle, newGitLab) => {
  return (dispatch, getState, { getIntel }) => {
    // Get current gitlabs
    const gitlabs = getState().gitlabs.gitlabs;

    const selectedGitLab = gitlabs.filter((selected) => selected.id === handle);
    const notSelectedGitLabs = gitlabs.filter(
      (selected) => selected.id !== handle
    );

    if (selectedGitLab.length > 0) {
      // Merge selected and altered GitLab data
      const alteredGitLab = { ...selectedGitLab[0], ...newGitLab };

      // Append the altered GitLab
      const newGitLabs = [...notSelectedGitLabs, alteredGitLab];

      dispatch({
        type: "ALTER_GITLAB_SUCCESS",
        payload: {
          data: newGitLabs,
        },
      });
    } else {
      dispatch({
        type: "ALTER_GITLAB_FAIL",
        payload: {
          data: false,
          error: {
            code: 714,
            message: "Could not alter gitlab with handle " + handle,
            origin: "gitlabs",
          },
        },
      });
    }
  };
};

// Remove gitlab by handle (ip or domain)
export const removeGitlab = (handle) => {
  return (dispatch, getState, { getIntel }) => {
    if (handle) {
      // Get current GitLabs
      const gitlabs = getState().gitlabs.gitlabs;
      // Get length of GitLabs array
      const initialLength = gitlabs.length;

      // Remove GitLab object with handle
      const filteredGitLabs = gitlabs.filter((obj) => obj.id !== handle);

      // Check if a GitLab has been removed
      if (filteredGitLabs.length !== initialLength) {
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

// Test GitLab connection
export const testConnection = (gitlab) => {
  return async (dispatch, getState, { getIntel }) => {
    if (gitlab) {
      if (true === true) {
        // Wait for 2 sec to simulate connection test
        await wait(2000);

        return true;
      } else {
        // Wait for 2 sec to simulate connection test
        await wait(2000);

        return false;
      }
    }
  };
};

function wait(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
