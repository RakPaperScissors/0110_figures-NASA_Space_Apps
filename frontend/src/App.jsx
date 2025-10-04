import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCurrentWeather } from './hooks/useCurrent'

function App() {
  const {currentWeather, error} = useCurrentWeather();

  if(error) return <p>Error: {error}</p>;
  if(!currentWeather) return <p>loading...</p>;

  return (
    <>
      <h2>hello weather app user! This is a test.</h2>

      <h3>Current Weather right now:</h3>
      <p>Temperature: {currentWeather.calculated_feels_like_C} °C</p>
    </>
  )
}

export default App
