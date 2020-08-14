//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router DOM bindings
import { Redirect } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer } from "mdbreact";
//> Components
// Molecules
import { SideNav } from "../../molecules";
// Pages
import {
  Page,
  Pipelines,
  GitLabs,
  Connectors,
  Permissions,
  Dashboard,
} from "../../organisms";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";
//> Images
// Too be added
//#endregion

//#region > Config
const DEFAULT_PAGE = "dashboard";
//#endregion

//#region > Components
/** @class The Admin parent page component which will include all Admin pages */
class HomePage extends React.Component {
  state = {
    containerPaddingLeft: "60px",
    page: localStorage.getItem("nav")
      ? localStorage.getItem("nav")
      : DEFAULT_PAGE,
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
    this.setState(
      {
        page: selected,
      },
      () => localStorage.setItem("nav", selected)
    );
  };

  navigateTo = (page, handle) => {
    console.log(page, handle);

    if (handle) {
      this.setState(
        {
          page: `${page}-${handle}`,
        },
        () => localStorage.setItem("nav", `${page}-${handle}`)
      );
    } else {
      this.setState(
        {
          page: `${page}`,
        },
        () => localStorage.setItem("nav", `${page}`)
      );
    }
  };

  renderPages = (selectedPage) => {
    if (selectedPage.includes("page-")) {
      const handle = selectedPage.split("page-")[1];

      return <Page handle={handle} navigateTo={this.navigateTo} />;
    } else {
      return <p>Page not valid</p>;
    }
  };

  render() {
    const { authenticated } = this.props;

    if (authenticated === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <SideNav
          handleToggle={this.navToggle}
          handleSelect={this.navSelect}
          default={
            localStorage.getItem("nav")
              ? localStorage.getItem("nav")
              : DEFAULT_PAGE
          }
        />
        <div
          className="main-container"
          style={{ paddingLeft: this.state.containerPaddingLeft }}
        >
          <MDBContainer fluid className="my-5">
            {(() => {
              switch (this.state.page) {
                case "dashboard":
                  return <Dashboard navigateTo={this.navigateTo} />;
                case "permissions":
                  return <Permissions />;
                case "connectors":
                  return <Connectors />;
                case "pipelines":
                  return <Pipelines />;
                case "gitlabs":
                  return <GitLabs />;
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

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(mapStateToProps)(HomePage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
