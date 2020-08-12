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
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBAlert,
  MDBCardBody,
  MDBCard,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import { getPipelines } from "../../../../store/actions/pipelineActions";
import { getConnectors } from "../../../../store/actions/connectorActions";
import { getGitLabs } from "../../../../store/actions/gitlabActions";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Dashboard extends React.Component {
  state = {};

  componentDidMount = () => {
    // Retrieve Data
    this.props.getPipelines();
    this.props.getConnectors();
    this.props.getGitLabs();
  };

  render() {
    const { pipelines, pagenames, connectors, gitlabs } = this.props;

    return (
      <MDBContainer>
        <h2>Dashboard</h2>
        <MDBRow className="mt-4">
          <MDBCol lg="4" className="mb-3">
            <MDBCard className="border">
              <MDBCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="lead font-weight-bold">Your GitLabs</p>
                  <p
                    className="blue-text clickable"
                    onClick={() => this.props.navigateTo("gitlabs")}
                  >
                    Show all
                  </p>
                </div>
                <MDBListGroup>
                  {gitlabs &&
                    gitlabs.map((gitlab, g) => {
                      return (
                        <MDBListGroupItem
                          className="d-flex justify-content-between"
                          key={g}
                        >
                          <span>{gitlab.url}</span>
                          <span className="d-block">
                            <MDBIcon
                              icon="circle"
                              size="md"
                              className={
                                gitlab.isActive ? "text-success" : "text-danger"
                              }
                            />
                          </span>
                        </MDBListGroupItem>
                      );
                    })}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="4" className="mb-3">
            <MDBCard className="border">
              <MDBCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="lead font-weight-bold">Your connectors</p>
                  <p
                    className="blue-text clickable"
                    onClick={() => this.props.navigateTo("connectors")}
                  >
                    Show all
                  </p>
                </div>
                <MDBListGroup>
                  {connectors &&
                    connectors.map((connector, p) => {
                      return (
                        <MDBListGroupItem className="d-flex justify-content-between">
                          <span>{connector.name}</span>
                          <span className="d-block">
                            <MDBIcon
                              icon="circle"
                              size="md"
                              className={
                                connector.isActive
                                  ? "text-success"
                                  : "text-danger"
                              }
                            />
                          </span>
                        </MDBListGroupItem>
                      );
                    })}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="4" className="mb-3">
            <MDBCard className="border">
              <MDBCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="lead font-weight-bold">Your pipelines</p>
                  <p
                    className="blue-text clickable"
                    onClick={() => this.props.navigateTo("pipelines")}
                  >
                    Show all
                  </p>
                </div>
                <MDBListGroup>
                  {pipelines &&
                    pipelines.map((pipeline, p) => {
                      return (
                        <MDBListGroupItem className="d-flex justify-content-between">
                          <span>{pipeline.title}</span>
                          <span className="d-block">
                            <MDBIcon
                              icon="circle"
                              size="md"
                              className={
                                pipeline.isActive
                                  ? "text-success"
                                  : "text-danger"
                              }
                            />
                          </span>
                        </MDBListGroupItem>
                      );
                    })}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="4" className="mb-3">
            <MDBCard className="border">
              <MDBCardBody>
                <p className="lead font-weight-bold">Your pages</p>
                <MDBListGroup>
                  {pagenames &&
                    pagenames.map((page, p) => {
                      return (
                        <MDBListGroupItem
                          className="clickable"
                          onClick={() =>
                            this.props.navigateTo("page", page.handle)
                          }
                        >
                          {page.name}
                        </MDBListGroupItem>
                      );
                    })}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
  connectors: state.connectors.connectors,
  pagenames: state.pages.pagenames,
  gitlabs: state.gitlabs.gitlabs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPipelines: () => dispatch(getPipelines()),
    getConnectors: () => dispatch(getConnectors()),
    getGitLabs: () => dispatch(getGitLabs()),
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
