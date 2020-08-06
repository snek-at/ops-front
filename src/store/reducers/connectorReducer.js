// Have initial state when state is not ready to be passed
const initState = {
  connectors: [],
  selectedConnector: null,
  testConnector: null,
  error: null,
};

const connectorReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CONNECTORS_SUCCESS":
      return {
        ...state,
        connectors: action.payload.data ? action.payload.data : [],
        selectedConnector: null,
        testConnector: null,
        error: null,
      };
    case "GET_CONNECTORS_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        connectors: [],
        selectedConnector: null,
        testConnector: null,
        error: action.payload.error,
      };
    case "GET_CONNECTOR_BY_ID_SUCCESS":
      return {
        ...state,
        selectedConnector: action.payload.data,
        testConnector: null,
        error: null,
      };
    case "GET_CONNECTOR_BY_ID_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        selectedConnector: false,
        testConnector: null,
        error: action.payload.error,
      };
    case "TEST_CONNECTOR_SUCCESS":
      return {
        ...state,
        testConnector: true,
      };
    case "TEST_CONNECTOR_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        testConnector: false,
        error: action.payload.error,
      };
    case "CREATE_CONNECTOR_SUCCESS":
      return {
        ...state,
        selectedConnector: false,
        testConnector: null,
        connectors: action.payload.data,
      };
    case "CREATE_CONNECTOR_FAIL":
      console.error(
        action.payload.error.code,
        action.payload.error.origin,
        action.payload.error.message
      );

      return {
        ...state,
        selectedConnector: false,
        testConnector: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default connectorReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
