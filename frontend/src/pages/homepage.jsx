import React from "react";
import CurrentForecast from "../components/CurrentForecast";

const Homepage = () => {
  return (
    <div className="w-full h-full">
      <CurrentForecast />
      {/* <Link to="/map">
        <button>Go to Flood Map</button>
      </Link> */}
    </div>
    
  );
};

export default Homepage;
