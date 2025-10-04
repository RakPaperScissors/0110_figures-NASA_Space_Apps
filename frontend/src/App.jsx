import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCurrentWeather } from './hooks/useCurrent'
import { useWeatherByHour } from './hooks/useByHour'

function App() {
  const {currentWeather, error: currentWeatherError} = useCurrentWeather();
  const {weatherByHour, error: weatherByHourError} = useWeatherByHour();

  if(currentWeatherError || weatherByHourError) return <p>Error: {error}</p>;
  if(!currentWeather) return <p>loading...</p>;

  return (
    <>
      <h2>hello weather app user! This is a test.</h2>

      <h3>Current Weather right now:</h3>
      <p>Temperature: {currentWeather.calculated_feels_like_C} °C</p>

      {weatherByHour.slice(0, 8).map((hour, index) => (
        <li key={index}>
          {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} --
          {hour.temperature} °C, {hour.humidity}% humidity, wind {hour.windSpeed} m/s
        </li>
      ))}
    </>
  )
}

export default App
