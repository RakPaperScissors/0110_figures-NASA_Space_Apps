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
        return <Sun className="w-7 h-7 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-7 h-7 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-7 h-7 text-blue-500" />;
      case "snow":
        return <CloudSnow className="w-7 h-7 text-sky-400" />;
      case "storm":
        return <CloudLightning className="w-7 h-7 text-purple-500" />;
      default:
        return <Cloud className="w-7 h-7 text-gray-400" />;
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-hide bg-[#F2F2F2] rounded-2xl ">
      <div className="flex gap-5 w-max px-4 py-4 snap-x snap-mandatory">
        {data.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[80px]  p-3 snap-center"
          >
            <span className="text-sm font-medium text-gray-600">
              {hour.time}
            </span>
            <div className="my-3">{getWeatherIcon(hour.condition)}</div>
            <span className="text-lg font-semibold text-gray-800">
              {hour.temp}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage
const hourlyData = [
  { time: "12PM", condition: "sunny", temp: 31 },
  { time: "1PM", condition: "cloudy", temp: 31 },
  { time: "2PM", condition: "cloudy", temp: 31 },
  { time: "3PM", condition: "cloudy", temp: 30 },
  { time: "4PM", condition: "cloudy", temp: 29 },
  { time: "5PM", condition: "rain", temp: 28 },
  { time: "6PM", condition: "storm", temp: 27 },
  // ...continue up to 24 hours
];

export default function App() {
  return (
    <div className="p-6">
      <Hourly data={hourlyData} />
    </div>
  );
}