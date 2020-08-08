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
import { MDBModal, MDBModalBody } from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import {
  getProjectByHandle,
  getProjects,
} from "../../../../store/actions/pageActions";
//#endregion

//#region > Components
/** @class Custom input */
class ProjectModal extends React.Component {
  state = { project: undefined };

  componentDidMount = () => {
    this.props.getProjectByHandle(this.props.handle);
  };

  componentDidUpdate = (prevState) => {
    if (
      (this.props.project && !this.state.project) ||
      (this.state.project && this.state.project.handle !== this.props.handle)
    ) {
      console.log(this.props.project);
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
              <p>{project.title}</p>
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
    getProjectByHandle: (handle) => dispatch(getProjectByHandle(handle)),
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
