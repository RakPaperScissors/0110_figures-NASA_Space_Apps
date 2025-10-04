import { useState } from "react";
import Homepage from "./pages/homepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center bg-gray-900 h-screen">
        {/* PHONE CONTAINER */}
        <div className="w-[390px] h-screen text-white font-sans overflow-y-auto scrollbar-hide">
          <Homepage />
        </div>
      </div>
    </>
  );
}

export default App;