// Get all connectors
export const getConnectors = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        id: "553cf7eaa7f418e0df38e37b05f67325d33485ffb0e063bf4ce679121061f5ac",
        name: "CodeShare",
        useIP: true,
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
          settings: {
            shared: {
              projects: ["looking-glass"],
              users: ["kleberf", "schettn"],
              /* @TODO Aichner: Add checkboxes in Component to determine what will be shared */
              companyData: {
                name: true,
                isRecruiting: true,
                recruitmentUrl: false,
                description: true,
                employees: false,
                vat: true,
                email: true,
                isOpenSource: true,
                openSourceUrl: true,
              },
            },
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

// Test Connector connection
export const testConnection = (connector) => {
  return async (dispatch, getState, { getIntel }) => {
    if (connector) {
      if (true === true) {
        // Wait for 2 sec to simulate connection test
        await wait(2000);

        return true;
      } else {
        // Wait for 2 sec to simulate connection test
        await wait(2000);

        return false;
      }
    }
  };
};

// Create connector
export const createConnector = (connector) => {
  return (dispatch, getState, { getIntel }) => {
    if (connector) {
      // Get current connectors
      let connectors = getState().connectors.connectors;

      // Create connector object
      const newConnector = {
        domain: connector.domain ? connector.domain : null,
        useIP: connector.useIP ? true : false,
        id: "xxxxxx", // Auto generate unique ID in wagtail
        ip: connector.ip ? connector.ip : null,
        name: connector.name,
        isActive: true, // Somehow figure this out
        settings: {
          shared: {
            projects: ["looking-glass"],
            users: ["kleberf", "schettn"],
            companyData: {
              name: true,
              isRecruiting: true,
              recruitmentUrl: false,
              description: true,
              employees: false,
              vat: true,
              email: true,
              isOpenSource: true,
              openSourceUrl: true,
            },
          },
        },
      };

      connectors = [...connectors, newConnector];

      console.log(connectors);

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
              code: 702,
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
    console.log(id, newConnector);
  };
};

// Remove connector
export const removeConnector = (id) => {
  return (dispatch, getState, { getIntel }) => {
    // Removes connector
    console.log(id);
  };
};

function wait(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
