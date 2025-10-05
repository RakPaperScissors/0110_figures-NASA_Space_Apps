import { useState } from "react";
import Homepage from "./pages/homepage";
import BottomNav from "./components/BottomNav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      {/* PHONE CONTAINER */}
      <div className="w-[390px] h-screen bg-white text-black font-sans flex flex-col">
        
        {/* MAIN CONTENT (scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Homepage />
        </div>

        {/* BOTTOM NAVIGATION */}
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
