import React from "react";
import { useCurrentWeather } from '../hooks/useCurrent';

const CurrentForecast = () => {
  const { currentWeather, error, locationUsed, usingDefault } = useCurrentWeather();

  const getWeatherQuote = (code) => {
    const num = Number(code);
    if ([0, 1].includes(num)) return "Clear skies ahead ☀️";
    if ([2].includes(num)) return "Partly cloudy — enjoy the day!";
    if ([3].includes(num)) return "Mostly cloudy but still nice.";
    if ([45, 48].includes(num)) return "Foggy day — drive safe!";
    if ([51, 53, 55, 56, 57].includes(num)) return "Light drizzle outside.";
    if ([61, 63, 65, 66, 67].includes(num)) return "Rainy day — don’t forget your umbrella!";
    if ([71, 73, 75, 77, 85, 86].includes(num)) return "Snowy weather ❄️";
    if ([80, 81, 82].includes(num)) return "Scattered showers ☔";
    if ([95, 96, 99].includes(num)) return "Thunderstorms in the area ⚡";
    return "Weather data unavailable.";
  };

  const getWeatherIcon = (code) => {
    const num = Number(code);
    if ([0, 1].includes(num)) return "/clear_sky.svg";
    if ([2].includes(num)) return "/light_clouds_sunny.svg";
    if ([3].includes(num)) return "/light_clouds_sunny.svg";
    if ([45, 48].includes(num)) return "/dense_fog.svg";
    if ([51, 53, 55, 56, 57].includes(num)) return "/drizzle.svg";
    if ([61, 63, 65, 66, 67].includes(num)) return "/rain.svg";
    // if ([71, 73, 75, 77, 85, 86].includes(num)) return "/snow.svg";
    if ([80, 81, 82].includes(num)) return "/rain_showers_sunny.svg";
    if ([95, 96, 99].includes(num)) return "/thunderstorm.svg";
    return "/sunny.svg";
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full text-[#f2f2f2] font-[Manrope] py-5 mt-10"
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
    >
      {" "}
      {/* LOCATION */}
      <h1 className="text-[24px] font-bold">
        {locationUsed}
      </h1>
      {usingDefault && <span>(default)</span>}
      {/* ICON */}
      <div className="w-[130px] h-[100px] flex items-center justify-center mt-2 mb-2">
        <img
          src={getWeatherIcon(currentWeather.weatherSymbol)}
          alt="Weather icon"
          className="w-full h-full object-cover"
        />
      </div>
      {/* TEMP */}
      <h2 className="text-[40px] font-extrabold">
        {currentWeather.temperature?.toFixed(0)} <span className="font-normal">°C</span>
      </h2>
      {/* QUOTE */}
      <p className="text-[16px] mt-2">{getWeatherQuote(currentWeather.weatherSymbol)}</p>
    </div>
  );
};

export default CurrentForecast;
