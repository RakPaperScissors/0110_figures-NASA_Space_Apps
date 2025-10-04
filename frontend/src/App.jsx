import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCurrentWeather } from './hooks/useCurrent'
import { useWeatherByHour } from './hooks/useByHour'
import { useForecast } from './hooks/useForecast'

function App() {
  const {currentWeather, error: currentWeatherError} = useCurrentWeather();
  const {weatherByHour, error: weatherByHourError} = useWeatherByHour();
  const {forecast, error: forecastError} = useForecast();

  if(currentWeatherError || weatherByHourError || forecastError) return <p>Error: {error}</p>;
  if(!currentWeather) return <p>loading...</p>;

  return (
    <>
      <h2>hello weather app user! This is a test.</h2>

      <h3>Current Weather right now:</h3>
      <p>Temperature: {currentWeather.calculated_feels_like_C} °C</p>

      <h3>Weather in a few hours:</h3>
      {weatherByHour.slice(0, 8).map((hour, index) => (
        <li key={index}>
          {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} --
          {hour.temperature} °C, {hour.humidity}% humidity, wind {hour.windSpeed} m/s
        </li>
      ))}

      <h3>Weather for the next few days:</h3>
      {forecast.map((day, index) => (
        <li key={index}>
          {new Date(day.day).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}

          <p>Symbol: {day.weatherSymbol}°C</p>
          <p>Minimum Temperature: {day.minTemperature}</p>   
          <p>Maximum Temperature: {day.maxTemperature}</p>
          <p>Rain: {day.precipitation}</p>
        </li>
      ))}
    </>
  )
}

export default App
