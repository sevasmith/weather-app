import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const api = {
    key: "93fa4c6ff09ee4bc633c11f2852fbb35",
    base: "https://api.openweathermap.org/data/2.5",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  function handleSubmit() {
    fetch(`${api.base}/weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  }

  function convertTime(sec) {
    const date = new Date(sec * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter city..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {typeof weather.main != "undefined" ? (
        <div className="weather-info">
          <div className="weather-detail">
            <p>City:</p>
            <span>{weather.name}</span>
          </div>
          <div className="weather-detail">
            <p>Temperature:</p>
            <span>{weather.main.temp}°C</span>
          </div>
          <div className="weather-detail">
            <p>Conditions:</p>
            <span>{weather.weather[0].main}</span>
          </div>
          <div className="weather-detail">
            <p>Sunrise:</p>
            <span>{convertTime(weather.sys.sunrise + weather.timezone)}</span>
          </div>
          <div className="weather-detail">
            <p>Sunset:</p>
            <span>{convertTime(weather.sys.sunset + weather.timezone)}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
