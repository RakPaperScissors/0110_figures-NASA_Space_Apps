import React from "react";
import { useCurrentWeather } from "../hooks/useCurrent";

// Single Tile Component
const GlassTile = ({ title, value }) => {
  return (
    <div className="flex flex-col justify-center items-center 
                    h-32 rounded-2xl 
                    bg-white/10 border border-white/10 
                    shadow-inner">
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
};

// Container for all tiles
const GlassContainer = () => {
  const { currentWeather, error } = useCurrentWeather();

  return (
    <div
      className="p-4 grid grid-cols-2 gap-4
                 ]"
    >
      <GlassTile title={"UV Index"} value={currentWeather.uvIndex} />
      <GlassTile title={"Precipitation"} value={`${currentWeather.precipitation}%`} />
      <GlassTile title={"Humidity"} value={`${currentWeather.humidity}%`} />
      <GlassTile title={"Wind Speed"} value={`${currentWeather.windSpeed} ms/s`} />
      <GlassTile title={"Atmospheric Pressure"} value={`${currentWeather.pressure} hPa`} />
      <GlassTile title={"Sunrise"} value={new Date(currentWeather.sunrise).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} />
      <GlassTile title={"Sunset"} value={new Date(currentWeather.sunset).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} />
    </div>
  );
};

export default GlassContainer;
