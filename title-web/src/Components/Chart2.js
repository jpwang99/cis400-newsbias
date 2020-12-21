import { Pie } from "react-chartjs-2";
import React, { Component } from "react";

class Chart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Zyyo Investors", "Zyyo and Sponsor"],
        datasets: [
          {
            label: "Sources",
            data: [85, 15],

            backgroundColor: [
              "rgb(77,127,204)",
              "rgb(48,56,151)",
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

export default Chart2;
