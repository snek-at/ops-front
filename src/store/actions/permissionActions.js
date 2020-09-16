//> Intel
import INTEL_ENTERPRISE from "snek-intel/lib/utils/enterprise";

// Get all Wagtail users
export const getAllUsers = () => {
  return (dispatch, getState, {}) => {
    // Dummy Data
    const result = [
      {
        /* Wagtail uid */
        id: "296f9448212b537473769a5ded79fc6a658d4a3b2bcbc2cd762ea817f125ec10",
        full_name: "Administrator",
        username: "snekmin",
        groups: [
          /* Admin */
          "418a6dcfe4fbf7c194efac9b37cc0395241dd2590049477dc47950069fd6cb0c",
          // /* Moderator */
          // "41bc06a11bee0f62f9ce469ebe6659f4587f9b88cfad4f3bf5c3261e4d7e5d76",
        ],
        isActive: true,
        status: {
          /* User is enabled */
          active: true,
          /* Timestamp active until */
          until: null,
        },
      },
      {
        /* Wagtail uid */
        id: "3ae093f08af3622a290e81a33fbe50e052f12c765253d84ac85155a8f70e075d",
        full_name: "Nico Schett",
        username: "sct",
        groups: [
          /* Moderator */
          "41bc06a11bee0f62f9ce469ebe6659f4587f9b88cfad4f3bf5c3261e4d7e5d76",
        ],
        isActive: false,
        status: {
          /* User is enabled */
          active: true,
          /* Timestamp active until */
          until: null,
        },
      },
    ];

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
            code: 730,
            message: "Could not get users",
            origin: "user",
          },
        },
      });
    }
  };
};

// Creates new user in Wagtail
export const addUser = (user) => {
  return (dispatch, getState, {}) => {
    if (user) {
      let users = getState().permissions.users;

      users = [...users, user];

      dispatch({
        type: "CREATE_USERS_SUCCESS",
        payload: {
          data: users,
        },
      });
    } else {
      dispatch({
        type: "CREATE_USERS_FAIL",
        payload: {
          data: false,
          error: {
            code: 731,
            message: "Could not create user",
            origin: "user",
          },
        },
      });
    }
  };
};

// Removes user
export const removeUser = (id) => {
  return (dispatch, getState, {}) => {
    console.log(id);

    //@TODO Error handling: 738 Could not remove user <id>
  };
};

// Alters user
export const alterUser = (id, newData) => {
  return (dispatch, getState, {}) => {
    console.log(id, newData);

    //@TODO Error handling: 739 Could not alter user <id>
  };
};

// Creates new group in Wagtail
export const addGroup = (group) => {
  return (dispatch, getState, {}) => {
    if (group) {
      let groups = getState().permissions.groups;

      groups = [...groups, group];

      if (true === true) {
        dispatch({
          type: "CREATE_GROUP_SUCCESS",
          payload: {
            data: groups,
          },
        });
      } else {
        dispatch({
          type: "CREATE_GROUP_FAIL",
          payload: {
            data: false,
            error: {
              code: 732,
              message: "Could not create group",
              origin: "group",
            },
          },
        });
      }
    }
  };
};

export const getGroupPermissions = () => {
  return (dispatch, getState, {}) => {
    // Dummy data
    const result = [
      {
        title: "Access something",
        types: [
          { name: "add", status: false },
          { name: "change", status: false },
          { name: "delete", status: false },
        ],
      },
    ];

    if (result) {
      dispatch({
        type: "GET_GROUP_PERMISSIONS_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_GROUP_PERMISSIONS_FAIL",
        payload: {
          data: false,
          error: {
            code: 733,
            message: "Could not get group permissions",
            origin: "group",
          },
        },
      });
    }
  };
};

// Get all Wagtail groups
export const getAllGroups = () => {
  return (dispatch, getState, {}) => {
    // Dummy data
    const result = [
      {
        id: "418a6dcfe4fbf7c194efac9b37cc0395241dd2590049477dc47950069fd6cb0c",
        title: "Admin",
        permissions: [
          {
            title: "Access something",
            types: [
              { name: "add", status: true },
              { name: "change", status: true },
              { name: "delete", status: false },
            ],
          },
        ],
      },
      {
        id: "41bc06a11bee0f62f9ce469ebe6659f4587f9b88cfad4f3bf5c3261e4d7e5d76",
        title: "Moderator",
        permissions: [
          {
            title: "Access something else",
            types: [
              { name: "add", status: false },
              { name: "change", status: false },
              { name: "delete", status: false },
            ],
          },
        ],
      },
    ];

    if (result) {
      dispatch({
        type: "GET_GROUPS_SUCCESS",
        payload: {
          data: result,
        },
      });
    } else {
      dispatch({
        type: "GET_GROUPS_FAIL",
        payload: {
          data: false,
          error: {
            code: 734,
            message: "Could not get groups",
            origin: "group",
          },
        },
      });
    }
  };
};

// Alters group
export const alterGroup = (id, newGroup) => {
  return (dispatch, getState, {}) => {
    console.log(id, newGroup);

    //@TODO Error handling: 735 Could not alter group <id>
  };
};

// Create group
export const createGroup = (newGroup) => {
  return (dispatch, getState, {}) => {
    console.log(newGroup);

    //@TODO Error handling: 736 Could not create group
  };
};

// Removes group
export const removeGroup = (id) => {
  return (dispatch, getState, {}) => {
    console.log(id);

    //@TODO Error handling: 737 Could not remove group <id>
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
