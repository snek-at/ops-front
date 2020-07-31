// Have initial state for when state is not ready to be passed
const initState = {
  pages: [],
  pagenames: [],
  error: null,
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PAGES_SUCCESS":
      return {
        ...state,
        pages: action.payload.data ? action.payload.data : [],
        error: null,
      };
    case "GET_PAGES_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.msg
      );

      return {
        ...state,
        pages: [],
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
    default:
      return state;
  }
};

export default pageReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
