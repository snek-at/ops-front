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
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import { getProjects } from "../../../../store/actions/pageActions";
//> Components
import { UserModal, ProjectModal } from "../../";
import { AIBarChart } from "../../../atoms";
//> CSS
import "./pageprojects.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageProjects extends React.Component {
  state = { projects: null };

  componentDidMount = () => {
    this.props.getProjects();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.projects && !this.state.projects) {
      this.setState({
        projects: this.props.projects,
      });
    }

    if (this.props.filter !== prevProps.filter) {
      this.filter(this.props.filter);
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
    // Retrieve all pipelines
    const { projects } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = projects.filter((project) => {
      if (this.unifyString(project.title).includes(val)) {
        return project;
      }
    });

    this.setState({ projects: results });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      handle: undefined,
    });
  };

  generateRandomChart = () => {
    let array = [...new Array(200)].map(() =>
      Math.round(Math.random() * (Math.random() < 0.2 ? -100 : 100))
    );

    // Decrease number of values
    for (let i = array.length - 1; i >= 0; i--) {
      if (Math.random() * 100 > 70) {
        array[i] = 0;
        array[i - 1] = 0;
      }
    }

    return array;
  };

  render() {
    const { projects } = this.state;

    return (
      <div id="pageprojects">
        <div className="mt-3">
          <p className="lead font-weight-bold mb-0">Project Overview</p>
          <p className="text-muted small">
            <MDBIcon icon="question-circle" className="mr-2" />
            Lorem Ipsum Dolor sit amet.
          </p>
        </div>
        <MDBListGroup>
          {projects &&
            projects.map((project, p) => {
              return (
                <MDBListGroupItem
                  onClick={() =>
                    this.setState({ modal: true, handle: project.handle })
                  }
                  className="d-flex justify-content-between align-items-center clickable"
                  key={p}
                >
                  <div>
                    <p className="lead mb-0">{project.title}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <AIBarChart data={this.generateRandomChart()} />
                  </div>
                </MDBListGroupItem>
              );
            })}
        </MDBListGroup>
        {this.state.modal && this.state.handle && this.props.projects && (
          <ProjectModal
            toggle={this.toggle}
            projects={this.props.projects}
            handle={this.state.handle}
          />
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  projects: state.pages.projects,
});

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(PageProjects);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
