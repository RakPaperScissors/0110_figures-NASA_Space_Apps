import React from "react";

const CurrentForecast = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white text-black font-[Manrope]">
      {/* LOCATION */}
      <h1 className="text-[40px] font-bold">Location</h1>

      {/* PLACEHOLDER MUNA */}
      <div className="w-[130px] h-[130px] bg-gray-300 flex items-center justify-center mt-4 mb-4">
        <img
          src="https://via.placeholder.com/200"
          alt="Weather icon"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEMP */}
      <h2 className="text-[40px] font-bold">Temp</h2>

      {/* QUOTE */}
      <p className="text-[24px] mt-2">Quote</p>
    </div>
  );
};

export default CurrentForecast;
