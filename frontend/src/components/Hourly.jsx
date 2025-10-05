import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

const Hourly = ({ data }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-white" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case "snow":
        return <CloudSnow className="w-6 h-6 text-sky-400" />;
      case "storm":
        return <CloudLightning className="w-6 h-6 text-purple-500" />;
      default:
        return <Cloud className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div
      className="overflow-x-auto scrollbar-hide
      bg-white/10 backdrop-blur-xl
      rounded-2xl border border-white/20
      shadow-[0_2px_20px_rgba(0,0,0,0.08)]
      relative overflow-hidden flex snap-x"
    >
      {data.map((hour, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center min-w-[80px] p-3 snap-center"
        >
          <span className="text-sm font-medium text-[#f2f2f2]">
            {hour.time}
          </span>
          <div className="my-1">{getWeatherIcon(hour.condition)}</div>
          <span className="text-lg font-semibold text-[#f2f2f2]">
            {hour.temp}°
          </span>
        </div>
      ))}
    </div>
  );

};

export default Hourly;

  