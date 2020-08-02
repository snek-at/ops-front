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
import { getConnectors } from "../../../../store/actions/connectorActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays connectors */
class Connectors extends React.Component {
  state = { modal: false };

  componentDidMount = () => {
    // Retrieve GitLabs
    this.props.getConnectors();
  };

  componentDidUpdate = () => {
    // Check if there are no current connectors set
    if (this.props.connectors && !this.state.connectors) {
      this.setState({
        connectors: this.props.connectors,
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
    // Retrieve all connectors
    const { connectors } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = connectors.filter((con) => {
      if (
        this.unifyString(con.gitlab[0].ip).includes(val) ||
        this.unifyString(con.gitlab[0].domain).includes(val) ||
        this.unifyString(con.name).includes(val) ||
        this.unifyString(con.ip).includes(val) ||
        this.unifyString(con.domain).includes(val)
      ) {
        return con;
      }
    });

    this.setState({ connectors: results });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      selectedConnector: null,
      testing: undefined,
      addConnector: false,
      authorizedUser: undefined,
    });
  };

  handleGitLabChange = (name, value) => {
    console.log(name, value);

    this.setState({
      selectedConnector: {
        ...this.state.selectedConnector,
        [name]: value,
      },
    });
  };

  handleGitLabModeChange = (name) => {
    this.setState({
      selectedConnector: {
        ...this.state.selectedConnector,
        [name]: !this.state.selectedConnector[name],
      },
    });
  };

  testConnection = (connector) => {
    this.setState(
      {
        testing: "loading",
      },
      async () => {
        const response = await this.props.testConnection(connector);

        this.setState({
          testing: response ? "success" : "fail",
        });
      }
    );
  };

  render() {
    const { connectors } = this.state;

    return (
      <MDBContainer>
        <div className="d-flex justify-content-between">
          <div>
            <h2>Connectors</h2>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              You decide what information you share.
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
                selectedConnector: {},
                addConnector: true,
              })
            }
          >
            <MDBIcon fab icon="connector" />
            Add Connector
          </MDBBtn>
        </div>
        <MDBListGroup>
          {connectors &&
            connectors.map((connector, p) => {
              return (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center clickable"
                  onClick={() =>
                    this.setState({
                      modal: true,
                      selectedConnector: connector,
                      authorizedUser: connector.username,
                    })
                  }
                  key={p}
                >
                  <div>
                    <p className="lead mb-0">
                      {connector.name}{" "}
                      {connector.gitlab.length > 0 && (
                        <span className="orange-text">
                          <MDBIcon fab icon="gitlab" className="ml-1" />
                        </span>
                      )}
                    </p>
                    {connector.gitlab[0] && (
                      <p className="mb-0">
                        <code className="ml-0">
                          gitlab:{" "}
                          {connector.gitlab[0].ip
                            ? connector.gitlab[0].ip
                            : connector.gitlab[0].domain}
                        </code>
                      </p>
                    )}
                    <p className="text-muted mb-0">
                      <span className="small">
                        {connector.domain ? connector.domain : connector.ip}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="small d-inline-block text-center ml-2">
                      <span className="text-muted">Status</span>
                      <span className="d-block">
                        <MDBIcon
                          icon="circle"
                          size="lg"
                          className={
                            connector.isActive ? "text-success" : "text-danger"
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
                  {!this.state.addConnector
                    ? this.state.selectedConnector.domain
                      ? this.state.selectedConnector.domain
                      : this.state.selectedConnector.ip
                    : "Add new Connector"}
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
                    description="Reach Connector server by domain or ip address?"
                    checked={!this.state.selectedConnector.useIP}
                    change={this.handleGitLabModeChange}
                    name="useIP"
                    labelLeft="IP"
                    labelRight="Domain"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  {this.state.selectedConnector.useIP ? (
                    <AIInput
                      title="IP Address"
                      description="Enter the Connector IP Address"
                      name="ip"
                      placeholder="Connector IP"
                      value={this.state.selectedConnector.ip}
                      handleChange={this.handleGitLabChange}
                      key="ip"
                    />
                  ) : (
                    <AIInput
                      title="Domain"
                      description="Enter the Connector domain"
                      name="domain"
                      placeholder="Connector Domain"
                      value={this.state.selectedConnector.domain}
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
                    checked={!this.state.selectedConnector.isIDC}
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
              <div className="d-flex justify-content-between mt-3">
                <div>
                  {!this.state.addConnector && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removeGitlab(
                          this.state.selectedConnector.id
                        );
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
                      this.testConnection(this.state.selectedConnector)
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
                      if (!this.state.addConnector) {
                        this.props.alterGitlab(
                          this.state.selectedConnector.id,
                          this.state.selectedConnector
                        );
                      } else {
                        this.props.createGitlab(this.state.selectedConnector);
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
  connectors: state.connectors.connectors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getConnectors: () => dispatch(getConnectors()),
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
export default connect(mapStateToProps, mapDispatchToProps)(Connectors);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
