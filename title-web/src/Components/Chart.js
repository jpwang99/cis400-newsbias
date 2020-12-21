import { Pie } from "react-chartjs-2";
import React, { Component } from "react";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Debt", "LP", "GP"],
        datasets: [
          {
            label: "Sources",
            data: [
              props.deal.cur_debt__c ? props.deal.cur_debt__c : 0,
              props.deal.cur_lp_equity__c ? props.deal.cur_lp_equity__c : 0,
              props.deal.cur_gp_equity__c ? props.deal.cur_gp_equity__c : 0,
            ],
            backgroundColor: [
              "rgb(10,96,79)",
              "rgb(35,220,88)",
              "rgb(26,174,84)",
            ],
            borderColor: "#000000",
          },
        ],
      },
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    width: 1000,
    height: 1000,
  };

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontFamily: '"Bodoni 175"',
                fontColor: "#fff",
                fontSize: 15,
              },
            },
            line: {
              borderColor: "#000000",
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
