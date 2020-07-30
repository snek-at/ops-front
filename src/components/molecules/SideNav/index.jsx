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
import "./sidenav.scss";
//#endregion

//#region > Config
const MENU_ITEMS = [
  {
    name: "Dashboard",
    icon: "home",
  },
  {
    name: "Pages",
    icon: "book",
  },
  {
    name: "Permissions",
    icon: "key",
  },
  {
    name: "Connectors",
    icon: "ring",
  },
  {
    name: "Pipelines",
    icon: "vials",
  },
  {
    name: "GitLabs",
    icon: "gitlab",
    fab: true,
  },
];
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

  // Creates a unified string out of names
  stringifyItemName = (name) => {
    /**
     * First, all special characters are removed.
     * All characters are converted to lowercase.
     * All spaces before and after the string are removed.
     * All spaces within the word are being replaced with a minus.
     */
    return name
      .replace(/[^a-zA-Z ]/g, "")
      ?.toLowerCase()
      ?.trim()
      ?.replace(new RegExp(" ", "g"), "-");
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
          {MENU_ITEMS.map((item, i) => {
            return (
              <NavItem eventKey={this.stringifyItemName(item.name)} key={i}>
                <NavIcon className="flex-center d-flex">
                  <MDBIcon icon={item.icon} size="lg" fab={item.fab} />
                </NavIcon>
                <NavText>{item.name}</NavText>
              </NavItem>
            );
          })}
          <NavItem eventKey="logout" className="item-bottom">
            <NavIcon className="flex-center d-flex">
              <MDBIcon icon="door-open" size="lg" />
            </NavIcon>
            <NavText>Logout</NavText>
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
