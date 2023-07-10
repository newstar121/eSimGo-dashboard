import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
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

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({
        chartData: newProps.chartData,
        chartOptions: newProps.chartOptions,
      });
    }
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        width='100%'
        height='100%'
      />
    );
  }
}

export default PieChart;
