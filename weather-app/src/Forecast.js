import axios from "axios";
import React, { useState, useEffect } from "react";



function Forecast({ lat, lon }) {
  const API_KEY = "dcdd94d83d2bbdcd77eef4ed70b449a1";
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);

    axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((data) => {
        setForecastData(data.data.daily.slice(1, 6)); // We slice to get only the next 5 days.
        setLoading(false);
      });
  }, [lat, lon]);

  return (
    <div className="forecast-wrapper">
      <h3>5 Day Forecast</h3>
      <hr />
      <div className="forecast">
        {loading ? (
          <div className="loading-forecast">Loading forecast...</div>
        ) : (
          forecastData.map((day, index) => (
            <div key={index} className="day">
              <span className="forecast-date">
                {new Date(day.dt * 1000).toLocaleDateString("en-GB")}
              </span>
              <div className="forecast-temp-wrapper">
                <img
                  className="forecast-image"
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <span>
                  {day.temp.min}°C / {day.temp.max}°C
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forecast;
