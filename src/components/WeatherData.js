import React from 'react';
import PropTypes from 'prop-types';
import MyChart from './MyChart';
import DataField from './DataField';

const WeatherData = ({
  lastData, categories, temp, changeGraph, chartLoading, unit,
}) => {
  const {
    dhtTemp, groundTemp, airPressure, BMPTemperature, CPUTemp, Humidity,
    convertedTime,
  } = lastData;

  return (
    <div className="data-page">
      <div className="header-data">
        <DataField name="dhttemp" data={dhtTemp} text="Temperature:" unit="C°" onClick={() => changeGraph('dhtTemp')} />
        <DataField name="ground" data={groundTemp} text="Ground Temperature:" unit="C°" onClick={() => changeGraph('groundTemp')} />
        <DataField data={airPressure} text="Air Pressure" unit="hPa" onClick={() => changeGraph('pressure')} />
        <DataField
          data={BMPTemperature}
          text="Temperature in the box:"
          unit="C°"
          onClick={() => changeGraph('BMPTemperature')}
        />
        <DataField data={CPUTemp} text="CPU temperature:" unit="C°" onClick={() => changeGraph('CPUTemp')} />
        <DataField data={Humidity} text="Humidity:" unit="%" onClick={() => changeGraph('humidity')} />
        <br />
      </div>
      <DataField data={convertedTime} text="Time:" color="#3399CC" additionalClass="time" />
      <div className="helper">Click on the data field in order to see the graph of it</div>
      <div>
        <MyChart temp={temp} categories={categories} isLoading={chartLoading} unit={unit} />
      </div>
    </div>
  );
};
WeatherData.propTypes = {
  unit: PropTypes.string.isRequired,
  lastData: PropTypes.objectOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  temp: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeGraph: PropTypes.func.isRequired,
  chartLoading: PropTypes.bool.isRequired,
};


export default WeatherData;
