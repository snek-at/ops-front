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

//> Actions
// Functions to send data from the application to the store
import { getPageByHandle } from "../../../../store/actions/pageActions";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Page extends React.Component {
  state = {};

  componentDidMount = () => {
    // Retrieve Pipelines
    this.props.getPageByHandle(this.props.handle);
  };

  componentDidUpdate = () => {
    console.log(this.props.page);
    // Check if there are no current pipelines set
    if (this.props.page && !this.state.page) {
      this.setState({
        page: this.props.page,
      });
    }
  };

  render() {
    const { page } = this.state;

    return (
      <MDBContainer>
        {page ? (
          <div>
            <h2>{page.company.name}</h2>
          </div>
        ) : (
          <div>
            <p>No page</p>
          </div>
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  page: state.pages.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPageByHandle: (handle) => dispatch(getPageByHandle(handle)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Page);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
