import React, { useState } from "react";
import CurrentForecast from "../components/currentForecast";
import Hourly from "../components/Hourly";
import Daily from "../components/daily";
import GlassContainer from "../components/GlassTile";
import LoadingSpinner from "../components/LoadingSpinner";
import LocationPicker from "../components/map";
import { useCurrentWeather } from "../hooks/useCurrent"; 
import { useWeatherByHour } from "../hooks/useByHour";
import { useForecast } from "../hooks/useForecast";

const Homepage = () => {
  const [coords, setCoords] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { currentWeather, error: currentWeatherError, loading: currentWeatherLoading, locationUsed, usingDefault } = useCurrentWeather(coords);
  const { weatherByHour, error: weatherByHourError, loading: weatherByHourLoading } = useWeatherByHour(coords);
  const { forecast, error: forecastError, loading: forecastLoading } = useForecast(coords);

  const handleLocationChange = (location) => {
    setCoords(location);
    setIsMapOpen(false);
  };

  if (currentWeatherLoading || weatherByHourLoading || forecastLoading) {
    return <LoadingSpinner />;
  }

  if (currentWeatherError || weatherByHourError || forecastError) {
    return (
      <div className="text-red-400 text-center mt-10">
        Error loading weather data
      </div>
    );
  }

  // --- background logic added below ---
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
    if (num >= 80) return "clear";
    return "unknown";
  };

  const category = getWeatherCategory(currentWeather?.weathercode);
  const isCloudy = [
    "cloudy",
    "partly_cloudy",
    "rain",
    "storm",
    "snow",
    "fog",
  ].includes(category);

  const bgClass = isCloudy
    ? "bg-gradient-to-br from-[#2d3748] to-[#6d85ae]"
    : "bg-gradient-to-bl from-[#E5DCB2] to-[#DF9A4D]";
  // --- end background logic ---

  return (
    <div className="w-full min-h-full flex flex-col bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
      {/* 🟢 Button to open the map */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsMapOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          📍 Select Location
        </button>
      </div>

      {/* 🪟 Modal popup */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-[90%] max-w-xl relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold"
            >
              ×
            </button>

            <h2 className="text-center font-semibold mb-2">Select a location on the map</h2>

            {/* 🗺️ Leaflet map */}
            <div className="rounded overflow-hidden">
              <LocationPicker onLocationChange={handleLocationChange} />
            </div>
          </div>
        </div>
      )}

      {/* Display selected coordinates */}
      {coords && (
        <div className="mt-4 text-center text-white">
          <p>📍 Selected Location:</p>
          <p>Latitude: {coords.lat.toFixed(4)}</p>
          <p>Longitude: {coords.lon.toFixed(4)}</p>
        </div>
      )}

      <CurrentForecast 
        currentWeather={currentWeather}
        locationUsed={locationUsed}
        usingDefault={usingDefault}
      />
      <Hourly weatherByHour={weatherByHour} />
      <Daily forecast={forecast} />
      {/* Weather detail tiles */}
      <div className="p-4 pb-24">
        <GlassContainer currentWeather={currentWeather} />
      </div>
    </div>
  );
};

export default Homepage;
