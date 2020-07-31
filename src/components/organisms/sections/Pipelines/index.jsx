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
} from "mdbreact";
//> Additional
import ReactTimeAgo from "react-time-ago";

//> Actions
// Functions to send data from the application to the store
import { getPipelines } from "../../../../store/actions/pipelineActions";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Pipelines extends React.Component {
  state = {};

  componentDidMount = () => {
    // Retrieve Pipelines
    this.props.getPipelines();
  };

  componentDidUpdate = () => {
    // Check if there are no current pipelines set
    if (this.props.pipelines && !this.state.pipelines) {
      this.setState({
        pipelines: this.props.pipelines,
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
    // Retrieve all pipelines
    const { pipelines } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = pipelines.filter((pipe) => {
      if (
        this.unifyString(pipe.title).includes(val) ||
        this.unifyString(pipe.domain).includes(val) ||
        this.unifyString(pipe.org).includes(val)
      ) {
        return pipe;
      }
    });

    this.setState({ pipelines: results });
  };

  render() {
    const { pipelines } = this.state;

    return (
      <MDBContainer>
        <div className="d-flex justify-content-between">
          <div>
            <h2>Pipelines</h2>
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

        <MDBListGroup>
          {pipelines &&
            pipelines.map((pipeline, p) => {
              return (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center"
                  key={p}
                >
                  <div>
                    <p className="lead mb-2">{pipeline.title}</p>
                    <p className="mb-0 text-muted">
                      {pipeline.domain}/{pipeline.org}/
                      {pipeline.title.toLowerCase()}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="small d-inline-block mr-3 text-center">
                      <span className="text-muted">Last activity</span>
                      <ReactTimeAgo
                        date={pipeline.latestActivity}
                        className="d-block"
                      />
                    </div>
                    <div className="small d-inline-block text-center">
                      <span className="text-muted">Status</span>
                      <span className="d-block">
                        <MDBIcon
                          icon="circle"
                          size="lg"
                          className={
                            pipeline.isActive ? "text-success" : "text-danger"
                          }
                        />
                      </span>
                    </div>
                  </div>
                </MDBListGroupItem>
              );
            })}
        </MDBListGroup>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPipelines: () => dispatch(getPipelines()),
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
export default connect(mapStateToProps, mapDispatchToProps)(Pipelines);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
