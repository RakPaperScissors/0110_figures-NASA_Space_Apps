import React from "react";

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
  const weatherData = [
    { title: "UV Index", value: "3" },
    { title: "Precipitation", value: "20%" },
    { title: "Humidity", value: "65%" },
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
