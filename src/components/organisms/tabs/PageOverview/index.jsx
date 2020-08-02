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
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Actions
// Functions to send data from the application to the store
import { getActivity } from "../../../../store/actions/pageActions";
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
    this.props.getActivity();
  };

  componentDidUpdate = () => {
    console.log(this.props.activities);
    if (this.props.activities && !this.state.activities) {
      this.setState({
        activities: this.props.activities,
      });
    }
  };

  render() {
    const { activities } = this.state;

    return (
      <MDBRow id="overview">
        <MDBCol lg="4">
          <p>Code Statistics</p>
        </MDBCol>
        <MDBCol lg="4">
          <p>Chart</p>
        </MDBCol>
        <MDBCol lg="4">
          <p>Activity</p>
          <MDBListGroup>
            {activities ? (
              <>
                {activities.map((activity, a) => {
                  return (
                    <MDBListGroupItem
                      className="d-flex align-items-center"
                      key={a}
                    >
                      <div className="d-inline-block d-flex align-items-center">
                        <span className="activity-icon">
                          {(() => {
                            switch (activity.action) {
                              case "deployed":
                                return (
                                  <MDBIcon icon="hammer" className="mr-2" />
                                );
                              case "merged":
                                return (
                                  <MDBIcon
                                    icon="code-branch"
                                    className="mr-2"
                                  />
                                );
                              default:
                                return null;
                            }
                          })()}
                        </span>
                        <MDBAvatar className="white">
                          <img
                            src={activity.author.avatar}
                            alt={activity.author.name}
                            className="rounded-circle img-fluid"
                          />
                        </MDBAvatar>
                      </div>
                      <div className="d-inline-block pl-2">
                        <p className="mb-0 d-flex align-items-center">
                          <div>
                            <span className="font-weight-bold">
                              {activity.author.name.split(" ").length > 0
                                ? activity.author.name.split(" ")[0]
                                : activity.author.name}
                            </span>{" "}
                            {activity.action}:
                          </div>
                          <code>{activity.ref.commit}</code>
                        </p>
                        {activity.action === "merged" && (
                          <p className="mb-0 text-muted">
                            <small>
                              {activity.ref.from} <MDBIcon icon="angle-right" />{" "}
                              {activity.ref.to}
                            </small>
                            <code>
                              {activity.ref.code.add - activity.ref.code.sub >
                              0 ? (
                                <span className="text-success">
                                  <MDBIcon
                                    icon="plus"
                                    size="sm"
                                    className="mr-1"
                                  />
                                  {activity.ref.code.add -
                                    activity.ref.code.sub}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <MDBIcon
                                    icon="minus"
                                    size="sm"
                                    className="mr-1"
                                  />
                                  {(activity.ref.code.add -
                                    activity.ref.code.sub) *
                                    -1}
                                </span>
                              )}
                            </code>
                          </p>
                        )}
                        {activity.ref.code && (
                          <p className="mb-0">
                            <code>
                              <span className="text-success">
                                <MDBIcon
                                  icon="plus"
                                  size="sm"
                                  className="mr-1"
                                />
                                {activity.ref.code.add}
                              </span>
                              <span className="text-danger ml-2">
                                <MDBIcon
                                  icon="minus"
                                  size="sm"
                                  className="mr-1"
                                />
                                {activity.ref.code.sub}
                              </span>
                            </code>
                          </p>
                        )}
                        <p className="mb-0 text-muted small">
                          {moment(activity.time).endOf("day").fromNow()}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getActivity: () => dispatch(getActivity()),
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
export default connect(mapStateToProps, mapDispatchToProps)(PageOverview);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
