//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router DOM bindings
import { Redirect } from "react-router-dom";
// Prop types
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { loginUser, authenticate } from "../../../store/actions/authActions";
//> Components
// Molecules
import { SideNav } from "../../molecules";
//> Images
import logoImg from "../../../assets/navigation/logo.png";
//#endregion

//#region > Config
const PROFILE_ROUTE = "admin";
//#endregion

//#region > Components
/** @class The Admin parent page component which will include all Admin pages */
class LoginPage extends React.Component {
  state = { username: "", password: "" };

  render() {
    const { passwordAuth, authenticated, error } = this.props;

    if (authenticated) {
      return <Redirect to={PROFILE_ROUTE} />;
    }

    return (
      <MDBContainer className="my-5 h-100">
        <MDBRow className="flex-center h-100">
          <MDBCol lg="4">
            <MDBCard className="border">
              <MDBCardBody className="text-center">
                <img src={logoImg} alt="SNEK OPS Logo" className="mb-2" />
                {passwordAuth ? (
                  <>
                    <p className="lead">Please enter your password</p>
                    {error && error.code === 751 && (
                      <MDBAlert color="danger" className="mt-3">
                        Wrong password.
                      </MDBAlert>
                    )}
                    <MDBInput
                      outline
                      name="password"
                      type="password"
                      label="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                      containerClass="mb-2"
                    />
                    <MDBBtn
                      color="indigo"
                      onClick={() =>
                        this.props.authenticate(this.state.password)
                      }
                    >
                      Authenticate
                    </MDBBtn>
                  </>
                ) : (
                  <>
                    <p className="lead">Login to OPS</p>
                    {error && error.code === 750 && (
                      <MDBAlert color="danger" className="mt-3">
                        Wrong Username or password.
                      </MDBAlert>
                    )}
                    <MDBInput
                      outline
                      name="username"
                      type="text"
                      label="Username"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                    />
                    <MDBInput
                      outline
                      name="password"
                      type="password"
                      label="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                      containerClass="mb-2"
                    />
                    <MDBBtn
                      color="indigo"
                      onClick={() =>
                        this.props.loginUser({
                          username: this.state.username,
                          password: this.state.password,
                        })
                      }
                    >
                      Login
                    </MDBBtn>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Prop Types
LoginPage.propTypes = {
  passwordAuth: PropTypes.bool,
};

LoginPage.defaultProps = {
  passwordAuth: false,
};
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
    authenticate: (password) => dispatch(authenticate(password)),
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
