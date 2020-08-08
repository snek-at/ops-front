//#region > Imports
//> Organisms
// Import all components to export them for easy access from parent components
// Sections
import Page from "./sections/Page";
import Pipelines from "./sections/Pipelines";
import GitLabs from "./sections/GitLabs";
import Connectors from "./sections/Connectors";
import Permissions from "./sections/Permissions";
// Tabs
import PageOverview from "./tabs/PageOverview";
import PageProjects from "./tabs/PageProjects";
import PageUsers from "./tabs/PageUsers";
import PageImprint from "./tabs/PageImprint";
// Modals
import UserModal from "./modals/UserModal";
import ProjectModal from "./modals/ProjectModal";
// Other components
//#endregion

//#region > Exports
//> Organisms
export {
  /* Sections */
  Page,
  Pipelines,
  GitLabs,
  Connectors,
  Permissions,
  /* Tabs */
  PageOverview,
  PageProjects,
  PageUsers,
  PageImprint,
  /* Modals */
  UserModal,
  ProjectModal,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
