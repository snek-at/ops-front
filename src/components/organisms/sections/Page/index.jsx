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
import { getPageByHandle } from "../../../../store/actions/pageActions";
//> Components
import { PageOverview, PageProjects, PageUsers, PageImprint } from "../../";
//> CSS
import "./page.scss";
//> Images
// Too be added
//#endregion

//#region > Config
const TAB_ITEMS = [
  {
    name: "Overview",
    icon: "play-circle",
  },
  {
    name: "Projects",
    icon: "dot-circle",
  },
  {
    name: "Users",
    icon: "user-circle",
  },
  {
    name: "Imprint",
    icon: "info-circle",
  },
];
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Page extends React.Component {
  state = {
    activeItem: localStorage.getItem(this.props.handle + "-tab")
      ? parseInt(localStorage.getItem(this.props.handle + "-tab"))
      : 0,
  };

  componentDidMount = () => {
    // Retrieve Pipelines
    this.props.getPageByHandle(this.props.handle);
  };

  componentDidUpdate = () => {
    // Check if there are no current pipelines set
    if (this.props.page && !this.state.page) {
      this.setState({
        page: this.props.page,
      });
    }

    if (JSON.stringify(this.props.page) !== JSON.stringify(this.state.page)) {
      this.setState({
        page: this.props.page,
      });
    }
  };

  // Toggle the visible tab
  toggle = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.activeItem !== tab) {
      this.setState(
        {
          activeItem: tab,
        },
        () => localStorage.setItem(this.props.handle + "-tab", tab)
      );
    }
  };

  getGrowth = (growth) => {
    switch (growth) {
      case -2:
        return (
          <MDBIcon icon="angle-double-down" className="red-text clickable" />
        );
      case -1:
        return <MDBIcon icon="angle-down" className="red-text clickable" />;
      case 1:
        return <MDBIcon icon="angle-up" className="green-text clickable" />;
      case 2:
        return (
          <MDBIcon icon="angle-double-up" className="green-text clickable" />
        );
      default:
        return null;
    }
  };

  render() {
    const { page } = this.state;

    return (
      <MDBContainer id="company">
        {page ? (
          <MDBRow>
            <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex justify-content-space-between">
                    <div>
                      <p className="lead mb-1">
                        <strong>You decide what you share.</strong>
                      </p>
                      <p className="text-muted small mb-2">
                        Security is one of our highest priorities. No
                        information you do not explicitly share, will leave your
                        network.
                      </p>
                    </div>
                    <div>
                      <MDBBtn color="indigo" outline>
                        <MDBIcon icon="eye" />
                        View as public
                      </MDBBtn>
                      <MDBBtn color="indigo">
                        <MDBIcon icon="key" />
                        Edit
                      </MDBBtn>
                    </div>
                  </div>
                  <div className="position-relative">
                    <div className="mt-2">
                      <p className="mb-0">Restrictions</p>
                    </div>
                    <MDBRow>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 1 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="danger"
                          className="my-2"
                        />
                        <p className="mb-0">Heavy</p>
                        <p className="text-muted small mb-0">
                          No information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 2 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="warning"
                          className="my-2"
                        />
                        <p className="mb-0">Moderate</p>
                        <p className="text-muted small mb-0">
                          Little information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 3 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="info"
                          className="my-2"
                        />
                        <p className="mb-0">Light</p>
                        <p className="text-muted small mb-0">
                          All non-confidential information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 4 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="success"
                          className="my-2"
                        />
                        <p className="mb-0">Open</p>
                        <p className="text-muted small mb-0">
                          All information published.
                        </p>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBRow className="d-flex align-items-center">
                    <MDBCol lg="2">
                      <img
                        src="https://avatars1.githubusercontent.com/u/50574311?s=200"
                        alt="Company logo"
                        className="img-fluid"
                      />
                    </MDBCol>
                    <MDBCol lg="10">
                      <div className="d-flex justify-content-space-between">
                        <div>
                          <p className="lead font-weight-bold mb-1">
                            {page.company.name}
                            {page.company.growth !== 0 && (
                              <MDBTooltip
                                domElement
                                tag="span"
                                material
                                placement="top"
                              >
                                <span className="ml-2">
                                  {this.getGrowth(page.company.growth)}
                                </span>
                                <span>Company growth</span>
                              </MDBTooltip>
                            )}
                          </p>
                          {page.company.verified && (
                            <div className="verified-badge mb-1">
                              <MDBBadge color="success">
                                <MDBIcon icon="check-circle" />
                                Verified
                              </MDBBadge>
                            </div>
                          )}
                          <p className="text-muted mb-1">
                            {page.company.description}
                          </p>
                        </div>
                        <div className="d-flex">
                          <a href={`mailto:${page.company.email}`}>
                            <MDBBtn color="indigo" size="md">
                              Contact
                            </MDBBtn>
                          </a>
                          <MDBBtn color="green" size="md">
                            Follow
                          </MDBBtn>
                        </div>
                      </div>
                      <div>
                        {page.company.isRecruiting && (
                          <MDBBadge color="indigo">
                            <MDBIcon icon="users" />
                            Recruiting
                          </MDBBadge>
                        )}
                        {page.company.employees >= 1 &&
                          page.company.employees < 5 && (
                            <MDBBadge color="primary">1-5 Employees</MDBBadge>
                          )}
                        {page.company.employees >= 5 &&
                          page.company.employees < 20 && (
                            <MDBBadge color="primary">5-20 Employees</MDBBadge>
                          )}
                        {page.company.employees >= 20 &&
                          page.company.employees < 100 && (
                            <MDBBadge color="primary">
                              20-100 Employees
                            </MDBBadge>
                          )}
                        {page.company.employees >= 100 && (
                          <MDBBadge color="primary">100+ Employees</MDBBadge>
                        )}
                        {page.company.localRelevance && (
                          <MDBBadge color="primary">
                            <MDBIcon icon="map-marker" />
                            Local relevance
                          </MDBBadge>
                        )}
                        {page.company.isOpenSource && (
                          <a
                            href={page.company.openSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBadge color="elegant-color">
                              <MDBIcon fab icon="github" />
                              Open source
                            </MDBBadge>
                          </a>
                        )}
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBCardFooter className="px-4 py-3">
                  <div className="stats d-flex">
                    {page.company.revenueGrowth && (
                      <span className="d-inline-block mr-4">
                        <MDBIcon
                          icon="angle-double-up"
                          size="sm"
                          className="green-text font-weight-bold"
                        />{" "}
                        <span className="font-weight-bold green-text">
                          +{page.company.revenueGrowth.value}
                          {page.company.revenueGrowth.unit}
                        </span>{" "}
                        revenue
                        <br />
                        <small className="text-muted">
                          compared to {page.company.revenueGrowth.comparedTo}
                        </small>
                      </span>
                    )}
                    <span className="d-inline-block mr-4">
                      <MDBIcon
                        icon="building"
                        size="sm"
                        className="blue-text font-weight-bold"
                      />{" "}
                      Sites
                      <br />
                      <small className="text-muted">
                        {page.company.sites ? page.company.sites.length : 0}{" "}
                        location
                      </small>
                    </span>
                    <span className="d-inline-block mr-4">
                      <MDBIcon
                        icon="code"
                        size="sm"
                        className="blue-text font-weight-bold"
                      />{" "}
                      Contributors
                      <br />
                      <small className="text-muted">
                        {page.company.contributors && (
                          <>
                            {page.company.contributors.map((contrib, i) => {
                              if (contrib.url) {
                                return (
                                  <a
                                    key={i}
                                    href={contrib.url}
                                    target="_blank"
                                    className="text-muted"
                                    rel="noopener noreferrer"
                                  >
                                    <MDBIcon
                                      fab
                                      icon={
                                        contrib.platform
                                          ? contrib.platform
                                          : "question-circle"
                                      }
                                      className={i !== 0 ? "mr-1 ml-2" : "mr-1"}
                                    />
                                    {contrib.value ? contrib.value : 0}
                                  </a>
                                );
                              } else {
                                return (
                                  <React.Fragment key={i}>
                                    <MDBIcon
                                      fab
                                      icon={
                                        contrib.platform
                                          ? contrib.platform
                                          : "question-circle"
                                      }
                                      className={i !== 0 ? "mr-1 ml-2" : "mr-1"}
                                    />
                                    {contrib.value ? contrib.value : 0}
                                  </React.Fragment>
                                );
                              }
                            })}
                          </>
                        )}
                      </small>
                    </span>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="12">
              <MDBNav tabs className="d-flex justify-content-between">
                <div className="d-flex">
                  {TAB_ITEMS.map((tab, t) => {
                    return (
                      <MDBNavItem key={t}>
                        <MDBNavLink
                          link
                          to="#"
                          active={this.state.activeItem === t}
                          onClick={(e) => this.toggle(e, t)}
                          role="tab"
                        >
                          <MDBIcon icon={tab.icon} />
                          {tab.name}
                        </MDBNavLink>
                      </MDBNavItem>
                    );
                  })}
                </div>
                <div>
                  {(this.state.activeItem === 1 ||
                    this.state.activeItem === 2) && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) =>
                        this.setState({ globalFilter: e.target.value })
                      }
                    />
                  )}
                </div>
              </MDBNav>
              <MDBTabContent
                className="card"
                activeItem={this.state.activeItem}
              >
                <MDBTabPane tabId={0} role="tabpanel">
                  <PageOverview />
                </MDBTabPane>
                <MDBTabPane tabId={1} role="tabpanel">
                  <PageProjects filter={this.state.globalFilter} />
                </MDBTabPane>
                <MDBTabPane tabId={2} role="tabpanel">
                  <PageUsers filter={this.state.globalFilter} />
                </MDBTabPane>
                <MDBTabPane tabId={3} role="tabpanel">
                  <PageImprint />
                </MDBTabPane>
              </MDBTabContent>
            </MDBCol>
          </MDBRow>
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
