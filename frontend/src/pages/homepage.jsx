import React from "react";
import CurrentForecast from "../components/CurrentForecast";
import Hourly from "../components/Hourly";
import Daily from "../components/daily";
import GlassContainer from "../components/GlassTile"; 

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <CurrentForecast />
      <Hourly />
      <Daily />
      {/* Weather detail tiles */}
      <div className="p-4 pb-24">
        <GlassContainer />
      </div>
    </div>
  );
};

export default Homepage;
