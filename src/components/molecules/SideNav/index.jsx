//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Additional modules
// Side Navigation
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
// Side Navigation styling
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBIcon } from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { getPageNames } from "../../../store/actions/pageActions";
//> CSS
// Basic adjustments
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

    // Get names of pages
    this.props.getPageNames();

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
        <SideNav.Nav defaultSelected="dashboard">
          <div className="w-100" />
          {MENU_ITEMS.map((item, i) => {
            const handle = this.stringifyItemName(item.name);

            return (
              <NavItem eventKey={handle} key={i}>
                <NavIcon className="flex-center d-flex">
                  <MDBIcon icon={item.icon} size="lg" fab={item.fab} />
                </NavIcon>
                <NavText>{item.name}</NavText>
                {handle === "pages" &&
                  this.props.pagenames.map((page, p) => {
                    const handle = this.stringifyItemName(page.name);

                    return (
                      <NavItem eventKey={"page-" + handle} key={i + "-" + p}>
                        <NavText>{page.name}</NavText>
                      </NavItem>
                    );
                  })}
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

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  pagenames: state.pages.pagenames,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPageNames: () => dispatch(getPageNames()),
  };
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
