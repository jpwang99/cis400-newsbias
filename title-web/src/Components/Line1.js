import { Line } from "react-chartjs-2";
import React, { Component } from "react";

class Line1 extends Component {
  constructor(props) {
    super(props);
    // var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
    // gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
    this.state = {
      chartData: {
        labels: ["2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            label: "Sources",
            data: [5, 8, 8, 12, 20],
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
        <Line data={this.state.chartData} options={{}} />
      </div>
    );
  }
}

export default Line1;
