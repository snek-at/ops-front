//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBInput } from "mdbreact";
//> Charts
import { Bar } from "react-chartjs-2";
//#endregion

//#region > Components
/** @class Contrib add/sub chart */
class AIBarChart extends React.Component {
  state = {
    dataBar: {
      labels: Array.from(Array(200).keys()),
      datasets: [],
    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: false,
      },
      events: [],
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 1,
            gridLines: {
              display: true,
            },
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "transparent",
              display: true,
              drawBorder: false,
              zeroLineColor: "#ededed",
              zeroLineWidth: 1,
            },
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  componentDidMount = () => {
    const data = this.props.data;
    const colors = data.map((val) => (val < 0 ? "#ff3547" : "#77bd43"));

    this.setState({
      dataBar: {
        ...this.state.dataBar,
        datasets: [
          ...this.state.dataBar.datasets,
          { data, backgroundColor: colors },
        ],
      },
    });
  };

  render() {
    const { label, name, checked, className } = this.props;

    return (
      <Bar
        data={this.state.dataBar}
        options={this.state.barChartOptions}
        height="40"
      />
    );
  }
}
//#endregion

//#region > Exports
export default AIBarChart;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
