import React from "react";
import CurrentForecast from "../components/currentForecast";
import Hourly from "../components/Hourly";
import Daily from "../components/daily";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
      <CurrentForecast />
      <Hourly />
      <Daily />
    </div>
  );
};

export default Homepage;
