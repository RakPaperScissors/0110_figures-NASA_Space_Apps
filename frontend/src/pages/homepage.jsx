import React from "react";
import CurrentForecast from "../components/CurrentForecast";
import Hourly from "../components/Hourly";
import Daily from "../components/daily";
import GlassContainer from "../components/GlassTile"; 

const Homepage = () => {
  return (
    <div className="w-full min-h-full flex flex-col bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
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
