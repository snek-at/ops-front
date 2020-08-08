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
import { MDBModal, MDBModalBody } from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import {
  getUserByHandle,
  clearSelection,
} from "../../../../store/actions/pageActions";
//#endregion

//#region > Components
/** @class Custom input */
class UserModal extends React.Component {
  state = { user: undefined };

  componentDidMount = () => {
    console.log("MOUNT");
    console.log(this.props.handle);
    this.props.getUserByHandle(this.props.handle);
  };

  componentWillUnmount = () => {
    this.props.clearSelection();
  };

  componentDidUpdate = () => {
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
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
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
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#region > Redux Mapping
const mapStateToProps = (state) => ({
  user: state.pages.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserByHandle: (handle) => dispatch(getUserByHandle(handle)),
    clearSelection: () => dispatch(clearSelection()),
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
export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
