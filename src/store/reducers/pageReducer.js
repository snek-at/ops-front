// Have initial state for when state is not ready to be passed
const initState = {
  page: null,
  activities: [],
  pagenames: [],
  projects: [],
  users: [],
  error: null,
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PAGE_SUCCESS":
      return {
        ...state,
        page: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_PAGE_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        page: null,
        error: action.payload.error,
      };
    case "GET_PAGENAMES_SUCCESS":
      return {
        ...state,
        pagenames: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_PAGENAMES_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        pagenames: [],
        error: action.payload.error,
      };
    case "GET_ACTIVITIES_SUCCESS":
      return {
        ...state,
        activities: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_ACTIVITIES_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        activities: [],
        error: action.payload.error,
      };
    case "GET_PROJECTS_SUCCESS":
      return {
        ...state,
        projects: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_PROJECTS_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        projects: [],
        error: action.payload.error,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_USERS_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        users: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default pageReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
