// Get all pipelines
export const getPipelines = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        domain: "gitlab.local",
        org: "anexia",
        title: "Skynet",
        token: "ahjfgiadzfg789453htiahv8dfaf9",
        latestActivity: 1596034377000,
        isActive: true,
      },
      {
        domain: "share.local",
        org: "anexia",
        title: "Lookingglass",
        token: "34tuzh3879tvz4587t4hwt984zt84",
        latestActivity: 1591034377000,
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

export const alterPipeline = (token, newPipeline) => {
  return (dispatch, getState, { getIntel }) => {
    console.log(token, newPipeline);
  };
};

export const createPipeline = (newPipeline) => {
  return (dispatch, getState, { getIntel }) => {
    console.log(newPipeline);
  };
};

export const removePipeline = (token) => {
  return (dispatch, getState, { getIntel }) => {
    console.log(token);
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
