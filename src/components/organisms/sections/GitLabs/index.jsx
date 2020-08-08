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
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import {
  getGitLabs,
  testConnection,
  createGitlab,
  alterGitlab,
  removeGitlab,
} from "../../../../store/actions/gitlabActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays gitlabs */
class GitLabs extends React.Component {
  state = { modal: false };

  componentDidMount = () => {
    // Retrieve GitLabs
    this.props.getGitLabs();
  };

  componentDidUpdate = () => {
    // Check if there are no current gitlabs set
    if (this.props.gitlabs && !this.state.gitlabs) {
      this.setState({
        gitlabs: this.props.gitlabs,
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
    // Retrieve all gitlabs
    const { gitlabs } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = gitlabs.filter((pipe) => {
      if (
        this.unifyString(pipe.ip).includes(val) ||
        this.unifyString(pipe.domain).includes(val) ||
        this.unifyString(pipe.username).includes(val) ||
        this.unifyString(pipe.mode).includes(val) ||
        this.unifyString(pipe.user).includes(val)
      ) {
        return pipe;
      }
    });

    this.setState({ gitlabs: results });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      selectedGitLab: null,
      testing: undefined,
      addGitLab: false,
      authorizedUser: undefined,
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
    const { gitlabs } = this.state;

    return (
      <MDBContainer>
        <div className="d-flex justify-content-between">
          <div>
            <h2>GitLabs</h2>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              Lorem Ipsum Dolor sit amet.
            </p>
          </div>
          <div>
            <MDBInput
              type="text"
              outline
              label="Search"
              getValue={(value) => this.filter(value)}
            />
          </div>
        </div>
        <div className="text-right mb-2">
          <MDBBtn
            color="orange"
            className="mr-0"
            onClick={() =>
              this.setState({
                modal: true,
                selectedGitLab: {},
                addGitLab: true,
              })
            }
          >
            <MDBIcon fab icon="gitlab" />
            Add GitLab
          </MDBBtn>
        </div>
        <MDBListGroup>
          {gitlabs &&
            gitlabs.map((gitlab, p) => {
              return (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center clickable"
                  onClick={() =>
                    this.setState({
                      modal: true,
                      selectedGitLab: gitlab,
                      authorizedUser: gitlab.username,
                    })
                  }
                  key={p}
                >
                  <div>
                    <p className="lead mb-0">
                      {gitlab.domain ? gitlab.domain : gitlab.ip}
                    </p>
                    <p className="text-muted mb-0">
                      <code className="text-success">
                        <MDBIcon icon="check-circle" className="mr-2" />
                        Authenticated as {gitlab.username}
                      </code>
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="small d-inline-block text-center px-2">
                      <span className="text-muted">Usertype</span>
                      <span className="d-block">{gitlab.user}</span>
                    </div>
                    <div className="small d-inline-block text-center px-2">
                      <span className="text-muted">Mode</span>
                      <span className="d-block">
                        {gitlab.isIDC ? "IDC" : "POLP"}
                      </span>
                    </div>
                    <div className="small d-inline-block text-center ml-2">
                      <span className="text-muted">Status</span>
                      <span className="d-block">
                        <MDBIcon
                          icon="circle"
                          size="lg"
                          className={
                            gitlab.isActive ? "text-success" : "text-danger"
                          }
                        />
                      </span>
                    </div>
                  </div>
                </MDBListGroupItem>
              );
            })}
        </MDBListGroup>
        {this.state.modal && (
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            size="md"
          >
            <MDBModalBody>
              <div className="d-flex justify-content-between">
                <p className="lead font-weight-bold">
                  {!this.state.addGitLab
                    ? this.state.selectedGitLab.domain
                      ? this.state.selectedGitLab.domain
                      : this.state.selectedGitLab.ip
                    : "Add new GitLab"}
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
                  <AIToggle
                    title="Domain / IP"
                    description="Reach GitLab server by domain or ip address?"
                    checked={!this.state.selectedGitLab.useIP}
                    change={this.handleGitLabModeChange}
                    name="useIP"
                    labelLeft="IP"
                    labelRight="Domain"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  {this.state.selectedGitLab.useIP ? (
                    <AIInput
                      title="IP Address"
                      description="Enter the GitLab IP Address"
                      name="ip"
                      placeholder="GitLab IP"
                      value={this.state.selectedGitLab.ip}
                      handleChange={this.handleGitLabChange}
                      key="ip"
                    />
                  ) : (
                    <AIInput
                      title="Domain"
                      description="Enter the GitLab domain"
                      name="domain"
                      placeholder="GitLab Domain"
                      value={this.state.selectedGitLab.domain}
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
                    checked={!this.state.selectedGitLab.isIDC}
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
                            Authenticated as {this.state.authorizedUser}
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
                  {!this.state.addGitLab && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removeGitlab(this.state.selectedGitLab.id);
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
                    onClick={() =>
                      this.testConnection(this.state.selectedGitLab)
                    }
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
                      if (!this.state.addGitLab) {
                        this.props.alterGitlab(
                          this.state.selectedGitLab.id,
                          this.state.selectedGitLab
                        );
                      } else {
                        this.props.createGitlab(this.state.selectedGitLab);
                      }
                      this.toggleModal();
                    }}
                  >
                    <MDBIcon icon="check-circle" />
                    {!this.state.addGitLab ? "Save" : "Create"}
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
  gitlabs: state.gitlabs.gitlabs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGitLabs: () => dispatch(getGitLabs()),
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
export default connect(mapStateToProps, mapDispatchToProps)(GitLabs);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
