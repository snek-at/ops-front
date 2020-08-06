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
  MDBRow,
  MDBBadge,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBProgress,
  MDBTooltip,
  MDBTabContent,
  MDBTabPane,
  MDBNav,
  MDBNavLink,
  MDBNavItem,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import {
  getProjectByHandle,
  getProjects,
} from "../../../../store/actions/pageActions";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Project extends React.Component {
  state = {
    project: null,
  };

  componentDidMount = () => {
    // Retrieve Pipelines
    this.props.getProjects();
  };

  componentDidUpdate = (prevState) => {
    // Check if there is no current project set
    if (
      this.props.projects !== prevState.projects ||
      (this.props.project && this.props.project.handle !== this.props.handle)
    ) {
      console.log(this.props.handle);
      this.props.getProjectByHandle(this.props.handle);
    }

    if (
      (this.props.project && !this.state.project) ||
      (this.state.project && this.state.project.handle !== this.props.handle)
    ) {
      this.setState({
        project: this.props.project,
      });
    }
  };

  render() {
    const { project } = this.state;

    return (
      <MDBContainer id="project">
        {project ? (
          <div>
            <p>{project.handle}</p>
            <p>{project.title}</p>
          </div>
        ) : (
          <div>
            <p>No project</p>
          </div>
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  project: state.pages.project,
  projects: state.pages.projects,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectByHandle: (handle) => dispatch(getProjectByHandle(handle)),
    getProjects: () => dispatch(getProjects()),
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
export default connect(mapStateToProps, mapDispatchToProps)(Project);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
