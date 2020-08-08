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
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import {
  getPipelines,
  alterPipeline,
  createPipeline,
  removePipeline,
} from "../../../../store/actions/pipelineActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Pipelines extends React.Component {
  state = { modal: false };

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

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      selectedPipeline: null,
      addPipeline: false,
    });
  };

  handlePipelineChange = (name, value) => {
    this.setState({
      selectedPipeline: {
        ...this.state.selectedPipeline,
        [name]: value,
      },
    });
  };

  handlePipelineModeChange = (name) => {
    this.setState({
      selectedPipeline: {
        ...this.state.selectedPipeline,
        [name]: !this.state.selectedPipeline[name],
      },
    });
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
                  className="d-flex justify-content-between align-items-center clickable"
                  key={p}
                  onClick={() =>
                    this.setState({ modal: true, selectedPipeline: pipeline })
                  }
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
                      <span className="d-block">
                        {moment(pipeline.latestActivity).endOf("day").fromNow()}
                      </span>
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
        {this.state.modal && this.state.selectedPipeline && (
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            size="md"
          >
            <MDBModalBody>
              <div className="d-flex justify-content-between">
                <p className="lead font-weight-bold">
                  {!this.state.addConnector
                    ? this.state.selectedPipeline.title
                    : "Add new pipeline"}
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
              <p className="mb-1 text-muted small">Token</p>
              <input
                type="text"
                disabled
                className="form-control"
                value={this.state.selectedPipeline.token}
              />
              <MDBRow>
                <MDBCol lg="6">
                  <AIToggle
                    title="Active"
                    description="Enable or disable the connector"
                    checked={this.state.selectedPipeline.isActive}
                    change={this.handlePipelineModeChange}
                    name="isActive"
                    labelLeft="Off"
                    labelRight="On"
                  />
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-between">
                <div>
                  {!this.state.addConnector && (
                    <MDBBtn
                      color="danger"
                      onClick={() => {
                        this.props.removePipeline(
                          this.state.selectedPipeline.token
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
                    color="success"
                    size="md"
                    onClick={() => {
                      if (!this.state.addConnector) {
                        this.props.alterPipeline(
                          this.state.selectedPipeline.token,
                          this.state.selectedPipeline
                        );
                      } else {
                        this.props.createPipeline(this.state.selectedPipeline);
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
  pipelines: state.pipelines.pipelines,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPipelines: () => dispatch(getPipelines()),
    alterPipeline: (token, pipeline) =>
      dispatch(alterPipeline(token, pipeline)),
    createPipeline: (pipeline) => dispatch(createPipeline(pipeline)),
    removePipeline: (token) => dispatch(removePipeline(token)),
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
