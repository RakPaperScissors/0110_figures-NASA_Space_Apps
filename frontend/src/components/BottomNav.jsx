import React from "react";
import { CloudSun, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-72 bg-[#f2f2f2]/10 backdrop-blur-xl rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.08)] z-10 border border-white/20 z-[9999]">
      <div className="flex justify-around items-center h-16">
        {/* Weather Tab */}
        <button
          className="flex flex-col items-center text-white"
          onClick={() => navigate("/")}
        >
          <CloudSun className="w-5 h-5" />
          <span className="text-xs mt-1">Weather</span>
        </button>

        {/* Map Tab */}
        <button
          className="flex flex-col items-center text-white"
          onClick={() => navigate("/map")}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-xs mt-1">Map</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
