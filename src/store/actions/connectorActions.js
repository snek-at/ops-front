// Get all connectors
export const getConnectors = () => {
  return (dispatch, getState, { getIntel }) => {
    const intel = getIntel();

    intel.getConnectors().then((result) => {
      if (result) {
        result = result.map((entry) => {
          console.log(entry);
          return {
            id: entry.id,
            token: entry.token,
            name: entry.name,
            url: entry.url,
            isActive: entry.active,
            settings: {
              shared: {
                projects: entry.shareProjects,
                users: entry.shareUsers,
                mode: entry.shareMode,
                /* @TODO Aichner: Add checkboxes in Component to determine what will be shared */
                companyData: {
                  name: entry.shareCompanyName,
                  isRecruiting: entry.shareCompanyRecruiting,
                  recruitmentUrl: entry.shareCompanyRecruementUrl,
                  description: entry.shareCompanyDescription,
                  employees: entry.shareCompanyEmployeesCount,
                  vat: entry.shareCompanyVat,
                  email: entry.shareCompanyEmail,
                  isOpenSource: entry.shareCompanyOpensourceStatus,
                  openSourceUrl: entry.shareCompanyOpensourceUrl,
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
      const intel = getIntel();
      // Get current connectors
      let connectors = getState().connectors.connectors;

      const settings = {
        shared: {
          projects: connector.settings?.shared?.companyData?.projects
            ? connector.settings.shared.companyData.projects
            : false,
          users: connector.settings?.shared?.companyData?.users
            ? connector.settings.shared.companyData.users
            : false,
          companyData: {
            name: connector.settings?.shared?.companyData?.name
              ? connector.settings.shared.companyData.name
              : false,
            isRecruiting: connector.settings?.shared?.companyData?.isRecruiting
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
            isOpenSource: connector.settings?.shared?.companyData?.isOpenSource
              ? connector.settings.shared.companyData.isOpenSource
              : false,
            openSourceUrl: connector.settings?.shared?.companyData
              ?.openSourceUrl
              ? connector.settings.shared.companyData.openSourceUrl
              : false,
          },
        },
      };

      console.log(connector);
      intel
        .addConnector(
          true,
          connector.url,
          connector.name ? connector.name : "",
          "description",
          connector.token,
          connector.enterprisePage.handle,
          "POLP",
          {
            share_projects: settings.shared.projects,
            share_users: settings.shared.users,
            share_company_name: settings.shared.companyData.name,
            share_company_recruiting: settings.shared.companyData.isRecruiting,
            share_company_recruement_url:
              settings.shared.companyData.recruitmentUrl,
            share_company_description: settings.shared.companyData.description,
            share_company_employees_count:
              settings.shared.companyData.employees,
            share_company_vat: settings.shared.companyData.vat,
            share_company_email: settings.shared.companyData.email,
            share_company_opensource_status:
              settings.shared.companyData.isOpenSource,
            share_company_opensource_url:
              settings.shared.companyData.openSourceUrl,
          },
          "OPEN"
        )
        .then((result) => {
          if (result) {
            // Create connector object
            const newConnector = {
              url: connector.url ? connector.url : null,
              useIP: connector.useIP ? true : false,
              id: "xxxxxx", // Auto generate unique ID in wagtail
              ip: connector.ip ? connector.ip : null,
              name: connector.name,
              isActive: true, // Somehow figure this out
            };

            connectors = [...connectors, newConnector];

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
        });
    }
  };
};

// Create connector
export const alterConnector = (id, newConnector) => {
  return (dispatch, getState, { getIntel }) => {
    // get intel instance
    const intel = getIntel();
    // Get current connectors
    const connectors = getState().connectors.connectors;

    const selectedConnectorIndex = connectors.indexOf(
      connectors.find((selected) => selected.id === id)
    );

    connectors[selectedConnectorIndex] = {
      ...connectors[selectedConnectorIndex],
      ...newConnector,
    };

    const alteredConnector = connectors[selectedConnectorIndex];

    console.log(alteredConnector);

    if (alteredConnector) {
      intel.updateConnector(
        alteredConnector.id,
        alteredConnector.isActive,
        alteredConnector.token,
        alteredConnector.description
          ? alteredConnector.description
          : "description",
        alteredConnector.enterprisePage.handle,
        alteredConnector.name,
        alteredConnector.isIDC ? "IDC" : "POLP",
        {
          share_projects: alteredConnector.settings.shared.projects,
          share_users: alteredConnector.settings.shared.users,
          share_company_name: alteredConnector.settings.shared.companyData.name,
          share_company_recruiting:
            alteredConnector.settings.shared.companyData.isRecruiting,
          share_company_recruement_url:
            alteredConnector.settings.shared.companyData.recruitmentUrl,
          share_company_description:
            alteredConnector.settings.shared.companyData.description,
          share_company_employees_count:
            alteredConnector.settings.shared.companyData.employees,
          share_company_vat: alteredConnector.settings.shared.companyData.vat,
          share_company_email:
            alteredConnector.settings.shared.companyData.email,
          share_company_opensource_status:
            alteredConnector.settings.shared.companyData.isOpenSource,
          share_company_opensource_url:
            alteredConnector.settings.shared.companyData.openSourceUrl,
        },
        alteredConnector.settings.shared.mode,
        alteredConnector.url
      );
    }

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
