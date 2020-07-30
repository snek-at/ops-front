//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional modules
// Side Navigation
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
// Side Navigation CSS
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBIcon } from "mdbreact";

//> CSS
import "./nav.scss";
//#endregion

//#region > Components
/** @class The nav component for all pages */
class SideNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount = () => {
    // Get state of side navbar
    let exp = localStorage.getItem("menu");
    // Create boolean out of string
    let expNormalized = exp === "true" ? true : false;

    // Tell the parent component if expanded or not
    this.props.handleToggle(expNormalized);

    // Do the actual change
    this.setState({
      expanded: expNormalized,
    });
  };

  toggle = (exp) => {
    this.props.handleToggle(exp);

    this.setState(
      {
        expanded: exp,
      },
      () => localStorage.setItem("menu", exp)
    );
  };

  select = (selected) => {
    this.props.handleSelect(selected);
  };

  render() {
    return (
      <SideNav
        onSelect={(selected) => this.select(selected)}
        onToggle={(exp) => this.toggle(exp)}
        expanded={this.state.expanded}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <div className="w-100" />
          <NavItem eventKey="home">
            <NavIcon className="flex-center d-flex">
              <MDBIcon icon="home" size="lg" />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="api-explorer">
            <NavIcon className="flex-center d-flex">
              <MDBIcon icon="search" size="lg" />
            </NavIcon>
            <NavText>API Explorer</NavText>
          </NavItem>
          <NavItem eventKey="api-library">
            <NavIcon className="flex-center d-flex">
              <MDBIcon icon="book" size="lg" />
            </NavIcon>
            <NavText>Library</NavText>
          </NavItem>
          <NavItem eventKey="charts">
            <NavIcon>
              <MDBIcon icon="chart-line" size="lg" />
            </NavIcon>
            <NavText>Credentials</NavText>
            <NavItem eventKey="charts/linechart">
              <NavText>API Link</NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>Your APIs</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="settings" className="item-bottom">
            <NavIcon className="flex-center d-flex">
              <MDBIcon icon="cogs" size="lg" />
            </NavIcon>
            <NavText>Settings</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}
//#endregion

//#region > Exports
export default SideNavbar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
