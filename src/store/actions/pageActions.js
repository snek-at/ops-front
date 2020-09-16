//> Intel
import INTEL_ENTERPRISE from "snek-intel/lib/utils/enterprise";

export const getPageNames = () => {
  return (dispatch, getState, { getIntel }) => {
    INTEL_ENTERPRISE.general.getEnterprisePages().then((result) => {
      console.log(result);
      if (result) {
        dispatch({
          type: "GET_PAGENAMES_SUCCESS",
          payload: {
            data: result,
          },
        });
      } else {
        dispatch({
          type: "GET_PAGENAMES_FAIL",
          payload: {
            data: false,
            error: {
              code: 740,
              message: "Could not get page names",
              origin: "pages",
            },
          },
        });
      }
    });
  };
};

// Get page by handle
export const getPageByHandle = (handle) => {
  return (dispatch, getState, {}) => {
    INTEL_ENTERPRISE.ops
      .getEnterprisePageGeneralContent({ slug: handle })
      .then((companyData) => {
        console.log("TEST", companyData);
        // Dummy Data - retrieve all pages
        const results = [
          {
            /* 1 = Heavy, 2 = Moderate, 3 = Light, 4 = Open */
            restrictionLevel: 0,
            milestones: [
              {
                date: "11.11.2017",
                name: "First employee",
                icon: "user-circle",
              },
              { date: "20.09.2017", name: "Foundation", icon: "fire-alt" },
            ],
            platforms: [
              {
                name: "facebook",
                url: "https://www.facebook.com/werbeagentur.aichner",
                data: { followers: 323, avgLikes: 12 },
              },
              {
                name: "instagram",
                url: "https://www.instagram.com/aichnerchristian/",
                data: { followers: 2713, avgLikes: 142 },
              },
              {
                name: "linkedin",
                url: "https://www.linkedin.com/company/19205978",
                data: { followers: 2, avgLikes: 0 },
              },
            ],
            employees: [
              {
                full_name: "Christian Aichner",
                position: "CEO / Founder",
                birthdate: "21.09.1998",
                joined: "23.09.2017",
                country: "Austria",
                school: "HTL Villach",
                study: "Mediatechnology",
                tasks: [
                  "JavaScript",
                  "ReactJS",
                  "HTML",
                  "CSS",
                  "Leadership",
                  "Project Management",
                  "Corporate management",
                  "Graphics Design",
                  "Filmmaking",
                ],
              },
              {
                full_name: "Luca Allmaier",
                position: "Social Media Manager",
                birthdate: null,
                joined: "01.05.2020",
                country: "Austria",
                school: "HTL Villach",
                study: "Mediatechnology",
                tasks: [
                  "Graphics Design",
                  "Social Media",
                  "Customer retention",
                ],
              },
              {
                full_name: "Nico Kleber",
                position: "Social flexing expert",
                birthdate: null,
                joined: "06.06.2019",
                country: "Canada",
                school: null,
                study: null,
                tasks: null,
              },
            ],
            company: {
              name: companyData.name,
              connectorHandle: companyData.assocConnectors[0]?.id,
              handle: companyData.handle,
              description: companyData.description
                ? companyData.description
                : "",
              enterpriseCodelanguageStatistic:
                companyData.enterpriseCodelanguageStatistic,
              enterpriseCodetransitionStatistic:
                companyData.enterpriseCodetransitionStatistic,
              enterpriseContributionFeed:
                companyData.enterpriseContributionFeed,
              enterpriseContributors: companyData.enterpriseContributors,
              mergedEnterpriseContributionFeed:
                companyData.mergedEnterpriseContributionFeed,
              /* Number of employees including founder (min. value: 1) */
              employees: companyData.employeeCount,
              hasVAT: true,
              vat: {
                value: "ATU72504738",
                verified: true,
              },
              /* Company contact email */
              email: companyData.email,
              /* Is the company present in local media and / or well known? */
              localRelevance: true,
              /* Verified badge */
              verified: true,
              /* -2 strong decrease, -1 decrease, 0 stagnant, 1 growth, 2 fast growth */
              growth: 2,
              revenueGrowth: {
                /* last year, last quarter, last month */
                comparedTo: "last year",
                /* Rate of growth */
                value: 87,
                /* Is the rate of growth in %, €, ...? */
                unit: "%",
              },
              contributors: [
                {
                  url: "https://github.com/orgs/aichner/people", // URL to people overview
                  /* Number of contributors */
                  value: companyData.enterpriseContributors.length,
                  /* Platform for displaying icon (https://mdbootstrap.com/docs/react/content/icons-list/) */
                  platform: "github",
                },
                {
                  url: null,
                  value: 13,
                  platform: "gitlab",
                },
                {
                  url: null,
                  value: 0,
                  platform: "bitbucket",
                },
              ],
              sites: [
                {
                  address: companyData.address,
                  country: "SETT ITT!!",
                  zip: companyData.zipCode,
                  city: companyData.city,
                },
              ],
              /* Is this company searching for new employees */
              isRecruiting: true,
              recruitmentUrl: companyData.recruitingUrl,
              /* Is the company developing open source or is some of its software open source? */
              isOpenSource: true,
              openSourceUrl: companyData.opensourceUrl,
            },
          },
        ];

        if (results) {
          const result = results.filter(
            (page) => page.company.handle === handle
          );

          if (result) {
            dispatch({
              type: "GET_PAGE_SUCCESS",
              payload: {
                data: result[0],
              },
            });
          } else {
            dispatch({
              type: "GET_PAGE_FAIL",
              payload: {
                data: false,
                error: {
                  code: 742,
                  message: "Could not get page by handle",
                  origin: "pages",
                },
              },
            });
          }
        } else {
          dispatch({
            type: "GET_PAGE_FAIL",
            payload: {
              data: false,
              error: {
                code: 741,
                message: "Could not get pages",
                origin: "pages",
              },
            },
          });
        }
      });
  };
};

