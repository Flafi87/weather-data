import React, { useState } from 'react';
import MyChart from './MyChart';
import DataField from './DataField';

const WeatherData = ({ data }) => {
  const [color, setColor] = useState();
  const temp = [];
  const ground = [];
  const categories = [];
  // eslint-disable-next-line react/prop-types
  data.forEach((object) => {
    temp.push(object.field1);
    ground.push(object.field4);
    categories.push(object.created_at);
  });
  const lastData = data[data.length - 1];
  const {
    field1: dhtTemp,
    field2: groundTemp,
    field3: airPressure,
    field4: BMPTemperature,
    field5: CPUTemp,
    field6: Humidity,
  } = lastData;
  const time = new Date(lastData.created_at);
  const convertedTime = `${time.getFullYear()}-${time.getMonth()
    + 1}-${time.getDate()} ${time.getHours()}:${(`0${time.getMinutes()}`).slice(
    -2,
  )}`;

  return (
    <div className="data-page">
      <div className="header-data">
        <DataField data={dhtTemp} text="Temperature:" ending="C°" />
        <DataField data={groundTemp} text="Ground Temperature:" ending="C°" />
        <DataField data={airPressure} text="Air Pressure" ending="hPa" />
        <DataField
          data={BMPTemperature}
          text="Temperature in the box:"
          ending="C°"
        />
        <DataField data={CPUTemp} text="CPU temperature:" ending="C°" />
        <DataField data={Humidity} text="Humidity:" ending="%" />
      </div>
      <DataField data={convertedTime} text="Time:" color="#3399CC" />
      <div>
        <MyChart temp={temp} categories={categories} />
      </div>
    </div>
  );
};
export default WeatherData;
