export const getPageNames = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        name: "Werbeagentur Christian Aichner",
        handle: "werbeagentur-christian-aichner",
      },
    ];

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
  };
};

// Get page by handle
export const getPageByHandle = (handle) => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data - retrieve all pages
    const results = [
      {
        /* 1 = Heavy, 2 = Moderate, 3 = Light, 4 = Open */
        restrictionLevel: 2,
        milestones: [
          { date: "11.11.2017", name: "First employee", icon: "user-circle" },
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
            tasks: ["Graphics Design", "Social Media", "Customer retention"],
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
          name: "Werbeagentur Christian Aichner",
          handle: "werbeagentur-christian-aichner",
          description:
            "Advertisement Agency based in Villach-Landskron, Carinthia, Austria. Top Open Source agency in Carinthia.",
          /* Number of employees including founder (min. value: 1) */
          employees: 3,
          vat: {
            id: "ATU72504738",
            verified: true,
          },
          /* Company contact email */
          email: "contact@aichner-christian.com",
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
              value: 11,
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
              address: "Emailwerkstraße 29",
              country: "Austria",
              zip: "9523",
              city: "Villach-Landskron",
            },
          ],
          /* Is this company searching for new employees */
          isRecruiting: true,
          /* Is the company developing open source or is some of its software open source? */
          isOpenSource: true,
          references: {
            github: "https://github.com/aichner",
          },
        },
      },
    ];

    if (results) {
      const result = results.filter((page) => page.company.handle === handle);

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
  };
};

export const getActivity = () => {
  return (dispatch, getState, { getIntel }) => {
    // Dummy Data
    const result = [
      {
        author: {
          name: "Helmut Schmidt",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
        },
        action: "deployed",
        ref: { commit: "7bf03116" },
        time: 1596034377000,
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
          commit: "fad4f881",
        },
        time: 1596024377000,
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
            code: 740,
            message: "Could not get activities",
            origin: "activities",
          },
        },
      });
    }
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
