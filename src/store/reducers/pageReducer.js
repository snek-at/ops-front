// Have initial state when state is not ready to be passed
const initState = {
  page: null,
  activities: [],
  pagenames: [],
  projects: [],
  users: [],
  user: null,
  error: null,
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PAGE_SUCCESS":
      return {
        ...state,
        page: action.payload.data ? action.payload.data : null,
        error: null,
      };
    case "GET_PAGE_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
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
        action.payload.error.message
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
        action.payload.error.message
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
        action.payload.error.message
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
        action.payload.error.message
      );

      return {
        ...state,
        users: [],
        error: action.payload.error,
      };
    case "EDIT_COMPANY_SUCCESS":
      return {
        ...state,
        page: action.payload.data,
        error: null,
      };
    case "EDIT_COMPANY_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        page: action.payload.data,
        error: action.payload.error,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.payload.data,
        error: null,
      };
    case "GET_USER_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        user: action.payload.data,
        error: action.payload.error,
      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        project: action.payload.data,
        error: null,
      };
    case "GET_PROFILE_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        project: action.payload.data,
        error: action.payload.error,
      };
    case "CLEAR_SELECTION":
      return {
        ...state,
        user: null,
        project: null,
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
