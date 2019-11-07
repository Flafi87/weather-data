import React, { useEffect, useState } from 'react';
import WeatherData from './WeatherData';
import './App.css';
import Spinner from './Spinner';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const url = 'https://api.thingspeak.com/channels/71542/feeds.json?results=3000';

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then((response) => response.json())
      .then((json) => setWeatherData(json.feeds));
  }, [url]);
  if (weatherData === null) {
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
      <WeatherData data={weatherData} />
    </div>
  );
}

export default App;
