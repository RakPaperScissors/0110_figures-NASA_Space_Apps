import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";
import { useForecast } from "../hooks/useForecast";

const Daily = ({ forecast }) => {
  const getWeatherCategory = (code) => {
    const num = Number(code);
    if ([0, 1].includes(num)) return "sunny";
    if ([2, 3, 4].includes(num)) return "cloudy";
    if ((num >= 5 && num <= 19) || (num >= 40 && num <= 49)) return "rain";
    if ((num >= 20 && num <= 29) || (num >= 50 && num <= 59)) return "storm";
    if ((num >= 30 && num <= 39) || (num >= 60 && num <= 69)) return "snow";
    return "cloudy"; // default fallback
  };

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

  // Sample daily data for demonstration
  const sampleData = [
    { day: "Monday", condition: "sunny", precipitation: 5, min: 18, max: 30 },
    { day: "Tuesday", condition: "cloudy", precipitation: 10, min: 19, max: 27 },
    { day: "Wednesday", condition: "rain", precipitation: 60, min: 17, max: 24 },
    { day: "Thursday", condition: "sunny", precipitation: 0, min: 20, max: 32 },
    { day: "Friday", condition: "storm", precipitation: 70, min: 16, max: 23 },
  ];

  const dailyData = forecast.map((d) => {
    const localDay = new Date(d.day).toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "Asia/Manila", // optional if you want PH time
    });

    return {
      day: localDay,
      condition: getWeatherCategory(d.precipitation),
      precipitation: d.precipitation ?? 0,
      min: d.minTemperature,
      max: d.maxTemperature,
    };
  });

  // Find global min/max for proper range visualization scaling
  const globalMin = Math.min(...dailyData.map((d) => d.min));
  const globalMax = Math.max(...dailyData.map((d) => d.max));

  return (
    <div className="mx-4 mb-4">
      <div
        className="bg-white/10 backdrop-blur-xl
        rounded-2xl border border-white/20
        shadow-[0_2px_20px_rgba(0,0,0,0.08)]
        divide-y divide-white/10"
      >
        {dailyData.map((day, index) => {
          const rangeWidth =
            ((day.max - day.min) / (globalMax - globalMin)) * 100 || 0;
          const offset =
            ((day.min - globalMin) / (globalMax - globalMin)) * 100 || 0;

          return (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 text-[#f2f2f2]"
            >
              {/* Frame 1: Day name */}
              <div className="flex-1 text-base font-semibold">
                {day.day}
              </div>

              {/* Frame 2: Icon + Precipitation */}
              <div className="flex flex-col items-center justify-center flex-1">
                {getWeatherIcon(day.condition)}
                <span className="text-xs mt-1 text-blue-300">
                  {day.precipitation}%
                </span>
              </div>

              {/* Frame 3: Min - Range - Max */}
              <div className="flex items-center justify-end flex-1 space-x-2">
                <span className="text-sm">{day.min}°</span>
                <div className="relative w-24 h-1 bg-white/20 rounded-full">
                  <div
                    className="absolute h-1 bg-gradient-to-r from-blue-400 to-yellow-300 rounded-full"
                    style={{
                      width: `${rangeWidth}%`,
                      left: `${offset}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm">{day.max}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
