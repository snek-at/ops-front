//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
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
  MDBModal,
  MDBModalBody,
  MDBAlert,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import {
  getAllUsers,
  getAllGroups,
  alterUser,
  addUser,
  removeUser,
} from "../../../../store/actions/permissionActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
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

  handleUserChange = (name, value) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        [name]: value,
      },
    });
  };

  handleUserModeChange = (name) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        [name]: !this.state.selectedUser[name],
      },
    });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      selectedUser: null,
      selectedGroup: null,
      addUser: false,
      addGroup: false,
    });
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
                      className="d-flex justify-content-between align-items-center clickable"
                      onClick={() =>
                        this.setState({
                          modal: true,
                          selectedUser: user,
                        })
                      }
                      key={p}
                    >
                      <div>
                        <p className="lead mb-1">{user.full_name}</p>
                        <p className="mb-0 text-muted">
                          {user.groups.map((group, g) => {
                            const selectedGroup = groups.filter(
                              (g) => g.id === group
                            );

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
                                user.isActive ? "text-success" : "text-danger"
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
        {this.state.modal && (
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            size="md"
          >
            <MDBModalBody>
              <div className="d-flex justify-content-between">
                <p className="lead font-weight-bold">
                  {!this.state.addConnector
                    ? this.state.selectedUser.full_name
                    : "Add new user"}
                </p>
                <MDBBtn
                  color="danger"
                  outline
                  onClick={this.toggleModal}
                  size="md"
                >
                  <MDBIcon icon="times-circle" />
                  Cancel
                </MDBBtn>
              </div>
              <AIInput
                title="Full name"
                description="Enter the full name of the user"
                name="full_name"
                placeholder="Connector Name"
                value={this.state.selectedUser.full_name}
                handleChange={this.handleUserChange}
                key="full_name"
              />
              <MDBRow>
                <MDBCol lg="6">
                  <AIToggle
                    title="Active"
                    description="Activate the user?"
                    checked={this.state.selectedUser.isActive}
                    change={this.handleUserModeChange}
                    name="isActive"
                    labelLeft="Inactive"
                    labelRight="Active"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  {this.props.groups ? (
                    <>
                      <MDBSelect
                        multiple
                        label="Select Groups"
                        getValue={(value) =>
                          this.setState({
                            selectedUser: {
                              ...this.state.selectedUser,
                              groups: [...value],
                            },
                          })
                        }
                      >
                        <MDBSelectInput />
                        <MDBSelectOptions>
                          <MDBSelectOption disabled>
                            Choose groups
                          </MDBSelectOption>
                          {this.props.groups &&
                            this.props.groups.map((group) => {
                              return (
                                <MDBSelectOption
                                  value={group.id}
                                  key={group.id}
                                  selected={
                                    this.state.selectedUser.groups.includes(
                                      group.id
                                    )
                                      ? true
                                      : false
                                  }
                                >
                                  {group.title}
                                </MDBSelectOption>
                              );
                            })}
                        </MDBSelectOptions>
                      </MDBSelect>
                    </>
                  ) : (
                    <MDBAlert color="warning">
                      <p className="mb-0">Please create groups first.</p>
                    </MDBAlert>
                  )}
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  {!this.state.addConnector && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removeUser(this.state.selectedUser.id);
                        this.toggleModal();
                      }}
                      size="md"
                    >
                      <MDBIcon icon="trash" />
                      Remove
                    </MDBBtn>
                  )}
                </div>
                <div>
                  <MDBBtn
                    color="success"
                    size="md"
                    onClick={() => {
                      if (!this.state.addConnector) {
                        this.props.alterUser(
                          this.state.selectedUser.id,
                          this.state.selectedUser
                        );
                      } else {
                        this.props.addUser(this.state.selectedUser);
                      }
                      this.toggleModal();
                    }}
                  >
                    <MDBIcon icon="check-circle" />
                    {!this.state.addConnector ? "Save" : "Create"}
                  </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
          </MDBModal>
        )}
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
    alterUser: (id, user) => dispatch(alterUser(id, user)),
    addUser: (user) => dispatch(addUser(user)),
    removeUser: (id) => dispatch(removeUser(id)),
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
