import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/homepage";
import MapPage from './pages/MapPage';

function App() {

  return (
    <Router>
      <div className="flex justify-center items-center bg-gray-900 h-screen">
        {/* PHONE CONTAINER */}
        <div className="w-[390px] h-screen bg-gradient-to-b from-blue-400 to-blue-700 text-white font-sans overflow-y-auto">
          
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;