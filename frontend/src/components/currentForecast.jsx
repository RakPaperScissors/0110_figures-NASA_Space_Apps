import React from "react";

const CurrentForecast = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full text-[#f2f2f2] font-[Manrope] py-8 mt-10"
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
    >
      {" "}
      {/* LOCATION */}
      <h1 className="text-[24px] font-bold">Davao City</h1>
      {/* ICON */}
      <div className="w-[100px] h-[100px] flex items-center justify-center mt-2 mb-2">
        <img
          src="/clear_sky.svg"
          alt="Weather icon"
          className="w-full h-full object-cover"
        />
      </div>
      {/* TEMP */}
      <h2 className="text-[40px] font-extrabold">
        28 <span className="font-normal">°C</span>
      </h2>
      {/* QUOTE */}
      <p className="text-[16px] mt-2">Mostly Cloudy</p>
    </div>
  );
};

export default CurrentForecast;
