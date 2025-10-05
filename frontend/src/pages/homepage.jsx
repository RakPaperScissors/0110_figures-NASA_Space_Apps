import React from "react";
import CurrentForecast from "../components/CurrentForecast";
import Hourly from "../components/Hourly";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
      <CurrentForecast />
      <Hourly />
    </div>
  );
};

export default Homepage;
