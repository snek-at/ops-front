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

//> Actions
// Functions to send data from the application to the store
import {
  getUserByHandle,
  getUsers,
} from "../../../../store/actions/pageActions";
//> CSS
import "./user.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class User extends React.Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    // Retrieve Pipelines
    this.props.getUsers();
  };

  componentDidUpdate = (prevState) => {
    // Check if there is no current user set
    if (
      this.props.users !== prevState.users ||
      (this.props.user && this.props.user.username !== this.props.handle)
    ) {
      this.props.getUserByHandle(this.props.handle);
    }

    if (
      (this.props.user && !this.state.user) ||
      (this.state.user && this.state.user.username !== this.props.handle)
    ) {
      this.setState({
        user: this.props.user,
      });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <MDBContainer id="user">
        {user ? (
          <div>
            <p>{user.avatar}</p>
            <p>{user.username}</p>
          </div>
        ) : (
          <div>
            <p>No user</p>
          </div>
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  user: state.pages.user,
  users: state.pages.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserByHandle: (handle) => dispatch(getUserByHandle(handle)),
    getUsers: () => dispatch(getUsers()),
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
export default connect(mapStateToProps, mapDispatchToProps)(User);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
