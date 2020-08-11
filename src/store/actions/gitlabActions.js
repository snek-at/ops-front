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
            isIDC: entry.privilegesMode === "IDC" ? true : false,
            isActive: entry.active,
            token: entry.token,
            enterprisePage: {
              name: entry.enterprisePage.title,
              handle: entry.enterprisePage.slug,
            },
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
    gitlabs = gitlabs.filter((obj) => obj.ip !== handle || obj.url !== handle);

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
      const intel = getIntel();
      // Get current gitlabs
      let gitlabs = getState().gitlabs.gitlabs;

      intel
        .addGitlab({
          active: true,
          description: "description",
          enterprisePageSlug: gitlab.enterprisePage.handle,
          gitlabToken: gitlab.token,
          name: gitlab.name ? gitlab.name : "",
          privilegesMode: gitlab.isIDC ? "IDC" : "POLP",
          url: gitlab.url,
        })
        .then((result) => {
          console.log(result);
          // Create gitlab object
          const newGitLab = {
            isActive: true,
            description: "",
            enterprisePage: {
              handle: "e-sneklab",
            },
            url: gitlab.url ? gitlab.url : null,
            id: result.id, // Auto generate ID in wagtail
            username: gitlab.username,
            token: gitlab.token,
            user: "snekman",
          };

          // Append new gitlab
          gitlabs = [...gitlabs, newGitLab];

          console.log(gitlabs);

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
        });
    }
  };
};

// Alter gitlab by handle (ip or url)
export const alterGitlab = (handle, newGitLab) => {
  return (dispatch, getState, { getIntel }) => {
    // Get current gitlabs
    const gitlabs = getState().gitlabs.gitlabs;
    const intel = getIntel();

    const selectedGitLab = gitlabs.filter((selected) => selected.id === handle);
    const notSelectedGitLabs = gitlabs.filter(
      (selected) => selected.id !== handle
    );

    if (selectedGitLab.length > 0) {
      // Merge selected and altered GitLab data
      const alteredGitLab = { ...selectedGitLab[0], ...newGitLab };

      console.log("ALTER GITLAB", alteredGitLab);
      intel
        .updateGitlab({
          id: alteredGitLab.id,
          active: alteredGitLab.isActive,
          description: alteredGitLab.description
            ? alterGitlab.alteredGitLab
            : "description",
          enterprisePageSlug: alteredGitLab.enterprisePage.handle,
          gitlabToken: alteredGitLab.token,
          name: alteredGitLab.name ? alteredGitLab.name : "not set",
          privilegesMode: alteredGitLab.isIDC ? "IDC" : "POLP",
          url: alteredGitLab.url,
        })
        .then((result) => {
          if (result) {
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
        });
    }
  };
};

// Remove gitlab by handle (ip or url)
export const removeGitlab = (id) => {
  return (dispatch, getState, { getIntel }) => {
    if (id) {
      // Get current GitLabs
      const gitlabs = getState().gitlabs.gitlabs;

      // get intel instance
      const intel = getIntel();
      // Removes connector
      intel.deleteConnector({ id }).then((res) => {
        if (res.success) {
          // remove connector from current connectors
          const leftovers = gitlabs.filter((obj) => obj.id !== id);

          dispatch({
            type: "REMOVE_GITLAB_SUCCESS",
            payload: {
              data: leftovers,
            },
          });
        } else {
          dispatch({
            type: "REMOVE_GITLAB_FAIL",
            payload: {
              data: false,
              error: {
                code: 715,
                message: "Could not remove gitlab with handle " + id,
                origin: "gitlabs",
              },
            },
          });
        }
      });
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
