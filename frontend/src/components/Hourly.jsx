import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";
import { useWeatherByHour } from "../hooks/useByHour";

const Hourly = ({ data = [] }) => {
  const { weatherByHour, error } = useWeatherByHour();
  
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

  // Sample data for demonstration
  const sampleData = [
    { time: "12PM", condition: "sunny", temp: 28 },
    { time: "1PM", condition: "cloudy", temp: 26 },
    { time: "2PM", condition: "rain", temp: 24 },
    { time: "3PM", condition: "sunny", temp: 27 },
    { time: "4PM", condition: "cloudy", temp: 25 },
    { time: "5PM", condition: "sunny", temp: 29 },
  ];

  const hourlyData = data.length > 0 ? data : sampleData;

  return (
    <div className="mx-4 mb-4">
      <div
        className="overflow-x-auto scrollbar-hide
        bg-white/10 backdrop-blur-xl
        rounded-2xl border border-white/20
        shadow-[0_2px_20px_rgba(0,0,0,0.08)]
        relative overflow-hidden flex snap-x"
      >
        {weatherByHour.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[90px] p-3 snap-center"
          >
            <span className="text-sm font-medium text-[#f2f2f2]">
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <div className="my-1">{getWeatherIcon(hour.condition)}</div>
            <span className="text-lg font-semibold text-[#f2f2f2]">
              {hour.temperature}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Hourly;

  