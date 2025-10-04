import React from "react";
import CurrentForecast from "../components/CurrentForecast";
import Hourly from "../components/Hourly";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#FFFFFF]">
      <CurrentForecast />
      <Hourly />
    </div>
  );
};

export default Homepage;