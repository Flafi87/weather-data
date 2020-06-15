import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WeatherData from './WeatherData';
import '../style/App.css';
import Spinner from './Spinner';
import { getData, changeGraph, changeResults } from '../actions/dataActions';


const App = ({
  isLoading, chartLoading, lastData, categories, temp, changeGraph, unit, results, getData,
  changeResults,
}) => {
  /**
   * Downloading Data
   */

  useEffect(() => {
    getData();
  }, [getData, results]);
  if (isLoading) {
    return (
      <div className="App">
        {/* <header className='App-header'>Loading</header> */}
        <div className="App-header">
          <div>Loading...</div>
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <header>Kiskunmajsa Weather</header>
      <WeatherData
        lastData={lastData}
        categories={categories}
        temp={temp}
        changeGraph={changeGraph}
        chartLoading={chartLoading}
        unit={unit}
        changeResults={changeResults}
        results={results}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  lastData: state.data.lastData,
  categories: state.data.categories,
  temp: state.data.temp,
  isLoading: state.data.loading,
  chartLoading: state.data.chartLoading,
  unit: state.data.unit,
  results: state.data.results,
});

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  unit: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  lastData: PropTypes.objectOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  temp: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeGraph: PropTypes.func.isRequired,
  chartLoading: PropTypes.bool.isRequired,
  results: PropTypes.number.isRequired,
  changeResults: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { getData, changeGraph, changeResults },
)(App);
