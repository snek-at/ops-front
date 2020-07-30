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

//> Images
// Too be added
//#endregion

//#region > Components
/** @class The Admin parent page component which will include all Admin pages */
class HomePage extends React.Component {
  state = {
    containerPaddingLeft: "60px",
    page: "home",
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
                case "home":
                  return <p>Home</p>;
                case "settings":
                  return <p>Settings</p>;
                case "api-explorer":
                  return <p>Test</p>;
                case "api-library":
                  return <p>API Library</p>;
                default:
                  return <p>Home</p>;
              }
            })()}
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default HomePage;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
