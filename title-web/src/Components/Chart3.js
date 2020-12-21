import { Pie } from "react-chartjs-2";
import React, { Component } from "react";

class Chart3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Land",
          "Construction",
          "Hard Costs",
          "Soft Costs",
          "Start-Up Costs",
        ],
        datasets: [
          {
            label: "Sources",
            data: [
              props.deal.building_land_acquisition__c
                ? props.deal.building_land_acquisition__c
                : 0,
              props.deal.construction__c ? props.deal.construction__c : 0,
              props.deal.cur_remaining_hard_costs__c
                ? props.deal.cur_remaining_hard_costs__c
                : 0,
              props.deal.cur_coft_costs__c ? props.deal.cur_coft_costs__c : 0,
              props.deal.cur_remaining_start_up_costs__c
                ? props.deal.cur_remaining_start_up_costs__c
                : 0,
            ],

            backgroundColor: [
              "rgb(55,240,108)",
              "rgb(26,174,84)",
              "rgb(8,100,70)",
              "rgb(16,128,81)",
              "rgb(0,63,50)",
              //"rgb(0,255,0)",
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

export default Chart3;
