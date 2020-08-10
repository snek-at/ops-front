// Get all pipelines
export const getPipelines = () => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    intel.getPipelines().then((result) => {
      if (result) {
        result = result.map((entry) => {
          return {
            url: entry.url,
            org: "demo",
            title: entry.name,
            token: entry.id,
            latestActivity: 1596034377000,
            isActive: entry.active,
            enterprisePage: {
              name: entry.enterprisePage.title,
              handle: entry.enterprisePage.slug,
            },
          };
        });

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
    });
  };
};

export const alterPipeline = (token, newPipeline) => {
  return (dispatch, getState, { getIntel }) => {
    console.log(token, newPipeline);
  };
};

export const createPipeline = (newPipeline) => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();
    console.log(newPipeline);
    intel
      .addPipeline(
        newPipeline.companyPage.handle,
        newPipeline.isActive,
        newPipeline.title
      )
      .then((result) => {
        console.log(result);
      });
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
