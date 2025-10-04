import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCurrentWeather } from './hooks/useCurrent'
import { useWeatherByHour } from './hooks/useByHour'
import { useForecast } from './hooks/useForecast'
import { useGeolocation } from './hooks/useGeolocation'

function App() {
  const { coordinates, error: geoError } = useGeolocation();
  const {currentWeather, error: currentWeatherError, locationUsed, usingDefault} = useCurrentWeather();
  const {weatherByHour, error: weatherByHourError} = useWeatherByHour();
  const {forecast, error: forecastError} = useForecast();

  // if (geoError) return <p>{geoError}</p>;
  if (!coordinates) return <p>Getting your location...</p>;
  // if(currentWeatherError || weatherByHourError || forecastError) return <p>{currentWeatherError}</p>;
  if(!currentWeather) return <p>loading...</p>;

  return (
    <div className="app-container">
      <h2>Weather App 🌦️</h2>
      <p>
        Showing weather for: <strong>{locationUsed}</strong>{" "}
        {usingDefault && <span>(default)</span>}
      </p>
      {geoError && <p style={{ color: "orange" }}>{geoError}</p>}

      <section>
        <h3>Current Weather</h3>
        <p>Temperature: {currentWeather?.calculated_feels_like_C}°C</p>
      </section>

      <section>
        <h3>Next Few Hours</h3>
        <ul>
          {weatherByHour?.map((hour, i) => (
            <li key={i}>
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} — {hour.temperature}°C, {hour.humidity}% humidity
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Next Few Days</h3>
        <ul>
          {forecast?.map((day, i) => (
            <li key={i}>
              {new Date(day.day).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              — {day.minTemperature}°C / {day.maxTemperature}°C
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
