import React from "react";
import { useCurrentWeather } from "../hooks/useCurrent";

// Helper functions for interpretations
const getPrecipitationInterpretation = (value) => {
  const num = parseInt(value);
  if (num >= 0 && num <= 10) return "Very unlikely - Mostly dry";
  if (num >= 20 && num <= 40) return "Possible - Isolated showers";
  if (num >= 50 && num <= 70) return "Likely - Widespread rain";
  if (num >= 80 && num <= 100) return "Very likely - Heavy rain";
  // Handle edge cases between ranges
  if (num > 10 && num < 20) return "Unlikely - Mostly dry";
  if (num > 40 && num < 50) return "Possible - Scattered showers";
  if (num > 70 && num < 80) return "Likely - Moderate rain";
  return "Check forecast";
};

const getHumidityInterpretation = (value) => {
  const num = parseInt(value);
  if (num >= 0 && num <= 30) return "Very Dry - Air feels dry and crisp";
  if (num >= 31 && num <= 50) return "Comfortable - Pleasant and balanced air";
  if (num >= 51 && num <= 70) return "Humid - Feels warmer, mild stickiness";
  if (num >= 71 && num <= 90) return "Very Humid - Sticky and uncomfortable";
  if (num >= 91 && num <= 100) return "Saturated - Fog, dew, or rain likely";
  return "Check humidity reading";
};

// Single Tile Component
const GlassTile = ({ title, value }) => {
  const getInterpretation = (title, value) => {
    if (title === "Precipitation") {
      return getPrecipitationInterpretation(value);
    }
    if (title === "Humidity") {
      return getHumidityInterpretation(value);
    }
    return null;
  };

  const interpretation = getInterpretation(title, value);

  return (
    <div className="flex flex-col justify-center items-center 
                    h-32 rounded-2xl 
                    bg-white/10 border border-white/10 
                    shadow-inner">
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
      {interpretation && (
        <p className="text-xs text-gray-400 text-center px-2 mt-1 leading-tight">
          {interpretation}
        </p>
      )}
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
