// Get all GitLabs
export const getGitLabs = () => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    intel.getGitlabs().then((result) => {
      if (result) {
        result = result.map((entry) => {
          return {
            url: entry.url,
            id: entry.id,
            isIDC: entry.privilegiesMode === "idc" ? true : false,
            isActive: entry.active,
            token: entry.token,
          };
        });
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
    });
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
      const token = gitlab.token;

      // Create gitlab object
      const newGitLab = {
        domain: gitlab.domain ? gitlab.domain : null,
        useIP: gitlab.useIP ? true : false,
        id: "xxxxxx", // Auto generate unique ID in wagtail
        ip: gitlab.ip ? gitlab.ip : null,
        username: gitlab.username,
        token, // Use receiving token from authy thingies
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
export const testConnection = (connector) => {
  return async (dispatch, getState, { getIntel }) => {
    if (connector) {
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