export const getActivity = () => {
  return (dispatch, getState, {}) => {
    // Dummy Data
    const result = [
      {
        author: {
          name: "Helmut Schmidt",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
        },
        action: "deployed",
        ref: { commit: "7bf03116" },
        time: 1596034377 * 1000,
      },
      {
        author: {
          name: "Helen Karen",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg",
        },
        action: "merged",
        ref: {
          from: "implement-1",
          to: "master",
          code: {
            add: 302,
            sub: 759,
          },
          commit: "fad4f881",
        },
        time: 1596024377 * 1000,
      },
    ];

    if (result) {
      dispatch({
        type: "GET_ACTIVITIES_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_ACTIVITIES_FAIL",
        payload: {
          data: false,
          error: {
            code: 743,
            message: "Could not get activities",
            origin: "activities",
          },
        },
      });
    }
  };
};

export const getProjects = () => {
  return (dispatch, getState, {}) => {
    const currentHandle = getState().pages.page.company.handle;

    INTEL_ENTERPRISE.general
      .getEnterprisePageProjectsContent({ slug: currentHandle })
      .then((result) => {
        if (result) {
          dispatch({
            type: "GET_PROJECTS_SUCCESS",
            payload: {
              data: result,
            },
          });
        } else {
          dispatch({
            type: "GET_PROJECTS_FAIL",
            payload: {
              data: false,
              error: {
                code: 744,
                message: "Could not get projects",
                origin: "projects",
              },
            },
          });
        }
      });
    // Dummy Data
    const result = [
      {
        title: "Looking Glass",
        history: "Pls implement uwu",
        handle: "looking-glass",
      },
      {
        title: "SSH Auth",
        history: "Pls implement uwu",
        handle: "ssh-auth",
      },
      {
        title: "DNS Lookup",
        history: "Pls implement uwu",
        handle: "dns-lookup",
      },
      {
        title: "Netcup Website",
        history: "Pls implement uwu",
        handle: "netcup-website",
      },
    ];
  };
};

export const getUsers = () => {
  return (dispatch, getState, {}) => {
    const currentHandle = getState().pages.page.company.handle;

    INTEL_ENTERPRISE.general
      .getEnterprisePageUsersContent({ slug: currentHandle })
      .then((result) => {
        if (result) {
          dispatch({
            type: "GET_USERS_SUCCESS",
            payload: {
              data: result,
            },
          });
        } else {
          dispatch({
            type: "GET_USERS_FAIL",
            payload: {
              data: false,
              error: {
                code: 745,
                message: "Could not get users",
                origin: "projects",
              },
            },
          });
        }
      });
  };
};

