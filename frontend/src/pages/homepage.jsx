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
  const { currentWeather, error: currentWeatherError, loading: currentWeatherLoading, locationUsed, usingDefault } = useCurrentWeather();
  const { weatherByHour, error: weatherByHourError, loading: weatherByHourLoading } = useWeatherByHour();
  const { forecast, error: forecastError, loading: forecastLoading } = useForecast();

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

  return (
    <div className="w-full min-h-full flex flex-col bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
      <CurrentForecast 
        currentWeather={currentWeather}
        locationUsed={locationUsed}
        usingDefault={usingDefault}
      />
      <Hourly weatherByHour={weatherByHour}/>
      <Daily forecast={forecast}/>
      {/* Weather detail tiles */}
      <div className="p-4 pb-24">
        <GlassContainer currentWeather={currentWeather}/>
      </div>
    </div>
  );
};

export default Homepage;
