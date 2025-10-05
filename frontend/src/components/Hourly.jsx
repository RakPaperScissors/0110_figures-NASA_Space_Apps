import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { useWeatherByHour } from "../hooks/useByHour";
import LoadingSpinner from "./LoadingSpinner";

const Hourly = ({ weatherByHour }) => {
  console.log("Weather by hour sample:", weatherByHour?.[0]);
  
  const getWeatherCategory = (code) => {
    const num = Number(code);
    if (Number.isNaN(num)) return "unknown";
    if ([1, 2].includes(num)) return "clear";
    if ([3, 4].includes(num)) return "partly_cloudy";
    if (num >= 5 && num <= 9) return "cloudy";
    if ((num >= 10 && num <= 19) || (num >= 40 && num <= 49)) return "rain";
    if ((num >= 20 && num <= 29) || (num >= 50 && num <= 59)) return "storm";
    if ((num >= 30 && num <= 39) || (num >= 60 && num <= 69)) return "snow";
    if (num >= 70 && num <= 79) return "fog";
    if (num >= 80) return "cloudy";
    return "unknown";
  }
  const getWeatherIcon = (code) => {
    const condition = getWeatherCategory(code);

    switch (condition) {
      case "clear":
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case "partly_cloudy":
        return <Cloud className="w-6 h-6 text-gray-200" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case "storm":
        return <CloudLightning className="w-6 h-6 text-purple-500" />;
      case "snow":
        return <CloudSnow className="w-6 h-6 text-sky-300" />;
      case "fog":
        return <CloudFog className="w-6 h-6 text-gray-300" />;
      default:
        return <Cloud className="w-6 h-6 text-white" />;
    }
  };

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
            <div className="my-1">{getWeatherIcon(hour.weatherSymbol)}</div>
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

  