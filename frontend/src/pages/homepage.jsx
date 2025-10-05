import React from "react";
import CurrentForecast from "../components/currentForecast";
import Hourly from "../components/Hourly";
import Daily from "../components/daily";
import GlassContainer from "../components/GlassTile";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCurrentWeather } from "../hooks/useCurrent";
import { useWeatherByHour } from "../hooks/useByHour";
import { useForecast } from "../hooks/useForecast";

const Homepage = () => {
  const {
    currentWeather,
    error: currentWeatherError,
    loading: currentWeatherLoading,
    locationUsed,
    usingDefault,
  } = useCurrentWeather();
  const {
    weatherByHour,
    error: weatherByHourError,
    loading: weatherByHourLoading,
  } = useWeatherByHour();
  const {
    forecast,
    error: forecastError,
    loading: forecastLoading,
  } = useForecast();

  if (currentWeatherLoading || weatherByHourLoading || forecastLoading) {
    return <LoadingSpinner />;
  }

  if (currentWeatherError || weatherByHourError || forecastError) {
    return (
      <div className="text-red-400 text-center mt-10">
        Error loading weather data: {error}
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
    <div className={`w-full min-h-full flex flex-col ${bgClass}`}>
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
