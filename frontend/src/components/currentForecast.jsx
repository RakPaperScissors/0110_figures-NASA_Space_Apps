import React from "react";

const CurrentForecast = () => {
  return (
    <div className="px-4 pt-6 w-full">
      {/* Header */}
      <div className="text-center mt-2">
        <p className="text-sm">HOME</p>
        <h1 className="text-4xl font-light">Davao City</h1>
        <h2 className="text-7xl mt-2">31°</h2>
        <p className="text-lg">Mostly Cloudy</p>
        <p className="text-sm mt-1">H:31° L:24°</p>
      </div>

      {/* Forecast summary */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          Partly cloudy conditions expected around 12PM. Wind gusts are up to 15
          km/h.
        </p>
      </div>
    </div>
  );
};

export default CurrentForecast;
