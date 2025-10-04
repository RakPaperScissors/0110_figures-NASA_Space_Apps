import React from "react";

const CurrentForecast = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-black font-[Manrope] py-8">
      {/* LOCATION */}
      <h1 className="text-[40px] font-bold">Location</h1>

      {/* PLACEHOLDER MUNA */}
      <div className="w-[100px] h-[100px] bg-gray-300 flex items-center justify-center mt-2 mb-2">
        <img
          src="https://via.placeholder.com/200"
          alt="Weather icon"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEMP */}
      <h2 className="text-[32px] font-bold">Temp</h2>

      {/* QUOTE */}
      <p className="text-[16px] mt-2">Quote</p>
    </div>
  );
};

export default CurrentForecast;
