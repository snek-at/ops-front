//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBBadge,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBProgress,
  MDBTooltip,
  MDBTabContent,
  MDBTabPane,
  MDBNav,
  MDBNavLink,
  MDBNavItem,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import {
  getAllUsers,
  getAllGroups,
} from "../../../../store/actions/permissionActions";
//> CSS
import "./permissions.scss";
//> Images
// Too be added
//#endregion

//#region > Config
const TAB_ITEMS = [
  {
    name: "Users",
    icon: "user-circle",
  },
  {
    name: "Groups",
    icon: "stop-circle",
  },
];
//#endregion

//#region > Components
/** @class This component displays permissions */
class Permissions extends React.Component {
  state = {
    activeItem: localStorage.getItem(this.props.handle + "-tab")
      ? parseInt(localStorage.getItem(this.props.handle + "-tab"))
      : 0,
  };

  componentDidMount = () => {
    // Retrieve all wagtail users
    this.props.getAllUsers();
    // Retrieve all wagtail groups
    this.props.getAllGroups();
  };

  componentDidUpdate = () => {
    // Check if there are no current users set
    if (
      this.props.users &&
      !this.state.users &&
      this.props.groups &&
      !this.state.groups
    ) {
      this.setState({
        users: this.props.users,
        groups: this.props.groups,
      });
    }
  };

  unifyString = (str) => {
    if (str) {
      return str.toLowerCase().trim();
    } else {
      return "";
    }
  };

  filter = (value) => {
    // Retrieve all permissions
    const { users, groups } = this.props;
    // Unify value
    const val = this.unifyString(value);

    if (this.state.activeItem === 0) {
      const results = users.filter((user) => {
        if (this.unifyString(user.full_name).includes(val)) {
          return user;
        }
      });

      this.setState({ users: results });
    } else {
      const results = groups.filter((group) => {
        if (this.unifyString(group.title).includes(val)) {
          return group;
        }
      });

      this.setState({ groups: results });
    }
  };
  // Toggle the visible tab
  toggle = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.activeItem !== tab) {
      this.setState(
        {
          activeItem: tab,
        },
        () => localStorage.setItem(this.props.handle + "-tab", tab)
      );
    }
  };

  render() {
    const { users, groups } = this.state;

    return (
      <MDBContainer id="permissions">
        <div>
          <h2>Permissions</h2>
          <p className="text-muted small">
            <MDBIcon icon="question-circle" className="mr-2" />
            Lorem Ipsum Dolor sit amet.
          </p>
        </div>
        <MDBNav tabs className="d-flex justify-content-between">
          <div className="d-flex">
            {TAB_ITEMS.map((tab, t) => {
              return (
                <MDBNavItem key={t}>
                  <MDBNavLink
                    link
                    to="#"
                    active={this.state.activeItem === t}
                    onClick={(e) => this.toggle(e, t)}
                    role="tab"
                  >
                    <MDBIcon icon={tab.icon} />
                    {tab.name}
                  </MDBNavLink>
                </MDBNavItem>
              );
            })}
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) => this.filter(e.target.value)}
            />
          </div>
        </MDBNav>
        <MDBTabContent className="card" activeItem={this.state.activeItem}>
          <MDBTabPane tabId={0} role="tabpanel">
            <MDBListGroup>
              {users &&
                users.map((user, p) => {
                  return (
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center"
                      key={p}
                    >
                      <div>
                        <p className="lead mb-1">{user.full_name}</p>
                        <p className="mb-0 text-muted">
                          {user.groups.map((group, g) => {
                            const selectedGroup = groups.filter(
                              (g) => g.id === group
                            );

                            console.log(groups, group);

                            return (
                              <code className="text-muted">
                                {selectedGroup[0].title}
                              </code>
                            );
                          })}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="small d-inline-block text-center">
                          <span className="text-muted">Status</span>
                          <span className="d-block">
                            <MDBIcon
                              icon="circle"
                              size="lg"
                              className={
                                user.status.active
                                  ? "text-success"
                                  : "text-danger"
                              }
                            />
                          </span>
                        </div>
                      </div>
                    </MDBListGroupItem>
                  );
                })}
            </MDBListGroup>
          </MDBTabPane>
          <MDBTabPane tabId={1} role="tabpanel">
            <MDBListGroup>
              {groups &&
                groups.map((group, p) => {
                  return (
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center"
                      key={p}
                    >
                      <div>
                        <p className="lead mb-0">{group.title}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="small d-inline-block text-center">
                          <span className="text-muted">Members</span>
                          <code className="d-block">
                            {
                              users.filter((u) => u.groups.includes(group.id))
                                .length
                            }
                          </code>
                        </div>
                      </div>
                    </MDBListGroupItem>
                  );
                })}
            </MDBListGroup>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  users: state.permissions.users,
  groups: state.permissions.groups,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllGroups: () => dispatch(getAllGroups()),
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
export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
