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
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import {
  getProjectById,
  clearSelection,
} from "../../../../store/actions/pageActions";
//> Components
import { AIBarChart } from "../../../atoms";
//#endregion

//#region > Components
/** @class Custom input */
class ProjectModal extends React.Component {
  state = { project: undefined };

  componentDidMount = () => {
    this.props.getProjectById(this.props.id);
  };

  componentWillUnmount = () => {
    this.props.clearSelection();
  };

  componentDidUpdate = (prevState) => {
    if (
      (this.props.project && !this.state.project) ||
      (this.state.project && this.state.project.id !== this.props.id)
    ) {
      this.setState({
        project: this.props.project,
      });
    }
  };

  render() {
    const { project } = this.state;

    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          {project ? (
            <div>
              <MDBRow>
                <MDBCol lg="4">
                  <p className="lead font-weight-bold">Project info</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p className="mb-1">{project.title}</p>
                      <p className="small text-muted">{project.description}</p>
                      <p className="mb-0">Owner</p>
                      <p className="small text-muted">{project.ownerName}</p>
                      {project.url && (
                        <MDBBtn
                          color="elegant"
                          href={project.url}
                          target="_blank"
                          className="ml-0"
                          size="md"
                        >
                          View repository
                        </MDBBtn>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-3">Contributors</p>
                  <div className="activity">
                    <MDBCard className="border">
                      <MDBListGroup>
                        {project.contributors &&
                          project.contributors.map((contributor, i) => {
                            return (
                              <MDBListGroupItem key={"project-contrib-" + i}>
                                <p className="mb-0">{contributor.name}</p>
                                <p className="mb-0 small text-muted">
                                  {contributor.username}
                                </p>
                                <p className="blue-text small">
                                  {(
                                    (100 / project.contributionFeed.length) *
                                    contributor.contributionFeed.length
                                  ).toFixed(2)}{" "}
                                  %
                                </p>
                              </MDBListGroupItem>
                            );
                          })}
                      </MDBListGroup>
                    </MDBCard>
                  </div>
                </MDBCol>
                <MDBCol lg="8" className="activity">
                  <p className="lead font-weight-bold">Activity</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <AIBarChart data={this.props.chart} size={100} />
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-3">History</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <MDBListGroup>
                        {project.contributionFeed &&
                          project.contributionFeed.map((contrib, i) => {
                            return (
                              <MDBListGroupItem key={"project-contrib-" + i}>
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
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          ) : (
            <div>
              <p>No project</p>
            </div>
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
    getProjectById: (id) => dispatch(getProjectById(id)),
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
