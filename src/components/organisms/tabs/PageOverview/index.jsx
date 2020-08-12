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
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
//> Components
import { AIBarChart, AILineChart } from "../../../atoms";
//> CSS
import "./pageoverview.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageOverview extends React.Component {
  state = { activities: null };

  componentDidMount = () => {
    this.setState({
      feed: this.props.feed,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.feed && !this.state.feed) {
      this.setState({
        feed: this.props.feed,
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
    const { feed } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = feed.filter((item) => {
      if (this.unifyString(item.message).includes(val)) {
        return item;
      }
    });

    this.setState({ feed: results });
  };

  render() {
    const { feed } = this.state;
    const { mergedFeed } = this.props;

    return (
      <MDBRow id="pageoverview">
        <MDBCol lg="4">
          <div className="mt-3">
            <p className="lead font-weight-bold mb-0">Code statistics</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              Lorem Ipsum Dolor sit amet.
            </p>
          </div>
        </MDBCol>
        <MDBCol lg="4">
          <div className="mt-3">
            <p className="lead font-weight-bold mb-0">Chart</p>
            <div className="text-right">
              {mergedFeed &&
                mergedFeed.years.map((year, y) => {
                  return (
                    <p
                      className={
                        this.state.selectedYearIndex === y
                          ? "blue-text clickable mx-2 d-inline-block"
                          : "text-muted clickable mx-2 d-inline-block"
                      }
                      onClick={() => this.setState({ selectedYearIndex: y })}
                    >
                      {moment(year.endDate).format("YYYY")}
                    </p>
                  );
                })}
              <p
                className={
                  this.state.selectedYearIndex === undefined
                    ? "blue-text clickable mx-2 d-inline-block"
                    : "text-muted clickable mx-2 d-inline-block"
                }
                onClick={() => this.setState({ selectedYearIndex: undefined })}
              >
                Current
              </p>
            </div>
            <AILineChart
              data={mergedFeed}
              year={this.state.selectedYearIndex}
              size={50}
              key="overview-chart"
            />
          </div>
        </MDBCol>
        <MDBCol lg="4">
          <div className="mt-3">
            <p className="lead font-weight-bold mb-0">Activity</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              History of all projects in your page.
            </p>
          </div>
          {this.props.filter && (
            <p className="blue-text">{feed.length} matches found.</p>
          )}
          <MDBListGroup>
            {feed ? (
              <>
                {feed.map((activity, a) => {
                  return (
                    <MDBListGroupItem
                      className="d-flex align-items-center"
                      key={a}
                    >
                      <div className="d-inline-block d-flex align-items-center">
                        <span className="activity-icon">
                          {(() => {
                            switch (activity.type) {
                              case "deploy":
                                return (
                                  <MDBIcon icon="hammer" className="mr-2" />
                                );
                              case "merge":
                                return (
                                  <MDBIcon
                                    icon="code-branch"
                                    className="mr-2"
                                  />
                                );
                              case "commit":
                                return (
                                  <MDBIcon icon="angle-up" className="mr-2" />
                                );
                              default:
                                return null;
                            }
                          })()}
                        </span>
                        <MDBAvatar className="white">
                          <img
                            src={activity.author}
                            alt={activity.name}
                            className="rounded-circle img-fluid"
                          />
                        </MDBAvatar>
                      </div>
                      <div className="d-inline-block pl-2">
                        <p className="mb-1 small">{activity.message}</p>
                        <div className="mb-0 d-flex align-items-center">
                          <span className="text-muted small">
                            {activity.type}
                          </span>
                          <code>{activity.cid.substring(0, 8)}</code>
                        </div>
                        {activity.action === "merged" && (
                          <p className="mb-0 text-muted">
                            <small>
                              {activity.ref} <MDBIcon icon="angle-right" />{" "}
                              {activity.ref}
                            </small>
                            <code>
                              {activity.ref - activity.ref > 0 ? (
                                <span className="text-success">
                                  <MDBIcon
                                    icon="plus"
                                    size="sm"
                                    className="mr-1"
                                  />
                                  {activity.ref - activity.ref}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <MDBIcon
                                    icon="minus"
                                    size="sm"
                                    className="mr-1"
                                  />
                                  {(activity.ref - activity.ref) * -1}
                                </span>
                              )}
                            </code>
                          </p>
                        )}
                        {activity.ref && (
                          <p className="mb-0">
                            <code>
                              <span className="text-success">
                                <MDBIcon
                                  icon="plus"
                                  size="sm"
                                  className="mr-1"
                                />
                                {activity.ref}
                              </span>
                              <span className="text-danger ml-2">
                                <MDBIcon
                                  icon="minus"
                                  size="sm"
                                  className="mr-1"
                                />
                                {activity.ref}
                              </span>
                            </code>
                          </p>
                        )}
                        <p className="mb-0 text-muted small">
                          {moment(activity.datetime).endOf("day").fromNow()}
                        </p>
                      </div>
                    </MDBListGroupItem>
                  );
                })}
              </>
            ) : (
              <p className="text-muted small">No activities yet.</p>
            )}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  activities: state.pages.activities,
});
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(mapStateToProps)(PageOverview);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
