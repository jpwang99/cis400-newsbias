import { Bar } from "react-chartjs-2";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class BarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          props.deal.fcf_year_1__c,
          props.deal.fcf_year_2__c,
          props.deal.fcf_year_3__c,
          props.deal.fcf_year_4__c,
          props.deal.fcf_year_5__c,
          props.deal.fcf_year_6__c,
          props.deal.fcf_year_7__c,
        ],
        datasets: [
          {
            label: "Adjusted Free Cash FLow",
            data: [
              props.deal.year_1_adj_fcf__c,
              props.deal.year_2_adj_fcf__c,
              props.deal.year_3_adj_fcf__c,
              props.deal.year_4_adj_fcf__c,
              props.deal.year_5_adj_fcf__c,
              props.deal.year_6_adj_fcf__c,
              props.deal.year_7_adj_fcf__c,
            ],

            backgroundColor: [
              "rgb(158,196,229)",
              "rgb(77,127,204)",
              "rgb(77,127,204)",
              "rgb(77,127,204)",
              "rgb(77,127,204)",
              "rgb(77,127,204)",
              "rgb(35,41,111)",
            ],
            borderColor: "#000000",
            height: 1000,
          },
        ],
      },
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
  };

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            legend: {
              labels: {
                fontColor: "white",
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: "white",
                    callback: function (label, index, labels) {
                      return "$" + label / 1000000 + "M";
                    },
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "white",
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default BarGraph;
