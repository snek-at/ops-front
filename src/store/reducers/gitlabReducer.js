// Have initial state when state is not ready to be passed
const initState = {
  gitlabs: [],
  selectedGitLab: null,
  error: null,
};

const gitlabReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_GITLABS_SUCCESS":
      return {
        ...state,
        gitlabs: action.payload.data ? action.payload.data : [],
        selectedGitLab: null,
        error: null,
      };
    case "GET_GITLABS_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        gitlabs: [],
        selectedGitLab: null,
        error: action.payload.error,
      };
    case "GET_GITLAB_SUCCESS":
      return {
        ...state,
        selectedGitLab: action.payload.data,
        error: null,
      };
    case "GET_GITLAB_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        selectedGitLab: false,
        error: action.payload.error,
      };
    case "CREATE_GITLAB_SUCCESS":
      return {
        ...state,
        gitlabs: action.payload.data.gitlabs
          ? action.payload.datagitlabs
          : state.gitlabs,
        selectedGitLab: action.payload.data.selected,
        error: null,
      };
    case "CREATE_GITLAB_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        error: action.payload.error,
      };
    case "REMOVE_GITLAB_SUCCESS":
      return {
        ...state,
        gitlabs: action.payload.data,
        selectedGitLab: null,
        error: null,
      };
    case "REMOVE_GITLAB_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        selectedGitLab: null,
        error: action.payload.error,
      };
    case "ALTER_GITLAB_SUCCESS":
      return {
        ...state,
        gitlabs: action.payload.data,
        error: null,
      };
    case "ALTER_GITLAB_FAIL":
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

export default gitlabReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
