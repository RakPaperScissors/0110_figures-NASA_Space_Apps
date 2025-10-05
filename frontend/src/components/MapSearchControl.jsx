import { useState, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

const MapSearchControl = () => {
  const map = useMap();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const provider = new OpenStreetMapProvider();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await provider.search({ query });
      setResults(searchResults.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result) => {
    const { x, y } = result;
    map.setView([y, x], 13);
    
    // Add a marker at the selected location
    L.marker([y, x]).addTo(map)
      .bindPopup(result.label)
      .openPopup();
    
    setSearchQuery(result.label);
    setResults([]);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[999] w-70"
    >
      <div 
        className="bg-white rounded-lg shadow-lg"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 text-black rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        
        {isLoading && (
          <div className="px-4 py-2 text-gray-500">Loading...</div>
        )}
        
        {results.length > 0 && (
          <ul className="mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => handleResultClick(result)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              >
                {result.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MapSearchControl;