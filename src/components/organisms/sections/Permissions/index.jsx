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
  getGroupPermissions,
  alterGroup,
  createGroup,
  removeGroup,
} from "../../../../store/actions/permissionActions";
//> Components
import { AIInput, AIToggle, AICheckbox } from "../../../atoms";
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
    // Retrieve all possible group permissions
    this.props.getGroupPermissions();
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
        if (
          this.unifyString(user.full_name).includes(val) ||
          this.unifyString(user.username).includes(val)
        ) {
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

  handleGroupChange = (name, value) => {
    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
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

  handleGroupPermissionsChange = (val, permission, type) => {
    // Get all permissions
    let allPermissions = this.state.selectedGroup.permissions;
    // Remove item to change from permissions
    let otherPermissions = allPermissions
      ? allPermissions.filter(
          (item) =>
            this.unifyString(item.title) !== this.unifyString(permission.title)
        )
      : [];
    // Get current permission
    let currentPermission = allPermissions
      ? allPermissions.filter(
          (item) =>
            this.unifyString(item.title) === this.unifyString(permission.title)
        )
      : [];

    // Remove type to change from permission types
    let otherTypes = currentPermission[0]
      ? currentPermission[0].types.filter(
          (item) => this.unifyString(item.name) !== this.unifyString(type.name)
        )
      : [];

    // Read updated item to change
    allPermissions = [
      ...otherPermissions,
      {
        ...permission,
        types: [...otherTypes, { name: type.name, status: val }],
      },
    ];

    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
        permissions: allPermissions,
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
      type: undefined,
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
            <div className="text-right mb-3">
              <MDBBtn
                color="green"
                className="mr-0"
                onClick={() =>
                  this.setState({
                    modal: true,
                    selectedUser: { isActive: true },
                    addUser: true,
                    type: "user",
                  })
                }
              >
                Add user
              </MDBBtn>
            </div>
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
                          type: "user",
                        })
                      }
                      key={p}
                    >
                      <div>
                        <p className="lead mb-0">{user.full_name}</p>
                        <p className="small mb-1 text-muted">{user.username}</p>
                        <p className="mb-0 text-muted">
                          {user.groups.map((group, g) => {
                            const selectedGroup = groups.filter(
                              (g) => g.id === group
                            );

                            return (
                              <code className="text-muted" key={g}>
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
            {/*<div className="text-right mb-3">
              <MDBBtn
                color="green"
                className="mr-0"
                onClick={() =>
                  this.setState({
                    modal: true,
                    selectedGroup: {},
                    addGroup: true,
                    type: "group",
                  })
                }
              >
                Add group
              </MDBBtn>
            </div>*/}
            <MDBListGroup>
              {groups &&
                groups.map((group, p) => {
                  return (
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center clickable"
                      key={p}
                      onClick={() =>
                        this.setState({
                          modal: true,
                          selectedGroup: group,
                          addGroup: false,
                          type: "group",
                        })
                      }
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
            {this.state.type === "user" ? (
              <MDBModalBody>
                <div className="d-flex justify-content-between">
                  <p className="lead font-weight-bold">
                    {!this.state.addUser
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
                <MDBRow>
                  <MDBCol lg="6">
                    <AIInput
                      title="Full name"
                      description="Enter the full name of the user"
                      name="full_name"
                      placeholder="Full Name"
                      value={this.state.selectedUser.full_name}
                      handleChange={this.handleUserChange}
                      key="full_name"
                    />
                  </MDBCol>
                  <MDBCol lg="6">
                    <AIInput
                      title="Username"
                      description="Enter the full name of the user"
                      name="username"
                      placeholder="Username"
                      value={this.state.selectedUser.username}
                      handleChange={this.handleUserChange}
                      key="username"
                    />
                  </MDBCol>
                </MDBRow>
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
                                      this.state.selectedUser.groups
                                        ? this.state.selectedUser.groups.includes(
                                            group.id
                                          )
                                          ? true
                                          : false
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
                    {!this.state.addUser && (
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
                        if (!this.state.addUser) {
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
                      {!this.state.addUser ? "Save" : "Create"}
                    </MDBBtn>
                  </div>
                </div>
              </MDBModalBody>
            ) : (
              <MDBModalBody>
                <div className="d-flex justify-content-between">
                  <p className="lead font-weight-bold">
                    {!this.state.addGroup
                      ? this.state.selectedGroup.title
                      : "Add new group"}
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
                <MDBRow className="mb-3">
                  <MDBCol lg="6">
                    <AIInput
                      description="Enter the name of the group"
                      name="title"
                      placeholder="Group name"
                      value={this.state.selectedGroup.title}
                      handleChange={this.handleGroupChange}
                      key="title"
                    />
                  </MDBCol>
                </MDBRow>
                {this.props.groupPermissions.map((permission, p) => {
                  const selectedGroupPermission =
                    this.state.selectedGroup.permissions &&
                    this.state.selectedGroup.permissions.filter(
                      (item) =>
                        this.unifyString(item.title) ===
                        this.unifyString(permission.title)
                    );

                  return (
                    <MDBRow key={p} className="align-items-center">
                      <MDBCol lg="6">
                        <small>{permission.title}</small>
                      </MDBCol>
                      {permission.types.map((type, t) => {
                        const selectedGroupPermissionType = selectedGroupPermission
                          ? selectedGroupPermission[0]
                            ? selectedGroupPermission[0].types.filter(
                                (item) =>
                                  this.unifyString(item.name) ===
                                  this.unifyString(type.name)
                              )
                            : []
                          : [];

                        return (
                          <MDBCol
                            lg="2"
                            key={p + "-" + t}
                            className="text-center"
                          >
                            <p className="small text-muted mb-0">{type.name}</p>
                            <AICheckbox
                              name={permission.title + "-" + type.name}
                              checked={
                                selectedGroupPermissionType[0]
                                  ? selectedGroupPermissionType[0].status
                                  : false
                              }
                              handleChange={(val) =>
                                this.handleGroupPermissionsChange(
                                  val,
                                  permission,
                                  type
                                )
                              }
                            />
                          </MDBCol>
                        );
                      })}
                    </MDBRow>
                  );
                })}
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    {!this.state.addGroup && (
                      <MDBBtn
                        color="danger"
                        onClick={() => {
                          this.props.removeGroup(this.state.selectedGroup.id);
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
                        if (!this.state.addGroup) {
                          this.props.alterGroup(
                            this.state.selectedGroup.id,
                            this.state.selectedGroup
                          );
                        } else {
                          this.props.createGroup(this.state.selectedGroup);
                        }
                        this.toggleModal();
                      }}
                    >
                      <MDBIcon icon="check-circle" />
                      {!this.state.addGroup ? "Save" : "Create"}
                    </MDBBtn>
                  </div>
                </div>
              </MDBModalBody>
            )}
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
  groupPermissions: state.permissions.groupPermissions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllGroups: () => dispatch(getAllGroups()),
    getGroupPermissions: () => dispatch(getGroupPermissions()),
    alterUser: (id, user) => dispatch(alterUser(id, user)),
    addUser: (user) => dispatch(addUser(user)),
    removeUser: (id) => dispatch(removeUser(id)),
    alterGroup: (id, group) => dispatch(alterGroup(id, group)),
    createGroup: (group) => dispatch(createGroup(group)),
    removeGroup: (id) => dispatch(removeGroup(id)),
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
