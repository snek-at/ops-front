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
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSwitch,
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import { editImprint } from "../../../../store/actions/pageActions";
//> CSS
import "./pageimprint.scss";
//> Images
// Too be added
//#endregion

//#region > Components
class AICheckbox extends React.Component {
  render() {
    const {
      title,
      description,
      name,
      labelLeft,
      labelRight,
      checked,
    } = this.props;

    return (
      <>
        <p className="mb-0 mt-3">{title}</p>
        <p className="text-muted small mb-1">{description}</p>
        <MDBSwitch
          name={name}
          labelLeft={labelLeft}
          labelRight={labelRight}
          checked={checked}
          onChange={() => this.props.change(name)}
        />
      </>
    );
  }
}

class AIInput extends React.Component {
  render() {
    const { type, title, description, name, placeholder, value } = this.props;

    if (type !== "textarea") {
      return (
        <>
          {title && <p className="mb-0 mt-3">{title}</p>}
          {description && (
            <p className="text-muted small mb-1">{description}</p>
          )}
          <input
            type={type ? type : "text"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
              this.props.handleChange(
                e.target.name,
                type === "number"
                  ? !isNaN(e.target.value)
                    ? parseInt(e.target.value)
                    : e.target.value
                  : e.target.value
              )
            }
            className="form-control"
          />
        </>
      );
    } else {
      return (
        <>
          <p className="mb-0 mt-3">{title}</p>
          <p className="text-muted small mb-1">{description}</p>
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            rows="4"
            onChange={(e) =>
              this.props.handleChange(e.target.name, e.target.value)
            }
            className="form-control"
          />
        </>
      );
    }
  }
}

/** @class This component displays page overview of the page section */
class PageImprint extends React.Component {
  state = { page: null };

  componentDidMount = () => {
    this.setState({
      page: this.props.page,
    });
  };

  handleSwitchChange = (nr) => {
    this.setState({
      page: {
        ...this.state.page,
        company: {
          ...this.state.page.company,
          [nr]: !this.state.page.company[nr],
        },
      },
    });
  };

  handleChange = (name, value) => {
    this.setState({
      page: {
        ...this.state.page,
        company: {
          ...this.state.page.company,
          [name]:
            typeof this.state.page.company[name] !== "object"
              ? value
              : { ...this.state.page.company[name], value },
        },
      },
    });
  };

  checkIfChanged = () => {
    if (JSON.stringify(this.props.page) !== JSON.stringify(this.state.page)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { page } = this.state;

    console.log(page);

    return (
      <div id="pageimprint">
        <div className="d-flex justify-content-between mt-3">
          <div>
            <p className="lead font-weight-bold mb-0">Imprint</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              Lorem Ipsum Dolor sit amet.
            </p>
          </div>
          <div>
            {this.checkIfChanged() && (
              <MDBBtn color="success">
                <MDBIcon icon="check-circle" />
                Save
              </MDBBtn>
            )}
          </div>
        </div>
        {this.state.page ? (
          <MDBRow className="mt-3">
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">General</p>
                  <AIInput
                    title="Company name"
                    description="Legal name of your enterprise."
                    name="name"
                    placeholder="Company name"
                    value={this.state.page.company.name}
                    handleChange={this.handleChange}
                  />
                  <AIInput
                    type="textarea"
                    title="Description"
                    description="What is your enterprise all about?"
                    name="description"
                    placeholder="Company description"
                    value={this.state.page.company.description}
                    handleChange={this.handleChange}
                  />
                  <AIInput
                    title="Company E-Mail"
                    description="How can visitors reach your enterprise?"
                    name="email"
                    placeholder="Company E-Mail"
                    value={this.state.page.company.email}
                    handleChange={this.handleChange}
                  />
                  <hr />
                  <AICheckbox
                    title="VAT Number"
                    description="Is your company entitled to deduct pre-tax?"
                    checked={this.state.page.company.hasVAT}
                    change={this.handleSwitchChange}
                    name="hasVAT"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.hasVAT && (
                    <AIInput
                      description="Please enter your VAT number."
                      name="vat"
                      placeholder="VAT number"
                      value={this.state.page.company.vat.value}
                      handleChange={this.handleChange}
                    />
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">Specific</p>
                  <AIInput
                    type="number"
                    title="Employees"
                    description="How many people does your enterprise employ?"
                    name="employees"
                    placeholder="Number of employees"
                    value={this.state.page.company.employees}
                    handleChange={this.handleChange}
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">Other information</p>
                  <AICheckbox
                    title="Open Source"
                    description="Does your enterprise produce open source software?"
                    checked={this.state.page.company.isOpenSource}
                    change={this.handleSwitchChange}
                    name="isOpenSource"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.isOpenSource && (
                    <>
                      <span className="small text-muted mb-1">
                        Where can we find your Open Source projects at?
                      </span>
                      <input
                        type="text"
                        name="openSourceUrl"
                        placeholder="Open Source Platform URL"
                        value={this.state.page.company.openSourceUrl}
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                      />
                    </>
                  )}
                  <hr />
                  <AICheckbox
                    title="Recruiting"
                    description="Is your enterprise currently recruiting?"
                    checked={this.state.page.company.isRecruiting}
                    change={this.handleSwitchChange}
                    name="isRecruiting"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.isRecruiting && (
                    <>
                      <span className="small text-muted mb-1">
                        Where can visitors see open positions?
                      </span>
                      <input
                        type="text"
                        name="recruitmentUrl"
                        placeholder="Recruitment URL"
                        value={this.state.page.company.recruitmentUrl}
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                      />
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <span>No imprint</span>
        )}
      </div>
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
    editImprint: () => dispatch(editImprint()),
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
export default connect(mapStateToProps, mapDispatchToProps)(PageImprint);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
