import axios from "axios";
import Forecast from "./Forecast";
import React, { useState, useEffect } from "react";

function WeatherInfo({ city }) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "dcdd94d83d2bbdcd77eef4ed70b449a1";

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((data) => {
        setCurrentWeatherData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  return (
    <div>
      <div className="date-time">
        {loading ? "Loading date..." : new Date().toLocaleString("en-GB")}
      </div>
      <h1 className="city-name">
        {loading ? "Loading city..." : currentWeatherData.name}
      </h1>
      <div className="weather-info">
        {loading ? (
          <div>Loading icon...</div>
        ) : (
          <>
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@4x.png`}
              alt={currentWeatherData.weather[0].description}
            />
            <p>{currentWeatherData.weather[0].description}</p>
          </>
        )}
      </div>
      <h2 className="temperature">
        {loading
          ? "Loading temperature..."
          : `${currentWeatherData.main.temp}°C`}
      </h2>
      {loading ? (
        <div className="loading-forecast">Loading forecast...</div>
      ) : (
        <Forecast
          lat={currentWeatherData.coord.lat}
          lon={currentWeatherData.coord.lon}
        />
      )}

      {error && <div>{error}</div>}
    </div>
  );
}

export default WeatherInfo;




