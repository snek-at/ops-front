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
  getConnectors,
  testConnection,
  alterConnector,
  createConnector,
  removeConnector,
} from "../../../../store/actions/connectorActions";
import { getGitLabs } from "../../../../store/actions/gitlabActions";
//> Components
import { AIInput, AICheckbox } from "../../../atoms";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays connectors */
class Connectors extends React.Component {
  state = { modal: false };

  componentDidMount = () => {
    // Retrieve Connectors
    this.props.getConnectors();
    // Retrieve GitLabs
    this.props.getGitLabs();
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
        this.unifyString(con.name).includes(val) ||
        this.unifyString(con.url).includes(val)
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

  handleConnectorChange = (name, value) => {
    this.setState({
      selectedConnector: {
        ...this.state.selectedConnector,
        [name]: value,
      },
    });
  };

  handleConnectorModeChange = (name) => {
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

  handleSettingsChange = (name, val) => {
    this.setState({
      selectedConnector: {
        ...this.state.selectedConnector,
        settings: this.state.selectedConnector.settings
          ? {
              ...this.state.selectedConnector.settings,
              shared: this.state.selectedConnector.settings.shared
                ? {
                    ...this.state.selectedConnector.settings.shared,
                    companyData: {
                      ...this.state.selectedConnector.settings.shared
                        .companyData,
                      [name]: val,
                    },
                  }
                : {
                    companyData: {
                      [name]: val,
                    },
                  },
            }
          : {
              shared: {
                companyData: {
                  [name]: val,
                },
              },
            },
      },
    });
  };

  render() {
    const { connectors } = this.state;

    console.log(this.state.selectedConnector);

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
                    <p className="lead mb-0">{connector.name}</p>
                    <p className="text-muted mb-0">
                      <span className="small">{connector.url}</span>
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
                    ? this.state.selectedConnector.name
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
                  <AIInput
                    title="Connector name"
                    description="Enter a name for the connector"
                    name="name"
                    placeholder="Connector Name"
                    value={this.state.selectedConnector.name}
                    handleChange={this.handleConnectorChange}
                    key="name"
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AIInput
                    title="URL"
                    description="Connector domain or ip address"
                    name="url"
                    placeholder="Connector URL"
                    value={this.state.selectedConnector.url}
                    handleChange={this.handleConnectorChange}
                    key="url"
                  />
                </MDBCol>
              </MDBRow>
              <hr />
              <AIInput
                title="Authentication"
                description="Please enter the connector token"
                name="token"
                placeholder="Token"
                value={this.state.selectedConnector.token}
                handleChange={this.handleConnectorChange}
                key="token"
              />
              <hr />
              {this.props.pagenames ? (
                <>
                  <MDBSelect
                    label="Select Page"
                    getValue={(value) =>
                      this.setState({
                        selectedConnector: {
                          ...this.state.selectedConnector,
                          companyPage: {
                            handle: value[0],
                          },
                        },
                      })
                    }
                  >
                    <MDBSelectInput selected="Choose your Page" />
                    <MDBSelectOptions>
                      <MDBSelectOption disabled>
                        Choose your Page
                      </MDBSelectOption>
                      {this.props.pagenames &&
                        this.props.pagenames.map((page, p) => {
                          return (
                            <MDBSelectOption
                              value={page.handle}
                              key={page.handle}
                              selected={p === 0 ? true : false}
                            >
                              {page.name}
                            </MDBSelectOption>
                          );
                        })}
                    </MDBSelectOptions>
                  </MDBSelect>
                </>
              ) : (
                <MDBAlert color="warning">
                  <p className="mb-0">Please create a page first.</p>
                </MDBAlert>
              )}
              <hr />
              <p className="lead font-weight-bold">You decide what you share</p>
              <MDBRow>
                <MDBCol lg="6">
                  <AICheckbox
                    name="name"
                    label="Company name"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.name
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("name", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="isRecruiting"
                    label="Recruitment status"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.isRecruiting
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("isRecruiting", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="recruitmentUrl"
                    label="Recruitment URL"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.recruitmentUrl
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("recruitmentUrl", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="description"
                    label="Company description"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.description
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("description", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="employees"
                    label="Employee count"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.employees
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("employees", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="vat"
                    label="VAT number"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.vat
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("vat", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="email"
                    label="Company E-Mail"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.email
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("email", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="isOpenSource"
                    label="Open Source status"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.isOpenSource
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("isOpenSource", val)
                    }
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <AICheckbox
                    name="openSourceUrl"
                    label="Open Source URL"
                    checked={
                      this.state.selectedConnector.settings
                        ? this.state.selectedConnector.settings.shared
                            .companyData.openSourceUrl
                        : false
                    }
                    handleChange={(val) =>
                      this.handleSettingsChange("openSourceUrl", val)
                    }
                  />
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-between mt-5">
                <div>
                  {!this.state.addConnector && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removeConnector(
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
                        this.props.alterConnector(
                          this.state.selectedConnector.id,
                          this.state.selectedConnector
                        );
                      } else {
                        this.props.createConnector(
                          this.state.selectedConnector
                        );
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
  pagenames: state.pages.pagenames,
  gitlabs: state.gitlabs.gitlabs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getConnectors: () => dispatch(getConnectors()),
    getGitLabs: () => dispatch(getGitLabs()),
    testConnection: (connector) => dispatch(testConnection(connector)),
    alterConnector: (id, connector) => dispatch(alterConnector(id, connector)),
    createConnector: (connector) => dispatch(createConnector(connector)),
    removeConnector: (id) => dispatch(removeConnector(id)),
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
