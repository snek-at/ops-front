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

  componentDidUpdate = (prevProps) => {
    // Check if there are no current pipelines set
    if (this.props.pipelines && !this.state.pipelines && !this.state.refetch) {
      this.setState({
        pipelines: this.props.pipelines,
      });
    } else if (this.props.pipelines && this.state.refetch) {
      this.setState(
        {
          refetch: false,
        },
        () => this.props.getPipelines()
      );
    } else if (
      JSON.stringify(prevProps.pipelines) !==
      JSON.stringify(this.props.pipelines)
    ) {
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

    // Searches for search value in title, url and org
    let results = pipelines.filter((pipe) => {
      if (
        this.unifyString(pipe.title).includes(val) ||
        this.unifyString(pipe.url).includes(val) ||
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
              Connect your pipeline plugins to retrieve data from GitLab CI.
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
        <div className="text-right mb-3">
          <MDBBtn
            color="green"
            className="mr-0"
            onClick={() =>
              this.setState({
                modal: true,
                selectedPipeline: {
                  isActive: true,
                },
                addPipeline: true,
              })
            }
          >
            Create SNEK Pipeline
          </MDBBtn>
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
                      {pipeline.url}/{pipeline.org}/
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
                  {!this.state.addPipeline
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
              <AIInput
                title="Title"
                description="Name the pipeline"
                name="title"
                placeholder="Pipeline title"
                value={this.state.selectedPipeline.title}
                handleChange={this.handlePipelineChange}
                key="title"
              />
              <p className="mb-1 text-muted small mt-3">Token</p>
              <input
                type="text"
                disabled
                className="form-control"
                placeholder="Generated after saving..."
                value={this.state.selectedPipeline.token}
              />
              <MDBRow className="mb-3 mt-2">
                <MDBCol lg="5">
                  <AIToggle
                    title="Active"
                    description="Enable or disable the pipeline"
                    checked={this.state.selectedPipeline.isActive}
                    change={this.handlePipelineModeChange}
                    name="isActive"
                    labelLeft="Off"
                    labelRight="On"
                  />
                </MDBCol>
                <MDBCol lg="7">
                  {this.props.pagenames ? (
                    <>
                      <MDBSelect
                        label="Select Page"
                        getValue={(value) =>
                          this.setState({
                            selectedPipeline: {
                              ...this.state.selectedPipeline,
                              enterprisePage: {
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
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-between">
                <div>
                  {!this.state.addPipeline && (
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
                      if (!this.state.addPipeline) {
                        this.props.alterPipeline(
                          this.state.selectedPipeline.token,
                          this.state.selectedPipeline
                        );
                      } else {
                        this.props.createPipeline(this.state.selectedPipeline);

                        this.setState({
                          pipelines: undefined,
                          refetch: true,
                        });
                      }
                      this.toggleModal();
                    }}
                  >
                    <MDBIcon icon="check-circle" />
                    {!this.state.addPipeline ? "Save" : "Create"}
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
  pagenames: state.pages.pagenames,
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
