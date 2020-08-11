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
  MDBBtn,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { getGitLabs } from "../../../../store/actions/gitlabActions";
//> Components
import { GitLabModal } from "../../";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays gitlabs */
class GitLabs extends React.Component {
  state = { modal: false };

  componentDidMount = () => {
    // Retrieve GitLabs
    this.props.getGitLabs();
  };

  componentDidUpdate = (prevProps) => {
    // Check if there are no current gitlabs set
    if (
      (this.props.gitlabs && !this.state.gitlabs) ||
      JSON.stringify(prevProps.gitlabs) !== JSON.stringify(this.props.gitlabs)
    ) {
      this.setState({
        gitlabs: this.props.gitlabs,
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
    // Retrieve all gitlabs
    const { gitlabs } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = gitlabs.filter((gitlab) => {
      if (
        this.unifyString(gitlab.url).includes(val) ||
        this.unifyString(gitlab.mode).includes(val)
      ) {
        return gitlab;
      }
    });

    this.setState({ gitlabs: results });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      selectedGitLab: null,
      addGitLab: false,
      authorizedUser: undefined,
    });
  };

  render() {
    const { gitlabs } = this.state;

    return (
      <MDBContainer>
        <div className="d-flex justify-content-between">
          <div>
            <h2>GitLabs</h2>
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
        <div className="text-right mb-2">
          <MDBBtn
            color="orange"
            className="mr-0"
            onClick={() =>
              this.setState({
                modal: true,
                selectedGitLab: {},
                addGitLab: true,
              })
            }
          >
            <MDBIcon fab icon="gitlab" />
            Add GitLab
          </MDBBtn>
        </div>
        <MDBListGroup>
          {gitlabs &&
            gitlabs.map((gitlab, p) => {
              return (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center clickable"
                  onClick={() =>
                    this.setState({
                      modal: true,
                      selectedGitLab: gitlab,
                      authorizedUser: gitlab.username,
                    })
                  }
                  key={p}
                >
                  <div>
                    <p className="lead mb-0">{gitlab.url}</p>
                    {gitlab.token && (
                      <p className="text-muted mb-0">
                        <code className="text-success">
                          <MDBIcon icon="check-circle" className="mr-2" />
                          Authenticated
                        </code>
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="small d-inline-block text-center px-2">
                      <span className="text-muted">Mode</span>
                      <span className="d-block">
                        {gitlab.isIDC ? "IDC" : "POLP"}
                      </span>
                    </div>
                    <div className="small d-inline-block text-center ml-2">
                      <span className="text-muted">Status</span>
                      <span className="d-block">
                        <MDBIcon
                          icon="circle"
                          size="lg"
                          className={
                            gitlab.isActive ? "text-success" : "text-danger"
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
          <GitLabModal
            selectedGitLab={this.state.selectedGitLab}
            addGitLab={this.state.addGitLab}
            authorizedUser={this.state.authorizedUser}
            testing={this.state.testing}
            toggle={this.toggleModal}
          />
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => {
  console.log("STATE", state);
  return { gitlabs: state.gitlabs.gitlabs };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(GitLabs);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
