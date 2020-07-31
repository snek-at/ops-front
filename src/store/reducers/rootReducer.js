//> Redux
import { combineReducers } from "redux";

//> Reducers
// Authentication
import connectorReducer from "./connectorReducer";
//import dashboardReducer from "./dashboardReducer";
import gitlabReducer from "./gitlabReducer";
import pageReducer from "./pageReducer";
import permissionReducer from "./permissionReducer";
import pipelineReducer from "./pipelineReducer";

const rootReducer = combineReducers({
  /* Connectors */
  connectors: connectorReducer,
  /* Dashboard */
  //dashboard: dashboardReducer,
  /* GitLabs */
  gitlabs: gitlabReducer,
  /* Pages */
  pages: pageReducer,
  /* Permissions */
  permissions: permissionReducer,
  /* Pipelines */
  pipelines: pipelineReducer,
});

export default rootReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
