import { Line } from "react-chartjs-2";
import React, { Component } from "react";

class ADRLine extends Component {
  constructor(props) {
    super(props);
    // var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
    // gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
    this.state = {
      chartData: {
        labels: [
          props.deal.adr_year_1__c,
          props.deal.adr_year_2__c,
          props.deal.adr_year_3__c,
          props.deal.adr_year_4__c,
          props.deal.adr_year_5__c,
        ],
        datasets: [
          {
            label: "ADR",
            data: [
              props.deal.adr_year_1_value__c,
              props.deal.adr_year_2_value__c,
              props.deal.adr_year_3_value__c,
              props.deal.adr_year_4_value__c,
              props.deal.adr_year_5_value__c,
            ],
            backgroundColor: "rgb(39,64,124)",
            borderColor: "rgb(74,125,207)",
            pointBorderColor: "rgb(255,255,255)",
            borderBackgroundColor: "rgb(74,125,207)",
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
        <Line
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
                    beginAtZero: false,
                    fontColor: "white",
                    callback: function (label, index, labels) {
                      return "$" + label;
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

export default ADRLine;
