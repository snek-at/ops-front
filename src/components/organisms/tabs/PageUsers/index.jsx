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
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import { getUsers } from "../../../../store/actions/pageActions";
//> CSS
import "./pageusers.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageUsers extends React.Component {
  state = { users: null };

  componentDidMount = () => {
    this.props.getUsers();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.users && !this.state.users) {
      this.setState({
        users: this.props.users,
      });
    }

    if (this.props.filter !== prevProps.filter) {
      this.filter(this.props.filter);
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
    // Retrieve all pipelines
    const { users } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = users.filter((user) => {
      if (
        this.unifyString(user.name).includes(val) ||
        this.unifyString(user.username).includes(val)
      ) {
        return user;
      }
    });

    this.setState({ users: results });
  };

  render() {
    const { users } = this.state;

    return (
      <div id="pageusers">
        <div className="d-flex justify-content-between">
          <div className="mt-3">
            <p className="lead font-weight-bold mb-0">User Overview</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              Lorem Ipsum Dolor sit amet.
            </p>
          </div>
          <div></div>
        </div>

        <MDBListGroup>
          {users &&
            users.map((user, p) => {
              return (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center clickable"
                  onClick={() => this.props.navigateTo("user", user.username)}
                  key={p}
                >
                  <div className="d-flex align-items-center">
                    <MDBAvatar className="white mr-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-circle img-fluid"
                      />
                    </MDBAvatar>
                    <div className="d-inline">
                      <p className="mb-0">{user.name}</p>
                      <p className="small text-muted mb-0">{user.username}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    Chart
                  </div>
                </MDBListGroupItem>
              );
            })}
        </MDBListGroup>
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  users: state.pages.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(PageUsers);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
