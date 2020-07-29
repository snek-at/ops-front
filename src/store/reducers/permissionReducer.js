// Have initial state for when state is not ready to be passed
const initState = {
  groups: [],
  users: [],
  error: null,
};

const permissionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_GROUPS_SUCCESS":
      return {
        ...state,
        groups: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_GROUPS_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        groups: [],
        error: action.payload.error,
      };
    case "CREATE_GROUP_SUCCESS":
      return {
        ...state,
        groups: action.payload.data ? action.payload.data : state.groups,
        error: null,
      };
    case "CREATE_GROUP_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      // Return unchanged state
      return {
        ...state,
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

export default permissionReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
