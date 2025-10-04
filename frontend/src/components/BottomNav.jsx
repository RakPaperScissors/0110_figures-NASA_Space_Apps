import React from "react";
import { CloudSun, MapPin } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white rounded-full shadow-md z-10 border border-gray-200">
      <div className="flex justify-around items-center h-16">
        {/* Weather Tab */}
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <CloudSun className="w-5 h-5" />
          <span className="text-xs mt-1">Weather</span>
        </button>

        {/* Map Tab */}
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <MapPin className="w-5 h-5" />
          <span className="text-xs mt-1">Map</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
