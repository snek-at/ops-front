// Get all connectors
export const getConnectors = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        id: "553cf7eaa7f418e0df38e37b05f67325d33485ffb0e063bf4ce679121061f5ac",
        name: "CodeShare",
        ip: "192.168.69.1",
        domain: null,
        isActive: true,
        gitlab: [
          {
            ip: null,
            domain: "terminus.local",
          },
        ],
        settings: {
          shared: {
            projects: [{ title: "Projekt 1" }, { title: "Projekt 2" }],
            users: [
              { full_name: "Florian Schett" },
              { full_name: "Nico Kleber" },
            ],
            companyData: {
              legal_name: "Werbeagentur Christian Aichner",
            },
            statistics: {
              memberOrigin: false,
            },
          },
          contribData: {
            commits: [{ total: 1 }],
          },
        },
      },
    ];

    if (result) {
      dispatch({
        type: "GET_CONNECTORS_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_CONNECTORS_FAIL",
        payload: {
          data: false,
          error: {
            code: 700,
            message: "Could not retrieve connectors",
            origin: "connectors",
          },
        },
      });
    }
  };
};

// Get connector by id
export const getConnectorById = (id) => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        id: "553cf7eaa7f418e0df38e37b05f67325d33485ffb0e063bf4ce679121061f5ac",
        name: "CodeShare",
        ip: "192.168.69.1",
        domain: null,
        isActive: true,
        gitlab: [
          {
            ip: null,
            domain: "terminus.anexia.at",
          },
        ],
        settings: {
          shared: {
            projects: [{ title: "Projekt 1" }, { title: "Projekt 2" }],
            users: [
              { full_name: "Florian Schett" },
              { full_name: "Nico Kleber" },
            ],
            companyData: {
              legal_name: "Werbeagentur Christian Aichner",
            },
            statistics: {
              memberOrigin: false,
            },
          },
          contribData: {
            commits: [{ total: 1 }],
          },
        },
      },
    ];

    if (result) {
      dispatch({
        type: "GET_CONNECTOR_BY_ID_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_CONNECTOR_BY_ID_FAIL",
        payload: {
          data: false,
          error: {
            code: 701,
            message: "Could not retrieve connector " + id,
            origin: "connectors",
          },
        },
      });
    }
  };
};

// Test connector
export const testConnector = (connector) => {
  return (dispatch, getState, { getIntel }) => {
    if (connector) {
      if (true === true) {
        dispatch({
          type: "TEST_CONNECTOR_SUCCESS",
          payload: {
            data: true,
          },
        });
      } else {
        dispatch({
          type: "TEST_CONNECTOR_FAIL",
          payload: {
            data: false,
            error: {
              code: 702,
              message: "Connector test failed for " + connector.name,
              origin: "connectors",
            },
          },
        });
      }
    } else {
      dispatch({
        type: "TEST_CONNECTOR_FAIL",
        payload: {
          data: false,
          error: {
            code: 703,
            message: "No connector passed",
            origin: "connectors",
          },
        },
      });
    }
  };
};

// Create connector
export const createConnector = (connector) => {
  return (dispatch, getState, { getIntel }) => {
    if (connector) {
      let connectors = getState().connectors.connectors;

      connectors = [...connectors, connector];

      if (true === true) {
        dispatch({
          type: "CREATE_CONNECTOR_SUCCESS",
          payload: {
            data: connectors,
          },
        });
      } else {
        dispatch({
          type: "CREATE_CONNECTOR_FAIL",
          payload: {
            data: false,
            error: {
              code: 704,
              message: "Could not create connector",
              origin: "connectors",
            },
          },
        });
      }
    }
  };
};

// Create connector
export const alterConnector = (id, newConnector) => {
  return (dispatch, getState, { getIntel }) => {
    // Take current connector by id and alter its content
  };
};

// Remove connector
export const removeConnector = (id) => {
  return (dispatch, getState, { getIntel }) => {
    // Removes connector
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
