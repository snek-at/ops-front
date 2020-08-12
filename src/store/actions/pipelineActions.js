// Get all pipelines
export const getPipelines = () => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    intel.snekclient.session.begin();

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
    // get intel instance
    const intel = getIntel();
    // Get current pipelines
    const pipelines = getState().pipelines.pipelines;
    // Get all pipelines but the one to alter
    const otherPipelines = pipelines.filter((pipe) => pipe.token !== token);
    // Add new pipeline
    const newPipelines = [...otherPipelines, newPipeline];

    console.log(newPipelines);

    if (newPipelines) {
      intel
        .updatePipeline({
          id: newPipeline.token,
          active: newPipeline.isActive,
          description: newPipeline.description
            ? newPipeline.description
            : "description",
          enterprisePageSlug: newPipeline.enterprisePage.handle,
          name: newPipeline.title,
        })
        .then((result) => {
          if (result) {
            dispatch({
              type: "ALTER_PIPELINE_SUCCESS",
              payload: {
                data: newPipelines,
              },
            });
          } else {
            dispatch({
              type: "ALTER_PIPELINE_FAIL",
              payload: {
                data: false,
                error: {
                  code: 722,
                  message: "Could not alter pipeline with token " + token,
                  origin: "pipelines",
                },
              },
            });
          }
        });
    }
  };
};

export const createPipeline = (newPipeline) => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    console.log(newPipeline);

    intel
      .addPipeline({
        active: newPipeline.isActive,
        description: newPipeline.description
          ? newPipeline.description
          : "description",
        enterprisePageSlug: newPipeline.enterprisePage.handle,
        name: newPipeline.title,
      })
      .then((result) => {
        const newPipelineObj = {
          token: newPipeline.token,
          isActive: newPipeline.isActive,
          enterprisePage: {
            handle: newPipeline.enterprisePage.handle,
          },
          id: result.id,
          title: newPipeline.title,
        };

        let pipelines = getState().pipelines.pipelines;
        const initialLength = pipelines.length;

        // Append new pipeline
        pipelines = [...pipelines, newPipelineObj];

        console.log(pipelines);

        if (initialLength !== pipelines.length) {
          dispatch({
            type: "CREATE_PIPELINE_SUCCESS",
            payload: {
              data: pipelines,
            },
          });
        } else {
          dispatch({
            type: "CREATE_PIPELINE_FAIL",
            payload: {
              data: false,
              error: {
                code: 721,
                message: "Could not create pipeline",
                origin: "pipelines",
              },
            },
          });
        }
      });
  };
};

export const removePipeline = (id) => {
  return (dispatch, getState, { getIntel }) => {
    if (id) {
      // Get current connectors
      const pipelines = getState().pipelines.pipelines;

      // get intel instance
      const intel = getIntel();
      // Removes connector
      intel.deletePipeline({ id }).then((res) => {
        if (res.success) {
          // remove connector from current connectors
          const leftovers = pipelines.filter((selected) => selected.id !== id);

          dispatch({
            type: "REMOVE_PIPELINE_SUCCESS",
            payload: {
              data: leftovers,
            },
          });
        }
      });
    }
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
