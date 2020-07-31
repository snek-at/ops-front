//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer } from "mdbreact";
//> Components
// Molecules
import { SideNav } from "../../molecules";
// Pages
import { Page } from "../../organisms";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class The Admin parent page component which will include all Admin pages */
class HomePage extends React.Component {
  state = {
    containerPaddingLeft: "60px",
    page: "dashboard",
  };

  navToggle = (exp) => {
    let width = "60px";

    // Check if expanded
    if (exp) {
      width = "240px";
    }

    this.setState({
      containerPaddingLeft: width,
    });
  };

  navSelect = (selected) => {
    this.setState({
      page: selected,
    });
  };

  renderPages = (selectedPage) => {
    if (selectedPage.includes("page-")) {
      const handle = selectedPage.split("page-")[1];

      return <Page handle={handle} />;
    } else {
      return <p>Page not valid</p>;
    }
  };

  render() {
    return (
      <div>
        <SideNav handleToggle={this.navToggle} handleSelect={this.navSelect} />
        <div
          className="main-container"
          style={{ paddingLeft: this.state.containerPaddingLeft }}
        >
          <MDBContainer fluid>
            {(() => {
              switch (this.state.page) {
                case "dashboard":
                  return <p>Dashboard</p>;
                case "pages":
                  return <p>Pages</p>;
                case "permissions":
                  return <p>Permissions</p>;
                case "connectors":
                  return <p>Connectors</p>;
                case "pipelines":
                  return <p>Pipelines</p>;
                case "gitlabs":
                  return <p>GitLabs</p>;
                case "logout":
                  return <p>Logout</p>;
                default:
                  return this.renderPages(this.state.page);
              }
            })()}
          </MDBContainer>
        </div>
      </div>
    );
  }
}
//#endregion

//#region > Exports
export default HomePage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
