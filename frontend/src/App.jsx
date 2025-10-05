import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import MapPage from "./pages/MapPage";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <Router>
      <div className="flex justify-center items-center bg-gray-900 h-screen">
        {/* PHONE CONTAINER */}
        <div className="w-[390px] h-screen bg-white text-black font-sans flex flex-col">
          {/* MAIN CONTENT (scrollable) */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </div>

          {/* BOTTOM NAVIGATION */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
