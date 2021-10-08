/* eslint-disable no-undef */
import {
  DOWNLOAD_DATA, DATA_LOADING, CHANGE_GRAPH, CHART_LOADING, CHANGE_RESULTS,CHANGE_CITY
} from './types';

export const setDataLoading = () => ({
  type: DATA_LOADING,
});
export const setChartLoading = () => ({
  type: CHART_LOADING,
});

export const changeResults = (results) => ({ type: CHANGE_RESULTS, payload: results });

export const getData = () => (dispatch, getState) => {
  const state = getState();
  const { results, thingspeakID } = state.data;
  const url = `https://flafi.hu/weather?count=${results}&id=${thingspeakID}`;
  dispatch(setDataLoading());
  fetch(url)
    .then((response) => response.json())
    .then((json) => dispatch({
      type: DOWNLOAD_DATA,
      payload: json,
    }));
};

export const changeCity = (thingspeakID,cityName) => (dispatch) => {
  dispatch({
    type: CHANGE_CITY,
    payload: {
      thingspeakID,
      cityName
    },
  });
  dispatch(getData());
}

export const changeGraph = (type) => (dispatch) => {
  dispatch(setChartLoading());
  setTimeout(() => {
    switch (type) {
      case 'dhtTemp':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'dhtTemp',
        });
        break;

      case 'groundTemp':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'groundTemp',
        });
        break;
      case 'CPUTemp':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'CPUTemp',
        });
        break;
      case 'BMPTemperature':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'BMPTemperature',
        });
        break;
      case 'pressure':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'pressure',
        });
        break;
      case 'humidity':
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'humidity',
        });
        break;
      default:
        dispatch({
          type: CHANGE_GRAPH,
          payload: 'dhtTemp',
        });
    }
  }, 500);
};