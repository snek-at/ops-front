//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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
} from "mdbreact";
//> Components
// Molecules
import { SideNav } from "../../molecules";
// Pages
import {
  Page,
  Pipelines,
  User,
  Project,
  GitLabs,
  Connectors,
  Permissions,
} from "../../organisms";
//> Images
import logoImg from "../../../assets/navigation/logo.png";
// Too be added
//#endregion

//#region > Components
/** @class The Admin parent page component which will include all Admin pages */
class LoginPage extends React.Component {
  state = { email: "", password: "" };

  render() {
    const { passwordAuth } = this.props;

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
                    <MDBBtn color="indigo">Authenticate</MDBBtn>
                  </>
                ) : (
                  <>
                    <p className="lead">Login to OPS</p>
                    <MDBInput
                      outline
                      name="email"
                      type="text"
                      label="E-Mail"
                      value={this.state.email}
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
                    <MDBBtn color="indigo">Login</MDBBtn>
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
  passwordAuth: true,
};
//#endregion

//#region > Exports
export default LoginPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
