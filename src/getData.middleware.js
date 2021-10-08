import { DOWNLOAD_DATA, CHANGE_GRAPH } from "./actions/types";

export const downloadTemp =
  () =>
  (next) =>
  ({ type, payload }) => {
    const dhttemp = [];
    const ground = [];
    const cpu = [];
    const bmp = [];
    const pressure = [];
    const humidity = [];
    const categories = [];
    const measuredData = [];
    const lastMeasuredData = [];
    if (type === DOWNLOAD_DATA) {
      const fields = [];
      const { channel, feeds } = payload;
      Object.keys(channel).forEach((element) => {
        if (element.includes("field")) {
          fields.push(element);
        }
      });
      fields.forEach((fieldName) => {
        const fieldData = [];
        feeds.forEach((measuringRecords) => {
          fieldData.push(measuringRecords[fieldName]);
        });
        measuredData.push({ [fieldName]: fieldData });
      });
      console.log(measuredData);
      feeds.forEach((records) => {
        dhttemp.push(records.field1);
        ground.push(records.field2);
        cpu.push(records.field5);
        bmp.push(records.field4);
        pressure.push(records.field3);
        humidity.push(records.field6);
        categories.push(records.created_at);
      });
      const lastData = feeds[feeds.length - 1];
      const {
        field1: dhtTemp,
        field2: groundTemp,
        field3: airPressure,
        field4: BMPTemperature,
        field5: CPUTemp,
        field6: Humidity,
      } = lastData;
      fields.forEach((fieldName) => {
        lastMeasuredData.push({ [fieldName]: lastData[fieldName] });
      });
      console.log(lastMeasuredData);
      const time = new Date(lastData.created_at);
      const convertedTime = `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()} ${time.getHours()}:${`0${time.getMinutes()}`.slice(
        -2
      )}`;
      return next({
        type,
        payload: {
          channel,
          measuredData,
          lastMeasuredData,
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
          data: feeds,
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

export const changeGraph =
  (store) =>
  (next) =>
  ({ type, payload }) => {
    if (type === CHANGE_GRAPH) {
      const { ground, cpu, bmp, dhtTemp, humidity, pressure } =
        store.getState().data;
      switch (payload) {
        case "groundTemp":
          return next({
            type,
            payload: {
              temp: ground,
              unit: "C°",
            },
          });
        case "dhtTemp":
          return next({
            type,
            payload: {
              temp: dhtTemp,
              unit: "C°",
            },
          });
        case "CPUTemp":
          return next({
            type,
            payload: {
              temp: cpu,
              unit: "C°",
            },
          });
        case "BMPTemperature":
          return next({
            type,
            payload: {
              temp: bmp,
              unit: "C°",
            },
          });
        case "humidity":
          return next({
            type,
            payload: {
              temp: humidity,
              unit: "%",
            },
          });
        case "pressure":
          return next({
            type,
            payload: {
              temp: pressure,
              unit: "hPa",
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
