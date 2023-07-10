import React, { Component } from "react";
import Chart from "react-apexcharts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        chartData: nextProps.chartData,
        chartOptions: nextProps.chartOptions,
      })
    }
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='bar'
        width='100%'
        height='100%'
      />
    );
  }
}

export default ColumnChart;