export const editImprint = (newCompanyInfo) => {
  return (dispatch, getState, {}) => {
    /* 
    Save changes like:
    const page = {test: 123, test2: 456}; -> {test: 123, test2: 456}
    const editedPage = {...foo, test:789}; -> {test: 789, test2: 456}
    You can overwrite values in an object like that.
    */
    console.log("test");
    let page = getState().pages.page;
    // Get current company data
    const companyInfo = page.company;
    // Infuse company data like marinade in a good steak
    const infusedCompanyInfo = { ...companyInfo, ...newCompanyInfo.company };
    // Overwrite old company info with new company info
    page = { ...page, company: infusedCompanyInfo };

    const dataToUpdate = {
      imprint: {
        city: infusedCompanyInfo.city,
        zip_code: infusedCompanyInfo.zipCode,
        address: infusedCompanyInfo.address,
        telephone: "",
        telefax: "",
        vat_number: infusedCompanyInfo.vat.value,
        whatsapp_telephone: "",
        whatsapp_contactline: "",
        tax_id: "",
        trade_register_number: "",
        court_of_registry: "",
        place_of_registry: "",
        ownership: "",
        email: infusedCompanyInfo.email,
        employee_count: infusedCompanyInfo.employees,
        opensource_url: infusedCompanyInfo.openSourceUrl,
        recruiting_url: infusedCompanyInfo.recruitmentUrl,
        description: infusedCompanyInfo.description,
      },
      general: {
        title: infusedCompanyInfo.name,
      },
    };

    console.log("test");

    const currentHandle = getState().pages.page.company.handle;
    console.log(dataToUpdate);
    INTEL_ENTERPRISE.general
      .updateEnterprisePageGeneralContent({
        slug: currentHandle,
        imprint: dataToUpdate.imprint,
        general: dataToUpdate.general,
      })
      .then((result) => {
        console.log(result);
      });

    if (true === true) {
      dispatch({
        type: "EDIT_COMPANY_SUCCESS",
        payload: {
          data: page,
        },
      });
    } else {
      dispatch({
        type: "EDIT_COMPANY_FAIL",
        payload: {
          data: false,
          error: {
            code: 746,
            message: "Could not edit imprint",
            origin: "imprint",
          },
        },
      });
    }
  };
};

export const getUserByHandle = (username) => {
  return (dispatch, getState, {}) => {
    // @TODO: Replace by function to query all users. For now it will not work on refresh.
    const users = getState().pages.users;

    const user = users.filter((user) => user.username === username);

    if (user.length > 0) {
      dispatch({
        type: "GET_USER_SUCCESS",
        payload: {
          data: user[0],
        },
      });
    } else {
      dispatch({
        type: "GET_USER_FAIL",
        payload: {
          data: false,
          error: {
            code: 747,
            message: "Could not get user by username " + username,
            origin: "imprint",
          },
        },
      });
    }
  };
};

export const getProjectById = (id) => {
  return (dispatch, getState, {}) => {
    // @TODO: Replace by function to query all projects. For now it will not work on refresh.
    const projects = getState().pages.projects;

    const project = projects.filter((item) => item.id === id);

    if (project.length > 0) {
      dispatch({
        type: "GET_PROFILE_SUCCESS",
        payload: {
          data: project[0],
        },
      });
    } else {
      dispatch({
        type: "GET_PROJECT_FAIL",
        payload: {
          data: false,
          error: {
            code: 748,
            message: "Could not get project by id " + id,
            origin: "projects",
          },
        },
      });
    }
  };
};

export const publishPage = (handle) => {
  return (dispatch, getState, {}) => {
    // Get connectors and get correct connector by page handle

    INTEL_ENTERPRISE.ops
      .publishEnterprisePageViaConnector({ connectorId: handle })
      .then((result) => {
        // Success / Error dispatch

        if (result) {
          // dispatch success
        } else {
          // dispatch failure
        }
      });
  };
};

export const clearSelection = (handle) => {
  return (dispatch, getState, {}) => {
    dispatch({
      type: "CLEAR_SELECTION",
      payload: {
        data: null,
      },
    });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
