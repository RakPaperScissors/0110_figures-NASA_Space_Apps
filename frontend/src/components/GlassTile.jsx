import React from "react";

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
  const weatherData = [
    { title: "Humidity", value: "65%" },
    { title: "Precipitation", value: "20%" },
    { title: "UV Index", value: "3" },
    { title: "Wind Speed", value: "12 km/h" },
    { title: "Wind Direction", value: "NE" },
    { title: "Visibility", value: "10 km" },
    { title: "Air Quality", value: "Good" },
    { title: "Air Pressure", value: "1012 hPa" },
    { title: "Sunrise", value: "6:15 AM" },
    { title: "Sunset", value: "5:45 PM" },
  ];

  return (
    <div
      className="p-4 grid grid-cols-2 gap-4
                 ]"
    >
      {weatherData.map((item, index) => (
        <GlassTile key={index} title={item.title} value={item.value} />
      ))}
    </div>
  );
};

export default GlassContainer;
