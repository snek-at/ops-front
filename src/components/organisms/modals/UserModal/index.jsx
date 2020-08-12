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
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

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

    console.log(user);

    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          {user ? (
            <div>
              <MDBRow>
                <MDBCol lg="4">
                  <p className="lead font-weight-bold">User info</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p className="lead font-weight-bold mb-1">{user.name}</p>
                      <p className="text-muted small">
                        <p>{user.username}</p>
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-4">Code statistics</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p>Languages</p>
                      <p>Transition</p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <p className="lead font-weight-bold">Graphs</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p>Contrib</p>
                    </MDBCardBody>
                  </MDBCard>
                  <div className="activity">
                    <p className="lead font-weight-bold">Activity</p>
                    <MDBCard className="border">
                      <MDBListGroup>
                        {user.contributionFeed &&
                          user.contributionFeed.map((contrib, i) => {
                            return (
                              <MDBListGroupItem>
                                <p className="mb-0">{contrib.message}</p>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="text-muted small mb-0">
                                      {contrib.type}
                                    </p>
                                  </div>
                                  <p className="text-muted small mb-0">
                                    {moment(contrib.datetime).format(
                                      "DD.MM.YYYY h:mm a"
                                    )}
                                  </p>
                                </div>
                              </MDBListGroupItem>
                            );
                          })}
                      </MDBListGroup>
                    </MDBCard>
                  </div>
                </MDBCol>
              </MDBRow>
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
