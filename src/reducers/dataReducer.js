/* eslint-disable no-undef */
import {
  DOWNLOAD_DATA, CHANGE_GRAPH, DATA_LOADING, CHART_LOADING, CHANGE_RESULTS,
} from '../actions/types';


const initialState = {
  data: [],
  graphData: [],
  categories: [],
  lastData: {},
  temp: [],
  ground: [],
  cpu: [],
  bmp: [],
  pressure: [],
  humidity: [],
  loading: true,
  chartLoading: true,
  unit: 'C°',
  results: 200,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHART_LOADING:
      return {
        ...state,
        chartLoading: true,
      };
    case DOWNLOAD_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        chartLoading: false,
        lastData: action.payload.lastData,
        categories: action.payload.categories,
        temp: action.payload.temp,
        ground: action.payload.ground,
        cpu: action.payload.cpu,
        bmp: action.payload.bmp,
        dhtTemp: action.payload.dhtTemp,
        pressure: action.payload.pressure,
        humidity: action.payload.humidity,
      };
    case CHANGE_GRAPH:
      return {
        ...state,
        temp: action.payload.temp,
        chartLoading: false,
        unit: action.payload.unit,
      };
    case CHANGE_RESULTS:
      return {
        ...state,
        loading: true,
        results: action.payload,
      };
    default:
      return state;
  }
}
