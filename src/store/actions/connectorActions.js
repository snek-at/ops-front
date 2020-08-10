// Get all connectors
export const getConnectors = () => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    intel.getConnectors().then((result) => {
      if (result) {
        result = result.map((entry) => {
          return {
            id: entry.id,
            token: entry.token,
            name: entry.name,
            url: entry.url,
            isActive: entry.active,
            settings: {
              settings: {
                shared: {
                  projects: entry.shareProjects,
                  users: entry.shareUsers,
                  /* @TODO Aichner: Add checkboxes in Component to determine what will be shared */
                  companyData: {
                    name: entry.shareCompanyName,
                    isRecruiting: entry.shareCompanyRecruementUrl,
                    description: entry.shareCompanyDescription,
                    employees: entry.shareCompanyEmplyeesCount,
                    vat: entry.shareCompanyVat,
                    email: entry.shareCompanyEmail,
                    isOpenSource: entry.shareCompanyOpensourceStatus,
                    openSourceUrl: entry.shareCompanyOpensourceUrl,
                  },
                },
              },
            },
            enterprisePage: {
              name: entry.enterprisePage.title,
              handle: entry.enterprisePage.slug,
            },
          };
        });

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
    });
  };
};

// Get connector by id
export const getConnectorById = (id) => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const connectors = getState().connectors.connectors;

    const result = connectors.filter((item) => item.id === id);

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
              name: connector.settings?.shared?.companyData?.name
                ? connector.settings.shared.companyData.name
                : false,
              isRecruiting: connector.settings?.shared?.companyData
                ?.isRecruiting
                ? connector.settings.shared.companyData.isRecruiting
                : false,
              recruitmentUrl: connector.settings?.shared?.companyData
                ?.recruitmentUrl
                ? connector.settings.shared.companyData.recruitmentUrl
                : false,
              description: connector.settings?.shared?.companyData?.description
                ? connector.settings.shared.companyData.description
                : false,
              employees: connector.settings?.shared?.companyData?.employees
                ? connector.settings.shared.companyData.employees
                : false,
              vat: connector.settings?.shared?.companyData?.vat
                ? connector.settings.shared.companyData.vat
                : false,
              email: connector.settings?.shared?.companyData?.email
                ? connector.settings.shared.companyData.email
                : false,
              isOpenSource: connector.settings?.shared?.companyData
                ?.isOpenSource
                ? connector.settings.shared.companyData.isOpenSource
                : false,
              openSourceUrl: connector.settings?.shared?.companyData
                ?.openSourceUrl
                ? connector.settings.shared.companyData.openSourceUrl
                : false,
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

    //@TODO Error handling: 703 Could not alter connector <id>
  };
};

// Remove connector
export const removeConnector = (id) => {
  return (dispatch, getState, { getIntel }) => {
    // Removes connector
    console.log(id);

    //@TODO Error handling: 704 Could not remove connector <id>
  };
};

function wait(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
