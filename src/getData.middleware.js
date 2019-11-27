import { DOWNLOAD_DATA, CHANGE_GRAPH } from './actions/types';

export const downloadTemp = () => (next) => ({ type, payload }) => {
  const dhttemp = [];
  const ground = [];
  const cpu = [];
  const bmp = [];
  const pressure = [];
  const humidity = [];
  const categories = [];
  if (type === DOWNLOAD_DATA) {
    payload.forEach((object) => {
      dhttemp.push(object.field1);
      ground.push(object.field2);
      cpu.push(object.field5);
      bmp.push(object.field4);
      pressure.push(object.field3);
      humidity.push(object.field6);
      categories.push(object.created_at);
    });
    const lastData = payload[payload.length - 1];
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
    return next({
      type,
      payload: {
        lastData: {
          dhtTemp,
          groundTemp,
          airPressure,
          BMPTemperature,
          CPUTemp,
          Humidity,
          convertedTime,
        },
        temp: dhttemp,
        dhtTemp: dhttemp,
        categories: categories,
        data: payload,
        ground,
        pressure,
        humidity,
        cpu,
        bmp,
      },
    });
  }
  return next({ type, payload });
};

export const changeGraph = (store) => (next) => ({ type, payload }) => {
  if (type === CHANGE_GRAPH) {
    const {
      ground, cpu, bmp, dhtTemp, humidity, pressure,
    } = store.getState().data;
    switch (payload) {
      case 'groundTemp':
        return next({
          type,
          payload: {
            temp: ground,
            unit: 'C°',
          },
        });
      case 'dhtTemp':
        return next({
          type,
          payload: {
            temp: dhtTemp,
            unit: 'C°',
          },
        });
      case 'CPUTemp':
        return next({
          type,
          payload: {
            temp: cpu,
            unit: 'C°',
          },
        });
      case 'BMPTemperature':
        return next({
          type,
          payload: {
            temp: bmp,
            unit: 'C°',
          },
        });
      case 'humidity':
        return next({
          type,
          payload: {
            temp: humidity,
            unit: '%',
          },
        });
      case 'pressure':
        return next({
          type,
          payload: {
            temp: pressure,
            unit: 'hPa',
          },
        });
      default:
        return next({
          type,
          payload: {
            temp: dhtTemp,
          },
        });
    }
  }
  return next({ type, payload });
};
