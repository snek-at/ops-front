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
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBBtn,
  MDBSpinner,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import {
  testConnection,
  createGitlab,
  alterGitlab,
  removeGitlab,
} from "../../../../store/actions/gitlabActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
//#endregion

//#region > Components
/** @class GitLab Modal */
class ProjectModal extends React.Component {
  state = { testing: undefined };

  componentDidMount = () => {
    // Get currently selected GitLab from GitLabs page
    this.setState({
      selectedGitLab: this.props.selectedGitLab,
    });
  };

  handleGitLabChange = (name, value) => {
    this.setState({
      selectedGitLab: {
        ...this.state.selectedGitLab,
        [name]: value,
      },
    });
  };

  handleGitLabModeChange = (name) => {
    this.setState({
      selectedGitLab: {
        ...this.state.selectedGitLab,
        [name]: !this.state.selectedGitLab[name],
      },
    });
  };

  testConnection = (gitlab) => {
    this.setState(
      {
        testing: "loading",
      },
      async () => {
        const response = await this.props.testConnection(gitlab);

        this.setState({
          testing: response ? "success" : "fail",
        });
      }
    );
  };

  render() {
    const { addGitLab } = this.props;
    const { selectedGitLab } = this.state;

    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="md">
        <MDBModalBody>
          {!selectedGitLab ? (
            <MDBSpinner />
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <p className="lead font-weight-bold">
                  {!addGitLab
                    ? selectedGitLab.domain
                      ? selectedGitLab.domain
                      : selectedGitLab.ip
                    : "Add new GitLab"}
                </p>
                <MDBBtn
                  color="danger"
                  outline
                  onClick={this.props.toggle}
                  size="md"
                >
                  <MDBIcon icon="times-circle" />
                  Cancel
                </MDBBtn>
              </div>
              <MDBRow>
                <MDBCol lg="6">
                  <AIToggle
                    title="Domain / IP"
                    description="Reach GitLab server by domain or ip address?"
                    checked={!selectedGitLab.useIP}
                    change={this.handleGitLabModeChange}
                    name="useIP"
                    labelLeft="IP"
                    labelRight="Domain"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  {selectedGitLab.useIP ? (
                    <AIInput
                      title="IP Address"
                      description="Enter the GitLab IP Address"
                      name="ip"
                      placeholder="GitLab IP"
                      value={selectedGitLab.ip}
                      handleChange={this.handleGitLabChange}
                      key="ip"
                    />
                  ) : (
                    <AIInput
                      title="Domain"
                      description="Enter the GitLab domain"
                      name="domain"
                      placeholder="GitLab Domain"
                      value={selectedGitLab.domain}
                      handleChange={this.handleGitLabChange}
                      key="domain"
                    />
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="mt-3">
                <MDBCol lg="6">
                  <AIToggle
                    title="Privacy mode"
                    description="This determines what information is being fetched."
                    checked={!selectedGitLab.isIDC}
                    change={this.handleGitLabModeChange}
                    name="isIDC"
                    labelLeft="IDC"
                    labelRight="POLP"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <MDBAlert color="info" className="mb-0">
                    <p className="mb-0">
                      <strong>IDC</strong>
                    </p>
                    <p className="small">
                      Fetch all information the user has access to.
                    </p>
                    <p className="mb-0">
                      <strong>POLP</strong>
                    </p>
                    <p className="small mb-0">
                      Fetch all projects the user has access to.
                    </p>
                  </MDBAlert>
                </MDBCol>
              </MDBRow>
              <hr />
              <AIInput
                title="Authentication"
                description="Please enter the gitlab access token"
                name="token"
                placeholder="Token"
                value={this.state.selectedGitLab.token}
                handleChange={this.handleGitLabChange}
                key="token"
              />
              {/*
                <MDBRow className="mt-3">
                  <MDBCol lg="6">
                    {this.state.selectedGitLab.username &&
                      !this.state.addGitLab && (
                        <div className="mb-2">
                          <code className="text-success">
                            <MDBIcon icon="check-circle" className="mr-2" />
                            Authenticated as {authorizedUser} >>> Import from props
                          </code>
                        </div>
                      )}
                    <AIInput
                      description="Enter your GitLab username"
                      name="username"
                      placeholder="GitLab username"
                      value={this.state.selectedGitLab.username}
                      handleChange={this.handleGitLabChange}
                    />
                    <AIInput
                      type="password"
                      description="Enter your GitLab password"
                      name="password"
                      placeholder="GitLab password"
                      value={this.state.selectedGitLab.password}
                      handleChange={this.handleGitLabChange}
                      className="mt-2"
                    />
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBAlert color="info" className="mb-0">
                      <p className="mb-0">
                        <strong>Authentication</strong>
                      </p>
                      <p className="small">
                        The permissions of the connected user determines the
                        level of access you grant.
                      </p>
                      <p className="small mb-0">
                        We do not store user credentials.
                      </p>
                    </MDBAlert>
                  </MDBCol>
                </MDBRow>
              */}
              <div className="d-flex justify-content-between mt-3">
                <div>
                  {!addGitLab && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removeGitlab(selectedGitLab.id);
                        this.props.toggle();
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
                    color={
                      this.state.testing === "success"
                        ? "success"
                        : this.state.testing === "fail"
                        ? "danger"
                        : this.state.testing === "loading"
                        ? "elegant"
                        : "elegant"
                    }
                    size="md"
                    onClick={() => this.testConnection(selectedGitLab)}
                    disabled={
                      this.state.testing === "success" ||
                      this.state.testing === "fail"
                    }
                  >
                    <MDBIcon
                      icon={
                        this.state.testing === "success"
                          ? "check-circle"
                          : this.state.testing === "fail"
                          ? "times-circle"
                          : this.state.testing === "loading"
                          ? "sync-alt"
                          : "sync-alt"
                      }
                      className={
                        this.state.testing === "loading" ? "fa-spin" : undefined
                      }
                    />
                    Test{" "}
                    {this.state.testing === "success"
                      ? "completed"
                      : this.state.testing === "fail"
                      ? "failed"
                      : this.state.testing === "loading"
                      ? "connection"
                      : "connection"}
                  </MDBBtn>
                  <MDBBtn
                    color="success"
                    size="md"
                    onClick={() => {
                      if (!addGitLab) {
                        this.props.alterGitlab(
                          selectedGitLab.id,
                          selectedGitLab
                        );
                      } else {
                        this.props.createGitlab(selectedGitLab);
                      }
                      this.props.toggle();
                    }}
                  >
                    <MDBIcon icon="check-circle" />
                    {!addGitLab ? "Save" : "Create"}
                  </MDBBtn>
                </div>
              </div>
            </>
          )}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#region > Redux Mapping
const mapStateToProps = (state) => ({
  project: state.pages.project,
});

const mapDispatchToProps = (dispatch) => {
  return {
    testConnection: (gitlab) => dispatch(testConnection(gitlab)),
    createGitlab: (gitlab) => dispatch(createGitlab(gitlab)),
    alterGitlab: (handle, gitlab) => dispatch(alterGitlab(handle, gitlab)),
    removeGitlab: (handle) => dispatch(removeGitlab(handle)),
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */