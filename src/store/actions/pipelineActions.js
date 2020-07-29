// Get all pipelines
export const getPipelines = () => {
  return (dispatch, getState, { clientShopify }) => {
    // Dummy Data
    const result = [
      {
        domain: "gitlab.local",
        org: "anexia",
        title: "Skynet",
        latestActivity: 1596034377,
        isActive: true,
      },
      {
        domain: "share.local",
        org: "anexia",
        title: "Lookingglass",
        latestActivity: 1591034377,
        isActive: false,
      },
    ];

    if (result) {
      dispatch({
        type: "GET_PIPELINES_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_PIPELINES_FAIL",
        payload: {
          data: false,
          error: {
            code: 720,
            message: "Could not get pipelines",
            origin: "pipelines",
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
