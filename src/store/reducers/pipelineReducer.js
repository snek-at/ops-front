// Have initial state when state is not ready to be passed
const initState = {
  pipelines: [],
  error: null,
};

const pipelineReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PIPELINES_SUCCESS":
      return {
        ...state,
        pipelines: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_PIPELINES_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        pipelines: [],
        error: action.payload.error,
      };
    case "CREATE_PIPELINE_SUCCESS":
      return {
        ...state,
        pipelines: action.payload.data,
        error: null,
      };
    case "CREATE_PIPELINE_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        error: action.payload.error,
      };
    case "ALTER_PIPELINE_SUCCESS":
      return {
        ...state,
        pipelines: action.payload.data,
        error: null,
      };
    case "ALTER_PIPELINE_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default pipelineReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
