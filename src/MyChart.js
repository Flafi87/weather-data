import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
/**
 * @param  {string} temp
 * @param  {string} categories
 */
const MyChart = ({ temp, categories }) => {
  // eslint-disable-next-line no-undef
  const width = window.innerWidth;
  // eslint-disable-next-line no-undef
  const height = window.innerHeight;
  const settings = {
    chart: {
      foreColor: '#CCFFFF',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
      categories: categories,
      labels: {
        style: {
          // fontSize: "12px",
          cssClass: 'chart-xaxis-label',
        },
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors: ['#b6b6b6'],
          // fontSize: "12px",
          cssClass: 'apexcharts-yaxis-label',
        },
        formatter: function (value) {
          return `${value} C°`;
        },
      },
    },

    tooltip: {
      enabled: false,
      shared: true,
      theme: 'light',
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: 'dd MMM HH:mm',
        formatter: undefined,
      },
      marker: {
        show: false,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: '#CCFFFF',
      width: 2,
      dashArray: 0,
    },
    grid: {
      column: {
        colors: ['#314052'],
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart
        options={settings}
        series={[{ name: 'Temperature', type: 'line', data: temp }]}
        width={width * 0.95}
        height={height * 0.7}
      />
    </div>
  );
};

MyChart.propTypes = {
  temp: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default MyChart;
